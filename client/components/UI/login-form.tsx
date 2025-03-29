import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LockKeyhole, UserRound, Rocket } from "lucide-react";
import { useUser } from "@/context/user-context";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  role: "student" | "teacher";
  onSuccess: () => void;
}

export function LoginForm({ role, onSuccess }: LoginFormProps) {
  const { setUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful login and set the user with the selected role
      setUser({
        id: 1,
        name: role === "student" ? "John Doe" : "Prof. Sarah Taylor",
        username: data.username,
        role: role,
      });
      
      // Call onSuccess to navigate to the dashboard
      onSuccess();
    } catch (err) {
      setError("Invalid username or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md p-8 space-y-8 bg-gradient-to-br from-cosmicPurple/20 to-nebulaPink/20 backdrop-blur-md border border-white/10 rounded-2xl"
    >
      <div className="text-center">
        <div className="mx-auto bg-gradient-to-br from-cosmicPurple to-nebulaPink w-16 h-16 rounded-full flex items-center justify-center mb-4">
          {role === "student" ? (
            <UserRound className="h-8 w-8 text-white" />
          ) : (
            <Rocket className="h-8 w-8 text-white" />
          )}
        </div>
        <h2 className="text-2xl font-bold font-montserrat mb-1">
          {role === "student" ? "Student Login" : "Teacher Login"}
        </h2>
        <p className="text-starWhite/60 text-sm">
          Enter your credentials to access your {role} dashboard
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <div className="relative">
                    <UserRound className="absolute left-3 top-3 h-4 w-4 text-cosmicPurple" />
                    <Input 
                      {...field} 
                      placeholder="Enter your username" 
                      className="pl-10 bg-white/90 border-white/10 focus-visible:ring-cosmicPurple text-black" 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-cosmicPurple" />
                    <Input 
                      {...field} 
                      type="password" 
                      placeholder="••••••••"
                      className="pl-10 bg-white/90 border-white/10 focus-visible:ring-cosmicPurple text-black" 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && (
            <div className="px-3 py-2 text-sm bg-red-500/10 border border-red-500/20 text-red-400 rounded-md">
              {error}
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-cosmicPurple to-nebulaPink hover:from-nebulaPink hover:to-cosmicPurple transition-all"
            disabled={isLoading}
          >
            {isLoading ? "Authenticating..." : "Login"}
          </Button>
        </form>
      </Form>

      <div className="text-center">
        <p className="text-xs text-starWhite/40">
          For demo purposes, any username (min 3 chars) and password (min 6 chars) will work
        </p>
      </div>
    </motion.div>
  );
}