import { Sun } from "lucide-react";
import { CategoryLayout } from "@/components/CategoryLayout";
import { GeneratorCard } from "@/components/GeneratorCard";

const Avatar = () => {
  const generators = [
    {
      title: "Water Tribe Names",
      description: "Generate names for the Northern and Southern Water Tribes",
      href: "/avatar/water"
    },
    {
      title: "Earth Kingdom Names",
      description: "Create names for citizens of the Earth Kingdom",
      href: "/avatar/earth"
    },
    {
      title: "Fire Nation Names",
      description: "Generate powerful names for Fire Nation characters",
      href: "/avatar/fire"
    }
  ];

  return (
    <CategoryLayout
      title="Avatar: The Last Airbender"
      description="Generate names from the four nations of the Avatar world"
      icon={<Sun className="w-6 h-6" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {generators.map((generator) => (
          <GeneratorCard
            key={generator.title}
            title={generator.title}
            description={generator.description}
            href={generator.href}
          />
        ))}
      </div>
    </CategoryLayout>
  );
};

export default Avatar; 