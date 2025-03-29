import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, Atom, FlaskConical, Calculator } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Course {
  id: number;
  name: string;
  description: string;
  progress: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const CourseModules = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      setIsLoading(true);
      // In a real app, fetch courses from API
      try {
        // Simulate API call
        setTimeout(() => {
          const courseData: Course[] = [
            {
              id: 1,
              name: "Physics",
              description: "Advanced theoretical concepts and practical applications",
              progress: 78,
              icon: <Atom className="text-lg text-cosmicPurple" />,
              color: "text-cosmicPurple",
              bgColor: "bg-cosmicPurple/20"
            },
            {
              id: 2,
              name: "Chemistry",
              description: "Molecular structures and chemical reactions",
              progress: 45,
              icon: <FlaskConical className="text-lg text-nebulaPink" />,
              color: "text-nebulaPink",
              bgColor: "bg-nebulaPink/20"
            },
            {
              id: 3,
              name: "Mathematics",
              description: "Advanced calculus and theoretical frameworks",
              progress: 62,
              icon: <Calculator className="text-lg text-starYellow" />,
              color: "text-starYellow",
              bgColor: "bg-starYellow/20"
            }
          ];
          
          setCourses(courseData);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Failed to load courses:", error);
        setIsLoading(false);
      }
    };
    
    loadCourses();
  }, []);

  return (
    <motion.div 
      className="rounded-2xl p-6 bg-gradient-to-br from-cosmicPurple/20 to-nebulaPink/20 backdrop-blur-md border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <h3 className="text-xl font-bold font-montserrat mb-6 flex items-center">
        <BookOpen className="mr-2 text-cosmicPurple" /> Your Courses
      </h3>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-40 bg-white/5" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div 
              key={course.id}
              className="bg-spaceBlack/50 rounded-xl p-4 hover:bg-spaceBlack/80 transition-colors cursor-pointer border border-white/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 rounded-full blur-xl -mr-10 -mt-10" style={{ 
                backgroundColor: `rgba(${course.color === 'text-cosmicPurple' 
                  ? '108, 99, 255' 
                  : course.color === 'text-nebulaPink' 
                    ? '255, 102, 196' 
                    : '255, 215, 0'}, 0.2)` 
              }}></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-3">
                  <div className={`w-10 h-10 rounded-lg ${course.bgColor} flex items-center justify-center`}>
                    {course.icon}
                  </div>
                  <span className={`text-xs ${course.bgColor} ${course.color} px-2 py-1 rounded-full`}>
                    {course.progress}% complete
                  </span>
                </div>
                <h4 className="font-bold mb-1">{course.name}</h4>
                <p className="text-sm text-starWhite/70 mb-3">{course.description}</p>
                <div className="w-full bg-white/10 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${course.color.replace('text-', 'bg-')}`} 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default CourseModules;
