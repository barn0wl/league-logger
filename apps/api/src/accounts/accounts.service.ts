import { Injectable } from '@nestjs/common';
import { AccountDto } from './dtos/account.dto';
import { CreateAccountDto } from './dtos/create-account.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RiotApiService } from 'src/riot-api/riot-api.service';

@Injectable()
export class AccountsService {
    constructor(private readonly prisma: PrismaService,
        private readonly riot: RiotApiService,
    ){}

    /** Fetches all accounts saved in the db */
    async fetchAccounts(): Promise<AccountDto[]> {
        const accounts = await this.prisma.account.findMany();
        return accounts;
    }

    /** Creates an account in the db and returns its ID if it was succesfully created */
    async addAccount(body: CreateAccountDto): Promise<string|null> {
        // find the account Id using the riot api
        const riotAccount = await this.riot.getAccountByName(body.name, body.tag);
        if (riotAccount) {
            // make sure account data isnt already inside the db
            const accountInDB = await this.getAccountById(riotAccount.puuid);
            if (!accountInDB) {
                await this.prisma.account.create({
                    data: {
                        id: riotAccount.puuid,
                        name: body.name,
                        tag: body.tag,
                    },
                })
                return riotAccount.puuid
            } else {
                console.log('Account already saved in db');
                return null;
            }
        } else {
            console.error('No account with this name and tag was found');
            return null;
        }
    }

    async removeAccount(id: string): Promise<void> {
        await this.prisma.account.delete({
            where: {id: id}
        })
    }

    /** Returns the last date at which games for the account were fetched.
     * Returns null if games for the account havent been fetched yet.
     */
    async getAccountLastFetchDate(accountId: string): Promise<Date|null> {
        const acc = await this.prisma.account.findUnique({
            where: {id: accountId},
            select: {lastFetched: true}
        });
        return acc? acc.lastFetched : null;
    }

    private async getAccountById(id: string): Promise<AccountDto|null> {
        const res = await this.prisma.account.findUnique({
            where: {id: id},
        });
        return res? res: null;
    }
}
