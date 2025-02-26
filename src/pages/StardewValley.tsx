import { Trees } from "lucide-react";
import { CategoryLayout } from "@/components/CategoryLayout";
import { GeneratorCard } from "@/components/GeneratorCard";

const StardewValley = () => {
  const generators = [
    {
      title: "Farmer Names",
      description: "Generate charming names for your farm character",
      href: "/stardew/farmer"
    },
    {
      title: "Farm Names",
      description: "Create cozy and creative names for your farm",
      href: "/stardew/farm"
    },
    {
      title: "Animal Names",
      description: "Generate cute names for your farm animals",
      href: "/stardew/animal"
    }
  ];

  return (
    <CategoryLayout
      title="Stardew Valley"
      description="Generate cozy farm and village names for your Stardew Valley game"
      icon={<Trees className="w-6 h-6" />}
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

export default StardewValley; 