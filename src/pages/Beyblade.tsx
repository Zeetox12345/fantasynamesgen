import { Sword } from "lucide-react";
import { CategoryLayout } from "@/components/CategoryLayout";
import { GeneratorCard } from "@/components/GeneratorCard";

const Beyblade = () => {
  const generators = [
    {
      title: "Blader Names",
      description: "Generate powerful names for Beyblade competitors",
      href: "/beyblade/blader"
    },
    {
      title: "Beyblade Names",
      description: "Create epic names for your spinning tops",
      href: "/beyblade/top"
    },
    {
      title: "Special Move Names",
      description: "Generate dramatic names for special attacks",
      href: "/beyblade/move"
    }
  ];

  return (
    <CategoryLayout
      title="Beyblade"
      description="Generate powerful blader names and Beyblade names"
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

export default Beyblade; 