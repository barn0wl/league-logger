import { ReferenceEntity } from "../../types";
import React, { useState } from "react";

interface AccountListProps {
  accounts: ReferenceEntity[];
  onAddAccount: (accountName: string, accountTag: string) => void;
  // onDeleteAccount will be passed later
}

const AccountList: React.FC<AccountListProps> = ({ accounts, onAddAccount }) => {
  const [accountName, setAccountName] = useState("");
  const [accountTag, setAccountTag] = useState("");

  return (
    <section className="border p-4 rounded mb-6">
      <h3 className="text-xl font-bold mb-2">Linked Accounts</h3>
      <ul className="list-disc list-inside mb-2">
        {accounts.map(acc => (
          <li key={acc.id} className="flex justify-between items-center">
            <span>{acc.name}</span>
            {/* Delete button (functionality to be added later) */}
            <button
              className="ml-2 px-2 py-0.5 text-xs bg-red-500 text-white rounded"
              title="Delete"
              // onClick={() => onDeleteAccount(acc.id)}
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
          value={accountName}
          onChange={e => setAccountName(e.target.value)}
        />
        <input
          type="text"
          placeholder="#tag"
          className="border rounded px-2 py-1 w-24"
          value={accountTag}
          onChange={e => setAccountTag(e.target.value)}
        />
      </div>
      <button
        onClick={() => {
          onAddAccount(accountName, accountTag);
          setAccountName("");
          setAccountTag("");
        }}
        className="px-4 py-2 bg-blue-600 text-white rounded"
        disabled={!accountName || !accountTag}
      >
        Add Account
      </button>
    </section>
  );
};

export default AccountList;