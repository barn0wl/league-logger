import React from "react";
import AccountList from "./AccountList";
import GameFetchSection from "./GameFetchSection";
import StaticDataSection from "./StaticDataSection";
import { ReferenceEntity } from "../../types";

interface ControlCenterProps {
  staticVersion: string | null;
  latestVersion: string;
  onRefreshStatic: () => void;
  staticLoading: boolean;

  onFetchGames: (opts: { lookback: number }) => void;
  fetchLoading: boolean;

  accounts: ReferenceEntity[];
  onAddAccount: () => void;
}

export const ControlCenter: React.FC<ControlCenterProps> = ({
  staticVersion,
  latestVersion,
  onRefreshStatic,
  staticLoading,

  onFetchGames,
  fetchLoading,

  accounts,
  onAddAccount,
}) => {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Control Center</h1>
      <StaticDataSection
        currentVersion={staticVersion}
        latestVersion={latestVersion}
        onRefresh={onRefreshStatic}
        loading={staticLoading}
      />
      <GameFetchSection
        onFetch={onFetchGames}
        loading={fetchLoading}
      />
      <AccountList
        accounts={accounts}
        onAddAccount={onAddAccount}
      />
    </div>
  );
};

export default ControlCenter;