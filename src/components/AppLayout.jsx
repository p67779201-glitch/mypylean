import React from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import {
  Home,
  Map,
  Terminal,
  TrendingUp,
  Flame,
  Zap,
  LayoutDashboard,
  ListChecks,
  ChevronDown,
  Library,
  Layers,
  Award,
  BarChart3,
  CalendarDays,
  NotebookPen,
  BookOpen,
  UserRound,
  Settings as SettingsIcon,
  CircleHelp,
  MoreHorizontal,
  Bell,
  CalendarCheck,
  Search,
  RotateCcw,
  Route,
  MessageSquare,
  Code2,
  BookMarked,
  Target,
  SpellCheck,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useProgress } from '@/lib/progress';
import PyroMascot from '@/components/PyroMascot';
import { cn } from '@/lib/utils';

const PRIMARY = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/learn', label: 'Learn', icon: Map },
  { to: '/quiz', label: 'Quiz', icon: ListChecks },
  { to: '/progress', label: 'Progress', icon: TrendingUp },
];

const MORE = [
  { to: '/courses', label: 'Course catalog', icon: Library },
  { to: '/modules', label: 'Module overview', icon: Layers },
  { to: '/playground', label: 'Playground', icon: Terminal },
  { to: '/achievements', label: 'Achievements', icon: Award },
  { to: '/reports', label: 'Weekly report', icon: BarChart3 },
  { to: '/schedule', label: 'Study schedule', icon: CalendarDays },
  { to: '/notes', label: 'Notes repository', icon: NotebookPen },
  { to: '/resources', label: 'Resource library', icon: BookOpen },
  { to: '/profile', label: 'Profile', icon: UserRound },
  { to: '/settings', label: 'Settings', icon: SettingsIcon },
  { to: '/help', label: 'Help center', icon: CircleHelp },
  { to: '/study-preferences', label: 'Study preferences', icon: Bell },
  { to: '/calendar-sync', label: 'Calendar sync', icon: CalendarCheck },
  { to: '/lesson-library', label: 'Lesson library', icon: Search },
  { to: '/study-roadmap', label: 'Study roadmap', icon: Route },
  { to: '/study-statistics', label: 'Statistics', icon: BarChart3 },
  { to: '/streak-history', label: 'Streak history', icon: Flame },
  { to: '/learning-path', label: 'Learning path', icon: Target },
  { to: '/saved-snippets', label: 'Saved snippets', icon: Code2 },
  { to: '/learning-resources', label: 'Learning resources', icon: BookMarked },
  { to: '/glossary', label: 'Glossary', icon: SpellCheck },
  { to: '/community-forum', label: 'Community forum', icon: MessageSquare },
  { to: '/user-profile', label: 'User profile', icon: UserRound },
  { to: '/reset-progress', label: 'Reset progress', icon: RotateCcw },
];

const MOBILE = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/learn', label: 'Learn', icon: Map },
  { to: '/quiz', label: 'Quiz', icon: ListChecks },
  { to: '/dashboard', label: 'Dash', icon: LayoutDashboard },
];

export default function AppLayout() {
  const { progress, level } = useProgress();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 md:px-6">
          <Link to="/" className="flex shrink-0 items-center gap-2.5">
            <PyroMascot size={32} />
            <span className="font-heading text-lg font-bold tracking-tight">
              Pyro<span className="text-gradient">Learn</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {PRIMARY.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  cn(
                    'rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                    isActive ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground'
                  )
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-xs font-medium sm:flex">
              <Flame size={13} className="text-neon-gold" />
              {progress.streak || 0} day{progress.streak === 1 ? '' : 's'}
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-neon-green/30 bg-neon-green/10 px-3 py-1.5 text-xs font-semibold text-neon-green">
              <Zap size={13} />
              Lv {level}
            </span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="hidden items-center gap-1 rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground sm:flex"
                >
                  More <ChevronDown size={13} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="max-h-[70vh] w-60 overflow-y-auto">
                <DropdownMenuLabel className="text-[11px] uppercase tracking-widest text-muted-foreground">Explore</DropdownMenuLabel>
                {MORE.map(({ to, label, icon: Icon }) => (
                  <DropdownMenuItem key={to} asChild>
                    <Link to={to} className="flex cursor-pointer items-center gap-2 text-sm">
                      <Icon size={14} className="text-muted-foreground" /> {label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex cursor-pointer items-center gap-2 text-sm">
                    <SettingsIcon size={14} className="text-muted-foreground" /> Preferences
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-28 pt-8 md:px-6 md:pb-16">
        <Outlet />
      </main>

      <footer className="border-t border-border/60 px-4 py-6 text-center text-xs text-muted-foreground md:pb-6">
        PyroLearn · free lessons, no ads, no locks · progress saved on this device
      </footer>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/90 backdrop-blur-xl md:hidden">
        <div className="grid grid-cols-5">
          {MOBILE.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors',
                  isActive ? 'text-neon-green' : 'text-muted-foreground'
                )
              }
            >
              <Icon size={19} />
              {label}
            </NavLink>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button type="button" className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium text-muted-foreground">
                <MoreHorizontal size={19} />
                More
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="top" className="mb-2 max-h-[70vh] w-56 overflow-y-auto">
              {MORE.map(({ to, label, icon: Icon }) => (
                <DropdownMenuItem key={to} asChild>
                  <Link to={to} className="flex cursor-pointer items-center gap-2 text-sm">
                    <Icon size={14} className="text-muted-foreground" /> {label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </div>
  );
}