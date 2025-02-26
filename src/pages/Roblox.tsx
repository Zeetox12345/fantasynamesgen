import { Gamepad } from "lucide-react";
import { CategoryLayout } from "@/components/CategoryLayout";
import { GeneratorCard } from "@/components/GeneratorCard";

const Roblox = () => {
  const generators = [
    {
      title: "Username Ideas",
      description: "Generate creative and unique Roblox usernames",
      href: "/roblox/username"
    },
    {
      title: "Game Names",
      description: "Create catchy names for your Roblox games",
      href: "/roblox/game"
    },
    {
      title: "Group Names",
      description: "Generate cool names for your Roblox groups",
      href: "/roblox/group"
    }
  ];

  return (
    <CategoryLayout
      title="Roblox"
      description="Generate fun and creative usernames for Roblox"
      icon={<Gamepad className="w-6 h-6" />}
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

export default Roblox; 