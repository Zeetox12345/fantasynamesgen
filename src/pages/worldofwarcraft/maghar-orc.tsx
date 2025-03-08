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

const MagharOrcNameGenerator = () => {
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
        const data = await import('@/data/WorldofWarcraft/maghar-orc.json');
        setNameData(data.default || data);
      } catch (error) {
        console.error("Error loading Mag'har Orc name data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.magharOrcNames || !nameData.magharOrcNames.length) {
      console.error("No Mag'har Orc name data available");
      return;
    }
    
    // Randomly select 10 names from the data
    const shuffled = [...nameData.magharOrcNames].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setGeneratedNames(selected.map(entry => entry.name));
  };

  const handleNameClick = (name: string) => {
    if (!nameData || !nameData.magharOrcNames) return;
    
    setSelectedName(name);
    
    // Find the description for the selected name
    const nameEntry = nameData.magharOrcNames.find(entry => entry.name === name);
    if (nameEntry) {
      setNameDescription(nameEntry.description);
    } else {
      setNameDescription(null);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>Mag'har Orc Name Generator - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ authentic Mag'har Orc names for World of Warcraft. Perfect for roleplaying, character creation, and fan fiction. Create the perfect uncorrupted brown orc character with our free name generator!" />
        <meta name="keywords" content="World of Warcraft, WoW, Mag'har Orc, Name Generator, Horde, Draenor, Uncorrupted, Brown Orcs, Blizzard, Warlords of Draenor, Battle for Azeroth, Dragonflight" />
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
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Mag'har Orc Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate authentic names for the uncorrupted Mag'har orcs of Draenor.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Mag'har Orc Names</CardTitle>
            <CardDescription>Create authentic names for the uncorrupted Mag'har orcs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate Mag'har Orc names"
              >
                {loading ? "Loading..." : "Generate Mag'har Orc Names"}
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What Makes a Good Mag'har Orc Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Mag'har Orc Naming Traditions</a>
              </li>
              <li>
                <a href="#famous-maghar" className="text-primary hover:underline">Famous Mag'har Orcs</a>
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
              The Mag'har orcs, whose name means "uncorrupted" in Orcish, are the orcs who escaped 
              the demonic corruption that transformed most of their race into the green-skinned orcs 
              of the Horde. With their brown skin and strong connection to their ancestral traditions, 
              the Mag'har represent the original orcish culture.
            </p>
            <p className="mb-4">
              Originally from Draenor (later Outland), different clans of Mag'har orcs have joined the 
              Horde at various times, including those from alternate Draenor. They bring with them rich 
              cultural traditions, clan loyalties, and naming conventions that reflect their uncorrupted heritage.
            </p>
            <p>
              Whether you're creating a character for World of Warcraft, writing fan fiction, or developing a 
              character for a role-playing game, this generator provides authentic-sounding Mag'har orc names 
              that capture the essence of these proud and traditional warriors.
            </p>
          </div>
          
          {/* Hero Image */}
          <GeneratorImage 
            src="/images/categories/worldofwarcraft/maghar-orc/maghar-orc-main.jpg" 
            alt="Mag'har Orc" 
            caption="Create authentic names for the uncorrupted Mag'har orcs of Draenor"
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Mag'har Orc Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A fitting Mag'har orc name should capture their traditional culture and clan heritage:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Clan References:</span> 
                <span>Names that honor the major Mag'har clans: Warsong, Blackrock, Bleeding Hollow, Laughing Skull, Thunderlord, and Frostwolf.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Traditional Sounds:</span> 
                <span>Harsh, guttural sounds with strong consonants that reflect the Orcish language's aggressive nature.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Natural Elements:</span> 
                <span>References to the harsh landscapes of Draenor: mountains, plains, wolves, thunder, and other natural phenomena.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ancestral Honors:</span> 
                <span>Names that pay homage to great Mag'har heroes or ancestors, showing respect for lineage and heritage.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Spiritual Connections:</span> 
                <span>References to the elements or ancestral spirits, reflecting the shamanic traditions of uncorrupted orcs.</span>
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
                <span>Click the "Generate Mag'har Orc Names" button to create a list of authentic Mag'har names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">2.</span> 
                <span>Click on any name to see more details about the character or clan associated with that name.</span>
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Mag'har Orc Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Mag'har orc naming conventions reflect their clan-based society and traditional values:
            </p>
            <ul className="space-y-4 mb-6">
              <li>
                <h3 className="text-lg font-semibold text-primary">Clan Identity</h3>
                <p>Mag'har orcs often incorporate their clan affiliation into their names or titles. A Warsong orc might be known as "Grommash of the Warsong" or a Frostwolf orc as "Durotan Frostwolf," showing pride in their lineage.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Deeds and Achievements</h3>
                <p>Many Mag'har earn names or titles based on notable achievements, especially in battle or hunting. Names like "Wolfslayer," "Bladefist," or "Skullcrusher" commemorate significant accomplishments.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Clan-Specific Traditions</h3>
                <p>Different Mag'har clans have distinct naming traditions. Laughing Skull orcs might favor more intimidating names, while Frostwolf orcs often include references to wolves or winter in their naming conventions.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Ancestral Connections</h3>
                <p>Honoring ancestors is important in Mag'har culture, and some orcs are named after revered ancestors or legendary figures from clan history, creating a sense of continuity across generations.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* Famous Mag'har */}
        <section id="famous-maghar" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Famous Mag'har Orcs</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Several notable Mag'har orcs have made their mark on the history of Draenor and Azeroth:
            </p>
            <ul className="space-y-4 mb-6">
              <li>
                <h3 className="text-lg font-semibold text-primary">Garrosh Hellscream</h3>
                <p>Son of Grommash Hellscream and former Warchief of the Horde, Garrosh was originally a Mag'har from Outland before rising to power and eventually falling to corruption.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Durotan</h3>
                <p>Chieftain of the Frostwolf clan and father of Thrall, Durotan was one of the few orcs who rejected the blood of Mannoroth, maintaining his uncorrupted brown skin.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Draka</h3>
                <p>Mate of Durotan and mother of Thrall, Draka was a fierce warrior of the Frostwolf clan who remained uncorrupted by demonic influence.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Grommash Hellscream (Alternate)</h3>
                <p>In the alternate timeline of Draenor, Grommash rejected Gul'dan's offer of demonic blood and led the Iron Horde, preserving his status as a Mag'har orc.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Geya'rah</h3>
                <p>Daughter of Draka from the alternate Draenor, Geya'rah serves as the Overlord of the Mag'har orcs who joined the Horde on Azeroth.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Greatmother Geyah</h3>
                <p>Grandmother of Thrall and a respected elder of the Mag'har in Nagrand, who helped Thrall reconnect with his heritage.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Jorin Deadeye</h3>
                <p>Son of Kilrogg Deadeye and leader of the Bleeding Hollow clan in Outland, who maintained the clan's traditions after his father's death.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Aggra</h3>
                <p>A Mag'har shaman who became Thrall's mate and helped him reconnect with the elements after he lost his connection following the defeat of Deathwing.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Dranosh Saurfang</h3>
                <p>Son of Varok Saurfang who was born uncorrupted before his tragic death at the Wrathgate and subsequent raising as a death knight.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Eitrigg</h3>
                <p>While not born a Mag'har, this veteran orc warrior rejected the demonic corruption and maintained his honor, later befriending the human paladin Tirion Fordring.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Drek'Thar (Alternate)</h3>
                <p>The elder shaman of the Frostwolf clan in alternate Draenor, who maintained the clan's spiritual traditions and connection to the elements.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Blackhand (Alternate)</h3>
                <p>In alternate Draenor, the powerful warlord who led the Blackrock clan and became the first Warchief of the Iron Horde.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Kargath Bladefist (Alternate)</h3>
                <p>Leader of the Shattered Hand clan in alternate Draenor, known for replacing his hand with a blade after cutting it off to escape slavery.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Kilrogg Deadeye (Alternate)</h3>
                <p>Chieftain of the Bleeding Hollow clan in alternate Draenor, known for his ritual self-blinding to gain visions of his death.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Ner'zhul (Alternate)</h3>
                <p>Elder shaman and spiritual leader of the Shadowmoon clan in alternate Draenor, who initially resisted but eventually turned to void magic.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Lantresor of the Blade</h3>
                <p>A half-orc, half-draenei blademaster who led the Burning Blade clan in Outland, maintaining his honor despite being outcast by both peoples.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Gar'mak Bladetwist</h3>
                <p>A renowned Mag'har blademaster who trained many warriors in the traditional fighting styles of the orcs, preserving their combat heritage.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Kraator</h3>
                <p>A Mag'har hunter from the Warsong clan who became famous for tracking and killing the most dangerous beasts of Nagrand without using fel magic.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Gar'tok Hammerbreak</h3>
                <p>A powerful Mag'har warrior of the Thunderlord clan, known for his mastery of traditional orcish blacksmithing techniques.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Broxigar Saurfang</h3>
                <p>While not born a Mag'har, this legendary warrior maintained the uncorrupted spirit of the orcs and was the only mortal to ever wound Sargeras.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Ariok</h3>
                <p>Son of Eitrigg who remained in Outland with the Mag'har, helping to defend Thrallmar against the Fel Horde.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Overlord Mor'ghor</h3>
                <p>A Mag'har commander who led forces against the Burning Legion in Outland, helping to secure Mag'har territories.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Garad</h3>
                <p>Father of Durotan and chieftain of the Frostwolf clan before his son, who maintained the clan's traditions of honor and shamanism.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Mother Kashur</h3>
                <p>An elder shaman of the Frostwolf clan who passed her knowledge to Drek'Thar, preserving the spiritual traditions of the Mag'har.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Fenris Wolfbrother</h3>
                <p>A legendary Mag'har warrior of the Frostwolf clan who was known for fighting alongside giant wolves in battle.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Garm Wolfbrother</h3>
                <p>Brother of Fenris and a fierce Frostwolf warrior who helped defend the clan during their exile in Alterac Valley.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Nazgrel</h3>
                <p>While born after the corruption, this orc maintained the spirit of the Mag'har and served as Thrall's advisor before commanding Thrallmar in Outland.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Gar'thok Bloodfist</h3>
                <p>A Mag'har warrior who became renowned for his skill in traditional orcish hand-to-hand combat, teaching these techniques to younger generations.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Kargath Bladefist (Original)</h3>
                <p>While eventually corrupted, Kargath began as an uncorrupted orc who rose from slavery to become a clan leader through sheer determination.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Leoroxx</h3>
                <p>Chieftain of the Mok'Nathal clan in Outland, father of Rexxar, who maintained the half-orc traditions separate from both orc and ogre societies.</p>
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
                <a href="/worldofwarcraft/earthen-dwarf" className="text-primary hover:underline">Earthen Dwarf Name Generator</a> - Generate stony names for the titan-forged Earthen dwarves
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

export default MagharOrcNameGenerator; 