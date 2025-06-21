import { Injectable } from '@nestjs/common';
import { RiotApiService } from 'src/riot-api/riot-api.service';
import { ItemDto } from './dtos/item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StaticDataService {
    constructor(
        private readonly riot: RiotApiService,
        private readonly prisma: PrismaService,
    ) {}

    async fetchLegendaryItems(version: string) : Promise<ItemDto[]> {
        const data = await this.riot.getItems(version);
        const legendaryItemsList: ItemDto[] = []
        Object.entries(data.data).forEach(([key, item]) => {
            if (item.tags.includes('Legendary')) {
                const id = key;
                const name = item.name;
                const iconUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.image.full}`;
                const type = 'Legendary';
                const itemObj = {
                    id: id,
                    name: name,
                    iconUrl: iconUrl,
                    type: type,
                }
                legendaryItemsList.push(itemObj);
            }
        })
        return legendaryItemsList;
    }

    async saveItems(items: ItemDto[]) : Promise<void> {
        await this.prisma.item.updateMany() // thank god!!
    }
}
