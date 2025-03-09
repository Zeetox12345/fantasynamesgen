import { Sword } from "lucide-react";
import { CategoryLayout } from "@/components/CategoryLayout";
import { GeneratorCard } from "@/components/GeneratorCard";

const DungeonsAndDragons = () => {
  const generators = [
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
