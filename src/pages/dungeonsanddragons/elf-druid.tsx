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

const ElfDruidNameGenerator = () => {
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
        const data = await import('@/data/dnd/elf-druid.json');
        setNameData(data.default || data);
      } catch (error) {
        console.error("Error loading D&D elf druid name data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.elfDruidNames || !nameData.elfDruidNames.length) {
      console.error("No D&D elf druid name data available");
      return;
    }
    
    // Randomly select 10 names from the data
    const shuffled = [...nameData.elfDruidNames].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setGeneratedNames(selected.map(entry => entry.name));
  };

  const handleNameClick = (name: string) => {
    if (!nameData || !nameData.elfDruidNames) return;
    
    setSelectedName(name);
    
    // Find the description for the selected name
    const nameEntry = nameData.elfDruidNames.find(entry => entry.name === name);
    if (nameEntry) {
      setNameDescription(nameEntry.description);
    } else {
      setNameDescription(null);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>DnD Elf Druid Name Generator - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ nature-attuned names for elven druids and their circles in DnD. Create the perfect forest guardian with our free name generator!" />
        <meta name="keywords" content="DnD, Dungeons and Dragons, elf druid names, elven names, druid circle names, nature names, fantasy names, RPG, tabletop games" />
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
            <h1 className="font-display text-3xl sm:text-4xl font-bold">DnD Elf Druid Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate nature-attuned names for elven druids and their circles in your DnD campaign.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Elf Druid Names</CardTitle>
            <CardDescription>Create nature-attuned names for elven druids and their circles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate elf druid names"
              >
                {loading ? "Loading..." : "Generate Elf Druid Names"}
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What Makes a Good Elf Druid Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#elven-druids" className="text-primary hover:underline">Elven Druids in DnD</a>
              </li>
              <li>
                <a href="#druid-circles" className="text-primary hover:underline">Druid Circles and Naming Traditions</a>
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
              In the mystical forests and ancient groves of Dungeons & Dragons worlds, elven druids stand as 
              guardians of nature's balance. These graceful beings combine the innate connection to magic and 
              long lifespans of elves with the primal power and natural wisdom of druids, creating characters 
              of unique depth and perspective.
            </p>
            <p className="mb-4">
              Elf druid names in DnD often reflect both their elven heritage and their druidic calling. They 
              typically incorporate elements of the elven language with references to natural phenomena, 
              seasons, plants, and animals that hold special significance to them.
            </p>
            <p>
              Whether you're creating a character for your next campaign, designing an NPC guardian of a sacred 
              grove, or developing a whole circle of druids, this generator provides names that capture the 
              harmony between elven grace and wild nature.
            </p>
          </div>
          
          {/* Hero Image */}
          <GeneratorImage 
            src="/images/categories/dungeonsanddragons/elf-druid/elf-druid-main.jpg" 
            alt="DnD Elf Druid Names" 
            caption="Create nature-attuned names for elven druids and their circles in your DnD campaign"
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Elf Druid Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A compelling elf druid name should evoke both elven heritage and natural connection:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Elven Elements:</span> 
                <span>Names that incorporate the flowing, melodic sounds typical of elven language (like soft consonants and long vowels) maintain cultural identity.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Natural References:</span> 
                <span>Including terms for plants, animals, weather patterns, or celestial bodies connects the name to the druid's devotion to nature.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Seasonal Connections:</span> 
                <span>References to seasons or cycles of nature (like "Autumn Whisper" or "Moonrise") reflect the druid's awareness of natural rhythms.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ancient Quality:</span> 
                <span>Names that sound ancient or timeless suit elven druids, who often live for centuries and preserve traditions from ages past.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Druidic Titles:</span> 
                <span>Many druids adopt titles that reflect their role in their circle or a particular aspect of nature they're attuned to (like "Thornkeeper" or "Stormcaller").</span>
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
                <span>Click the "Generate Elf Druid Names" button to create a list of nature-attuned names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">2.</span> 
                <span>Click on any name to see more details about the meaning or characteristics associated with that particular name.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">3.</span> 
                <span>Generate as many times as you like until you find the perfect name for your character or NPC.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">4.</span> 
                <span>Use the descriptions as inspiration for developing your character's personality, appearance, and connection to nature.</span>
              </li>
            </ol>
          </div>
        </section>

        {/* Elven Druids */}
        <section id="elven-druids" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Elven Druids in DnD</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Understanding the unique characteristics of elven druids can help you roleplay your character:
            </p>
            <ul className="space-y-4 mb-6">
              <li>
                <h3 className="font-semibold text-primary text-lg">Long-Term Perspective</h3>
                <p>With lifespans measured in centuries, elven druids witness the slow changes in forests and ecosystems that other races might miss. This gives them a patient, long-term view of threats to nature and a deep understanding of gradual natural cycles.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Cultural Integration</h3>
                <p>Unlike some druids who separate themselves from civilization, many elven druids see their communities as part of the natural world. Elven architecture and customs often work with nature rather than against it, allowing their druids to serve both their people and the wild.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Magical Affinity</h3>
                <p>The natural magical affinity of elves complements druidic spellcasting. Elven druids often display an unusual grace in their magic, blending elven arcane traditions with primal power in unique ways.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Specialized Knowledge</h3>
                <p>Many elven druids specialize in particular aspects of nature that hold special significance to elven culture, such as the cultivation of rare plants, communion with ancient trees, or the preservation of magical groves.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Ancestral Connections</h3>
                <p>Some elven druids maintain connections to ancestors who were also guardians of nature, creating lineages of druidic knowledge that span thousands of years. These family traditions often influence their names and titles.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* Druid Circles */}
        <section id="druid-circles" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Druid Circles and Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Elven druid circles often have distinctive naming traditions that reflect their focus:
            </p>
            <ul className="space-y-4 mb-6">
              <li>
                <h3 className="font-semibold text-primary text-lg">Circle of the Moon</h3>
                <p>Druids who master shapeshifting often take names that reference predators, hunters, or lunar cycles. Their names might include terms like "Fang," "Claw," or "Moonwalker," and they might change their names to reflect their favored wild shapes.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Circle of the Land</h3>
                <p>These druids often incorporate references to their chosen terrain in their names. A forest land druid might be called "Oakwhisper," while a mountain druid might be "Stoneheart." Their names frequently include plants, minerals, or geographical features.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Circle of Dreams</h3>
                <p>Druids connected to the Feywild often have names with dreamlike or ethereal qualities. Names might reference stars, mist, twilight, or emotions, creating an otherworldly impression that reflects their connection to fey realms.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Circle of the Shepherd</h3>
                <p>These druids, who specialize in communing with and summoning animals, often take names that reflect their role as protectors and guides. Names might include terms like "Warden," "Guardian," or references to herds, flocks, or packs.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Circle of Spores</h3>
                <p>The rare elven druids who follow this path might take names that reference fungi, decay, or rebirth. These names often have a mysterious or slightly unsettling quality, like "Moldwhisper" or "Sporekeeper," reflecting their unusual connection to the cycle of death and life.</p>
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
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Dwarf City Name Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Create authentic and immersive names for dwarven cities and strongholds</p>
                <Link to="/dungeonsanddragons/dwarf-city" onClick={() => window.scrollTo(0, 0)}>
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

export default ElfDruidNameGenerator; 