import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { getAIGeneratedCalendar } from "@/lib/openai";
import { Skeleton } from "@/components/ui/skeleton";

interface CalendarDay {
  date: number;
  events: { type: "lecture" | "assignment" | "quiz" }[];
}

interface CalendarEvent {
  title: string;
  description: string;
  time: string;
  type: "lecture" | "assignment" | "quiz";
}

const AiCalendar = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDay, setSelectedDay] = useState<number | null>(10); // Default to day 10

  // Mock calendar data - in a real app, this would come from an API
  useEffect(() => {
    const loadCalendar = async () => {
      setIsLoading(true);
      try {
        // Simulate API call for calendar data
        const days: CalendarDay[] = Array.from({ length: 14 }, (_, i) => ({
          date: i + 1,
          events: []
        }));
        
        // Add some sample events
        days[0].events.push({ type: "lecture" });
        days[3].events.push({ type: "assignment" });
        days[8].events.push({ type: "quiz" });
        days[9].events = [{ type: "quiz" }, { type: "lecture" }];
        days[12].events.push({ type: "assignment" });
        
        setCalendarDays(days);
        
        // Set up events
        const todayEvents: CalendarEvent[] = [
          {
            title: "Physics Lecture: Quantum Mechanics",
            description: "Join video conference for the lecture",
            time: "2:00 PM - 3:30 PM",
            type: "lecture"
          },
          {
            title: "Chemistry Assignment Deadline",
            description: "Molecular structure analysis",
            time: "11:59 PM",
            type: "assignment"
          },
          {
            title: "Math Quiz: Calculus",
            description: "Prepare for integration by parts questions",
            time: "10:00 AM",
            type: "quiz"
          }
        ];
        
        setEvents(todayEvents);
        
        // We'd use the AI-generated calendar here
        // const aiCalendar = await getAIGeneratedCalendar();
        // setCalendarDays(aiCalendar.days);
        // setEvents(aiCalendar.events);
      } catch (error) {
        console.error("Failed to load calendar data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCalendar();
  }, []);

  const getEventColor = (type: "lecture" | "assignment" | "quiz") => {
    switch (type) {
      case "lecture":
        return "bg-cosmicPurple";
      case "assignment":
        return "bg-nebulaPink";
      case "quiz":
        return "bg-starYellow";
      default:
        return "bg-white";
    }
  };

  const getEventBorderColor = (type: "lecture" | "assignment" | "quiz") => {
    switch (type) {
      case "lecture":
        return "border-cosmicPurple";
      case "assignment":
        return "border-nebulaPink";
      case "quiz":
        return "border-starYellow";
      default:
        return "border-white";
    }
  };

  return (
    <motion.div 
      className="rounded-2xl p-6 relative bg-gradient-to-br from-cosmicPurple/20 to-nebulaPink/20 backdrop-blur-md border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute top-4 right-4 bg-starYellow/10 text-starYellow text-xs rounded-full px-3 py-1 flex items-center">
        <i className="ri-robot-line mr-1"></i> AI Generated
      </div>
      
      <h3 className="text-xl font-bold font-montserrat mb-4 flex items-center">
        <Calendar className="mr-2 text-nebulaPink" /> Smart Calendar
      </h3>
      
      {isLoading ? (
        <div className="space-y-4">
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} className="h-5 bg-white/5" />
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 14 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square bg-white/5" />
            ))}
          </div>
          
          <Skeleton className="h-40 bg-white/5" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-7 gap-1 text-center text-sm mb-3">
            <div className="text-starWhite/50">Sun</div>
            <div className="text-starWhite/50">Mon</div>
            <div className="text-starWhite/50">Tue</div>
            <div className="text-starWhite/50">Wed</div>
            <div className="text-starWhite/50">Thu</div>
            <div className="text-starWhite/50">Fri</div>
            <div className="text-starWhite/50">Sat</div>
          </div>
          
          <div className="grid grid-cols-7 gap-1 text-center">
            {calendarDays.map((day) => (
              <div 
                key={day.date}
                className={`aspect-square flex flex-col justify-center items-center p-1 relative rounded-lg cursor-pointer transition-colors ${
                  selectedDay === day.date 
                    ? 'bg-nebulaPink/20 border border-nebulaPink/50' 
                    : 'hover:bg-white/5'
                }`}
                onClick={() => setSelectedDay(day.date)}
              >
                <span className="text-sm">{day.date}</span>
                {day.events.length > 0 && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                    {day.events.map((event, idx) => (
                      <span 
                        key={idx} 
                        className={`w-1 h-1 rounded-full ${getEventColor(event.type)}`}
                      ></span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-6 space-y-3">
            <h4 className="font-medium text-sm text-starWhite/70">Upcoming Events & Deadlines</h4>
            {events.map((event, index) => (
              <div 
                key={index} 
                className={`border-l-2 ${getEventBorderColor(event.type)} pl-4 py-1`}
              >
                <p className="font-medium">{event.title}</p>
                <p className="text-sm text-starWhite/70">{index === 0 ? "Today, " : index === 1 ? "Tomorrow, " : "Oct 13, "}{event.time}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default AiCalendar;
