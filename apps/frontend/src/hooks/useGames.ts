import { useCallback, useEffect, useState } from "react"
import { Game } from "../types"
import { useServices } from "../providers/serviceProvider";

export const useGames = () => {
    const {gameService} = useServices();
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string|null>(null);

    /** Fetches games from the database. The lookback arg determines how far back or
     * how many games, we want to fetch.
    */
    const fetchGames = useCallback(async (lookback: number = 50): Promise<void> => {
        setLoading(true);
        setError(null);
    
        try {
          const data = await gameService.fetchGames(lookback);
          setGames(data);
        } catch (e: any) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
      }, []);

    useEffect( ()=> {
        fetchGames(50);
    }, [fetchGames, gameService]);

    return { games, loading, error, fetchGames }
}