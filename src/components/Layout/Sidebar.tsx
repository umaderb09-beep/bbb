import React from 'react';
import { Home, Trophy, Users, BarChart3, Settings, Database, Calendar, Newspaper, Package, Layers } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  currentView: string;
  onViewChange: (view: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  roles: string[];
  requiresAuth?: boolean;
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <Home size={20} />, roles: ['user', 'technical_officer', 'admin', 'developer'] },
  { id: 'tournaments', label: 'Tournaments', icon: <Trophy size={20} />, roles: ['user', 'technical_officer', 'admin', 'developer'] },
  { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} />, roles: ['user', 'technical_officer', 'admin', 'developer'] },
  { id: 'inventory', label: 'My Inventory', icon: <Package size={20} />, roles: ['user', 'technical_officer', 'admin', 'developer'] },
  { id: 'deck-builder', label: 'Deck Builder', icon: <Layers size={20} />, roles: ['user', 'technical_officer', 'admin', 'developer'] },
  { id: 'match-tracker', label: 'Match Tracker', icon: <Calendar size={20} />, roles: ['technical_officer', 'admin', 'developer'] },
  { id: 'tournament-manager', label: 'Tournament Manager', icon: <Settings size={20} />, roles: ['admin', 'developer'] },
  { id: 'user-management', label: 'User Management', icon: <Users size={20} />, roles: ['admin', 'developer'] },
  { id: 'database', label: 'Database', icon: <Database size={20} />, roles: ['developer'] },
];

export function Sidebar({ isOpen, currentView, onViewChange }: SidebarProps) {
  const { user } = useAuth();

  const filteredMenuItems = menuItems.filter(item => 
    // For guest users (no user), only show items that don't require auth and are for 'user' role
    !user ? (!item.requiresAuth && item.roles.includes('user')) :
    // For authenticated users, show items based on their role
    item.roles.includes(user.role || 'user')
  );

  return (
    <aside className={`fixed left-0 top-0 h-full w-64 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-r border-gray-200 dark:border-gray-700 shadow-2xl transform transition-all duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <div className="h-full px-4 py-6 overflow-y-auto">
        <div className="mb-8">
          <div className="flex items-center space-x-3 px-2">
            <div className="w-8 h-8 bg-gradient-to-br from-sport-600 to-battle-600 rounded-lg flex items-center justify-center font-orbitron font-bold text-sm text-white shadow-glow animate-float">
              B
            </div>
            <div>
              <h2 className="font-orbitron font-bold text-sm">
                <span className="bg-gradient-to-r from-sport-600 to-battle-500 bg-clip-text text-transparent">
                  OBC Portal
                </span>
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-rajdhani font-medium">Community</p>
            </div>
          </div>
        </div>
        
        <ul className="space-y-2">
          {filteredMenuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onViewChange(item.id)}
                className={currentView === item.id 
                  ? 'sidebar-item-active w-full' 
                  : 'sidebar-item w-full'
                }
              >
                <div className="transition-colors">
                  {item.icon}
                </div>
                <span className="ml-3 font-rajdhani font-semibold">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
        
        <div className="mt-8 px-2">
          <div className="bg-gradient-to-br from-sport-50 to-energy-50 dark:from-sport-900/20 dark:to-energy-900/20 rounded-lg p-4 border border-sport-200 dark:border-sport-800 shadow-lg">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-gradient-to-br from-energy-400 to-energy-500 rounded flex items-center justify-center shadow-lg animate-pulse-glow">
                <span className="text-xs text-white font-orbitron font-bold">⚡</span>
              </div>
              <h3 className="font-orbitron font-bold text-sm text-sport-900 dark:text-sport-100">Tournament Ready</h3>
            </div>
            <p className="text-xs text-sport-700 dark:text-sport-300 font-rajdhani font-medium">
              Advanced tournament management and analytics platform
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}