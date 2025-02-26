import { Shield } from "lucide-react";
import { CategoryLayout } from "@/components/CategoryLayout";
import { GeneratorCard } from "@/components/GeneratorCard";

const Halo = () => {
  const generators = [
    {
      title: "Spartan Names",
      description: "Generate powerful names for Spartan super-soldiers",
      href: "/halo/spartan"
    },
    {
      title: "AI Names",
      description: "Create unique names for AI companions and systems",
      href: "/halo/ai"
    },
    {
      title: "Planet Names",
      description: "Generate names for planets and locations in the Halo universe",
      href: "/halo/planet"
    }
  ];

  return (
    <CategoryLayout
      title="Halo"
      description="Generate sci-fi names for Spartans, AIs, and locations in the Halo universe"
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

export default Halo; 