import { useCallback, useEffect, useMemo, useState } from "react"
import { CreateAccount, ReferenceEntity } from "../types";

export const useAccounts = () => {

    const [accounts, setAccounts] = useState<ReferenceEntity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string|null>(null);

    /** Fetches accounts from the database
    */
    const fetchAccounts = useCallback(async (): Promise<void> => {
        setLoading(true);
        setError(null);
    
        try {
          // await service
          setAccounts([]);
        } catch (e: any) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
      }, []);

    useEffect( ()=> {
        fetchAccounts();
    }, [fetchAccounts])

    // creates a new empty build entry
    const addAccount = useCallback( async(_body: CreateAccount): Promise<void> => {
        throw new Error('no implementaton');
    }, []);

    // creates a new empty build entry
    const removeAccount = useCallback( async(_id: string): Promise<void> => {
        throw new Error('no implementaton');
    }, []);

    const memoizedAccounts = useMemo(()=>({
        accounts, loading, error, fetchAccounts,
        addAccount, removeAccount
    }), [
        accounts, loading, error, fetchAccounts,
        addAccount, removeAccount
    ])

    return memoizedAccounts;
}