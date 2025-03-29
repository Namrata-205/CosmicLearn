import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lightbulb, Bot } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Suggestion {
  id: number;
  title: string;
  description: string;
}

const ParticipationSuggestions = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSuggestions = async () => {
      setIsLoading(true);
      // In a real app, fetch data from API
      try {
        // Simulate API call
        setTimeout(() => {
          const suggestionData: Suggestion[] = [
            {
              id: 1,
              title: "Interactive Demonstrations",
              description: "Consider adding virtual lab simulations to increase engagement in Organic Chemistry"
            },
            {
              id: 2,
              title: "Group Competition",
              description: "Implement team-based quizzes for topics with lower participation rates"
            },
            {
              id: 3,
              title: "Personalized Learning Paths",
              description: "Provide alternative explanation methods for students struggling with specific concepts"
            }
          ];
          
          setSuggestions(suggestionData);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Failed to load suggestions:", error);
        setIsLoading(false);
      }
    };
    
    loadSuggestions();
  }, []);

  return (
    <motion.div 
      className="rounded-2xl p-6 bg-gradient-to-br from-cosmicPurple/20 to-nebulaPink/20 backdrop-blur-md border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold font-montserrat flex items-center">
          <Lightbulb className="mr-2 text-starYellow" /> Engagement Suggestions
        </h3>
        <span className="text-xs bg-starYellow/10 text-starYellow px-3 py-1 rounded-full flex items-center">
          <Bot className="w-3 h-3 mr-1" /> AI Suggested
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
          {suggestions.map((suggestion) => (
            <div 
              key={suggestion.id}
              className="bg-spaceBlack/50 rounded-lg p-3"
            >
              <h4 className="font-medium text-sm mb-1">{suggestion.title}</h4>
              <p className="text-xs text-starWhite/70">{suggestion.description}</p>
            </div>
          ))}
        </div>
      )}
      
      <button className="w-full mt-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm transition-colors">
        View All Suggestions
      </button>
    </motion.div>
  );
};

export default ParticipationSuggestions;
