import { useState, useEffect } from "react";
import { Wand2, Info } from "lucide-react";
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

const EarthenDwarfNameGenerator = () => {
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
        const data = await import('@/data/WorldofWarcraft/earthen-dwarf.json');
        setNameData(data.default || data);
      } catch (error) {
        console.error("Error loading Earthen Dwarf name data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.earthenDwarfNames || !nameData.earthenDwarfNames.length) {
      console.error("No Earthen Dwarf name data available");
      return;
    }
    
    // Randomly select 10 names from the data
    const shuffled = [...nameData.earthenDwarfNames].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setGeneratedNames(selected.map(entry => entry.name));
  };

  const handleNameClick = (name: string) => {
    if (!nameData || !nameData.earthenDwarfNames) return;
    
    setSelectedName(name);
    
    // Find the description for the selected name
    const nameEntry = nameData.earthenDwarfNames.find(entry => entry.name === name);
    if (nameEntry) {
      setNameDescription(nameEntry.description);
    } else {
      setNameDescription(null);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>Earthen Dwarf Name Generator - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ stony names for the titan-forged Earthen dwarves from World of Warcraft. Perfect for roleplaying, character creation, and fan fiction. Create the perfect ancient stone ancestor with our free name generator!" />
        <meta name="keywords" content="World of Warcraft, WoW, Earthen, Dwarf, Name Generator, Titan-forged, Ulduar, Uldaman, Khaz Modan, Blizzard, Stone Dwarf, Ancient Dwarf, Dragonflight" />
      </Helmet>
      <div className="max-w-7xl mx-auto">
        {/* Header with back button */}
        <div className="mb-6 sm:mb-8">
          <Link 
            to="/worldofwarcraft" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4 sm:mb-6"
            onClick={() => window.scrollTo(0, 0)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            Back to World of Warcraft
          </Link>
          
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 rounded-lg bg-primary/10 text-primary">
              <Wand2 className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Earthen Dwarf Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate stony names for the titan-forged Earthen dwarves of Azeroth.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Earthen Dwarf Names</CardTitle>
            <CardDescription>Create stony names for the titan-forged Earthen dwarves</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate Earthen Dwarf names"
              >
                {loading ? "Loading..." : "Generate Earthen Dwarf Names"}
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What Makes a Good Earthen Dwarf Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Earthen Dwarf Naming Traditions</a>
              </li>
              <li>
                <a href="#famous-earthen" className="text-primary hover:underline">Famous Earthen and Their Legacy</a>
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
              The Earthen are the ancient, stone-skinned ancestors of the modern dwarves in World of Warcraft. 
              Created by the titan keepers in facilities like Uldaman and Ulduar, the Earthen were designed 
              to help shape Azeroth's mountains and depths. They were made of living stone, imbued with the 
              power of the earth itself.
            </p>
            <p className="mb-4">
              Unlike their modern dwarf descendants, who developed flesh due to the Curse of Flesh, the 
              Earthen maintained their stone forms and titan-forged nature. Their names often reflect their 
              connection to stone, earth, and the titans who created them.
            </p>
            <p>
              Whether you're creating a character for World of Warcraft, writing fan fiction about Azeroth's 
              ancient history, or developing a character for a role-playing game, this generator provides 
              authentic-sounding Earthen dwarf names that capture the essence of these primordial beings.
            </p>
          </div>
          
          {/* Hero Image */}
          <GeneratorImage 
            src="/images/categories/worldofwarcraft/earthen-dwarf/earthen-dwarf-main.jpg" 
            alt="Earthen Dwarf" 
            caption="Create stony names for the titan-forged Earthen dwarves of Azeroth"
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Earthen Dwarf Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A fitting Earthen dwarf name should capture their stone nature and titan-forged origins:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Geological References:</span> 
                <span>Names that evoke stone, minerals, mountains, and other geological features reflect their physical composition.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Titan Influences:</span> 
                <span>References to the titans or their language (often with Norse-inspired sounds) honor their creators.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ancient Sounds:</span> 
                <span>Hard consonants and strong syllables that sound ancient and enduring, like the Earthen themselves.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Runic Elements:</span> 
                <span>Names that suggest runes or ancient inscriptions, reflecting the titan runes often found on their skin.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Purpose-Driven:</span> 
                <span>Names that hint at their original purpose as shapers, builders, and protectors of Azeroth's subterranean realms.</span>
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
                <span>Click the "Generate Earthen Dwarf Names" button to create a list of authentic Earthen names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">2.</span> 
                <span>Click on any name to see more details about the character or role associated with that name.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">3.</span> 
                <span>Generate as many times as you like until you find the perfect name for your character.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">4.</span> 
                <span>Use the name for your World of Warcraft character, fan fiction, role-playing games, or creative projects.</span>
              </li>
            </ol>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Earthen Dwarf Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Earthen naming conventions reflect their titan origins and purpose:
            </p>
            <ul className="space-y-4 mb-6">
              <li>
                <h3 className="text-lg font-semibold text-primary">Functional Designations</h3>
                <p>Many Earthen were named according to their specific function or purpose. Names like "Stoneshaper," "Deepdelver," or "Mountainguard" directly described their role in the titans' plans for Azeroth.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Titanic Influence</h3>
                <p>As creations of the titans, many Earthen bore names with syllables and sounds derived from the titans' own language, which has similarities to Old Norse. These names often featured hard consonants and strong vowels.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Geological Identity</h3>
                <p>Given their stone composition, many Earthen had names referencing types of stone, minerals, or geological features. Names like "Granite," "Basalt," or "Obsidian" reflected their physical nature.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Runic Designations</h3>
                <p>Some Earthen were identified by the specific runes inscribed on their stone bodies by their titan creators. These runic names held power and purpose, often relating to the specific energies they were imbued with.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* Famous Earthen */}
        <section id="famous-earthen" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Famous Earthen and Their Legacy</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              While many individual Earthen have been lost to history, their legacy lives on:
            </p>
            <ul className="space-y-4 mb-6">
              <li>
                <h3 className="text-lg font-semibold text-primary">The Uldaman Earthen</h3>
                <p>The Earthen of Uldaman were among the first to be affected by the Curse of Flesh, eventually becoming the ancestors of the Ironforge dwarves. Their awakening in modern times helped dwarves rediscover their true origins.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">The Ulduar Earthen</h3>
                <p>Some Earthen in Northrend remained untouched by the Curse of Flesh, continuing their eternal vigil in Ulduar. These stone-skinned ancestors provide a glimpse of what all dwarves once were.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Bouldercrag the Rockshaper</h3>
                <p>A notable Earthen found in the Storm Peaks who helped adventurers understand the connection between the Earthen and modern dwarves, providing crucial insights into dwarf history.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Yorg Stormheart (Muradin Bronzebeard)</h3>
                <p>While not an original Earthen, Muradin Bronzebeard temporarily lost his memory and lived among the Frostborn (frost-affected Earthen) as Yorg Stormheart, bridging the gap between modern dwarves and their ancestors.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">The Earthen of Deepholm</h3>
                <p>Some Earthen-like beings exist in Deepholm, the elemental plane of earth, suggesting the titans' influence extended even to the elemental planes.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Brangrimm</h3>
                <p>A master craftsman among the Earthen who helped design and construct the great halls of Uldaman, his architectural style still influences dwarven construction today.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Stonefather Penn</h3>
                <p>One of the original Earthen leaders who oversaw the shaping of mountains in what would later become Dun Morogh, his name is still honored in dwarven legends.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Dungard Ironcutter</h3>
                <p>An Earthen who specialized in carving tunnels through the hardest stone, creating many of the passages that would later become Ironforge's elaborate network of halls.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Kaldir Ironshaper</h3>
                <p>A renowned Earthen smith who developed techniques for forging metals that would later become the foundation of dwarven blacksmithing traditions.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Thelgarn Stoneseeker</h3>
                <p>An Earthen explorer who mapped vast underground networks and discovered many mineral deposits that would later become crucial to dwarven prosperity.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Brangrimm the Architect</h3>
                <p>The chief designer of Uldaman's grand halls, whose architectural principles would later influence the construction of Ironforge and other dwarven cities.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Korloff Stonehammer</h3>
                <p>A legendary Earthen warrior who defended Uldaman against trogg incursions, his combat techniques were preserved in stone tablets later discovered by dwarven explorers.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Hagrim Stonecutter</h3>
                <p>An Earthen artisan who specialized in rune carving, creating many of the protective glyphs that still power ancient dwarven artifacts.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Jorgun Runeshaper</h3>
                <p>A master of titan rune magic who helped imbue the Earthen with their resilience and strength, his techniques were partially preserved in ancient texts.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Brangrimm the Watcher</h3>
                <p>An Earthen sentinel who maintained vigilance over the vaults of Uldaman for thousands of years before entering stasis, only to be awakened in modern times.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Kaddrak</h3>
                <p>One of the Guardians of Uldaman, a powerful Earthen construct that protected the secrets of titan knowledge and dwarf origins.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Marnak</h3>
                <p>Another Guardian of Uldaman who, along with Kaddrak and Ironaya, safeguarded the ancient repository of knowledge about the Earthen's creation.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Ironaya</h3>
                <p>The powerful female Earthen construct who served as the final guardian of Uldaman's inner chamber, protecting the Discs of Norgannon.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Archaedas</h3>
                <p>The titanic watcher who oversaw the Earthen in Uldaman and was tasked with monitoring their development and protecting the facility.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Brangrimm the Lorekeeper</h3>
                <p>An Earthen scholar who recorded the early history of their race, creating stone tablets that would later be discovered by the Explorer's League.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Olgarn Anvilrage</h3>
                <p>An Earthen smith whose techniques for tempering metal with elemental earth energy would later influence the Dark Iron clan's distinctive forging methods.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Brangrimm the Steadfast</h3>
                <p>An Earthen guardian who stood watch over the entrance to Uldaman for millennia, his unwavering vigilance becoming legendary among later dwarven generations.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Stonefather Oremantle</h3>
                <p>A leader among the Ulduar Earthen who directed the shaping of mountains in what would later become the Storm Peaks, creating distinctive peaks still visible today.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Brangrimm the Runecarver</h3>
                <p>An Earthen who specialized in creating protective runes, many of which were later incorporated into dwarven armor and weapon designs.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Kolgar Flameshaper</h3>
                <p>An Earthen who worked closely with fire elementals to forge the great forges of Uldaman, establishing techniques that would later be used in Ironforge's Great Forge.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Brangrimm the Unyielding</h3>
                <p>An Earthen warrior known for his exceptional durability in battle, who helped develop the defensive fighting style that would influence dwarven combat techniques.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Stonefather Ironbeard</h3>
                <p>One of the first Earthen to show signs of the Curse of Flesh, whose experiences were recorded and later helped dwarves understand their transformation.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Brangrimm the Earthshaper</h3>
                <p>An Earthen with exceptional control over stone and earth, who helped create the intricate underground passages that would later become Khaz Modan's tunnel network.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Uldis Stoneheart</h3>
                <p>A female Earthen leader who organized the defense of Uldaman against the first trogg uprisings, developing tactics still used by dwarven military commanders.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Brangrimm the Forgemaster</h3>
                <p>The chief smith of Uldaman who created many of the titan-infused weapons and tools that would later become treasured dwarven artifacts.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* Latest Generators */}
        <section id="latest-generators" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Latest Generators</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Explore our other World of Warcraft name generators:
            </p>
            <ul className="space-y-2">
              <li>
                <a href="/worldofwarcraft/nightborne-mage" className="text-primary hover:underline">Nightborne Mage Name Generator</a> - Create mystical names for the arcane-wielding Nightborne mages
              </li>
              <li>
                <a href="/worldofwarcraft/orc-warrior" className="text-primary hover:underline">Orc Warrior Name Generator</a> - Generate powerful names for your Horde orc warriors
              </li>
              <li>
                <a href="/worldofwarcraft/orc-shaman" className="text-primary hover:underline">Orc Shaman Name Generator</a> - Generate spiritual names for orc shamans connected to the elements
              </li>
              <li>
                <a href="/worldofwarcraft/maghar-orc" className="text-primary hover:underline">Mag'har Orc Name Generator</a> - Create authentic names for the uncorrupted Mag'har orcs
              </li>
              <li>
                <a href="/fantasy/dwarf" className="text-primary hover:underline">Dwarf Name Generator</a> - Create names for fantasy dwarves from any world
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EarthenDwarfNameGenerator; 