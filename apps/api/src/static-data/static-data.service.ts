import { Injectable } from '@nestjs/common';
import { RiotApiService } from 'src/riot-api/riot-api.service';
import { ItemDto } from './dtos/item.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChampionDto } from './dtos/champion.dto';
import { ItemType } from './dtos/item.dto';
import { RuneDto, RuneTreeDto } from './dtos/rune.dto';
import { SpellDto } from './dtos/spell.dto';
import { STAT_SHARDS } from 'src/shared/stat-shards.const';
import { getStatShardIconUrl } from 'src/shared/stat-shards.utils';

@Injectable()
export class StaticDataService {
    constructor(
        private readonly riot: RiotApiService,
        private readonly prisma: PrismaService,
    ) {}

    /** Function that returns the latest version of the data in ddragon */
    async fetchLatestVersion(): Promise<string> {
        return await this.riot.getDDragonLatestVersion();
    }

    /** Function that returns the current version of the static data stored in the app's db */
    async fetchCurrentVersion(): Promise<string|null> {
        const res = await this.prisma.appMetadata.findUnique({
            where: {key: "ddragonVersion"},
            select: {value: true}
        });
        return res? res.value : null;
    }

    /**
     * Refreshes all static data (items, champions, runes, and spells) by fetching the latest version from Riot's API
     * and updating the application's database. Executes all loading operations in parallel.
     * Throws if any of the loading operations fail; errors are not caught internally.
     */
    async refreshStaticData(): Promise<void> {
        const ver = await this.fetchLatestVersion();
        await Promise.all([
            this.loadItems(ver),
            this.loadChampions(ver),
            this.loadRunes(ver),
            this.loadSpells(ver),
            this.updateVersion(ver)
        ]);
    }

    /** Function that returns a list of all the legendary items saved in the app's own db */
    async fetchItems(): Promise<ItemDto[]> {
        const items = await this.prisma.item.findMany();
        // Map Prisma items to ItemDto, converting the type
        return items.map(item => ({
            id: item.id,
            name: item.name,
            iconUrl: item.iconUrl,
            type: item.type as ItemType // Cast or convert as needed
        }));
    }

    /** Function that returns a list of all the champions saved in the app's own db */
    async fetchChampions(): Promise<ChampionDto[]> {
        const champions = await this.prisma.champion.findMany();
        // Map Prisma champions to ChampionDto, converting the type
        return champions.map(champ => ({
            id: champ.id,
            iconUrl: champ.iconUrl,
        }));
    }

    /** Function that returns a list of all the spells saved in the app's own db */
    async fetchSpells(): Promise<SpellDto[]> {
        const spells = await this.prisma.spell.findMany();
        return spells.map(spell => ({
            id: spell.id,
            name: spell.name,
            iconUrl: spell.iconUrl,
        }));
    }

    /** Function that returns a list of all the runes saved in the app's own db */
    async fetchRuneTrees(): Promise<RuneTreeDto[]> {
        const runetrees = await this.prisma.runeTree.findMany({
            include: {runes: true}
        });
        return runetrees.map(tree => ({
            id: tree.id,
            name: tree.name,
            iconUrl: tree.iconUrl,
            runes: tree.runes.filter(r => r.treeId === tree.id)
        }));
    }

    /** Function that returns a list of all the statMods saved on the server side */
    fetchShards(): RuneDto[] {
        const shards = Object.values(STAT_SHARDS)
        .map(shard => ({
            id: shard.id.toString(),
            name: shard.name,
            iconUrl: getStatShardIconUrl(shard.id)
        }))
        return shards;
    }

    /** Function that returns a list of all the legendary items from DDragon */
    private async fetchItemsFromRiot(version: string) : Promise<ItemDto[]> {
        const res = await this.riot.getItems(version);
        const ItemsList: ItemDto[] = []
        
        Object.entries(res.data).forEach(([key, item]) => {
            // we only save items that are available on map 11 (Summoner's Rift)
            if (item.maps['11']) {
                if (item.tags.includes('Boots')) {
                    // for boots we do not want to count the base Boots or Magical Footwear
                    if (key !== '1001' && key !== '2422') {
                        const id = key;
                        const name = item.name;
                        const iconUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.image.full}`;
                        const itemObj = {
                            id: id,
                            name: name,
                            iconUrl: iconUrl,
                            type: ItemType.BOOTS
                        }
                        ItemsList.push(itemObj);
                    }
                }
                // for the sake of this app, we will assume that legendary items can all build from at least 1 item,
                // and they dont build into anything else (and are also not boots)
                else if (!item.into && Array.isArray(item.from) 
                    && item.from.length > 0 ) {
                        const id = key;
                        const name = item.name;
                        const iconUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.image.full}`;
                        const itemObj = {
                            id: id,
                            name: name,
                            iconUrl: iconUrl,
                            type: ItemType.LEGENDARY
                        }
                        ItemsList.push(itemObj);
                    }
            }
        })
        return ItemsList;
    }

    private async upsertItems(items: ItemDto[]) : Promise<void> {
        const transactions = items.map(item => {
        return this.prisma.item.upsert({
                where: { id: item.id },
                update: { name: item.name, iconUrl: item.iconUrl },
                create: {
                    id: item.id, name: item.name,
                    iconUrl: item.iconUrl,
                    type: item.type
                }
            });
        });
        await this.prisma.$transaction(transactions)
    }

    /** Function that combines 2 operations to retrieve items from ddragon, and then save them
     * inside of the app's db. This is the one to call when refreshing data.
     */
    async loadItems(version: string): Promise<void> {
        const items = await this.fetchItemsFromRiot(version);
        await this.upsertItems(items);
    }

    private async fetchChampionsFromRiot(version: string) : Promise<ChampionDto[]> {
        const res = await this.riot.getChampions(version);
        const championsList: ChampionDto[] = []
        Object.values(res.data).forEach((champ)=> {
            const id = champ.name;
            const iconUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.image.full}`;
            const championObj = {
                id: id,
                iconUrl: iconUrl
            };
            championsList.push(championObj);
        })
        return championsList;
    }

    private async upsertChampions(champions: ChampionDto[]): Promise<void> {
        const transactions = champions.map(champ => {
        return this.prisma.champion.upsert({
            where: { id: champ.id },
            update: { iconUrl: champ.iconUrl },
            create: { id: champ.id, iconUrl: champ.iconUrl }
            });
        });

        await this.prisma.$transaction(transactions);
    }

    async loadChampions(version: string): Promise<void> {
        const champs = await this.fetchChampionsFromRiot(version);
        await this.upsertChampions(champs);
    }

    private async fetchRunesFromRiot(version: string): Promise<RuneTreeDto[]> {
        const res = await this.riot.getRunesReforged(version);
        const runes = res.map(tree => {
            const treeId = tree.id.toString();
            const treeName = tree.name;
            const treeIconUrl = this.getCommunityDragonIconUrl(tree.icon);
            const slots = tree.slots;
            const runes = slots.flatMap( s => s.runes);
            const runesList = runes.map(r => {
                const id = r.id.toString();
                const name = r.name;
                const iconUrl = this.getCommunityDragonIconUrl(r.icon);
                return {
                    id: id, name: name, iconUrl: iconUrl
                }
            })
            return {
                id: treeId,
                name: treeName,
                iconUrl: treeIconUrl,
                runes: runesList
            }
        })
        return runes;
    }

    private async upsertRunes(runes: RuneTreeDto[]): Promise<void> {
        // Prepare all data for upsert operations
        const allTreeIds = runes.map(tree => tree.id);
        const allRuneIds = runes.flatMap(tree => tree.runes.map(rune => rune.id));
        await this.prisma.$transaction(async () => {
            // Upsert all trees first
            const treeUpserts = runes.map(tree => 
                this.prisma.runeTree.upsert({
                where: { id: tree.id },
                update: { name: tree.name, iconUrl: tree.iconUrl },
                create: { id: tree.id, name: tree.name, iconUrl: tree.iconUrl }
                })
            );
            await Promise.all(treeUpserts);

            // Upsert all runes
            const runeUpserts = runes.flatMap(tree => 
                tree.runes.map(rune => 
                this.prisma.rune.upsert({
                    where: { id: rune.id },
                    update: {
                    name: rune.name,
                    iconUrl: rune.iconUrl,
                    tree: { connect: { id: tree.id } }
                    },
                    create: {
                    id: rune.id,
                    name: rune.name,
                    iconUrl: rune.iconUrl,
                    tree: { connect: { id: tree.id } }
                    }
                })
                )
            );
            await Promise.all(runeUpserts);

                  // Step 3: Clean up orphaned records
            await this.prisma.rune.deleteMany({
                where: {
                id: { notIn: allRuneIds },
                },
            });

            await this.prisma.runeTree.deleteMany({
                where: {
                id: { notIn: allTreeIds },
                runes: { none: {} }, // Only delete trees with no runes
                },
            });
        })
        console.log('Runes and trees successfully synchronized');
    }

    async loadRunes(version: string): Promise<void> {
        const runes = await this.fetchRunesFromRiot(version);
        await this.upsertRunes(runes);
    }

    private async fetchSpellsFromRiot(version: string): Promise<SpellDto[]> {
        const res = await this.riot.getSummonerSpells(version);
        const summonersList = Object.values(res.data)
        .filter(e => e.modes.includes('CLASSIC'))  // we only want spells that can be used in SR
        .map(e => {
            const id = e.id;
            const name = e.name;
            const iconUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${e.image.full}`;
            return {
                id: id, name: name, iconUrl: iconUrl
            }
        })
        return summonersList;
    }

    private async upsertSpells(spells: SpellDto[]): Promise<void> {
        const transactions = spells.map(spell => {
        return this.prisma.spell.upsert({
                where: { id: spell.id },
                update: { name: spell.name, iconUrl: spell.iconUrl },
                create: {
                    id: spell.id, name: spell.name,
                    iconUrl: spell.iconUrl,
                }
            });
        });
        await this.prisma.$transaction(transactions);
    }

    async loadSpells(version: string): Promise<void> {
        const spells = await this.fetchSpellsFromRiot(version);
        await this.upsertSpells(spells);
    }

    private getCommunityDragonIconUrl(ddragonIconPath: string): string {
        // Remove the "perk-images/Styles/" prefix
        const filename = ddragonIconPath.replace('perk-images/Styles/', '');
        
        // Convert to lowercase
        const formattedFilename = filename.toLowerCase();
        
        return `https://raw.communitydragon.org/latest/game/assets/perks/styles/${formattedFilename}`;
    }

    private async updateVersion(newVersion: string): Promise<void> {
        await this.prisma.appMetadata.upsert({
            where: { key: 'ddragonVersion' },
            update: { value: newVersion },
            create: { key: 'ddragonVersion', value: newVersion },
        });
    }
}

