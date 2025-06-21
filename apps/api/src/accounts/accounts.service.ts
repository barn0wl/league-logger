import { Injectable } from '@nestjs/common';
import { AccountResponseDto } from './dtos/account-response.dto';
import { CreateAccountDto } from './dtos/create-account.dto';

@Injectable()
export class AccountsService {

    /** Fetches all accounts saved in the db */
    async fetchAccounts(): Promise<AccountResponseDto[]> {
        throw new Error('');
    }

    /** Creates an account in the db and returns its id */
    async addAccount(body: CreateAccountDto): Promise<string> {
        throw new Error('');
    }

    /** Remove an account from the db and returns its id */
    async removeAccount(id: string): Promise<string> {
        throw new Error('');
    }
}
