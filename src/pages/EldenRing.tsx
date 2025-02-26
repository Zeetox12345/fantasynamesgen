import { Sword } from "lucide-react";
import { CategoryLayout } from "@/components/CategoryLayout";
import { GeneratorCard } from "@/components/GeneratorCard";

const EldenRing = () => {
  const generators = [
    {
      title: "Tarnished Names",
      description: "Generate names for your Tarnished character",
      href: "/eldenring/tarnished"
    },
    {
      title: "Location Names",
      description: "Create names for places in the Lands Between",
      href: "/eldenring/location"
    },
    {
      title: "Boss Names",
      description: "Generate intimidating names for powerful foes",
      href: "/eldenring/boss"
    }
  ];

  return (
    <CategoryLayout
      title="Elden Ring"
      description="Generate names from the Lands Between for your Tarnished journey"
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

export default EldenRing; 