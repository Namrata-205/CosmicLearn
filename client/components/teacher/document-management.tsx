import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, File, Presentation, MoreHorizontal, UploadCloud } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Document {
  id: number;
  title: string;
  type: "pdf" | "ppt" | "doc";
  tags: string[];
  icon: React.ReactNode;
  bgColor: string;
}

const DocumentManagement = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDocuments = async () => {
      setIsLoading(true);
      // In a real app, fetch data from API
      try {
        // Simulate API call
        setTimeout(() => {
          const documentData: Document[] = [
            {
              id: 1,
              title: "Quantum_Physics_Lecture_10.pdf",
              type: "pdf",
              tags: ["Quantum", "Entanglement", "Wave function"],
              icon: <File className="text-lg text-cosmicPurple" />,
              bgColor: "bg-cosmicPurple/20"
            },
            {
              id: 2,
              title: "Organic_Chemistry_Slides.pptx",
              type: "ppt",
              tags: ["Benzene", "Organic", "Reactions"],
              icon: <FileText className="text-lg text-nebulaPink" />,
              bgColor: "bg-nebulaPink/20"
            }
          ];
          
          setDocuments(documentData);
          setIsLoading(false);
        }, 1200);
      } catch (error) {
        console.error("Failed to load documents:", error);
        setIsLoading(false);
      }
    };
    
    loadDocuments();
  }, []);

  return (
    <motion.div 
      className="rounded-2xl p-6 bg-gradient-to-br from-cosmicPurple/20 to-nebulaPink/20 backdrop-blur-md border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <h3 className="text-xl font-bold font-montserrat mb-4 flex items-center">
        <FileText className="mr-2 text-cosmicPurple" /> Document Management
      </h3>
      
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-24 bg-white/5" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {documents.map((document) => (
            <div 
              key={document.id}
              className="bg-spaceBlack/50 rounded-lg p-4 border border-white/5"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg ${document.bgColor} flex items-center justify-center shrink-0`}>
                    {document.icon}
                  </div>
                  <div>
                    <h4 className="font-medium">{document.title}</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {document.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className={`text-xs ${
                            document.type === "pdf" 
                              ? "bg-cosmicPurple/20 text-cosmicPurple" 
                              : "bg-nebulaPink/20 text-nebulaPink"
                          } px-2 py-0.5 rounded-full`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <button className="text-starWhite/50 hover:text-starWhite">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-4 flex flex-col gap-2">
        <button className="w-full py-2 rounded-lg bg-nebulaPink/20 hover:bg-nebulaPink/30 text-sm transition-colors text-nebulaPink flex items-center justify-center">
          <UploadCloud className="h-4 w-4 mr-2" /> Upload New Material
        </button>
        <button className="w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm transition-colors">
          Generate Quiz from Materials
        </button>
      </div>
    </motion.div>
  );
};

export default DocumentManagement;
