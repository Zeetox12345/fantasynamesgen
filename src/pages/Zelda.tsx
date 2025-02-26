import { Sun } from "lucide-react";
import { CategoryLayout } from "@/components/CategoryLayout";
import { GeneratorCard } from "@/components/GeneratorCard";

const Zelda = () => {
  const generators = [
    {
      title: "Hylian Names",
      description: "Generate names for Hylian characters",
      href: "/zelda/hylian"
    },
    {
      title: "Location Names",
      description: "Create names for towns, dungeons, and landmarks",
      href: "/zelda/location"
    },
    {
      title: "Item Names",
      description: "Generate names for magical items and artifacts",
      href: "/zelda/item"
    }
  ];

  return (
    <CategoryLayout
      title="The Legend of Zelda"
      description="Generate names from Hyrule and the lands of Zelda"
      icon={<Sun className="w-6 h-6" />}
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

export default Zelda; 