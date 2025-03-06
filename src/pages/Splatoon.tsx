import { Gamepad } from "lucide-react";
import { CategoryLayout } from "@/components/CategoryLayout";
import { GeneratorCard } from "@/components/GeneratorCard";

const Splatoon = () => {
  const generators = [
    {
      title: "Band Name Generator",
      description: "Create fresh and funky names for Splatoon bands",
      href: "/splatoon/band",
      image: "/images/categories/splatoon/band/band-main.jpg"
    },
    {
      title: "Idol Group Name Generator",
      description: "Generate catchy names for idol groups in the Splatoon universe",
      href: "/splatoon/idol-group",
      image: "/images/categories/splatoon/idol-group/idol-group-main.jpg"
    },
    {
      title: "Team Name Generator",
      description: "Create colorful and catchy names for your Splatoon team",
      href: "/splatoon/team",
      image: "/images/categories/splatoon/team/team-main.jpg"
    },
    {
      title: "City Name Generator",
      description: "Generate unique names for cities in the world of Splatoon",
      href: "/splatoon/city",
      image: "/images/categories/splatoon/city/city-main.jpg"
    },
    {
      title: "Song Name Generator",
      description: "Create catchy titles for Splatoon songs and tracks",
      href: "/splatoon/song",
      image: "/images/categories/splatoon/song/song-main.jpg"
    },
    {
      title: "Name Tag Generator",
      description: "Generate cool name tags for your Splatoon character",
      href: "/splatoon/name-tag",
      image: "/images/categories/splatoon/name-tag/name-tag-main.jpg"
    }
  ];

  return (
    <CategoryLayout
      title="Splatoon"
      description="Generate colorful names for bands, teams, and more from the world of Inklings"
      icon={<Gamepad className="w-6 h-6" />}
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

export default Splatoon;
