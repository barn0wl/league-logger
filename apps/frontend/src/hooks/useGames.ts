import { useCallback, useEffect, useState } from "react"
import { Game } from "../types"

export const useGames = () => {

    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string|null>(null);

    /** Fetches games from the database. The lookback arg determines how far back or
     * how many games, we want to fetch.
    */
    const fetchGames = useCallback(async (_lookback: number): Promise<void> => {
        setLoading(true);
        setError(null);
    
        try {
          // await service
          setGames([]);
        } catch (e: any) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
      }, []);

    useEffect( ()=> {
        fetchGames(50);
    }, [fetchGames])

    return { games, loading, error, fetchGames }
}