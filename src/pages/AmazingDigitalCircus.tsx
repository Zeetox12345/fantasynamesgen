import { Theater } from "lucide-react";
import { CategoryLayout } from "@/components/CategoryLayout";
import { GeneratorCard } from "@/components/GeneratorCard";

const AmazingDigitalCircus = () => {
  const generators = [
    {
      title: "Performer Names",
      description: "Generate quirky names for digital circus performers",
      href: "/tadc/performer"
    },
    {
      title: "Show Names",
      description: "Create catchy titles for digital circus performances",
      href: "/tadc/show"
    },
    {
      title: "Glitch Names",
      description: "Generate eerie names for digital anomalies",
      href: "/tadc/glitch"
    }
  ];

  return (
    <CategoryLayout
      title="The Amazing Digital Circus"
      description="Generate quirky digital performer names for your TADC OCs"
      icon={<Theater className="w-6 h-6" />}
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

export default AmazingDigitalCircus; 