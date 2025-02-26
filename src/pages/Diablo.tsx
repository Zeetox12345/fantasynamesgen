import { Skull } from "lucide-react";
import { CategoryLayout } from "@/components/CategoryLayout";
import { GeneratorCard } from "@/components/GeneratorCard";

const Diablo = () => {
  const generators = [
    {
      title: "Demon Names",
      description: "Generate sinister names for demons and hellspawn",
      href: "/diablo/demon"
    },
    {
      title: "Nephalem Names",
      description: "Create powerful names for Nephalem heroes",
      href: "/diablo/nephalem"
    },
    {
      title: "Sanctuary Locations",
      description: "Names for towns, dungeons, and realms in Sanctuary",
      href: "/diablo/locations"
    }
  ];

  return (
    <CategoryLayout
      title="Diablo"
      description="Generate dark fantasy and demonic names from the world of Sanctuary"
      icon={<Skull className="w-6 h-6" />}
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

export default Diablo; 