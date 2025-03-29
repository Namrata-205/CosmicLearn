import { useCallback, useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useUser } from "@/context/user-context";
import { motion, AnimatePresence } from "framer-motion";
import { UserRound, BookOpen } from "lucide-react";
import { LoginForm } from "@/components/login-form";

const WelcomePage = () => {
  const [, setLocation] = useLocation();
  const { user, setRole } = useUser();
  const [selectedRole, setSelectedRole] = useState<"student" | "teacher" | null>(null);
  
  // Redirect to appropriate dashboard if user is already logged in
  useEffect(() => {
    if (user?.role === "student") {
      setLocation("/student");
    } else if (user?.role === "teacher") {
      setLocation("/teacher");
    }
  }, [user, setLocation]);

  const handleSelectRole = useCallback((role: "student" | "teacher") => {
    setSelectedRole(role);
  }, []);

  const handleLoginSuccess = useCallback(() => {
    setLocation(selectedRole === "student" ? "/student" : "/teacher");
  }, [setLocation, selectedRole]);

  const handleBackToRoleSelection = useCallback(() => {
    setSelectedRole(null);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 z-10 relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[10%] right-[15%] w-72 h-72 rounded-full bg-cosmicPurple/20 blur-3xl animate-cosmic-pulse"></div>
        <div className="absolute bottom-[20%] left-[10%] w-80 h-80 rounded-full bg-nebulaPink/20 blur-3xl animate-cosmic-pulse-slow"></div>
        
        {/* Cosmic floating elements */}
        <div className="absolute top-[25%] left-[22%] w-6 h-6 rounded-full bg-starYellow/30 blur-sm animate-float-slow"></div>
        <div className="absolute top-[65%] right-[18%] w-4 h-4 rounded-full bg-cosmicPurple/40 blur-sm animate-float-medium"></div>
        <div className="absolute bottom-[15%] right-[25%] w-8 h-8 rounded-full bg-meteor/30 blur-sm animate-float-fast"></div>
        
        {/* Comet trail */}
        <div className="absolute -top-10 -left-10 w-20 h-2 bg-gradient-to-r from-starYellow/60 to-transparent rotate-45 animate-comet"></div>
        <div className="absolute top-[80%] -right-10 w-16 h-1 bg-gradient-to-l from-nebulaPink/60 to-transparent -rotate-30 animate-comet-reverse"></div>
      </div>
      
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center z-10">
        <motion.div 
          className="mb-6 relative"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        >
          {/* Orbit rings around logo */}
          <div className="absolute inset-0 w-44 h-44 rounded-full border border-starYellow/20 animate-spin-slow" style={{ top: '-6px', left: '-6px' }}></div>
          <div className="absolute inset-0 w-52 h-52 rounded-full border border-nebulaPink/10 animate-spin-reverse" style={{ top: '-10px', left: '-10px' }}></div>
          
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cosmicPurple to-nebulaPink flex items-center justify-center">
            <div className="w-28 h-28 rounded-full bg-deepSpace flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-starYellow to-meteor opacity-80 relative overflow-hidden">
                {/* Surface craters/details */}
                <div className="absolute top-[20%] left-[30%] w-3 h-3 rounded-full bg-white/10"></div>
                <div className="absolute bottom-[25%] right-[20%] w-4 h-4 rounded-full bg-white/10"></div>
                <div className="absolute top-[60%] left-[15%] w-2 h-2 rounded-full bg-white/10"></div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-6xl font-bold font-montserrat mb-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-starYellow">Cosmic</span>
          <span className="text-nebulaPink">Learn</span>
        </motion.h1>

        <motion.p 
          className="text-xl text-center max-w-xl mb-12 text-starWhite/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Embark on a journey through the universe of knowledge. Your educational galaxy awaits.
        </motion.p>
        
        <AnimatePresence mode="wait">
          {!selectedRole ? (
            <motion.div 
              key="role-selection"
              className="w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2 
                className="text-2xl font-montserrat mb-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                I am a...
              </motion.h2>
              
              <div className="flex flex-col md:flex-row gap-6 w-full max-w-2xl mx-auto justify-center">
                <motion.button 
                  className="flex-1 rounded-2xl p-6 flex flex-col items-center transition-all hover:scale-105 bg-gradient-to-br from-cosmicPurple/20 to-nebulaPink/20 backdrop-blur-md border border-white/10"
                  onClick={() => handleSelectRole("student")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <div className="w-20 h-20 rounded-full bg-cosmicPurple/30 flex items-center justify-center mb-4">
                    <UserRound className="h-10 w-10 text-starWhite" />
                  </div>
                  <h3 className="text-xl font-bold">Student</h3>
                  <p className="text-sm text-center mt-2 text-starWhite/70">Explore courses, track progress and enhance your learning</p>
                </motion.button>
                
                <motion.button 
                  className="flex-1 rounded-2xl p-6 flex flex-col items-center transition-all hover:scale-105 bg-gradient-to-br from-cosmicPurple/20 to-nebulaPink/20 backdrop-blur-md border border-white/10"
                  onClick={() => handleSelectRole("teacher")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <div className="w-20 h-20 rounded-full bg-nebulaPink/30 flex items-center justify-center mb-4">
                    <BookOpen className="h-10 w-10 text-starWhite" />
                  </div>
                  <h3 className="text-xl font-bold">Teacher</h3>
                  <p className="text-sm text-center mt-2 text-starWhite/70">Manage classes, analyze student performance and create assessments</p>
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="login-form"
              className="w-full flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LoginForm role={selectedRole} onSuccess={handleLoginSuccess} />
              
              <motion.button
                className="mt-6 text-sm text-starWhite/60 hover:text-starWhite transition-colors flex items-center gap-2"
                onClick={handleBackToRoleSelection}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                &larr; Back to role selection
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WelcomePage;
