import { Sword } from "lucide-react";
import { CategoryLayout } from "@/components/CategoryLayout";
import { GeneratorCard } from "@/components/GeneratorCard";

const Witcher = () => {
  const generators = [
    {
      title: "Witcher Names",
      description: "Generate names for monster hunters from various schools",
      href: "/witcher/witcher"
    },
    {
      title: "Character Names",
      description: "Create names for humans, elves, and dwarves from the Continent",
      href: "/witcher/character"
    },
    {
      title: "Monster Names",
      description: "Generate names for creatures and beasts to be hunted",
      href: "/witcher/monster"
    }
  ];

  return (
    <CategoryLayout
      title="The Witcher"
      description="Generate names inspired by the world of monster hunters"
      icon={<Sword className="w-6 h-6" />}
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

export default Witcher; 