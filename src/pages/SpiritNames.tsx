import { Ghost } from "lucide-react";
import { CategoryLayout } from "@/components/CategoryLayout";
import { GeneratorCard } from "@/components/GeneratorCard";

const SpiritNames = () => {
  const generators = [
    {
      title: "Indian Spirit Names",
      description: "Generate mystical names inspired by Native American spiritual traditions",
      href: "/spirit-names/indian-spirit",
      image: "/images/categories/spirit-names/indian-spirit/indian-spirit-main.jpg"
    },
    {
      title: "JJK Cursed Spirit Names",
      description: "Create dark and powerful names for cursed spirits from Jujutsu Kaisen",
      href: "/spirit-names/jjk-cursed-spirit",
      image: "/images/categories/spirit-names/jjk-cursed-spirit/jjk-cursed-spirit-main.jpg"
    },
    {
      title: "Nature Spirit Names",
      description: "Generate names for spirits that embody the essence of the natural world",
      href: "/spirit-names/nature-spirit",
      image: "/images/categories/spirit-names/nature-spirit/nature-spirit-main.jpg"
    },
    {
      title: "Water Spirit Names",
      description: "Create mystical names for spirits of rivers, lakes, oceans, and other water bodies",
      href: "/spirit-names/water-spirit",
      image: "/images/categories/spirit-names/water-spirit/water-spirit-main.jpg"
    },
    {
      title: "Fox Spirit Names",
      description: "Generate names for cunning and magical fox spirits from various mythologies",
      href: "/spirit-names/fox-spirit",
      image: "/images/categories/spirit-names/fox-spirit/fox-spirit-main.jpg"
    }
  ];

  return (
    <CategoryLayout
      title="Spirit Names"
      description="Generate names for mystical spirits from various cultures and mythologies"
      icon={<Ghost className="w-6 h-6" />}
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

export default SpiritNames; 