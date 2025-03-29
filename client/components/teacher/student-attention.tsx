import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { UserCheck, MessageCircle, CalendarClock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface StudentNeedingAttention {
  id: number;
  name: string;
  initials: string;
  issue: string;
}

const StudentAttention = () => {
  const [students, setStudents] = useState<StudentNeedingAttention[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStudents = async () => {
      setIsLoading(true);
      // In a real app, fetch data from API
      try {
        // Simulate API call
        setTimeout(() => {
          const studentData: StudentNeedingAttention[] = [
            {
              id: 1,
              name: "Marcus Brown",
              initials: "MB",
              issue: "Missed last 3 classes"
            },
            {
              id: 2,
              name: "Sophia Kim",
              initials: "SK",
              issue: "Quiz scores dropping (62% → 45%)"
            }
          ];
          
          setStudents(studentData);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Failed to load students:", error);
        setIsLoading(false);
      }
    };
    
    loadStudents();
  }, []);

  return (
    <motion.div 
      className="rounded-2xl p-6 relative bg-gradient-to-br from-cosmicPurple/20 to-nebulaPink/20 backdrop-blur-md border border-white/10 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-meteor/20 blur-2xl"></div>
      
      <h3 className="text-xl font-bold font-montserrat mb-4 flex items-center relative z-10">
        <UserCheck className="mr-2 text-meteor" /> Students Needing Attention
      </h3>
      
      {isLoading ? (
        <div className="space-y-3 relative z-10">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-28 bg-white/5" />
          ))}
        </div>
      ) : (
        <div className="space-y-3 relative z-10">
          {students.map((student) => (
            <div 
              key={student.id}
              className="bg-spaceBlack/50 rounded-lg p-3 border-l-2 border-meteor"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-meteor/20 flex items-center justify-center shrink-0">
                  <span className="font-medium text-sm">{student.initials}</span>
                </div>
                <div>
                  <h4 className="font-medium">{student.name}</h4>
                  <p className="text-sm text-starWhite/70">{student.issue}</p>
                  <div className="flex mt-2">
                    <button className="text-xs bg-nebulaPink/20 text-nebulaPink px-2 py-1 rounded-lg mr-2 flex items-center">
                      <MessageCircle className="h-3 w-3 mr-1" /> Send Message
                    </button>
                    <button className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded-lg transition-colors flex items-center">
                      <CalendarClock className="h-3 w-3 mr-1" /> Schedule Meeting
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default StudentAttention;
