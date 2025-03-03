import { Skull } from "lucide-react";
import { CategoryLayout } from "@/components/CategoryLayout";
import { GeneratorCard } from "@/components/GeneratorCard";

const Lovecraftian = () => {
  const generators = [
    {
      title: "Female Lovecraftian Names",
      description: "Generate eerie and mysterious names for female characters in cosmic horror settings",
      href: "/lovecraftian/female",
      image: "/images/categories/lovecraftian/female-lovecraftian/female-lovecraftian-main.jpg"
    },
    {
      title: "Lovecraftian Town Names",
      description: "Create names for isolated, fog-shrouded towns with dark secrets",
      href: "/lovecraftian/town",
      image: "/images/categories/lovecraftian/lovecraftian-town/lovecraftian-town-main.jpg"
    },
    {
      title: "Lovecraftian Cult Names",
      description: "Generate names for secretive cults worshipping ancient cosmic entities",
      href: "/lovecraftian/cult",
      image: "/images/categories/lovecraftian/lovecraftian-cult/lovecraftian-cult-main.jpg"
    },
    {
      title: "Lovecraftian Monster Names",
      description: "Create names for indescribable horrors from beyond the stars",
      href: "/lovecraftian/monster",
      image: "/images/categories/lovecraftian/lovecraftian-monster/lovecraftian-monster-main.jpg"
    },
    {
      title: "Lovecraftian Deity Names",
      description: "Generate names for ancient, incomprehensible cosmic entities",
      href: "/lovecraftian/deity",
      image: "/images/categories/lovecraftian/lovecraftian-deity/lovecraftian-deity-main.jpg"
    }
  ];

  return (
    <CategoryLayout
      title="Lovecraftian"
      description="Generate names for cosmic horror settings inspired by H.P. Lovecraft's mythos - from ancient deities to cursed towns"
      icon={<Skull className="w-6 h-6" />}
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

export default Lovecraftian; 