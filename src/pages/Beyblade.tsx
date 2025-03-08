import { Sword } from "lucide-react";
import { CategoryLayout } from "@/components/CategoryLayout";
import { GeneratorCard } from "@/components/GeneratorCard";

const Beyblade = () => {
  const generators = [
    {
      title: "Beyblade Name Generator",
      description: "Create powerful and epic names for your Beyblade",
      href: "/beyblade/beyblade-names",
      image: "/images/categories/beyblade/beyblade-names/beyblade-names-main.jpg"
    },
    {
      title: "Beyblade Burst Name Generator",
      description: "Generate modern names for Beyblade Burst series beyblades",
      href: "/beyblade/burst",
      image: "/images/categories/beyblade/burst/burst-main.jpg"
    },
    {
      title: "Beyblade Special Move Name Generator",
      description: "Create epic special move names for your Beyblade battles",
      href: "/beyblade/special-move",
      image: "/images/categories/beyblade/special-move/special-move-main.jpg"
    }
  ];

  return (
    <CategoryLayout
      title="Beyblade"
      description="Generate powerful names for beyblades, special moves, and more from the world of spinning tops"
      icon={<Sword className="w-6 h-6" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {generators.map((generator) => (
          <GeneratorCard
            key={generator.title}
            title={generator.title}
            description={generator.description}
            href={generator.href}
            image={generator.image}
          />
        ))}
      </div>
    </CategoryLayout>
  );
};

export default Beyblade; 