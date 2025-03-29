import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LineChart, Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

interface TopStudent {
  id: number;
  name: string;
  initials: string;
  average: number;
  bgColor: string;
}

const StudentPerformance = () => {
  const [topStudents, setTopStudents] = useState<TopStudent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [performanceData, setPerformanceData] = useState<any[]>([]);

  useEffect(() => {
    const loadPerformanceData = async () => {
      setIsLoading(true);
      // In a real app, fetch data from API
      try {
        // Simulate API call
        setTimeout(() => {
          const studentsData: TopStudent[] = [
            {
              id: 1,
              name: "Emma Johnson",
              initials: "EJ",
              average: 98,
              bgColor: "bg-nebulaPink/20"
            },
            {
              id: 2,
              name: "Tyler Davis",
              initials: "TD",
              average: 95,
              bgColor: "bg-cosmicPurple/20"
            },
            {
              id: 3,
              name: "Lisa Rodriguez",
              initials: "LR",
              average: 93,
              bgColor: "bg-starYellow/20"
            }
          ];
          
          const chartData = [
            { grade: "F", count: 2 },
            { grade: "D", count: 5 },
            { grade: "C", count: 7 },
            { grade: "B", count: 8 },
            { grade: "B+", count: 9 },
            { grade: "A", count: 10 },
            { grade: "A+", count: 5 }
          ];
          
          setTopStudents(studentsData);
          setPerformanceData(chartData);
          setIsLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Failed to load performance data:", error);
        setIsLoading(false);
      }
    };
    
    loadPerformanceData();
  }, []);

  return (
    <motion.div 
      className="rounded-2xl p-6 bg-gradient-to-br from-cosmicPurple/20 to-nebulaPink/20 backdrop-blur-md border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <h3 className="text-xl font-bold font-montserrat mb-6 flex items-center">
        <LineChart className="mr-2 text-nebulaPink" /> Student Performance
      </h3>
      
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-40 bg-white/5" />
          <Skeleton className="h-6 bg-white/5 w-40" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 bg-white/5" />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-1">
              <h4 className="font-medium">Physics 101: Quantum Mechanics</h4>
              <span className="text-xs">24 students</span>
            </div>
            
            <div className="relative w-full h-40 bg-spaceBlack/50 rounded-xl p-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <XAxis 
                    dataKey="grade" 
                    tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 12 }}
                    axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                  />
                  <YAxis 
                    hide={true}
                    domain={[0, 'dataMax + 2']}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#121212', 
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px'
                    }}
                    itemStyle={{ color: '#fff' }}
                    labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="#6C63FF" 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium mb-2">Top Performing Students</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {topStudents.map((student) => (
                <div 
                  key={student.id}
                  className="bg-spaceBlack/50 rounded-lg p-3 border border-white/5"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${student.bgColor} flex items-center justify-center shrink-0`}>
                      <span className="font-medium">{student.initials}</span>
                    </div>
                    <div>
                      <h5 className="font-medium">{student.name}</h5>
                      <div className="flex items-center text-sm">
                        <Star className="h-3 w-3 text-starYellow mr-1 fill-starYellow" />
                        <span>{student.average}% average</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button className="w-full mt-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm transition-colors">
            View Detailed Performance Analytics
          </button>
        </>
      )}
    </motion.div>
  );
};

export default StudentPerformance;
