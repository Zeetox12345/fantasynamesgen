
import { Sword } from "lucide-react";
import { CategoryLayout } from "@/components/CategoryLayout";
import { GeneratorCard } from "@/components/GeneratorCard";

const Kenshi = () => {
  const generators = [
    {
      title: "Character Names",
      description: "Generate names for your Kenshi warriors and survivors",
      href: "/kenshi/character"
    },
    {
      title: "Faction Names",
      description: "Create names for your own faction or settlement",
      href: "/kenshi/faction"
    },
    {
      title: "Base Names",
      description: "Generate names for your outposts and strongholds",
      href: "/kenshi/base"
    }
  ];

  return (
    <CategoryLayout
      title="Kenshi"
      description="Generate post-apocalyptic names for your Kenshi adventures"
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

export default Kenshi;
