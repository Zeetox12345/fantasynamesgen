import { Wand2 } from "lucide-react";
import { CategoryLayout } from "@/components/CategoryLayout";
import { GeneratorCard } from "@/components/GeneratorCard";
import { Helmet } from "react-helmet";

const WorldOfWarcraft = () => {
  const generators = [
    {
      title: "Nightborne Mage Name Generator",
      description: "Create mystical names for the arcane-wielding Nightborne mages",
      href: "/worldofwarcraft/nightborne-mage",
      image: "/images/categories/worldofwarcraft/nightborne-mage/nightborne-mage-main.jpg"
    },
    {
      title: "Orc Warrior Name Generator",
      description: "Generate powerful names for your Horde orc warriors",
      href: "/worldofwarcraft/orc-warrior",
      image: "/images/categories/worldofwarcraft/orc-warrior/orc-warrior-main.jpg"
    },
    {
      title: "Orc Shaman Name Generator",
      description: "Create spiritual names for orc shamans connected to the elements",
      href: "/worldofwarcraft/orc-shaman",
      image: "/images/categories/worldofwarcraft/orc-shaman/orc-shaman-main.jpg"
    },
    {
      title: "Mag'har Orc Name Generator",
      description: "Generate authentic names for the uncorrupted Mag'har orcs",
      href: "/worldofwarcraft/maghar-orc",
      image: "/images/categories/worldofwarcraft/maghar-orc/maghar-orc-main.jpg"
    },
    {
      title: "Earthen Dwarf Name Generator",
      description: "Create stony names for the titan-forged Earthen dwarves",
      href: "/worldofwarcraft/earthen-dwarf",
      image: "/images/categories/worldofwarcraft/earthen-dwarf/earthen-dwarf-main.jpg"
    }
  ];

  return (
    <>
      <Helmet>
        <title>World of Warcraft Name Generators - 50,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 50,000+ authentic names for World of Warcraft races and classes. Create perfect characters for Nightborne mages, Orc warriors, Orc shamans, Mag'har orcs, and Earthen dwarves with our free name generators!" />
        <meta name="keywords" content="World of Warcraft, WoW, Name Generator, Nightborne, Orc, Mag'har, Earthen Dwarf, Blizzard, Character Names, Roleplaying, Dragonflight" />
      </Helmet>
      <CategoryLayout
        title="World of Warcraft"
        description="Generate authentic names for races and classes from the world of Azeroth"
        icon={<Wand2 className="w-6 h-6" />}
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
    </>
  );
};

export default WorldOfWarcraft; 