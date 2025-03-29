import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, Bot } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface RevisionItem {
  id: number;
  subject: string;
  topic: string;
  dueDate: string;
  priority: "today" | "tomorrow" | "upcoming";
  color: string;
}

const RevisionSchedule = () => {
  const [revisionItems, setRevisionItems] = useState<RevisionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRevisionSchedule = async () => {
      setIsLoading(true);
      // In a real app, fetch data from API
      try {
        // Simulate API call
        setTimeout(() => {
          const scheduleData: RevisionItem[] = [
            {
              id: 1,
              subject: "Physics",
              topic: "Quantum Mechanics",
              dueDate: "Today",
              priority: "today",
              color: "border-cosmicPurple"
            },
            {
              id: 2,
              subject: "Chemistry",
              topic: "Organic Compounds",
              dueDate: "Tomorrow",
              priority: "tomorrow",
              color: "border-nebulaPink"
            },
            {
              id: 3,
              subject: "Mathematics",
              topic: "Calculus",
              dueDate: "In 3 days",
              priority: "upcoming",
              color: "border-starYellow"
            }
          ];
          
          setRevisionItems(scheduleData);
          setIsLoading(false);
        }, 1200);
      } catch (error) {
        console.error("Failed to load revision schedule:", error);
        setIsLoading(false);
      }
    };
    
    loadRevisionSchedule();
  }, []);

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case "today":
        return "bg-cosmicPurple/20 text-cosmicPurple";
      case "tomorrow":
        return "bg-nebulaPink/20 text-nebulaPink";
      case "upcoming":
        return "bg-starYellow/20 text-starYellow";
      default:
        return "bg-white/20 text-white";
    }
  };

  return (
    <motion.div 
      className="rounded-2xl p-6 bg-gradient-to-br from-cosmicPurple/20 to-nebulaPink/20 backdrop-blur-md border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold font-montserrat flex items-center">
          <CalendarCheck className="mr-2 text-starYellow" /> Revision Schedule
        </h3>
        <span className="text-xs bg-starYellow/10 text-starYellow px-3 py-1 rounded-full flex items-center">
          <Bot className="w-3 h-3 mr-1" /> AI Optimized
        </span>
      </div>
      
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 bg-white/5" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {revisionItems.map((item) => (
            <div
              key={item.id}
              className={`bg-spaceBlack/50 rounded-lg p-3 border-l-2 ${item.color}`}
            >
              <div className="flex justify-between items-start">
                <h4 className="font-medium">{item.subject}: {item.topic}</h4>
                <span className={`text-xs ${getPriorityBadgeClass(item.priority)} px-2 py-0.5 rounded-full`}>
                  {item.dueDate}
                </span>
              </div>
              <p className="text-sm text-starWhite/70">
                {item.id === 1 && "Focus on wave-particle duality concept"}
                {item.id === 2 && "Review benzene ring structures"}
                {item.id === 3 && "Practice integration by parts"}
              </p>
            </div>
          ))}
        </div>
      )}
      
      <button className="w-full mt-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm transition-colors">
        View Complete Schedule
      </button>
    </motion.div>
  );
};

export default RevisionSchedule;
