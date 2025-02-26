import { Trees } from "lucide-react";
import { CategoryLayout } from "@/components/CategoryLayout";
import { GeneratorCard } from "@/components/GeneratorCard";

const AnimalCrossing = () => {
  const generators = [
    {
      title: "Island Names",
      description: "Generate cute and creative island names",
      href: "/animalcrossing/island"
    },
    {
      title: "Villager Names",
      description: "Create charming names for your villagers",
      href: "/animalcrossing/villager"
    },
    {
      title: "Town Tunes",
      description: "Generate musical town tune ideas",
      href: "/animalcrossing/tune"
    }
  ];

  return (
    <CategoryLayout
      title="Animal Crossing"
      description="Generate cute island and villager names for your Animal Crossing game"
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

export default AnimalCrossing; 