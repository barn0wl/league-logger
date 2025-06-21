import React, { useState } from "react";
import NavBar from "../components/navigation/NavBar";
import { ViewKey } from "../types";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ControlCenter from "../components/controlCenter/ControlCenter";

const MainLayout: React.FC = () => {
    
    const [showControl, setShowControl] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className="flex flex-col min-h-screen">
            <header className="flex items-center justify-between px-4 py-2 bg-white shadow">
                league-logger
                <NavBar
                    current={location.pathname as ViewKey}
                    onChange={viewKey => {
                    // Use navigate to change route
                    if (viewKey === 'views') navigate('/views');
                    else if (viewKey === 'games') navigate('/games');
                    else if (viewKey === 'builds') navigate('/builds');
                    }}
                />
                <button
                    onClick={() => setShowControl(v => !v)}
                    className="ml-auto px-3 py-1 bg-blue-600 text-white rounded"
                >
                    Control Center
                </button>

                {/* Drawer / Modal for Control Center */}
                {showControl && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex"
                    onClick={() => setShowControl(false)}
                >
                    <div
                    className="ml-auto w-80 bg-white h-full p-6 shadow-lg"
                    onClick={e => e.stopPropagation()}
                    >
                    <ControlCenter/>
                    </div>
                </div>
                )}
            </header>
            <Outlet/>
        </div>
    )
};

export default MainLayout;