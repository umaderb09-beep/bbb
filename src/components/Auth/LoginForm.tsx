import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { SignupForm } from './SignupForm';

interface LoginFormProps {
  onLoginSuccess?: () => void;
}

export function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentView, setCurrentView] = useState<'login' | 'signup'>('login');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const success = await login(username, password);
    if (success) {
      // Login successful - close modal and reset form
      setUsername('');
      setPassword('');
      setError('');
      onLoginSuccess?.();
    } else {
      setError('Invalid username or password. Please check your credentials and try again.');
    }
    setLoading(false);
  };

  if (currentView === 'signup') {
    return <SignupForm onBackToLogin={() => setCurrentView('login')} onSignupSuccess={onLoginSuccess} />;
  }

  return (
    <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-sport-600 to-sport-700 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-glow animate-float">
          <span className="text-white text-3xl font-orbitron font-bold">B</span>
        </div>
        <h2 className="text-3xl font-orbitron font-bold mb-2">
          <span className="bg-gradient-to-r from-sport-600 to-battle-500 bg-clip-text text-transparent">
            OBC Portal
          </span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2 font-rajdhani font-medium">Sign in to access your account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="form-label text-gray-700 dark:text-gray-300">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="form-label text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field w-full"
            required
          />
        </div>

        {error && (
          <div className="bg-battle-50 dark:bg-battle-900/30 border border-battle-200 dark:border-battle-700 rounded-lg p-3">
            <div className="text-battle-700 dark:text-battle-400 text-sm font-rajdhani font-semibold">{error}</div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="primary-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="font-rajdhani font-bold">
            {loading ? 'Signing in...' : 'Sign In'}
          </span>
        </button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-rajdhani font-semibold">Or</span>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={() => setCurrentView('signup')}
            className="secondary-button w-full justify-center"
          >
            <span className="font-rajdhani font-bold">Create New Account</span>
          </button>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400 font-rajdhani">
          Create an account to participate in tournaments and access all features.
        </p>
      </div>

    </div>
  );
}