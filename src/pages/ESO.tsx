import { Crown } from "lucide-react";
import { CategoryLayout } from "@/components/CategoryLayout";
import { GeneratorCard } from "@/components/GeneratorCard";

const ESO = () => {
  const generators = [
    {
      title: "Character Names",
      description: "Generate names for all races of Tamriel",
      href: "/eso/character"
    },
    {
      title: "Guild Names",
      description: "Create unique names for your ESO guild",
      href: "/eso/guild"
    },
    {
      title: "Location Names",
      description: "Generate names for settlements and landmarks",
      href: "/eso/location"
    }
  ];

  return (
    <CategoryLayout
      title="Elder Scrolls Online"
      description="Generate character and guild names for your ESO adventures"
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

export default ESO; 