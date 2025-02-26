import { Wand2 } from "lucide-react";
import { CategoryLayout } from "@/components/CategoryLayout";
import { GeneratorCard } from "@/components/GeneratorCard";

const Fantasy = () => {
  const generators = [
    {
      title: "Space Ranger Names",
      description: "Generate futuristic names for space rangers and cosmic defenders",
      href: "/fantasy/space-ranger"
    },
    {
      title: "Dwarf Ranger Names",
      description: "Create strong and rugged names for dwarven rangers and scouts",
      href: "/fantasy/dwarf-ranger"
    },
    {
      title: "Elven Ranger Names",
      description: "Generate mystical and nature-attuned names for elven rangers",
      href: "/fantasy/elven-ranger"
    },
    {
      title: "Halfling Ranger Names",
      description: "Create nimble and clever names for halfling scouts and rangers",
      href: "/fantasy/halfling-ranger"
    },
    {
      title: "Chaos Dwarf City Names",
      description: "Generate dark and imposing names for chaos dwarf settlements",
      href: "/fantasy/chaos-dwarf-city"
    }
  ];

  return (
    <CategoryLayout
      title="Fantasy"
      description="Generate names for rangers of different races and chaos dwarf cities from enchanted realms"
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
