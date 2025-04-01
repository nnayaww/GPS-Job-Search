
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X, LogIn, UserPlus, Briefcase, Home, User, ShieldAlert } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  const handleLogout = () => {
    logout();
    closeMenu();
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-primary">
              GPS Placement
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:ml-10 md:flex md:space-x-4">
              <Link 
                to="/" 
                className={cn(
                  "inline-flex items-center px-3 py-2 rounded-md text-sm font-medium",
                  isActive("/") 
                    ? "bg-primary/10 text-primary" 
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
              <Link 
                to="/jobs" 
                className={cn(
                  "inline-flex items-center px-3 py-2 rounded-md text-sm font-medium",
                  isActive("/jobs") 
                    ? "bg-primary/10 text-primary" 
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <Briefcase className="h-4 w-4 mr-2" />
                Jobs
              </Link>
              {isAuthenticated && (
                <Link 
                  to="/profile" 
                  className={cn(
                    "inline-flex items-center px-3 py-2 rounded-md text-sm font-medium",
                    isActive("/profile") 
                      ? "bg-primary/10 text-primary" 
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Link>
              )}
              {isAuthenticated && user?.role === "admin" && (
                <Link 
                  to="/admin" 
                  className={cn(
                    "inline-flex items-center px-3 py-2 rounded-md text-sm font-medium",
                    isActive("/admin") 
                      ? "bg-primary/10 text-primary" 
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <ShieldAlert className="h-4 w-4 mr-2" />
                  Admin
                </Link>
              )}
            </div>
          </div>
          
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>{getInitials(user?.name || "User")}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{user?.name}</span>
                </Link>
                <Button variant="outline" onClick={handleLogout}>
                  Log out
                </Button>
              </div>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link to="/login">
                    <LogIn className="h-4 w-4 mr-2" />
                    Log in
                  </Link>
                </Button>
                <Button asChild>
                  <Link to="/register">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Sign up
                  </Link>
                </Button>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium",
                isActive("/") 
                  ? "bg-primary/10 text-primary" 
                  : "text-gray-700 hover:bg-gray-100"
              )}
              onClick={closeMenu}
            >
              <div className="flex items-center">
                <Home className="h-5 w-5 mr-2" />
                Home
              </div>
            </Link>
            <Link 
              to="/jobs" 
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium",
                isActive("/jobs") 
                  ? "bg-primary/10 text-primary" 
                  : "text-gray-700 hover:bg-gray-100"
              )}
              onClick={closeMenu}
            >
              <div className="flex items-center">
                <Briefcase className="h-5 w-5 mr-2" />
                Jobs
              </div>
            </Link>
            {isAuthenticated && (
              <Link 
                to="/profile" 
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  isActive("/profile") 
                    ? "bg-primary/10 text-primary" 
                    : "text-gray-700 hover:bg-gray-100"
                )}
                onClick={closeMenu}
              >
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Profile
                </div>
              </Link>
            )}
            {isAuthenticated && user?.role === "admin" && (
              <Link 
                to="/admin" 
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  isActive("/admin") 
                    ? "bg-primary/10 text-primary" 
                    : "text-gray-700 hover:bg-gray-100"
                )}
                onClick={closeMenu}
              >
                <div className="flex items-center">
                  <ShieldAlert className="h-5 w-5 mr-2" />
                  Admin
                </div>
              </Link>
            )}
          </div>
          
          {/* Mobile Auth Buttons */}
          <div className="px-4 py-3 border-t border-gray-200">
            {isAuthenticated ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>{getInitials(user?.name || "User")}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                </div>
                <Button className="w-full" variant="outline" onClick={handleLogout}>
                  Log out
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full"
                  asChild
                >
                  <Link to="/login" onClick={closeMenu}>
                    <LogIn className="h-4 w-4 mr-2" />
                    Log in
                  </Link>
                </Button>
                <Button 
                  className="w-full"
                  asChild
                >
                  <Link to="/register" onClick={closeMenu}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Sign up
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
