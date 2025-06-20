import { useCallback } from "react"
import { BuildEntry } from "../types"


export const useBuilds = () => {

    //fetches data from all build entries saved in the db
    const getBuildEntries = useCallback( async () => {
        return [] as BuildEntry[]
    }, [])

    // fetches data from build entries based on specific Ids
    const getBuildEntriesById = useCallback( async (_ids: string[]) => {
        return [] as BuildEntry[]
    }, [])

    return { getBuildEntries, getBuildEntriesById }
}