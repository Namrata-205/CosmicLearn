import { useUser } from "@/context/user-context";
import Navbar from "@/components/ui/navbar";
import PapersToReview from "@/components/teacher/papers-to-review";
import StudentPerformance from "@/components/teacher/student-performance";
import StudentAttention from "@/components/teacher/student-attention";
import DocumentManagement from "@/components/teacher/document-management";
import ParticipationSuggestions from "@/components/teacher/participation-suggestions";
import { useEffect } from "react";
import { useLocation } from "wouter";

const TeacherDashboard = () => {
  const { user } = useUser();
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Redirect to home if not a teacher
    if (user?.role !== "teacher") {
      setLocation("/");
    }
  }, [user, setLocation]);

  if (user?.role !== "teacher") {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar role="teacher" />
      
      <main className="flex-1 pt-20 pb-6 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold font-montserrat mb-1">Welcome, <span className="text-nebulaPink">{user.name}</span>!</h2>
            <p className="text-starWhite/70">Guide your students through their educational journey</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <PapersToReview />
              <StudentPerformance />
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              <StudentAttention />
              <DocumentManagement />
              <ParticipationSuggestions />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;
