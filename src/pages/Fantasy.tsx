import { Wand2 } from "lucide-react";
import { CategoryLayout } from "@/components/CategoryLayout";
import { GeneratorCard } from "@/components/GeneratorCard";

const Fantasy = () => {
  const generators = [
    {
      title: "Ranger Names",
      description: "Generate names for skilled wilderness trackers and hunters",
      href: "/fantasy/ranger",
      image: "/images/categories/fantasy/ranger/ranger-main.jpg"
    },
    {
      title: "Dark Ranger Names",
      description: "Create shadowy and mysterious names for dark rangers",
      href: "/fantasy/dark-ranger",
      image: "/images/categories/fantasy/dark-ranger/dark-ranger-main.jpg"
    },
    {
      title: "ACOTAR Names",
      description: "Generate names inspired by the Court of Thorns and Roses series",
      href: "/fantasy/acotar",
      image: "/images/categories/fantasy/acotar/acotar-main.jpg"
    },
    {
      title: "Female Alien Names",
      description: "Create exotic and otherworldly names for female aliens",
      href: "/fantasy/female-alien",
      image: "/images/categories/fantasy/female-alien/femalealien-main.jpg"
    },
    {
      title: "Space Ranger Names",
      description: "Generate futuristic names for space rangers and cosmic defenders",
      href: "/fantasy/space-ranger",
      image: "/images/categories/fantasy/space-ranger/space-ranger-main.jpg"
    },
    {
      title: "Dwarf Ranger Names",
      description: "Create strong and rugged names for dwarven rangers and scouts",
      href: "/fantasy/dwarf-ranger",
      image: "/images/categories/fantasy/dwarf-ranger/dwarf-ranger-main.jpg"
    },
    {
      title: "Elven Ranger Names",
      description: "Generate mystical and nature-attuned names for elven rangers",
      href: "/fantasy/elven-ranger",
      image: "/images/categories/fantasy/elven-ranger/elven-ranger-main.jpg"
    },
    {
      title: "Halfling Ranger Names",
      description: "Create nimble and clever names for halfling scouts and rangers",
      href: "/fantasy/halfling-ranger",
      image: "/images/categories/fantasy/halfling-ranger/halfling-ranger-main.jpg"
    },
    {
      title: "Chaos Dwarf City Names",
      description: "Generate dark and imposing names for chaos dwarf settlements",
      href: "/fantasy/chaos-dwarf-city",
      image: "/images/categories/fantasy/chaos-dwarf-city/chaos-dwarf-city-main.jpg"
    },
    {
      title: "Merfolk City Names",
      description: "Generate mystical underwater city names for merfolk civilizations",
      href: "/fantasy/merfolk-city",
      image: "/images/categories/fantasy/merfolk-city/merfolk-city-main.jpg"
    },
    {
      title: "Sea God Names",
      description: "Create powerful and majestic names for gods and deities of the oceans",
      href: "/fantasy/sea-god",
      image: "/images/categories/fantasy/sea-god/sea-god-main.jpg"
    },
    {
      title: "Reindeer Names",
      description: "Generate magical and enchanting names for fantasy reindeers",
      href: "/fantasy/reindeer",
      image: "/images/categories/fantasy/reindeer/reindeer-main.jpg"
    },
    {
      title: "Female Demon Names",
      description: "Create dark and powerful names for female demons from fantasy realms",
      href: "/fantasy/female-demon",
      image: "/images/categories/fantasy/female-demon/female-demon-main.jpg"
    },
    {
      title: "Male Demon Names",
      description: "Generate intimidating and dark names for male demons from the abyss",
      href: "/fantasy/male-demon",
      image: "/images/categories/fantasy/male-demon/male-demon-main.jpg"
    }
  ];

  return (
    <CategoryLayout
      title="Fantasy"
      description="Generate names for rangers, mythical creatures, demons, gods, and magical places from enchanted realms"
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
  );
};

export default Fantasy;
