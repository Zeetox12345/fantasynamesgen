import { Atom } from "lucide-react";
import { CategoryLayout } from "@/components/CategoryLayout";
import { GeneratorCard } from "@/components/GeneratorCard";

const Fallout = () => {
  const generators = [
    {
      title: "Vault Dweller Names",
      description: "Generate names for your Vault Dweller character",
      href: "/fallout/vault-dweller"
    },
    {
      title: "Settlement Names",
      description: "Create unique names for wasteland settlements",
      href: "/fallout/settlement"
    },
    {
      title: "Faction Names",
      description: "Generate names for post-apocalyptic factions and groups",
      href: "/fallout/faction"
    }
  ];

  return (
    <CategoryLayout
      title="Fallout"
      description="Generate post-apocalyptic names for characters and locations in the wasteland"
      icon={<Atom className="w-6 h-6" />}
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

export default Fallout; 