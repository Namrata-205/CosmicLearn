import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useUser } from "@/context/user-context";
import { Menu, X } from "lucide-react";

type NavbarProps = {
  role: "student" | "teacher";
}

const Navbar = ({ role }: NavbarProps) => {
  const { user, logout } = useUser();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const studentLinks = [
    { href: "/student", label: "Dashboard" },
    { href: "/student/courses", label: "Courses" },
    { href: "/student/roadmap", label: "Roadmap" },
    { href: "/student/calendar", label: "Calendar" },
    { href: "/student/resources", label: "Resources" }
  ];

  const teacherLinks = [
    { href: "/teacher", label: "Dashboard" },
    { href: "/teacher/classes", label: "Classes" },
    { href: "/teacher/materials", label: "Materials" },
    { href: "/teacher/assessments", label: "Assessments" },
    { href: "/teacher/analytics", label: "Analytics" }
  ];

  const links = role === "student" ? studentLinks : teacherLinks;

  return (
    <header className="bg-spaceBlack/80 backdrop-blur-md py-3 px-4 fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <h1 className="text-xl font-bold font-montserrat cursor-pointer">
              <span className="text-starYellow">Cosmic</span>
              <span className="text-nebulaPink">Learn</span>
              {role === "teacher" && (
                <span className="text-xs ml-2 bg-nebulaPink/20 text-nebulaPink px-2 py-0.5 rounded-full">
                  Teacher
                </span>
              )}
            </h1>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={`${location === link.href ? 'text-starWhite' : 'text-starWhite/70'} hover:text-starYellow transition`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-4">
          <button className="relative p-2">
            <i className="ri-notification-3-line text-xl"></i>
            <span className="absolute top-0 right-0 w-2 h-2 bg-meteor rounded-full"></span>
          </button>
          
          <div className={`w-9 h-9 rounded-full ${role === 'student' ? 'bg-cosmicPurple/30' : 'bg-nebulaPink/30'} flex items-center justify-center`}>
            <span className="font-medium text-sm">
              {user?.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          
          <button 
            className="md:hidden p-2"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-spaceBlack/95 backdrop-blur-md absolute top-full left-0 w-full p-4 border-t border-white/10">
          <nav className="flex flex-col space-y-4">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`${location === link.href ? 'text-starWhite' : 'text-starWhite/70'} hover:text-starYellow transition`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button 
              onClick={() => {
                logout();
                setMobileMenuOpen(false);
              }}
              className="text-left text-starWhite/70 hover:text-meteor transition"
            >
              Logout
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
