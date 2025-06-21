import { useCallback, useEffect, useMemo, useState } from "react";
import { CreateAccount, ReferenceEntity } from "../types";
import { useServices } from "../providers/serviceProvider";

export const useAccounts = () => {

    const {accountService} = useServices();
    const [accounts, setAccounts] = useState<ReferenceEntity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string|null>(null);

    /** Fetches accounts from the database
    */
    const fetchAccounts = useCallback(async (): Promise<void> => {
        setLoading(true);
        setError(null);
    
        try {
          const data = await accountService.fetchAccounts();
          setAccounts(data);
        } catch (e: any) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
      }, []);

    useEffect( ()=> {
        fetchAccounts();
    }, [fetchAccounts, accountService])

    // creates a new empty build entry
    const addAccount = useCallback( async(body: CreateAccount): Promise<void> => {
        await accountService.addAccount(body);
        await fetchAccounts();
    }, [accountService, fetchAccounts]);

    // creates a new empty build entry
    const removeAccount = useCallback( async(id: string): Promise<void> => {
        await accountService.removeAccount(id);
        await fetchAccounts();
    }, [accountService, fetchAccounts]);

    const memoizedAccounts = useMemo(()=>({
        accounts, loading, error, fetchAccounts,
        addAccount, removeAccount
    }), [
        accounts, loading, error, fetchAccounts,
        addAccount, removeAccount
    ])

    return memoizedAccounts;
}