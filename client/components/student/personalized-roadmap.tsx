import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Route, CheckCircle, Clock, LockIcon, Bot } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface RoadmapModule {
  id: number;
  title: string;
  status: "completed" | "current" | "locked";
  completionDate?: string;
  progress?: number;
}

const PersonalizedRoadmap = () => {
  const [modules, setModules] = useState<RoadmapModule[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRoadmap = async () => {
      setIsLoading(true);
      // In a real app, fetch data from API
      try {
        // Simulate API call
        setTimeout(() => {
          const roadmapData: RoadmapModule[] = [
            {
              id: 1,
              title: "Basic Quantum Mechanics",
              status: "completed",
              completionDate: "Sept 28"
            },
            {
              id: 2,
              title: "Wave Functions",
              status: "completed",
              completionDate: "Oct 5"
            },
            {
              id: 3,
              title: "Quantum Entanglement",
              status: "current",
              progress: 65
            },
            {
              id: 4,
              title: "Quantum Computing Basics",
              status: "locked"
            },
            {
              id: 5,
              title: "Advanced Quantum Theories",
              status: "locked"
            }
          ];
          
          setModules(roadmapData);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Failed to load roadmap data:", error);
        setIsLoading(false);
      }
    };
    
    loadRoadmap();
  }, []);

  return (
    <motion.div 
      className="rounded-2xl p-6 relative bg-gradient-to-br from-cosmicPurple/20 to-nebulaPink/20 backdrop-blur-md border border-white/10 planet-bg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-nebulaPink/30 blur-3xl z-0"></div>
      
      <div className="absolute top-4 right-4 bg-cosmicPurple/10 text-cosmicPurple text-xs rounded-full px-3 py-1 flex items-center z-10">
        <Bot className="w-3 h-3 mr-1" /> AI Personalized
      </div>
      
      <h3 className="text-xl font-bold font-montserrat mb-4 flex items-center relative z-10">
        <Route className="mr-2 text-cosmicPurple" /> Learning Roadmap
      </h3>
      
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-16 bg-white/5" />
          ))}
        </div>
      ) : (
        <div className="space-y-4 relative progress-constellation">
          {modules.map((module, index) => (
            <div key={module.id} className="flex items-center gap-3 relative">
              <div className={`w-10 h-10 rounded-full ${
                module.status === "completed" 
                  ? "bg-cosmicPurple" 
                  : module.status === "current" 
                    ? "bg-cosmicPurple/90 border-2 border-dashed border-cosmicPurple animate-pulse" 
                    : "bg-white/10"
              } flex items-center justify-center shrink-0 z-10`}>
                {module.status === "completed" ? (
                  <CheckCircle className="text-lg" />
                ) : module.status === "current" ? (
                  <Clock className="text-lg" />
                ) : (
                  <LockIcon className="text-lg" />
                )}
              </div>
              
              <div className={`w-full ${
                module.status === "current" 
                  ? "bg-spaceBlack/50 border border-cosmicPurple/30" 
                  : "bg-spaceBlack/50"
              } p-3 rounded-lg ${
                module.status === "locked" ? "opacity-70" : ""
              }`}>
                <h4 className="font-medium">{module.title}</h4>
                {module.status === "completed" && (
                  <p className="text-sm text-starWhite/70">Completed on {module.completionDate}</p>
                )}
                {module.status === "current" && (
                  <p className="text-sm text-starWhite/70">Current focus • {module.progress}% complete</p>
                )}
                {module.status === "locked" && (
                  <p className="text-sm text-starWhite/70">{
                    index === modules.length - 1 
                      ? "Final module" 
                      : "Unlocks after current module"
                  }</p>
                )}
              </div>
              
              {index < modules.length - 1 && (
                <div className="absolute left-5 h-full w-0.5 bg-gradient-to-b from-cosmicPurple to-cosmicPurple/10 top-10 bottom-0 z-0"></div>
              )}
            </div>
          ))}
        </div>
      )}
      
      <style>{`
        .planet-bg::before {
          content: "";
          position: absolute;
          top: -100px;
          right: -100px;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle at center, rgba(255, 102, 196, 0.4), transparent 70%);
          z-index: -1;
          animation: float 8s ease-in-out infinite;
        }
        
        .progress-constellation::after {
          content: "";
          position: absolute;
          top: -20px;
          left: -20px;
          width: 120%;
          height: 120%;
          background-image: radial-gradient(rgba(255, 215, 0, 0.5) 1px, transparent 1px);
          background-size: 20px 20px;
          z-index: -1;
          opacity: 0.3;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </motion.div>
  );
};

export default PersonalizedRoadmap;
