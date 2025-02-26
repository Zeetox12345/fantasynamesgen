
import { Wand2, Sword, Skull, Crown } from "lucide-react";
import { CategoryCard } from "@/components/CategoryCard";

const categories = [
  {
    title: "Fantasy",
    description: "Generate names for elves, dwarves, and magical beings",
    icon: <Wand2 className="w-6 h-6" />,
    href: "/fantasy"
  },
  {
    title: "Dungeons & Dragons",
    description: "Create names for your next D&D character",
    icon: <Crown className="w-6 h-6" />,
    href: "/dnd"
  },
  {
    title: "Skyrim",
    description: "Nordic and fantasy names from The Elder Scrolls",
    icon: <Crown className="w-6 h-6" />,
    href: "/skyrim"
  },
  {
    title: "The Witcher",
    description: "Names inspired by the world of monster hunters",
    icon: <Sword className="w-6 h-6" />,
    href: "/witcher"
  },
  {
    title: "Lovecraftian",
    description: "Cosmic horror and ancient deity names",
    icon: <Skull className="w-6 h-6" />,
    href: "/lovecraftian"
  },
  {
    title: "World of Warcraft",
    description: "Names for all races of Azeroth",
    icon: <Wand2 className="w-6 h-6" />,
    href: "/wow"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 heading-gradient animate-float">
            Fantasy Name Generator
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate epic names for every realm, world, and universe. Perfect for games, stories, and adventures.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              description={category.description}
              icon={category.icon}
              href={category.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
