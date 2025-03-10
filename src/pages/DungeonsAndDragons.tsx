import { Sword } from "lucide-react";
import { CategoryLayout } from "@/components/CategoryLayout";
import { GeneratorCard } from "@/components/GeneratorCard";

const DungeonsAndDragons = () => {
  const generators = [
    {
      title: "Male Half-Elf Name Generator",
      description: "Create authentic and diverse names for male half-elf characters",
      href: "/dungeonsanddragons/male-half-elf",
      image: "/images/categories/dungeonsanddragons/male-half-elf/male-half-elf-main.jpg"
    },
    {
      title: "Wood Half-Elf Name Generator",
      description: "Generate nature-inspired names for wood half-elf characters",
      href: "/dungeonsanddragons/wood-half-elf",
      image: "/images/categories/dungeonsanddragons/wood-half-elf/wood-half-elf-main.jpg"
    },
    {
      title: "Drow Half-Elf Name Generator",
      description: "Create mysterious and exotic names for drow half-elf characters",
      href: "/dungeonsanddragons/drow-half-elf",
      image: "/images/categories/dungeonsanddragons/drow-half-elf/drow-half-elf-main.jpg"
    },
    {
      title: "High Half-Elf Name Generator",
      description: "Generate elegant and noble names for high half-elf characters",
      href: "/dungeonsanddragons/high-half-elf",
      image: "/images/categories/dungeonsanddragons/high-half-elf/high-half-elf-main.jpg"
    },
    {
      title: "Gladiator Name Generator",
      description: "Create powerful and memorable names for gladiator characters",
      href: "/dungeonsanddragons/gladiator",
      image: "/images/categories/dungeonsanddragons/gladiator/gladiator-main.jpg"
    },
    {
      title: "Group Name Generator",
      description: "Generate unique and catchy names for adventuring parties and groups",
      href: "/dungeonsanddragons/group",
      image: "/images/categories/dungeonsanddragons/group/group-main.jpg"
    },
    {
      title: "Sorcerer Name Generator",
      description: "Create mystical and powerful names for sorcerer characters",
      href: "/dungeonsanddragons/sorcerer",
      image: "/images/categories/dungeonsanddragons/sorcerer/sorcerer-main.jpg"
    },
    {
      title: "Dwarf Clan Name Generator",
      description: "Generate traditional and robust names for dwarf clans and families",
      href: "/dungeonsanddragons/dwarf-clan",
      image: "/images/categories/dungeonsanddragons/dwarf-clan/dwarf-clan-main.jpg"
    },
    {
      title: "Female Genie Name Generator",
      description: "Create exotic and magical names for female genie characters",
      href: "/dungeonsanddragons/female-genie",
      image: "/images/categories/dungeonsanddragons/female-genie/female-genie-main.jpg"
    },
    {
      title: "Dwarf City Name Generator",
      description: "Create authentic and immersive names for dwarven cities and strongholds",
      href: "/dungeonsanddragons/dwarf-city",
      image: "/images/categories/dungeonsanddragons/dwarf-city/dwarf-city-main.jpg"
    },
    {
      title: "Dark Urge Name Generator",
      description: "Generate mysterious and ominous names for your dark urge characters",
      href: "/dungeonsanddragons/dark-urge",
      image: "/images/categories/dungeonsanddragons/dark-urge/dark-urge-main.jpg"
    },
    {
      title: "Merfolk Name Generator",
      description: "Create flowing and aquatic names for merfolk characters and tribes",
      href: "/dungeonsanddragons/merfolk",
      image: "/images/categories/dungeonsanddragons/merfolk/merfolk-main.jpg"
    },
    {
      title: "Sea Name Generator",
      description: "Generate evocative names for seas, oceans, and other bodies of water",
      href: "/dungeonsanddragons/sea",
      image: "/images/categories/dungeonsanddragons/sea/sea-main.jpg"
    },
    {
      title: "Blacksmith Name Generator",
      description: "Create memorable names for blacksmiths and their forges in your DnD world",
      href: "/dungeonsanddragons/blacksmith",
      image: "/images/categories/dungeonsanddragons/blacksmith/blacksmith-main.jpg"
    },
    {
      title: "Elf Druid Name Generator",
      description: "Generate nature-attuned names for elven druids and their circles",
      href: "/dungeonsanddragons/elf-druid",
      image: "/images/categories/dungeonsanddragons/elf-druid/elf-druid-main.jpg"
    },
    {
      title: "Deep Gnome City Name Generator",
      description: "Create mysterious and underground names for deep gnome settlements",
      href: "/dungeonsanddragons/deep-gnome-city",
      image: "/images/categories/dungeonsanddragons/deep-gnome-city/deep-gnome-city-main.jpg"
    },
    {
      title: "Female Half-Elf Name Generator",
      description: "Generate elegant and diverse names for female half-elf characters",
      href: "/dungeonsanddragons/female-half-elf",
      image: "/images/categories/dungeonsanddragons/female-half-elf/female-half-elf-main.jpg"
    }
  ];

  return (
    <CategoryLayout
      title="Dungeons and Dragons"
      description="Generate authentic names for characters, locations, and more from the world of DnD"
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

export default DungeonsAndDragons;
