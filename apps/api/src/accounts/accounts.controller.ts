import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dtos/create-account.dto';

@Controller('accounts')
export class AccountsController {

    constructor(private readonly accountsService: AccountsService) {}

    @Get()
    async getAllAccounts(){
        return this.accountsService.fetchAccounts();
    }

    @Post()
    async addAccount(@Body() dto: CreateAccountDto){
        return this.accountsService.addAccount(dto);
    }

    @Delete(':id')
    async removeAccount(@Param('id') id:string) {
        this.accountsService.removeAccount(id);
    }
}
