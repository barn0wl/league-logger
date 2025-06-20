import React from 'react';
import { ViewKey } from '../../types';

interface NavBarProps {
  current: ViewKey;
  onChange: (view: ViewKey) => void;
}

export const NavBar: React.FC<NavBarProps> = ({ current, onChange }) => {
  const links: { key: ViewKey; label: string }[] = [
    { key: 'views', label: 'Views List' },
    { key: 'games', label: 'Games' },
    { key: 'builds', label: 'Builds' },
  ];

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex space-x-4 h-16 items-center">
          {links.map(link => (
            <button
              key={link.key}
              onClick={() => onChange(link.key)}
              className={`px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
                current === link.key
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;