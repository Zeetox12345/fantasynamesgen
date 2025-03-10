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

const DwarfClanNameGenerator = () => {
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
        const data = await import('@/data/dnd/dwarf-clan.json');
        setNameData(data.default || data);
      } catch (error) {
        console.error("Error loading D&D dwarf clan name data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.dwarfClanNames || !nameData.dwarfClanNames.length) {
      console.error("No D&D dwarf clan name data available");
      return;
    }
    
    // Randomly select 10 names from the data
    const shuffled = [...nameData.dwarfClanNames].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setGeneratedNames(selected.map(entry => entry.name));
  };

  const handleNameClick = (name: string) => {
    if (!nameData || !nameData.dwarfClanNames) return;
    
    setSelectedName(name);
    
    // Find the description for the selected name
    const nameEntry = nameData.dwarfClanNames.find(entry => entry.name === name);
    if (nameEntry) {
      setNameDescription(nameEntry.description);
    } else {
      setNameDescription(null);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>DnD Dwarf Clan Name Generator - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ traditional and robust names for dwarf clans and families in Dungeons & Dragons. Create the perfect name for your next D&D campaign!" />
        <meta name="keywords" content="D&D, DnD, Dungeons and Dragons, dwarf names, dwarf clan, fantasy names, RPG character names, D&D 5e" />
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
            <h1 className="font-display text-3xl sm:text-4xl font-bold">DnD Dwarf Clan Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate traditional and robust names for dwarf clans and families in Dungeons & Dragons.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Dwarf Clan Names</CardTitle>
            <CardDescription>Create traditional and robust names for dwarf clans and families</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate dwarf clan names"
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What Makes a Good Dwarf Clan Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Dwarf Clan Naming Traditions</a>
              </li>
              <li>
                <a href="#popular-names" className="text-primary hover:underline">Popular Dwarf Clan Names</a>
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
              In the world of Dungeons & Dragons, dwarves are known for their strong clan structures and deep 
              family ties. A dwarf's clan name is not merely a surname but a badge of honor that connects them 
              to their ancestors, their traditions, and their place in dwarven society.
            </p>
            <p className="mb-4">
              Dwarf clan names often reflect the values most cherished in dwarven culture: craftsmanship, 
              resilience, honor, and connection to stone and earth. These names frequently incorporate references 
              to mining, metalworking, gems, mountains, and the steadfast qualities that dwarves embody.
            </p>
            <p>
              Whether you're creating a dwarf character who proudly carries their clan's banner, developing a 
              dwarven settlement with multiple prominent families, or building a storyline involving dwarven 
              politics and rivalries, this generator provides traditional and robust clan names that capture 
              the essence of dwarven heritage.
            </p>
          </div>
          
          {/* Hero Image */}
          <GeneratorImage 
            src="/images/categories/dungeonsanddragons/dwarf-clan/dwarf-clan-main.jpg" 
            alt="Dwarf Clan Names" 
            caption="Create traditional and robust names for dwarf clans and families in Dungeons & Dragons"
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Dwarf Clan Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A compelling dwarf clan name should evoke the rich heritage and values of dwarven culture:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Craft References:</span> 
                <span>The best dwarf clan names often incorporate references to traditional dwarven crafts like mining, smithing, brewing, or stonework.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Geological Elements:</span> 
                <span>Names that reference mountains, stone, gems, or metals connect the clan to the earth that dwarves hold sacred.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Strong Consonants:</span> 
                <span>Dwarf clan names typically feature strong, hard consonants that reflect the sturdy, resilient nature of dwarven culture.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Historical Significance:</span> 
                <span>Names that hint at great deeds, ancient battles, or legendary ancestors give the clan a sense of history and importance.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Compound Structure:</span> 
                <span>Many traditional dwarf clan names are compound words that combine two meaningful elements, creating names that are both descriptive and memorable.</span>
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
                <span>Click the "Generate Names" button to create a list of dwarf clan names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">2.</span> 
                <span>Click on any name to see more details about its meaning, history, or cultural significance.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">3.</span> 
                <span>Generate as many times as you like until you find the perfect clan name for your character or story.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">4.</span> 
                <span>Consider how your chosen clan name might influence your character's background, values, and relationships with other dwarves.</span>
              </li>
            </ol>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Dwarf Clan Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Dwarven clans follow distinct naming traditions that reflect their culture's values and history:
            </p>
            <ul className="space-y-4 mb-6">
              <li>
                <h3 className="font-semibold text-primary text-lg">Ancestral Professions</h3>
                <p>Many dwarf clans are named after the craft or profession that first brought them renown, such as Ironforge, Goldbeard, or Brewmaster, honoring generations of specialized expertise.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Geographical Markers</h3>
                <p>Some clans take their names from significant locations, such as the mountain where they established their hold or a notable geological feature, like Stonepeak or Deepdelve.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Founder Honors</h3>
                <p>Clans often bear the name or epithet of a legendary founder, sometimes combined with a descriptor of their greatest achievement, such as Grimhammer or Trueaxe.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Battle Commemorations</h3>
                <p>Names that reference historic battles or victories are common among warrior clans, preserving the memory of their greatest triumphs, such as Orcbane or Giantslayer.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Virtue Names</h3>
                <p>Some clans adopt names that embody the virtues they most value, such as Stoneheart (for steadfastness), Trueanvil (for honesty in craftsmanship), or Oathkeeper (for honor).</p>
              </li>
            </ul>
          </div>
        </section>

        {/* Popular Names */}
        <section id="popular-names" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Popular Dwarf Clan Names</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Some well-known dwarf clan names from D&D lore and popular culture include:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[120px]">Battlehammer:</span> 
                <span>A renowned clan known for producing exceptional warriors and leaders.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[120px]">Ironforge:</span> 
                <span>A clan famous for their masterful metalworking and smithing traditions.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[120px]">Stoneshield:</span> 
                <span>A clan known for their defensive prowess and steadfast protection.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[120px]">Goldbeard:</span> 
                <span>A wealthy clan with expertise in mining precious metals and gems.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[120px]">Deepdelver:</span> 
                <span>A clan renowned for exploring and establishing holds in the deepest reaches of the Underdark.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[120px]">Mithrilheart:</span> 
                <span>A prestigious clan known for their rare ability to work with mithril and other magical metals.</span>
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
                <CardTitle className="text-lg">Gladiator Name Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Create powerful and memorable names for gladiator characters</p>
                <Link to="/dungeonsanddragons/gladiator" onClick={() => window.scrollTo(0, 0)}>
                  <Button variant="outline" size="sm" className="w-full">Explore</Button>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Group Name Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Generate unique and catchy names for adventuring parties and groups</p>
                <Link to="/dungeonsanddragons/group" onClick={() => window.scrollTo(0, 0)}>
                  <Button variant="outline" size="sm" className="w-full">Explore</Button>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Female Genie Name Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Create exotic and magical names for female genie characters</p>
                <Link to="/dungeonsanddragons/female-genie" onClick={() => window.scrollTo(0, 0)}>
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

export default DwarfClanNameGenerator; 