import { useCallback, useEffect, useState } from "react"
import { Game } from "../types"

export const useGames = () => {

    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string|null>(null);

    const fetchGames = useCallback(async () => {
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
        fetchGames();
    }, [fetchGames])

    return { games, loading, error, fetchGames }
}