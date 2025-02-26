import { Heart } from "lucide-react";
import { CategoryLayout } from "@/components/CategoryLayout";
import { GeneratorCard } from "@/components/GeneratorCard";

const MyHeroAcademia = () => {
  const generators = [
    {
      title: "Hero Names",
      description: "Generate professional hero names for your character",
      href: "/mha/hero"
    },
    {
      title: "Villain Names",
      description: "Create intimidating names for villains and antagonists",
      href: "/mha/villain"
    },
    {
      title: "Quirk Names",
      description: "Generate creative names for unique superpowers",
      href: "/mha/quirk"
    }
  ];

  return (
    <CategoryLayout
      title="My Hero Academia"
      description="Generate hero and villain names from the world of quirks"
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

export default MyHeroAcademia; 