import { Ship } from "lucide-react";
import { CategoryLayout } from "@/components/CategoryLayout";
import { GeneratorCard } from "@/components/GeneratorCard";

const SunlessSea = () => {
  const generators = [
    {
      title: "Captain Names",
      description: "Generate names for captains of the Unterzee",
      href: "/sunlesssea/captain"
    },
    {
      title: "Ship Names",
      description: "Create gothic and mysterious names for your vessel",
      href: "/sunlesssea/ship"
    },
    {
      title: "Port Names",
      description: "Generate names for strange and eerie ports",
      href: "/sunlesssea/port"
    }
  ];

  return (
    <CategoryLayout
      title="Sunless Sea"
      description="Generate gothic naval and horror names from the Unterzee"
      icon={<Ship className="w-6 h-6" />}
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

export default SunlessSea; 