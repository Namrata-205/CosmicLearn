import { useUser } from "@/context/user-context";
import Navbar from "@/components/ui/navbar";
import AiCalendar from "@/components/student/ai-calendar";
import CourseModules from "@/components/student/course-modules";
import RecommendedModules from "@/components/student/recommended-modules";
import PersonalizedRoadmap from "@/components/student/personalized-roadmap";
import AiAssistant from "@/components/student/ai-assistant";
import RevisionSchedule from "@/components/student/revision-schedule";
import { useEffect } from "react";
import { useLocation } from "wouter";

const StudentDashboard = () => {
  const { user } = useUser();
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Redirect to home if not a student
    if (user?.role !== "student") {
      setLocation("/");
    }
  }, [user, setLocation]);

  if (user?.role !== "student") {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar role="student" />
      
      <main className="flex-1 pt-20 pb-6 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold font-montserrat mb-1">Welcome back, <span className="text-nebulaPink">{user.name}</span>!</h2>
            <p className="text-starWhite/70">Continue your cosmic journey through knowledge</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <AiCalendar />
              <CourseModules />
              <RecommendedModules />
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              <PersonalizedRoadmap />
              <AiAssistant />
              <RevisionSchedule />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
