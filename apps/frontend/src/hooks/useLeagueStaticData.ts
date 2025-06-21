import { useCallback, useEffect, useMemo, useState } from "react"
import { ReferenceEntity } from "../types";

export const useLeagueStaticData = () => {

    const [currentVersion, _setCurrentVersion] = useState<string|null>(null);
    const [latestVersion, _setLatestVersion] = useState<string>('');
    const [items, _setItems] = useState<ReferenceEntity[]>([]);
    const [keystones, _setKeystones] = useState<ReferenceEntity[]>([]);
    const [shards, _setShards] = useState<ReferenceEntity[]>([]);
    const [runes, _setRunes] = useState<ReferenceEntity[]>([]);
    const [spells, _setSpells] = useState<ReferenceEntity[]>([]);
    const [champions, _setChampions] = useState<ReferenceEntity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string|null>(null);

    // Functions

    const fetchCurrentVersion = useCallback(async (): Promise<string|null> => {
      // fetch current version then setCurrentVersion
      throw new Error('No implementation');
    }, [])

    const fetchLatestVersion = useCallback(async (): Promise<string|null> => {
      // fetch latest ddragon version then setLatestVersion
      throw new Error('No implementation');
    }, [])

    const fetchItems = useCallback(async (): Promise<void> => {
      // fetch items data then setItems
      }, []);

    const fetchKeystones = useCallback(async (): Promise<void> => {
      // fetch Keystones data then setKeystones
      }, []);

    const fetchRunes = useCallback(async (): Promise<void> => {
      // fetch Runes data then setRunes
      }, []);

    const fetchShards = useCallback(async (): Promise<void> => {
      // fetch Shards data then setShards
      }, []);

    const fetchSpells = useCallback(async (): Promise<void> => {
      // fetch Spells data then setSpells
      }, []);

    const fetchChampions = useCallback(async (): Promise<void> => {
      // fetch Champions data then setChampions
      }, []);

    // makes a call to the riot Api to fetch and store all static riot data
    const refreshStaticData = useCallback(async(): Promise<void> => {
      setLoading(true);
      setError(null);
      try {
        await fetchCurrentVersion();
        await fetchLatestVersion();
        await fetchItems();
        await fetchChampions();
        await fetchKeystones();
        await fetchRunes();
        await fetchShards();
        await fetchSpells();
      } catch (error: any) {
        setError(error.message)
      } finally {
        setLoading(false);
      }
    }, [
      fetchCurrentVersion, fetchLatestVersion, fetchItems,
      fetchChampions, fetchKeystones, fetchRunes,
      fetchShards, fetchSpells
    ])

    useEffect( ()=> {
        refreshStaticData();
    }, [refreshStaticData])

    const memoizedStaticData = useMemo(()=>({
      currentVersion, items, keystones, shards,
      runes, spells, champions, loading, error,
      latestVersion, refreshStaticData
    }), [
      currentVersion, items, keystones, shards,
      runes, spells, champions, loading, error,
      latestVersion, refreshStaticData
    ]);

    return memoizedStaticData;
}