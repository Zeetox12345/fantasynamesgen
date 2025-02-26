import { Book } from "lucide-react";
import { CategoryLayout } from "@/components/CategoryLayout";
import { GeneratorCard } from "@/components/GeneratorCard";

const Warhammer = () => {
  const generators = [
    {
      title: "Space Marine Names",
      description: "Generate names for the Emperor's finest warriors",
      href: "/warhammer/spacemarine"
    },
    {
      title: "Imperial Guard Names",
      description: "Create names for the countless soldiers of the Imperium",
      href: "/warhammer/guard"
    },
    {
      title: "Chaos Names",
      description: "Generate dark names for servants of the Chaos Gods",
      href: "/warhammer/chaos"
    }
  ];

  return (
    <CategoryLayout
      title="Warhammer"
      description="Generate epic names from the grimdark future of the 41st millennium"
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

export default Warhammer; 