import { Book } from "lucide-react";
import { CategoryLayout } from "@/components/CategoryLayout";
import { GeneratorCard } from "@/components/GeneratorCard";

const DragonAge = () => {
  const generators = [
    {
      title: "Human Names",
      description: "Generate names for humans from Ferelden, Orlais, and beyond",
      href: "/dragonage/human"
    },
    {
      title: "Elven Names",
      description: "Create names for Dalish and city elves",
      href: "/dragonage/elf"
    },
    {
      title: "Dwarven Names",
      description: "Generate names for surface and noble dwarves",
      href: "/dragonage/dwarf"
    }
  ];

  return (
    <CategoryLayout
      title="Dragon Age"
      description="Generate fantasy RPG character names from the world of Thedas"
      icon={<Book className="w-6 h-6" />}
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

export default DragonAge; 