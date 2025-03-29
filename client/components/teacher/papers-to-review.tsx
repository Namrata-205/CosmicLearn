import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Check } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Paper {
  id: number;
  assignment: string;
  student: {
    id: number;
    name: string;
    initials: string;
  };
  submittedAt: string;
  plagiarismMatch: number;
  reviewed: boolean;
}

const PapersToReview = () => {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPapers = async () => {
      setIsLoading(true);
      // In a real app, fetch data from API
      try {
        // Simulate API call
        setTimeout(() => {
          const paperData: Paper[] = [
            {
              id: 1,
              assignment: "Quantum Theory Essay",
              student: {
                id: 101,
                name: "Alex Lee",
                initials: "AL"
              },
              submittedAt: "Yesterday, 2:45 PM",
              plagiarismMatch: 1,
              reviewed: false
            },
            {
              id: 2,
              assignment: "Organic Chemistry Report",
              student: {
                id: 102,
                name: "Sarah Chen",
                initials: "SC"
              },
              submittedAt: "Oct 9, 11:20 AM",
              plagiarismMatch: 18,
              reviewed: false
            },
            {
              id: 3,
              assignment: "Calculus Problems Set",
              student: {
                id: 103,
                name: "James Wilson",
                initials: "JW"
              },
              submittedAt: "Oct 9, 9:05 AM",
              plagiarismMatch: 0,
              reviewed: false
            }
          ];
          
          setPapers(paperData);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Failed to load papers:", error);
        setIsLoading(false);
      }
    };
    
    loadPapers();
  }, []);

  const getPlagiarismBadgeClass = (match: number) => {
    if (match < 5) {
      return "bg-green-500/20 text-green-400";
    } else if (match < 25) {
      return "bg-yellow-500/20 text-yellow-400";
    } else {
      return "bg-red-500/20 text-red-400";
    }
  };

  return (
    <motion.div 
      className="rounded-2xl p-6 bg-gradient-to-br from-cosmicPurple/20 to-nebulaPink/20 backdrop-blur-md border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold font-montserrat flex items-center">
          <FileText className="mr-2 text-cosmicPurple" /> Papers to Review
        </h3>
        <span className="text-xs bg-meteor/20 text-meteor px-3 py-1 rounded-full">
          12 pending
        </span>
      </div>
      
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-10 bg-white/5" />
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-12 bg-white/5" />
          ))}
        </div>
      ) : (
        <div className="overflow-hidden">
          <div className="overflow-x-auto hide-scrollbar pb-2">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-sm font-medium text-starWhite/70">Assignment</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-starWhite/70">Student</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-starWhite/70">Submitted</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-starWhite/70">Plagiarism</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-starWhite/70">Actions</th>
                </tr>
              </thead>
              <tbody>
                {papers.map((paper) => (
                  <tr key={paper.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-3 px-4">{paper.assignment}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full ${
                          paper.id === 1 
                            ? "bg-cosmicPurple/30" 
                            : paper.id === 2 
                              ? "bg-nebulaPink/30" 
                              : "bg-starYellow/30"
                        } flex items-center justify-center mr-2`}>
                          <span className="text-xs">{paper.student.initials}</span>
                        </div>
                        <span>{paper.student.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-starWhite/70">{paper.submittedAt}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs ${getPlagiarismBadgeClass(paper.plagiarismMatch)} px-2 py-0.5 rounded-full`}>
                        {paper.plagiarismMatch}% Match
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-sm bg-cosmicPurple/20 text-cosmicPurple px-3 py-1 rounded-lg hover:bg-cosmicPurple/30 transition-colors">
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      <button className="w-full mt-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm transition-colors">
        View All Pending Papers (12)
      </button>
    </motion.div>
  );
};

export default PapersToReview;
