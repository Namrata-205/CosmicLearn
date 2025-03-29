import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import WelcomePage from "@/pages/welcome";
import StudentDashboard from "@/pages/student-dashboard";
import TeacherDashboard from "@/pages/teacher-dashboard";
import { UserProvider } from "./context/user-context";
import StarsBackground from "./components/stars-background";

function Router() {
  return (
    <Switch>
      <Route path="/" component={WelcomePage} />
      <Route path="/student" component={StudentDashboard} />
      <Route path="/teacher" component={TeacherDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <div className="min-h-screen bg-spaceBlue overflow-x-hidden relative">
          <StarsBackground />
          <Router />
        </div>
        <Toaster />
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
