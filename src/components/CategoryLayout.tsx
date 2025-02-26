
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface CategoryLayoutProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export function CategoryLayout({ title, description, icon, children }: CategoryLayoutProps) {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with back button */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Categories
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              {icon}
            </div>
            <h1 className="font-display text-4xl font-bold">{title}</h1>
          </div>
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>

        {/* Content */}
        <div className="mt-8">
          {children}
        </div>

        {/* Footer */}
        <footer className="mt-24 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>Copyright 2025 – FantasyNamesGen</p>
        </footer>
      </div>
    </div>
  );
}
