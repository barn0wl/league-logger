import { useCallback, useEffect, useMemo, useState } from "react"
import { ViewConfig } from "../types"

export const useViews = () => {

    const [views, setViews] = useState<ViewConfig[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string|null>(null);

    const fetchViews = useCallback(async (): Promise<void> => {
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

    // returns the attributes of a view based on its Id
    const fetchViewById = useCallback( async (_id: string): Promise<ViewConfig> => {
      return {} as ViewConfig
    }, []);

    // creates a new empty view entry
    const createView = useCallback( async (): Promise<void> => {
        throw new Error('no implementaton');
    }, []);

    //deletes a view
    const deleteView = useCallback( async (_id: string): Promise<void> => {
        throw new Error('no implementaton');
    }, []);

    // duplicates a view
    const duplicateView = useCallback( async (_id: string): Promise<void> => {
        throw new Error('no implementaton');
    }, []);

    // edits the name of a view
    const editViewName = useCallback( async (_id: string, _name: string)
    : Promise<void> => {
        throw new Error('no implementaton');
    }, []);

    const memoizedViews = useMemo(()=>({
      views, loading, error, fetchViewById, createView,
      deleteView, duplicateView, editViewName
    }), [
      views, loading, error, fetchViewById, createView,
      deleteView, duplicateView, editViewName
    ]);

    return memoizedViews;
}