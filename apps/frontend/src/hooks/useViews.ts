import { useCallback, useEffect, useState } from "react"
import { ViewConfig } from "../types"

export const useViews = () => {

    const [views, setViews] = useState<ViewConfig[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string|null>(null);

    const fetchViews = useCallback(async () => {
        setLoading(true);
        setError(null);
    
        try {
          // await service
          setViews([]);
        } catch (e: any) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
      }, []);

    useEffect( ()=> {
        fetchViews();
    }, [fetchViews]);

    const fetchViewById = useCallback( async (_id: string) => {
            return {} as ViewConfig
        }, [])

    return { views, loading, error, fetchViews, fetchViewById }
}