import { useAccounts } from "../../hooks/useAccounts";
import React, { useEffect, useState } from "react";
import { CreateAccount } from "../../types";

const AccountList: React.FC = () => {
  const [accountBody, setAccountBody] = useState<CreateAccount>({ name: "", tag: "" });
  const { accounts, fetchAccounts, addAccount, removeAccount } = useAccounts();

  useEffect(()=>{
    fetchAccounts();
  }, [fetchAccounts])

  return (
    <section className="border p-4 rounded mb-6">
      <h3 className="text-xl font-bold mb-2">Linked Accounts</h3>
      <ul className="list-disc list-inside mb-2">
        {accounts.map(acc => (
          <li key={acc.id} className="flex justify-between items-center">
            <span>{acc.name}</span>
            <button
              className="ml-2 px-2 py-0.5 text-xs bg-red-500 text-white rounded"
              title="Delete"
              onClick={() => removeAccount(acc.id as string)}
              disabled
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          placeholder="Account name"
          className="border rounded px-2 py-1 flex-1"
          value={accountBody.name}
          onChange={e => setAccountBody({ ...accountBody, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="#tag"
          className="border rounded px-2 py-1 w-24"
          value={accountBody.tag}
          onChange={e => setAccountBody({ ...accountBody, tag: e.target.value })}
        />
      </div>
      <button
        onClick={() => {
          addAccount(accountBody);
          setAccountBody({ name: "", tag: "" });
        }}
        className="px-4 py-2 bg-blue-600 text-white rounded"
        disabled={!accountBody.name || !accountBody.tag}
      >
        Add Account
      </button>
    </section>
  );
};

export default AccountList;