import { useCallback, useEffect, useState } from "react"
import { ReferenceEntity } from "../types";

export const useLeagueStaticData = () => {

    const [items, _setItems] = useState<ReferenceEntity[]>([]);
    const [keystones, _setKeystones] = useState<ReferenceEntity[]>([]);
    const [shards, _setShards] = useState<ReferenceEntity[]>([]);
    const [runes, _setRunes] = useState<ReferenceEntity[]>([]);
    const [spells, _setSpells] = useState<ReferenceEntity[]>([]);
    const [champions, _setChampions] = useState<ReferenceEntity[]>([]);

    const fetchItems = useCallback(async () => {
      }, []);

    useEffect( ()=> {
        fetchItems();
    }, [fetchItems])

    return { items, keystones, shards, runes, spells, champions }
}