import { Wand2 } from "lucide-react";
import { CategoryLayout } from "@/components/CategoryLayout";
import { GeneratorCard } from "@/components/GeneratorCard";

const WorldOfWarcraft = () => {
  const generators = [
    {
      title: "Alliance Names",
      description: "Generate names for humans, night elves, dwarves, and more",
      href: "/wow/alliance"
    },
    {
      title: "Horde Names",
      description: "Create names for orcs, trolls, tauren, and other Horde races",
      href: "/wow/horde"
    },
    {
      title: "Guild Names",
      description: "Generate epic and memorable guild names",
      href: "/wow/guild"
    }
  ];

  return (
    <CategoryLayout
      title="World of Warcraft"
      description="Generate names for all races of Azeroth and beyond"
      icon={<Wand2 className="w-6 h-6" />}
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

export default WorldOfWarcraft; 