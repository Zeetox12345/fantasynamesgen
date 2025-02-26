import { Skull } from "lucide-react";
import { CategoryLayout } from "@/components/CategoryLayout";
import { GeneratorCard } from "@/components/GeneratorCard";

const Lovecraftian = () => {
  const generators = [
    {
      title: "Elder God Names",
      description: "Generate names for cosmic entities beyond comprehension",
      href: "/lovecraftian/elder"
    },
    {
      title: "Cultist Names",
      description: "Create names for followers of the Old Ones",
      href: "/lovecraftian/cultist"
    },
    {
      title: "Forbidden Tome Titles",
      description: "Generate names for eldritch books of forbidden knowledge",
      href: "/lovecraftian/tome"
    }
  ];

  return (
    <CategoryLayout
      title="Lovecraftian"
      description="Generate cosmic horror and ancient deity names from the Cthulhu Mythos"
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

export default Lovecraftian; 