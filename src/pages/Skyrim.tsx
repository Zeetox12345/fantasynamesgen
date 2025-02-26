
import { Crown } from "lucide-react";
import { CategoryLayout } from "@/components/CategoryLayout";
import { GeneratorCard } from "@/components/GeneratorCard";

const Skyrim = () => {
  const generators = [
    {
      title: "Nord Names",
      description: "Generate authentic Nordic names for your Skyrim character",
      href: "/skyrim/nord"
    },
    {
      title: "Dragon Names",
      description: "Create powerful dragon names in the dragon language",
      href: "/skyrim/dragon"
    },
    {
      title: "City Names",
      description: "Generate names for holds, villages, and settlements",
      href: "/skyrim/city"
    }
  ];

  return (
    <CategoryLayout
      title="Skyrim"
      description="Generate names inspired by The Elder Scrolls V: Skyrim"
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

export default Skyrim;
