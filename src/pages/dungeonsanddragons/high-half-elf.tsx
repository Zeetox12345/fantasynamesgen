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

const HighHalfElfNameGenerator = () => {
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
        const data = await import('@/data/dnd/high-half-elf.json');
        setNameData(data.default || data);
      } catch (error) {
        console.error("Error loading D&D high half-elf name data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.highHalfElfNames || !nameData.highHalfElfNames.length) {
      console.error("No D&D high half-elf name data available");
      return;
    }
    
    // Randomly select 10 names from the data
    const shuffled = [...nameData.highHalfElfNames].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setGeneratedNames(selected.map(entry => entry.name));
  };

  const handleNameClick = (name: string) => {
    if (!nameData || !nameData.highHalfElfNames) return;
    
    setSelectedName(name);
    
    // Find the description for the selected name
    const nameEntry = nameData.highHalfElfNames.find(entry => entry.name === name);
    if (nameEntry) {
      setNameDescription(nameEntry.description);
    } else {
      setNameDescription(null);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>DnD High Half-Elf Name Generator - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ elegant and noble names for high half-elf characters in Dungeons & Dragons. Create the perfect name for your next D&D campaign!" />
        <meta name="keywords" content="D&D, DnD, Dungeons and Dragons, half-elf names, high half-elf, fantasy names, RPG character names, D&D 5e" />
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
            <h1 className="font-display text-3xl sm:text-4xl font-bold">DnD High Half-Elf Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate elegant and noble names for high half-elf characters in Dungeons & Dragons.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate High Half-Elf Names</CardTitle>
            <CardDescription>Create elegant and noble names for high half-elf characters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate high half-elf names"
              >
                {loading ? "Loading..." : "Generate Names"}
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What Makes a Good High Half-Elf Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">High Half-Elf Naming Traditions</a>
              </li>
              <li>
                <a href="#popular-names" className="text-primary hover:underline">Popular High Half-Elf Names</a>
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
              High half-elves represent a unique blend of human adaptability and the refined elegance of high elven society. 
              These individuals often inherit the grace and magical affinity of their high elven heritage, combined with 
              the ambition and versatility of their human ancestry.
            </p>
            <p className="mb-4">
              In Dungeons & Dragons, high half-elves typically have names that reflect their connection to high elven 
              culture, often incorporating elements that evoke nobility, arcane knowledge, and ancient traditions. Their 
              names tend to be melodic and sophisticated, with a distinctly aristocratic quality.
            </p>
            <p>
              Whether you're creating a character for your next D&D campaign, writing fantasy fiction, or 
              developing an NPC for your homebrew world, this generator provides elegant and noble 
              options for high half-elf characters that capture their refined heritage and magical aptitude.
            </p>
          </div>
          
          {/* Hero Image */}
          <GeneratorImage 
            src="/images/categories/dungeonsanddragons/high-half-elf/high-half-elf-main.jpg" 
            alt="High Half-Elf Names" 
            caption="Create elegant and noble names for high half-elf characters in Dungeons & Dragons"
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good High Half-Elf Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A compelling high half-elf name should reflect the character's noble heritage and refined nature:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Elegant Sounds:</span> 
                <span>The best high half-elf names often incorporate flowing vowels and soft consonants that create a melodic, refined sound.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Arcane Elements:</span> 
                <span>Names that subtly reference magic, stars, light, or ancient knowledge can reflect the high elven affinity for arcane arts.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Noble Qualities:</span> 
                <span>References to virtues, wisdom, or leadership can emphasize the aristocratic heritage often associated with high elves.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Human Influence:</span> 
                <span>Despite their refined elven qualities, good high half-elf names often incorporate some human elements, reflecting their dual heritage.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ancient Roots:</span> 
                <span>Names that evoke ancient traditions or lineages can connect the character to the long history of high elven culture.</span>
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
                <span>Click the "Generate Names" button to create a list of high half-elf names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">2.</span> 
                <span>Click on any name to see more details about its meaning, origin, or cultural significance.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">3.</span> 
                <span>Generate as many times as you like until you find the perfect name for your character.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">4.</span> 
                <span>Consider combining different names or elements to create a unique full name that fits your character's noble background.</span>
              </li>
            </ol>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">High Half-Elf Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              High half-elves have distinctive naming traditions that reflect their connection to high elven culture and their mixed heritage:
            </p>
            <ul className="space-y-4 mb-6">
              <li>
                <h3 className="font-semibold text-primary text-lg">Ancestral Names</h3>
                <p>Many high half-elves receive names that honor ancestors from either their elven or human lineage, often with a preference for elven names that connect them to ancient and prestigious bloodlines.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Arcane References</h3>
                <p>Some high half-elves are named after celestial bodies, magical phenomena, or concepts related to arcane knowledge, reflecting the high elven affinity for magic and the stars.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Noble Titles</h3>
                <p>High half-elves from aristocratic backgrounds might incorporate elements of titles or honorifics into their names, emphasizing their connection to elven nobility even if they live primarily among humans.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Dual-Culture Names</h3>
                <p>Many high half-elves have names that deliberately blend high elven and human naming conventions, creating elegant combinations that honor both sides of their heritage while maintaining an air of refinement.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Virtue Names</h3>
                <p>Names that reference virtues, wisdom, or leadership qualities are common among high half-elves, reflecting the values prized in high elven society and their often diplomatic role between cultures.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* Popular Names */}
        <section id="popular-names" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Popular High Half-Elf Names</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Some well-known high half-elf names from D&D lore and popular culture include:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[120px]">Caladrel Starweaver:</span> 
                <span>A name combining elven elegance with a reference to celestial magic.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[120px]">Elindra Silverleaf:</span> 
                <span>A melodic name paired with a nature-inspired noble surname.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[120px]">Thalion Evenstar:</span> 
                <span>A name referencing both strength and celestial beauty.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[120px]">Aravel Moonwhisper:</span> 
                <span>A name evoking mystery and connection to lunar magic.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[120px]">Lysander Aeliron:</span> 
                <span>A name blending human and high elven naming traditions.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[120px]">Valindra Spellsong:</span> 
                <span>A name suggesting both beauty and arcane talent.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Latest Generators */}
        <section id="latest-generators" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Latest Generators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Male Half-Elf Name Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Create authentic and diverse names for male half-elf characters</p>
                <Link to="/dungeonsanddragons/male-half-elf" onClick={() => window.scrollTo(0, 0)}>
                  <Button variant="outline" size="sm" className="w-full">Explore</Button>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Wood Half-Elf Name Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Generate nature-inspired names for wood half-elf characters</p>
                <Link to="/dungeonsanddragons/wood-half-elf" onClick={() => window.scrollTo(0, 0)}>
                  <Button variant="outline" size="sm" className="w-full">Explore</Button>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Drow Half-Elf Name Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Create mysterious and exotic names for drow half-elf characters</p>
                <Link to="/dungeonsanddragons/drow-half-elf" onClick={() => window.scrollTo(0, 0)}>
                  <Button variant="outline" size="sm" className="w-full">Explore</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HighHalfElfNameGenerator; 