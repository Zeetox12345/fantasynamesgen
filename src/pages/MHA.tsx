import { Heart } from "lucide-react";
import { CategoryLayout } from "@/components/CategoryLayout";
import { GeneratorCard } from "@/components/GeneratorCard";

const MyHeroAcademia = () => {
  const generators = [
    {
      title: "Hero Names Based on Powers",
      description: "Create hero names that reflect specific quirks and abilities",
      href: "/mha/hero",
      image: "/images/categories/mha/hero-powers/hero-powers-main.jpg"
    },
    {
      title: "Male Hero Names",
      description: "Generate powerful names for male heroes",
      href: "/mha/male",
      image: "/images/categories/mha/male-hero/male-hero-main.jpg"
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
            image={generator.image}
          />
        ))}
      </div>
    </CategoryLayout>
  );
};

export default MyHeroAcademia; 