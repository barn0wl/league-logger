import { useCallback, useMemo } from "react"
import { BuildEntry, UpdateBuildEntry } from "../types"


export const useBuilds = () => {

    //fetches data from all build entries saved in the db
    const getBuildEntries = useCallback( async (): Promise<BuildEntry[]> => {
        throw new Error('no implementaton');
    }, []);

    // fetches data from build entries based on specific Ids
    const getBuildEntriesById = useCallback( async (_ids: string[]): Promise<BuildEntry[]> => {
        throw new Error('no implementaton');
    }, []);

    // creates a new empty build entry
    const addBuildEntry = useCallback( async (): Promise<void> => {
        throw new Error('no implementaton');
    }, []);

    //deletes an entry
    const deleteBuildEntry = useCallback( async (_id: string): Promise<void> => {
        throw new Error('no implementaton');
    }, []);

    // duplicates an entry
    const duplicateBuildEntry = useCallback( async (_id: string): Promise<void> => {
        throw new Error('no implementaton');
    }, []);

    // updates an entry
    const updateBuildEntry = useCallback( async (_id: string, _body: UpdateBuildEntry)
    : Promise<void> => {
        throw new Error('no implementaton');
    }, []);

    const memoizedBuilds = useMemo(()=>({
        getBuildEntries, getBuildEntriesById, deleteBuildEntry,
        duplicateBuildEntry, updateBuildEntry, addBuildEntry
    }), [
        getBuildEntries, getBuildEntriesById, deleteBuildEntry,
        duplicateBuildEntry, updateBuildEntry, addBuildEntry
    ])

    return memoizedBuilds
}