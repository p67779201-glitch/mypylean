import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import { ProgressProvider } from '@/lib/progress';
import { StudyProvider } from '@/lib/study';
import AppLayout from '@/components/AppLayout';
// Add page imports here
import Home from '@/pages/Home';
import Learn from '@/pages/Learn';
import Lesson from '@/pages/Lesson';
import Playground from '@/pages/Playground';
import Progress from '@/pages/Progress';
import Dashboard from '@/pages/Dashboard';
import Courses from '@/pages/Courses';
import Modules from '@/pages/Modules';
import Quiz from '@/pages/Quiz';
import Achievements from '@/pages/Achievements';
import Reports from '@/pages/Reports';
import Schedule from '@/pages/Schedule';
import Notes from '@/pages/Notes';
import Resources from '@/pages/Resources';
import Profile from '@/pages/Profile';
import Settings from '@/pages/Settings';
import Help from '@/pages/Help';
import StudyPreferences from '@/pages/StudyPreferences';
import CalendarSync from '@/pages/CalendarSync';
import LessonLibrary from '@/pages/LessonLibrary';
import ResetProgress from '@/pages/ResetProgress';
import StudyRoadmap from '@/pages/StudyRoadmap';
import StudyStatistics from '@/pages/StudyStatistics';
import UserProfile from '@/pages/UserProfile';
import CommunityForum from '@/pages/CommunityForum';
import SavedSnippets from '@/pages/SavedSnippets';
import LearningResources from '@/pages/LearningResources';
import Glossary from '@/pages/Glossary';
import LearningPath from '@/pages/LearningPath';
import StreakHistory from '@/pages/StreakHistory';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/lesson/:topicId" element={<Lesson />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/modules" element={<Modules />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />
        <Route path="/study-preferences" element={<StudyPreferences />} />
        <Route path="/calendar-sync" element={<CalendarSync />} />
        <Route path="/lesson-library" element={<LessonLibrary />} />
        <Route path="/reset-progress" element={<ResetProgress />} />
        <Route path="/study-roadmap" element={<StudyRoadmap />} />
        <Route path="/study-statistics" element={<StudyStatistics />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/community-forum" element={<CommunityForum />} />
        <Route path="/saved-snippets" element={<SavedSnippets />} />
        <Route path="/learning-resources" element={<LearningResources />} />
        <Route path="/glossary" element={<Glossary />} />
        <Route path="/learning-path" element={<LearningPath />} />
        <Route path="/streak-history" element={<StreakHistory />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <ProgressProvider>
          <StudyProvider>
            <Router>
              <ScrollToTop />
              <AuthenticatedApp />
            </Router>
          </StudyProvider>
        </ProgressProvider>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App