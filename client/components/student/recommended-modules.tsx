import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lightbulb, BookOpenText, FlaskConical, Star, Clock, UserPlus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface RecommendedModule {
  id: number;
  title: string;
  description: string;
  duration: string;
  recommendationPercent: number;
  icon: React.ReactNode;
  bgColor: string;
}

const RecommendedModules = () => {
  const [modules, setModules] = useState<RecommendedModule[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadModules = async () => {
      setIsLoading(true);
      // In a real app, fetch data from API
      try {
        // Simulate API call
        setTimeout(() => {
          const moduleData: RecommendedModule[] = [
            {
              id: 1,
              title: "Advanced Quantum Physics",
              description: "Expand your understanding of quantum mechanics",
              duration: "8 weeks",
              recommendationPercent: 98,
              icon: <BookOpenText className="text-xl text-starYellow" />,
              bgColor: "bg-starYellow/20"
            },
            {
              id: 2,
              title: "Organic Chemistry Lab",
              description: "Practical laboratory experiments with organic compounds",
              duration: "6 weeks",
              recommendationPercent: 92,
              icon: <FlaskConical className="text-xl text-nebulaPink" />,
              bgColor: "bg-nebulaPink/20"
            }
          ];
          
          setModules(moduleData);
          setIsLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Failed to load recommended modules:", error);
        setIsLoading(false);
      }
    };
    
    loadModules();
  }, []);

  return (
    <motion.div 
      className="rounded-2xl p-6 bg-gradient-to-br from-cosmicPurple/20 to-nebulaPink/20 backdrop-blur-md border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold font-montserrat flex items-center">
          <Lightbulb className="mr-2 text-starYellow" /> Recommended Modules
        </h3>
        <span className="text-xs bg-starYellow/10 text-starYellow px-3 py-1 rounded-full flex items-center">
          <Star className="w-3 h-3 mr-1" /> Based on top students
        </span>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-28 bg-white/5" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((module) => (
            <div 
              key={module.id}
              className="bg-spaceBlack/50 rounded-xl p-4 border border-white/5 hover:border-starYellow/30 transition-all cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-lg ${module.bgColor} flex items-center justify-center shrink-0`}>
                  {module.icon}
                </div>
                <div>
                  <h4 className="font-bold">{module.title}</h4>
                  <p className="text-sm text-starWhite/70 mb-2">{module.description}</p>
                  <div className="flex items-center text-xs text-starWhite/50">
                    <span className="flex items-center mr-3">
                      <Clock className="w-3 h-3 mr-1" /> {module.duration}
                    </span>
                    <span className="flex items-center">
                      <UserPlus className="w-3 h-3 mr-1" /> {module.recommendationPercent}% recommended
                    </span>
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

export default RecommendedModules;
