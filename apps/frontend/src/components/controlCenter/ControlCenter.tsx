import React from "react";
import AccountList from "./AccountList";
import GameFetchSection from "./GameFetchSection";
import StaticDataSection from "./StaticDataSection";

export const ControlCenter: React.FC = () => {

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Control Center</h1>
      <StaticDataSection/>
      <GameFetchSection/>
      <AccountList/>
    </div>
  );
};

export default ControlCenter;