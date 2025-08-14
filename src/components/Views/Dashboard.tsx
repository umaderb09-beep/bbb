import React from 'react';
import { Trophy, Users, Calendar, TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

export function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = React.useState({
    totalTournaments: 0,
    activePlayers: 0,
    upcomingEvents: 0,
    completedMatches: 0
  });
  const [upcomingTournaments, setUpcomingTournaments] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [tournamentsRes, usersRes, matchesRes] = await Promise.all([
          supabase.from('tournaments').select('*'),
          supabase.from('profiles').select('*', { count: 'exact', head: true }),
          supabase.from('match_results').select('*', { count: 'exact', head: true })
        ]);

        const tournaments = tournamentsRes.data || [];
        const upcoming = tournaments.filter(t => t.status === 'upcoming').slice(0, 3);
        
        setUpcomingTournaments(upcoming);
        setStats({
          totalTournaments: tournaments.length,
          activePlayers: usersRes.count || 0,
          upcomingEvents: tournaments.filter(t => t.status === 'upcoming').length,
          completedMatches: matchesRes.count || 0
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statsDisplay = [
    { icon: Trophy, label: 'Total Tournaments', value: stats.totalTournaments, color: 'text-sport-600', bgColor: 'bg-sport-50 dark:bg-sport-900/20' },
    { icon: Users, label: 'Community Players', value: stats.activePlayers, color: 'text-green-600', bgColor: 'bg-green-50 dark:bg-green-900/20' },
    { icon: Calendar, label: 'Upcoming Events', value: stats.upcomingEvents, color: 'text-energy-600', bgColor: 'bg-energy-50 dark:bg-energy-900/20' },
    { icon: TrendingUp, label: 'Completed Matches', value: stats.completedMatches, color: 'text-battle-600', bgColor: 'bg-battle-50 dark:bg-battle-900/20' },
  ];

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sport-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 font-rajdhani">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-sport-50/30 to-gray-50 dark:from-gray-900 dark:via-sport-900/10 dark:to-gray-900 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-orbitron font-bold mb-2 animate-fade-in">
            <span className="bg-gradient-to-r from-sport-600 via-battle-500 to-energy-500 bg-clip-text text-transparent">
            Welcome{user ? ` back, ${user.username}` : ' to OBC Portal'}
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg font-rajdhani font-medium">
            {user 
              ? 'Check out upcoming tournaments and manage your Beyblade collection' 
              : 'Explore tournaments and Beyblade data. Login to access personal features like inventory and deck building'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsDisplay.map((stat, index) => (
            <div key={index} className="beyblade-card p-6 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-rajdhani font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">{stat.label}</p>
                  <p className="text-3xl font-orbitron font-bold text-gray-900 dark:text-white mb-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg shadow-lg animate-float ${stat.bgColor} ${stat.color}`} style={{ animationDelay: `${index * 0.2}s` }}>
                  <stat.icon size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="beyblade-card p-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-xl font-orbitron font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Trophy className="w-6 h-6 mr-3 text-sport-600 animate-bounce-subtle" />
              Upcoming Tournaments
            </h2>
            <div className="space-y-4">
              {upcomingTournaments.map((tournament) => (
                <div key={tournament.id} className="bg-gradient-to-r from-sport-50 to-energy-50 dark:from-sport-900/20 dark:to-energy-900/20 border border-sport-200 dark:border-sport-800 rounded-xl p-6 border-l-4 border-l-sport-500 hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:rotate-1">
                  <h3 className="font-orbitron font-bold text-gray-900 dark:text-white mb-2 text-lg">{tournament.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 font-rajdhani font-medium mb-3">{new Date(tournament.tournament_date).toLocaleDateString()} • {tournament.location}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-500 dark:text-gray-400 font-rajdhani font-semibold">
                      {tournament.current_participants}/{tournament.max_participants} registered
                    </span>
                    <span className="tournament-status-upcoming">
                      {tournament.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="beyblade-card p-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <h2 className="text-xl font-orbitron font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center mr-3 shadow-lg animate-pulse-glow">
                <span className="text-white text-sm">✓</span>
              </div>
              System Status
            </h2>
            <div className="text-center py-8 space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-xl animate-float">
                <span className="text-white text-2xl">✓</span>
              </div>
              <div>
                <p className="text-gray-900 dark:text-white font-orbitron font-bold text-xl">All Systems Operational</p>
                <p className="text-gray-600 dark:text-gray-400 font-rajdhani font-medium mt-3">Connected to Supabase database</p>
              </div>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800 p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <p className="text-3xl font-orbitron font-bold text-green-600 dark:text-green-400 mb-1">99.9%</p>
                  <p className="text-sm font-rajdhani font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Uptime</p>
                </div>
                <div className="bg-sport-50 dark:bg-sport-900/20 rounded-xl border border-sport-200 dark:border-sport-800 p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <p className="text-3xl font-orbitron font-bold text-sport-600 dark:text-sport-400 mb-1"><50ms</p>
                  <p className="text-sm font-rajdhani font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Response</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}