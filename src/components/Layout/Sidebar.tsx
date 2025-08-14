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
    <aside className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className="h-full px-4 py-6 overflow-y-auto">
        <div className="mb-8">
          <div className="flex items-center space-x-3 px-2">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center font-space-grotesk font-bold text-sm text-white">
              B
            </div>
            <div>
              <h2 className="font-space-grotesk font-bold text-sm text-gray-900">
                OBC Portal
              </h2>
              <p className="text-xs text-gray-500 font-inter">Community</p>
            </div>
          </div>
        </div>
        
        <ul className="space-y-2">
          {filteredMenuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onViewChange(item.id)}
                className={currentView === item.id ? 'sidebar-item-active' : 'sidebar-item'}
              >
                <div className="transition-colors">
                  {item.icon}
                </div>
                <span className="ml-3 font-inter">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
        
        <div className="mt-8 px-2">
          <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-gray-900 rounded flex items-center justify-center">
                <span className="text-xs text-white">⚡</span>
              </div>
              <h3 className="font-space-grotesk font-semibold text-sm text-gray-900">Tournament Ready</h3>
            </div>
            <p className="text-xs text-gray-600 font-inter">
              Advanced tournament management and analytics platform
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}