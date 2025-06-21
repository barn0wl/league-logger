import { useCallback, useEffect, useMemo, useState } from "react"
import { ReferenceEntity } from "../types";
import { useServices } from "../providers/serviceProvider";

export const useLeagueStaticData = () => {
    const {leagueStaticService} = useServices();
    const [currentVersion, setCurrentVersion] = useState<string|null>(null);
    const [latestVersion, setLatestVersion] = useState<string>('');
    const [items, setItems] = useState<ReferenceEntity[]>([]);
    const [keystones, setKeystones] = useState<ReferenceEntity[]>([]);
    const [shards, setShards] = useState<ReferenceEntity[]>([]);
    const [runes, setRunes] = useState<ReferenceEntity[]>([]);
    const [spells, setSpells] = useState<ReferenceEntity[]>([]);
    const [champions, setChampions] = useState<ReferenceEntity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string|null>(null);

    // Functions
    const fetchCurrentVersion = useCallback(async (): Promise<void> => {
      leagueStaticService.fetchCurrentVersion()
      .then(setCurrentVersion);
    }, [leagueStaticService])

    const fetchLatestVersion = useCallback(async (): Promise<void> => {
      leagueStaticService.fetchLatestVersion()
      .then(setLatestVersion);
    }, [leagueStaticService])

    const fetchItems = useCallback(async (): Promise<void> => {
      leagueStaticService.fetchItems()
      .then(setItems);
      }, [leagueStaticService]);

    const fetchKeystones = useCallback(async (): Promise<void> => {
      leagueStaticService.fetchKeystones()
      .then(setKeystones);
      }, [leagueStaticService]);

    const fetchRunes = useCallback(async (): Promise<void> => {
      leagueStaticService.fetchRunes()
      .then(setRunes)
      }, [leagueStaticService]);

    const fetchShards = useCallback(async (): Promise<void> => {
      leagueStaticService.fetchShards()
      .then(setShards);
      }, [leagueStaticService]);

    const fetchSpells = useCallback(async (): Promise<void> => {
      leagueStaticService.fetchSpells()
      .then(setSpells)
      }, [leagueStaticService]);

    const fetchChampions = useCallback(async (): Promise<void> => {
      leagueStaticService.fetchChampions()
      .then(setChampions)
      }, [leagueStaticService]);

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
    }, [refreshStaticData, leagueStaticService])

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