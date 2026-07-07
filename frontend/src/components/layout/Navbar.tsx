import { useLocation } from "react-router-dom";
import { CheckCircle2, Menu } from "lucide-react";
import { Button } from "../ui/Button";
import { useState } from "react";

export function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", href: "/" },
  ];

  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              TaskHub
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden py-4 border-t border-border">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`block px-4 py-2 text-sm font-medium ${
                  location.pathname === item.href
                    ? "text-primary bg-accent"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
