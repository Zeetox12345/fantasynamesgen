
import { Wand2 } from "lucide-react";
import { CategoryLayout } from "@/components/CategoryLayout";
import { GeneratorCard } from "@/components/GeneratorCard";

const Fantasy = () => {
  const generators = [
    {
      title: "Elven Names",
      description: "Generate mystical names for high elves, wood elves, and dark elves",
      href: "/fantasy/elven"
    },
    {
      title: "Dwarven Names",
      description: "Create strong and noble names for dwarven characters",
      href: "/fantasy/dwarven"
    },
    {
      title: "Magical Beings",
      description: "Names for faeries, dragons, and other magical creatures",
      href: "/fantasy/magical-beings"
    }
  ];

  return (
    <CategoryLayout
      title="Fantasy"
      description="Generate names for elves, dwarves, and magical beings from enchanted realms"
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

export default Fantasy;
