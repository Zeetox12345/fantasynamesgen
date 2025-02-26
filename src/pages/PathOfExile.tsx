import { Shield } from "lucide-react";
import { CategoryLayout } from "@/components/CategoryLayout";
import { GeneratorCard } from "@/components/GeneratorCard";

const PathOfExile = () => {
  const generators = [
    {
      title: "Exile Names",
      description: "Generate names for your exiled character",
      href: "/poe/exile"
    },
    {
      title: "Item Names",
      description: "Create unique names for weapons and magical items",
      href: "/poe/item"
    },
    {
      title: "Location Names",
      description: "Generate names for areas and locations in Wraeclast",
      href: "/poe/location"
    }
  ];

  return (
    <CategoryLayout
      title="Path of Exile"
      description="Generate dark fantasy names for characters and items in Wraeclast"
      icon={<Shield className="w-6 h-6" />}
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

export default PathOfExile; 