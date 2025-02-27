import { Wand2, Sword, Skull, Crown, Gamepad, Heart, Atom, Shield, Trees, Sun, Book, Ship, Theater } from "lucide-react";
import { CategoryCard } from "@/components/CategoryCard";

// Active categories - only Fantasy is visible
const categories = [
  {
    title: "Fantasy",
    description: "Generate names for elves, dwarves, and magical beings",
    icon: <Wand2 className="w-6 h-6" />,
    href: "/fantasy",
    image: "/images/categories/fantasy/fantasy-main.jpg"
  }
];

/* HIDDEN CATEGORIES - TO RESTORE ALL CATEGORIES:
 * 1. Delete the categories array above
 * 2. Uncomment this entire block and remove the comment markers
 *
const categories = [
  {
    title: "Fantasy",
    description: "Generate names for elves, dwarves, and magical beings",
    icon: <Wand2 className="w-6 h-6" />,
    href: "/fantasy",
    image: "/images/categories/fantasy/fantasy-main.jpg"
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
    title: "Splatoon",
    description: "Create quirky and colorful Inkling names",
    icon: <Gamepad className="w-6 h-6" />,
    href: "/splatoon"
  },
  {
    title: "Kenshi",
    description: "Post-apocalyptic and warrior names",
    icon: <Sword className="w-6 h-6" />,
    href: "/kenshi"
  },
  {
    title: "Undertale",
    description: "Unique and charming character names",
    icon: <Heart className="w-6 h-6" />,
    href: "/undertale"
  },
  {
    title: "Diablo",
    description: "Dark fantasy and demonic names",
    icon: <Skull className="w-6 h-6" />,
    href: "/diablo"
  },
  {
    title: "Fallout",
    description: "Post-apocalyptic wasteland names",
    icon: <Atom className="w-6 h-6" />,
    href: "/fallout"
  },
  {
    title: "Lord of the Rings",
    description: "Middle-earth inspired names",
    icon: <Crown className="w-6 h-6" />,
    href: "/lotr"
  },
  {
    title: "Halo",
    description: "Sci-fi and Spartan warrior names",
    icon: <Shield className="w-6 h-6" />,
    href: "/halo"
  },
  {
    title: "Path of Exile",
    description: "Dark fantasy character names",
    icon: <Shield className="w-6 h-6" />,
    href: "/poe"
  },
  {
    title: "Baldur's Gate 3",
    description: "D&D-inspired character names",
    icon: <Crown className="w-6 h-6" />,
    href: "/bg3"
  },
  {
    title: "The Witcher",
    description: "Names inspired by the world of monster hunters",
    icon: <Sword className="w-6 h-6" />,
    href: "/witcher"
  },
  {
    title: "ESO",
    description: "Elder Scrolls Online character names",
    icon: <Crown className="w-6 h-6" />,
    href: "/eso"
  },
  {
    title: "Stardew Valley",
    description: "Cozy farm and village names",
    icon: <Trees className="w-6 h-6" />,
    href: "/stardew"
  },
  {
    title: "Avatar: The Last Airbender",
    description: "Names from the four nations",
    icon: <Sun className="w-6 h-6" />,
    href: "/avatar"
  },
  {
    title: "Roblox",
    description: "Fun and creative usernames",
    icon: <Gamepad className="w-6 h-6" />,
    href: "/roblox"
  },
  {
    title: "Animal Crossing",
    description: "Cute island and villager names",
    icon: <Trees className="w-6 h-6" />,
    href: "/animalcrossing"
  },
  {
    title: "Warhammer",
    description: "Epic names from the grimdark future",
    icon: <Book className="w-6 h-6" />,
    href: "/warhammer"
  },
  {
    title: "Dragon Age",
    description: "Fantasy RPG character names",
    icon: <Book className="w-6 h-6" />,
    href: "/dragonage"
  },
  {
    title: "Sunless Sea",
    description: "Gothic naval and horror names",
    icon: <Ship className="w-6 h-6" />,
    href: "/sunlesssea"
  },
  {
    title: "Lovecraftian",
    description: "Cosmic horror and ancient deity names",
    icon: <Skull className="w-6 h-6" />,
    href: "/lovecraftian"
  },
  {
    title: "Zelda",
    description: "Names from Hyrule and beyond",
    icon: <Sun className="w-6 h-6" />,
    href: "/zelda"
  },
  {
    title: "My Hero Academia",
    description: "Hero and villain names",
    icon: <Heart className="w-6 h-6" />,
    href: "/mha"
  },
  {
    title: "Beyblade",
    description: "Powerful blader names",
    icon: <Sword className="w-6 h-6" />,
    href: "/beyblade"
  },
  {
    title: "Elden Ring",
    description: "Names from the Lands Between",
    icon: <Sword className="w-6 h-6" />,
    href: "/eldenring"
  },
  {
    title: "Star Trek",
    description: "Names from across the galaxy",
    icon: <Atom className="w-6 h-6" />,
    href: "/startrek"
  },
  {
    title: "The Amazing Digital Circus",
    description: "Quirky digital performer names",
    icon: <Theater className="w-6 h-6" />,
    href: "/tadc"
  },
  {
    title: "World of Warcraft",
    description: "Names for all races of Azeroth",
    icon: <Wand2 className="w-6 h-6" />,
    href: "/wow"
  }
];
*/

const Index = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 heading-gradient animate-float">
            Fantasy Name Generators
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
              image={category.image}
            />
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-24 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>Copyright 2025 – FantasyNamesGen</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
