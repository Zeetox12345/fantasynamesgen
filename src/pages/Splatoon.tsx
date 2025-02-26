
import { Gamepad } from "lucide-react";
import { CategoryLayout } from "@/components/CategoryLayout";
import { GeneratorCard } from "@/components/GeneratorCard";

const Splatoon = () => {
  const generators = [
    {
      title: "Inkling Names",
      description: "Generate fresh and funky names for your Inkling character",
      href: "/splatoon/inkling"
    },
    {
      title: "Team Names",
      description: "Create colorful and catchy names for your Splatoon team",
      href: "/splatoon/team"
    },
    {
      title: "Plaza Names",
      description: "Generate creative names for your plaza posts and artwork",
      href: "/splatoon/plaza"
    }
  ];

  return (
    <CategoryLayout
      title="Splatoon"
      description="Generate quirky and colorful names for your Inkling characters and teams"
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

export default Splatoon;
