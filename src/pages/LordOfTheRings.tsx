import { Crown } from "lucide-react";
import { CategoryLayout } from "@/components/CategoryLayout";
import { GeneratorCard } from "@/components/GeneratorCard";

const LordOfTheRings = () => {
  const generators = [
    {
      title: "Elvish Names",
      description: "Generate elegant names in Sindarin and Quenya",
      href: "/lotr/elvish"
    },
    {
      title: "Dwarf Names",
      description: "Create strong and noble names for dwarves of Middle-earth",
      href: "/lotr/dwarf"
    },
    {
      title: "Location Names",
      description: "Names for realms, cities, and landmarks of Middle-earth",
      href: "/lotr/location"
    }
  ];

  return (
    <CategoryLayout
      title="Lord of the Rings"
      description="Generate names inspired by J.R.R. Tolkien's Middle-earth"
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

export default LordOfTheRings; 