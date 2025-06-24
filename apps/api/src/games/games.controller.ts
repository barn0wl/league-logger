import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { GamesService, Lookback } from './games.service';
import { GameQueryDto } from './dtos/game-query.dto';

@Controller('games')
export class GamesController {
    constructor(private readonly gamesService: GamesService){}

    @Get()
    @UsePipes(new ValidationPipe({ transform: true }))
    async getAllGames(
        @Query() query: GameQueryDto
    ) {
        // Build the Lookback object
        const lookback: Lookback = {
        type:  query.type,
        value: query.value,
        };

        // Delegate to your service
        return this.gamesService.fetchMatchIdsForAccounts(
        query.ids,
        lookback,
        );
    }
}
