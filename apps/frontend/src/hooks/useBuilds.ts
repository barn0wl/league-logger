import { useCallback, useEffect, useMemo, useState } from "react"
import { BuildEntry, UpdateBuildEntry } from "../types"
import { useServices } from "../providers/serviceProvider";


export const useBuilds = () => {
    const {buildService} = useServices();
    const [buildEntries, setBuildEntries] = useState<BuildEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string|null>(null);

    //fetches data from all build entries saved in the db
    const fetchBuildEntries = useCallback(async (): Promise<void> => {
        setLoading(true);
        setError(null);
    
        try {
          const data = await buildService.getBuildEntries();
          setBuildEntries(data);
        } catch (e: any) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
      }, []);

    // fetches data from build entries based on specific Ids
    const getBuildEntriesById = useCallback( async (ids: string[]): Promise<BuildEntry[]> => {
        return await buildService.getBuildEntriesById(ids);
    }, [buildService]);

    // creates a new empty build entry
    const addBuildEntry = useCallback( async (): Promise<void> => {
        await buildService.addBuildEntry();
        await fetchBuildEntries();
    }, [buildService, fetchBuildEntries]);

    //deletes an entry
    const deleteBuildEntry = useCallback( async (id: string): Promise<void> => {
        await buildService.deleteBuildEntry(id);
        await fetchBuildEntries();
    }, [buildService, fetchBuildEntries]);

    // duplicates an entry
    const duplicateBuildEntry = useCallback( async (id: string): Promise<void> => {
        await buildService.duplicateBuildEntry(id);
        await fetchBuildEntries();
    }, [buildService, fetchBuildEntries]);

    // updates an entry
    const updateBuildEntry = useCallback( async (id: string, body: UpdateBuildEntry)
    : Promise<void> => {
        await buildService.updateBuildEntry(id, body);
        await fetchBuildEntries();
    }, [buildService, fetchBuildEntries]);

    useEffect(()=>{
        fetchBuildEntries();
    }, [fetchBuildEntries, buildService]);

    const memoizedBuilds = useMemo(()=>({
        buildEntries, loading, error,
        fetchBuildEntries, getBuildEntriesById, deleteBuildEntry,
        duplicateBuildEntry, updateBuildEntry, addBuildEntry
    }), [
        buildEntries, loading, error,
        fetchBuildEntries, getBuildEntriesById, deleteBuildEntry,
        duplicateBuildEntry, updateBuildEntry, addBuildEntry
    ])

    return memoizedBuilds;
}