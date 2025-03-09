import { useState, useEffect } from "react";
import { Sword, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Helmet } from "react-helmet";
import { GeneratorImage } from "@/components/GeneratorImage";

const BlacksmithNameGenerator = () => {
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [nameData, setNameData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [nameDescription, setNameDescription] = useState<string | null>(null);

  // Load name data when component mounts
  useEffect(() => {
    async function fetchNameData() {
      setLoading(true);
      try {
        // Import the data directly
        const data = await import('@/data/dnd/blacksmith.json');
        setNameData(data.default || data);
      } catch (error) {
        console.error("Error loading D&D blacksmith name data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.blacksmithNames || !nameData.blacksmithNames.length) {
      console.error("No D&D blacksmith name data available");
      return;
    }
    
    // Randomly select 10 names from the data
    const shuffled = [...nameData.blacksmithNames].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setGeneratedNames(selected.map(entry => entry.name));
  };

  const handleNameClick = (name: string) => {
    if (!nameData || !nameData.blacksmithNames) return;
    
    setSelectedName(name);
    
    // Find the description for the selected name
    const nameEntry = nameData.blacksmithNames.find(entry => entry.name === name);
    if (nameEntry) {
      setNameDescription(nameEntry.description);
    } else {
      setNameDescription(null);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>DnD Blacksmith Name Generator - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ memorable names for blacksmiths and their forges in your DnD world. Create authentic craftsmen for your fantasy campaign with our free name generator!" />
        <meta name="keywords" content="DnD, Dungeons and Dragons, blacksmith names, forge names, fantasy craftsmen, dwarf blacksmith, RPG, tabletop games" />
      </Helmet>
      <div className="max-w-7xl mx-auto">
        {/* Header with back button */}
        <div className="mb-6 sm:mb-8">
          <Link 
            to="/dungeonsanddragons" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4 sm:mb-6"
            onClick={() => window.scrollTo(0, 0)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            Back to Dungeons and Dragons
          </Link>
          
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 rounded-lg bg-primary/10 text-primary">
              <Sword className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">DnD Blacksmith Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate memorable names for blacksmiths and their forges in your DnD world.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Blacksmith Names</CardTitle>
            <CardDescription>Create memorable names for blacksmiths and their forges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate blacksmith names"
              >
                {loading ? "Loading..." : "Generate Blacksmith Names"}
              </Button>
              
              {loading && <p>Loading name data...</p>}
              
              {!loading && generatedNames.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
                  {generatedNames.map((name, index) => (
                    <Dialog key={index}>
                      <DialogTrigger asChild>
                        <div 
                          className="p-3 sm:p-4 rounded-md bg-secondary/20 border border-border hover:border-primary cursor-pointer flex justify-between items-center"
                          onClick={() => handleNameClick(name)}
                        >
                          <span>{name}</span>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{selectedName}</DialogTitle>
                          <DialogDescription>
                            {nameDescription || "No description available."}
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Content Table */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Contents</h2>
          <nav aria-label="Page contents">
            <ul className="space-y-2">
              <li>
                <a href="#introduction" className="text-primary hover:underline">Introduction</a>
              </li>
              <li>
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What Makes a Good Blacksmith Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#blacksmith-culture" className="text-primary hover:underline">Blacksmiths in DnD Culture</a>
              </li>
              <li>
                <a href="#forge-names" className="text-primary hover:underline">Naming a Blacksmith's Forge</a>
              </li>
              <li>
                <a href="#latest-generators" className="text-primary hover:underline">Latest Generators</a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Introduction */}
        <section id="introduction" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Introduction</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              In the world of Dungeons & Dragons, blacksmiths are essential figures in every settlement. These 
              skilled craftsmen forge the weapons heroes wield, the armor that protects them, and the tools 
              that build civilizations. A memorable blacksmith can become a recurring NPC, a valuable ally, 
              or even a quest-giver in your campaign.
            </p>
            <p className="mb-4">
              Blacksmith names in DnD often reflect their craft, heritage, and reputation. They might incorporate 
              references to fire, metal, or famous creations, while also carrying the cultural markers of their 
              race—whether human, dwarf, elf, or another species known for metalworking.
            </p>
            <p>
              Whether you're creating a village smithy, a master weaponsmith for a major city, or a legendary 
              artisan known throughout the realm, this generator provides names that evoke the heat of the forge 
              and the strength of well-crafted steel.
            </p>
          </div>
          
          {/* Hero Image */}
          <GeneratorImage 
            src="/images/categories/dungeonsanddragons/blacksmith/blacksmith-main.jpg" 
            alt="DnD Blacksmith Names" 
            caption="Create memorable names for blacksmiths and their forges in your DnD world"
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Blacksmith Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A compelling blacksmith name should evoke their craft and character:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Craft References:</span> 
                <span>Names that incorporate terms related to forging, metal, or fire (like Ironhand, Steelhammer, or Emberforge) immediately connect to their profession.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Cultural Elements:</span> 
                <span>Different races have distinct naming conventions—dwarven smiths might have names with hard consonants, while elven smiths might have more flowing, elegant names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Reputation Indicators:</span> 
                <span>Names or titles that hint at the quality of their work or a famous creation (like "Dragonbane" or "Mastersmith") add depth to their character.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Family Traditions:</span> 
                <span>Many blacksmiths come from long lines of smiths, so names that suggest heritage or dynasty can imply generations of knowledge.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Descriptive Traits:</span> 
                <span>Physical characteristics often become nicknames for blacksmiths (like "One-eye," "Strongarm," or "Sootbeard"), reflecting the hazards and demands of their work.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* How to Use */}
        <section id="how-to-use" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">How to Use the Generator</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Using this generator is simple:
            </p>
            <ol className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">1.</span> 
                <span>Click the "Generate Blacksmith Names" button to create a list of memorable names for smiths and their forges.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">2.</span> 
                <span>Click on any name to see more details about the potential characteristics or specialties of that particular blacksmith.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">3.</span> 
                <span>Generate as many times as you like until you find the perfect name for your NPC or location.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">4.</span> 
                <span>Use the descriptions as inspiration for developing the blacksmith's personality, appearance, and role in your campaign.</span>
              </li>
            </ol>
          </div>
        </section>

        {/* Blacksmith Culture */}
        <section id="blacksmith-culture" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Blacksmiths in DnD Culture</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Understanding the role of blacksmiths across different cultures can enrich your game:
            </p>
            <ul className="space-y-4 mb-6">
              <li>
                <h3 className="font-semibold text-primary text-lg">Dwarven Smiths</h3>
                <p>Renowned throughout most D&D settings, dwarven blacksmiths are often considered the finest metalworkers. Their forges are typically clan-based operations passed down through generations, with secret techniques jealously guarded. Many specialize in weapons and armor designed specifically for fighting orcs, goblins, and other traditional enemies.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Elven Smiths</h3>
                <p>Elven blacksmiths focus on elegance and magical enhancement rather than brute strength. Their works often incorporate flowing designs, lightweight materials, and enchantments that complement elven fighting styles. Many elven smiths specialize in specific weapons like bows or slender blades.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Human Smiths</h3>
                <p>The most versatile of blacksmiths, humans adapt techniques from various cultures and are known for innovation. In human settlements, blacksmiths often serve as community fixtures who create everything from weapons to agricultural tools, and frequently double as farriers or general metalworkers.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Orcish Smiths</h3>
                <p>Often overlooked, orcish blacksmiths create brutally effective weapons designed for raw power. Their forges tend to be crude but functional, and their naming conventions often emphasize strength, fear, or tribal affiliations.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Gnomish Smiths</h3>
                <p>Gnome blacksmiths typically specialize in intricate mechanisms and innovative designs rather than traditional weaponry. Their names often reflect their inventive nature or the unusual features of their creations.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* Forge Names */}
        <section id="forge-names" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Naming a Blacksmith's Forge</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A blacksmith's forge often has its own name, serving as both business identity and reputation marker:
            </p>
            <ul className="space-y-4 mb-6">
              <li>
                <h3 className="font-semibold text-primary text-lg">Family Names</h3>
                <p>Many forges simply bear the family name of their owners, such as "Hammerfall Smithy" or "Ironheart Forge," establishing a brand that can persist across generations.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Symbolic Names</h3>
                <p>Forges often take names that represent their craft or aspirations, like "The Blazing Anvil," "Dragonfire Forge," or "The Tempered Blade," creating an immediate impression of their work.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Location-Based Names</h3>
                <p>Some smithies are named for their location within a settlement, such as "Harbor Forge," "North Gate Smithy," or "Undercity Anvil," making them easy for customers to find.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Specialty Names</h3>
                <p>Forges that specialize in particular items often incorporate this into their names, like "Warhammer Works," "Fine Blade Smithy," or "Dwarven Armor Forge," attracting specific clientele.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Reputation Names</h3>
                <p>Established smithies might be known by names that reflect their quality or history, such as "Master's Touch," "Royal Appointed Forge," or "Century Anvil," indicating their standing in the community.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* Latest Generators */}
        <section id="latest-generators" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Latest Generators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Elf Druid Name Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Generate nature-attuned names for elven druids and their circles</p>
                <Link to="/dungeonsanddragons/elf-druid" onClick={() => window.scrollTo(0, 0)}>
                  <Button variant="outline" size="sm" className="w-full">Try Generator</Button>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Deep Gnome City Name Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Create mysterious and underground names for deep gnome settlements</p>
                <Link to="/dungeonsanddragons/deep-gnome-city" onClick={() => window.scrollTo(0, 0)}>
                  <Button variant="outline" size="sm" className="w-full">Try Generator</Button>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Female Half-Elf Name Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Generate elegant and diverse names for female half-elf characters</p>
                <Link to="/dungeonsanddragons/female-half-elf" onClick={() => window.scrollTo(0, 0)}>
                  <Button variant="outline" size="sm" className="w-full">Try Generator</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlacksmithNameGenerator; 