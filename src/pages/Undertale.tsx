
import { Heart } from "lucide-react";
import { CategoryLayout } from "@/components/CategoryLayout";
import { GeneratorCard } from "@/components/GeneratorCard";

const Undertale = () => {
  const generators = [
    {
      title: "Monster Names",
      description: "Generate quirky and charming monster names",
      href: "/undertale/monster"
    },
    {
      title: "Location Names",
      description: "Create names for Underground locations and areas",
      href: "/undertale/location"
    },
    {
      title: "Item Names",
      description: "Generate names for items, food, and accessories",
      href: "/undertale/item"
    }
  ];

  return (
    <CategoryLayout
      title="Undertale"
      description="Generate unique and charming names inspired by Undertale"
      icon={<Heart className="w-6 h-6" />}
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

export default Undertale;
