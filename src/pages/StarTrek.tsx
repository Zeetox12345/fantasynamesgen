import { Atom } from "lucide-react";
import { CategoryLayout } from "@/components/CategoryLayout";
import { GeneratorCard } from "@/components/GeneratorCard";

const StarTrek = () => {
  const generators = [
    {
      title: "Federation Names",
      description: "Generate names for Starfleet officers and Federation citizens",
      href: "/startrek/federation"
    },
    {
      title: "Alien Names",
      description: "Create names for Klingons, Vulcans, and other species",
      href: "/startrek/alien"
    },
    {
      title: "Starship Names",
      description: "Generate names for vessels of the Federation and beyond",
      href: "/startrek/starship"
    }
  ];

  return (
    <CategoryLayout
      title="Star Trek"
      description="Generate names from across the galaxy for characters and starships"
      icon={<Atom className="w-6 h-6" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {generators.map((generator) => (
          <GeneratorCard
            key={generator.title}
            title={generator.title}
            description={generator.description}
            href={generator.href}
          />
        ))}
      </div>
    </CategoryLayout>
  );
};

export default StarTrek; 