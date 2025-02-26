
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface GeneratorCardProps {
  title: string;
  description: string;
  href: string;
}

export function GeneratorCard({ title, description, href }: GeneratorCardProps) {
  return (
    <Link to={href} className="block">
      <div className="glass-card hover-card rounded-lg p-6 group">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-xl font-semibold">{title}</h3>
          <ArrowRight className="w-5 h-5 text-primary/50 transition-transform group-hover:translate-x-1" />
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
}
