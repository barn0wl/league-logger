import { useCallback, useEffect, useMemo, useState } from "react"
import { ViewConfig } from "../types"
import { useServices } from "../providers/serviceProvider";

export const useViews = () => {
    const {viewService} = useServices();
    const [views, setViews] = useState<ViewConfig[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string|null>(null);

    const fetchViews = useCallback(async (): Promise<void> => {
        setLoading(true);
        setError(null);
    
        try {
          const data = await viewService.fetchViews();
          setViews(data);
        } catch (e: any) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
      }, []);

    useEffect( ()=> {
        fetchViews();
    }, [fetchViews, viewService]);

    // returns the attributes of a view based on its Id
    const fetchViewById = useCallback( async (id: string): Promise<ViewConfig> => {
      return await viewService.fetchViewById(id);
    }, [viewService]);

    // creates a new empty view entry
    const createView = useCallback( async (): Promise<void> => {
        await viewService.createView();
        await fetchViews();
    }, [viewService, fetchViews]);

    //deletes a view
    const deleteView = useCallback( async (id: string): Promise<void> => {
        await viewService.deleteView(id);
        await fetchViews();
    }, [viewService, fetchViews]);

    // duplicates a view
    const duplicateView = useCallback( async (id: string): Promise<void> => {
        await viewService.duplicateView(id);
        await fetchViews();
    }, [viewService, fetchViews]);

    // edits the name of a view
    const editViewName = useCallback( async (id: string, name: string)
    : Promise<void> => {
        await viewService.editViewName(id, name);
        await fetchViews();
    }, [viewService, fetchViews]);
    
    const memoizedViews = useMemo(()=>({
      views, loading, error, fetchViews, fetchViewById, createView,
      deleteView, duplicateView, editViewName
    }), [
      views, loading, error, fetchViews, fetchViewById, createView,
      deleteView, duplicateView, editViewName
    ]);

    return memoizedViews;
}