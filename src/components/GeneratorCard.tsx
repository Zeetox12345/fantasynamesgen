import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface GeneratorCardProps {
  title: string;
  description: string;
  href: string;
  image?: string; // Optional image path
}

export function GeneratorCard({ title, description, href, image }: GeneratorCardProps) {
  return (
    <Link to={href} className="block">
      <div className="glass-card hover-card rounded-lg p-6 group">
        {image && (
          <div className="mb-4 overflow-hidden rounded-md">
            <img 
              src={image} 
              alt={`${title} illustration`} 
              className="w-full h-52 object-cover transition-transform group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-xl font-semibold">{title}</h3>
          <ArrowRight className="w-5 h-5 text-primary/50 transition-transform group-hover:translate-x-1" />
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
}
