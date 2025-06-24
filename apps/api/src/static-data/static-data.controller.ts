import { Controller, Get } from '@nestjs/common';
import { StaticDataService } from './static-data.service';

@Controller('static-data')
export class StaticDataController {
    constructor(private readonly staticService: StaticDataService) {}

    @Get()
    async RefreshStaticData(){
        return this.staticService.refreshStaticData();
    }

    @Get('version/latest')
    async getLatestVersion(){
        return this.staticService.fetchLatestVersion();
    }

    @Get('version/current')
    async getCurrentVersion(){
        return this.staticService.fetchCurrentVersion();
    }

    @Get('items')
    async findAllItems(){
        return this.staticService.fetchItems();
    }

    @Get('spells')
    async findAllSpells(){
        return this.staticService.fetchSpells();
    }

    @Get('shards')
    findAllShards(){
        return this.staticService.fetchShards();
    }

    @Get('runes')
    async findAllRunes(){
        return this.staticService.fetchRuneTrees();
    }
    @Get('champions')
    async findAllChampions(){
        return this.staticService.fetchChampions();
    }
}
