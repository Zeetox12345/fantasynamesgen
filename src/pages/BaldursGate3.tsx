import { Crown } from "lucide-react";
import { CategoryLayout } from "@/components/CategoryLayout";
import { GeneratorCard } from "@/components/GeneratorCard";

const BaldursGate3 = () => {
  const generators = [
    {
      title: "Character Names",
      description: "Generate names for any race and class in Baldur's Gate 3",
      href: "/bg3/character"
    },
    {
      title: "Companion Names",
      description: "Create unique names for your custom companions",
      href: "/bg3/companion"
    },
    {
      title: "Location Names",
      description: "Generate names for camps, settlements, and dungeons",
      href: "/bg3/location"
    }
  ];

  return (
    <CategoryLayout
      title="Baldur's Gate 3"
      description="Generate D&D-inspired character names for your Baldur's Gate 3 adventures"
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

export default BaldursGate3; 