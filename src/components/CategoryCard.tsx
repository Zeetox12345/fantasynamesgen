import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  image?: string; // Optional image path
}

export function CategoryCard({ title, description, icon, href, image }: CategoryCardProps) {
  return (
    <Link to={href} className="block">
      <div className="glass-card hover-card rounded-lg p-6 group">
        {image && (
          <div className="mb-4 overflow-hidden rounded-md">
            <img 
              src={image} 
              alt={`${title} category illustration`} 
              className="w-full h-48 object-cover transition-transform group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
          <ArrowRight className="w-5 h-5 text-primary/50 transition-transform group-hover:translate-x-1" />
        </div>
        <h3 className="font-display text-xl font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
}
