import React, { useState } from 'react';
import { Menu, X, User, LogOut, Settings, LogIn, Moon, Sun } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { LoginForm } from '../Auth/LoginForm';

interface HeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export function Header({ onMenuToggle, isMenuOpen }: HeaderProps) {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-500';
      case 'technical_officer': return 'bg-blue-500';
      case 'developer': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <>
      <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={onMenuToggle}
                className="lg:hidden p-2 rounded-lg hover:bg-sport-50 dark:hover:bg-sport-900/20 transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-sport-600 dark:hover:text-sport-400"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-sport-600 to-battle-600 rounded-lg flex items-center justify-center font-orbitron font-bold text-lg text-white shadow-glow animate-float">
                  B
                </div>
                <div>
                  <h1 className="text-xl font-orbitron font-bold">
                    <span className="bg-gradient-to-r from-sport-600 to-battle-500 bg-clip-text text-transparent">
                      OBC Portal
                    </span>
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-rajdhani font-medium">Beyblade Community</p>
                </div>
              </div>
            </div>

            {user && (
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg hover:bg-sport-50 dark:hover:bg-sport-900/20 transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-sport-600 dark:hover:text-sport-400 transform hover:scale-110"
                  title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-sport-50 dark:hover:bg-sport-900/20 transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-sport-600 to-battle-600 rounded-full flex items-center justify-center font-orbitron font-bold text-sm text-white shadow-glow">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="font-rajdhani font-bold text-gray-900 dark:text-white">{user.username}</p>
                      <p className="text-xs font-rajdhani font-semibold capitalize text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                        {user.role.replace('_', ' ')}
                      </p>
                    </div>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl z-50 backdrop-blur-xl">
                      <div className="py-1">
                        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                          <p className="font-rajdhani font-bold text-gray-900 dark:text-white">{user.username}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 capitalize font-rajdhani font-semibold uppercase tracking-wide">{user.role.replace('_', ' ')}</p>
                        </div>
                        <button className="w-full text-left px-4 py-3 hover:bg-sport-50 dark:hover:bg-sport-900/20 flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-sport-600 dark:hover:text-sport-400 transition-all duration-300">
                          <Settings size={16} />
                          <span className="font-rajdhani font-semibold">Settings</span>
                        </button>
                        <button
                          onClick={logout}
                          className="w-full text-left px-4 py-3 hover:bg-battle-50 dark:hover:bg-battle-900/20 flex items-center space-x-2 text-battle-600 dark:text-battle-400 hover:text-battle-700 dark:hover:text-battle-300 transition-all duration-300"
                        >
                          <LogOut size={16} />
                          <span className="font-rajdhani font-semibold">Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {!user && (
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg hover:bg-sport-50 dark:hover:bg-sport-900/20 transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-sport-600 dark:hover:text-sport-400 transform hover:scale-110"
                  title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="bg-gradient-to-r from-sport-600 to-battle-600 hover:from-sport-700 hover:to-battle-700 text-white font-rajdhani font-bold px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-glow flex items-center space-x-2"
                >
                  <LogIn size={20} />
                  <span className="hidden sm:block font-rajdhani font-bold">Login</span>
                </button>
              </div>
            )}
          </div>
        </div>
        
        {showUserMenu && (
          <div 
            className="fixed inset-0 z-30" 
            onClick={() => {
              setShowUserMenu(false);
            }}
          />
        )}

        {/* Login Modal */}
        {showLoginModal && (
          <>
            {/* Modal Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              style={{ zIndex: 999999 }}
              onClick={() => setShowLoginModal(false)}
            />
            
            {/* Modal Content */}
            <div 
              className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none"
              style={{ zIndex: 1000000 }}
            >
              <div className="relative pointer-events-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl max-w-md w-full shadow-2xl">
                <LoginForm onLoginSuccess={() => setShowLoginModal(false)} />
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-battle-500 to-battle-600 hover:from-battle-600 hover:to-battle-700 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 transform hover:scale-110 z-10"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
}