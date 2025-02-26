
import { Crown } from "lucide-react";
import { CategoryLayout } from "@/components/CategoryLayout";
import { GeneratorCard } from "@/components/GeneratorCard";

const DungeonsAndDragons = () => {
  const generators = [
    {
      title: "Character Names",
      description: "Generate names for any D&D race and class combination",
      href: "/dnd/character"
    },
    {
      title: "Tavern Names",
      description: "Create memorable names for taverns and inns",
      href: "/dnd/tavern"
    },
    {
      title: "City Names",
      description: "Generate names for cities, towns, and villages",
      href: "/dnd/city"
    }
  ];

  return (
    <CategoryLayout
      title="Dungeons & Dragons"
      description="Create unique names for your D&D characters, places, and more"
      icon={<Crown className="w-6 h-6" />}
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

export default DungeonsAndDragons;
