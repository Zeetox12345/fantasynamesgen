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

const OrcWarriorNameGenerator = () => {
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
        const data = await import('@/data/WorldofWarcraft/orc-warrior.json');
        setNameData(data.default || data);
      } catch (error) {
        console.error("Error loading Orc Warrior name data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.orcWarriorNames || !nameData.orcWarriorNames.length) {
      console.error("No Orc Warrior name data available");
      return;
    }
    
    // Randomly select 10 names from the data
    const shuffled = [...nameData.orcWarriorNames].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setGeneratedNames(selected.map(entry => entry.name));
  };

  const handleNameClick = (name: string) => {
    if (!nameData || !nameData.orcWarriorNames) return;
    
    setSelectedName(name);
    
    // Find the description for the selected name
    const nameEntry = nameData.orcWarriorNames.find(entry => entry.name === name);
    if (nameEntry) {
      setNameDescription(nameEntry.description);
    } else {
      setNameDescription(null);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>Orc Warrior Name Generator - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ powerful Orc Warrior names for World of Warcraft. Perfect for roleplaying, character creation, and fan fiction. Create the perfect battle-hardened Horde character with our free name generator!" />
        <meta name="keywords" content="World of Warcraft, WoW, Orc, Warrior, Name Generator, Horde, Orgrimmar, Blizzard, Thrall, Saurfang, Garrosh, Warsong, Blackrock, Frostwolf, Dragonflight" />
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
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Orc Warrior Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate powerful names for your Horde orc warriors in World of Warcraft.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Orc Warrior Names</CardTitle>
            <CardDescription>Create powerful names for your Horde orc warriors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate Orc Warrior names"
              >
                {loading ? "Loading..." : "Generate Orc Warrior Names"}
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What Makes a Good Orc Warrior Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Orc Warrior Naming Traditions</a>
              </li>
              <li>
                <a href="#famous-warriors" className="text-primary hover:underline">Famous Orc Warriors</a>
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
              Orcs are one of the most iconic races in World of Warcraft, known for their strength, 
              battle prowess, and honor-bound warrior culture. As founding members of the Horde, 
              orcs have a rich history of combat and warfare that shapes their identity.
            </p>
            <p className="mb-4">
              Orc warriors embody the martial spirit of their race, charging into battle with 
              axes, maces, and swords while protected by heavy armor. Their names often reflect 
              their fierce nature, physical prowess, and the harsh environments of their homeland.
            </p>
            <p>
              Whether you're creating a character for World of Warcraft, writing fan fiction, or 
              developing a character for a role-playing game, this generator provides authentic-sounding 
              orc warrior names that capture the essence of these powerful and honorable fighters.
            </p>
          </div>
          
          {/* Hero Image */}
          <GeneratorImage 
            src="/images/categories/worldofwarcraft/orc-warrior/orc-warrior-main.jpg" 
            alt="Orc Warrior" 
            caption="Create powerful names for your Horde orc warriors in World of Warcraft"
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Orc Warrior Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A fitting orc warrior name should capture their fierce nature and warrior culture:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Harsh Sounds:</span> 
                <span>Orc names typically feature harsh, guttural sounds with hard consonants like 'g', 'k', 'r', and 'z'.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Battle References:</span> 
                <span>Names that evoke combat, weapons, strength, or victory reflect their warrior identity.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Natural Elements:</span> 
                <span>References to natural forces like thunder, stone, or fire connect to the shamanistic roots of orc culture.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Short and Strong:</span> 
                <span>Orc names are often brief and powerful, with one or two syllables that can be shouted in battle.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Clan References:</span> 
                <span>Names that honor famous orc clans like Warsong, Blackrock, or Frostwolf show heritage and pride.</span>
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
                <span>Click the "Generate Orc Warrior Names" button to create a list of authentic orc names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">2.</span> 
                <span>Click on any name to see more details about the character or warrior style associated with that name.</span>
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Orc Warrior Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Orc naming conventions reflect their warrior culture and tribal heritage:
            </p>
            <ul className="space-y-4 mb-6">
              <li>
                <h3 className="text-lg font-semibold text-primary">Deeds and Titles</h3>
                <p>Many orcs earn names or titles based on their accomplishments in battle. Names like "Deadeye," "Skullcrusher," or "Bloodfist" might be given to warriors who have demonstrated particular skills or feats.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Clan Heritage</h3>
                <p>Orcs often incorporate their clan name as a surname or identifier. A warrior might be known as "Grom of the Warsong" or "Karg Blackrock," honoring their clan lineage and allegiance.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Linguistic Structure</h3>
                <p>Orc names typically feature harsh consonants and short, powerful syllables. They often include 'g', 'k', 'z', 'r', and 'th' sounds, creating names that sound aggressive and can be shouted in battle.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Symbolic Meaning</h3>
                <p>Many orc names have meanings related to strength, nature, or battle. Parents might name children after natural phenomena (Thunderfury), weapons (Axehand), or desirable warrior traits (Strongheart).</p>
              </li>
            </ul>
          </div>
        </section>

        {/* Famous Warriors */}
        <section id="famous-warriors" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Famous Orc Warriors</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Several legendary orc warriors have shaped the history of Azeroth:
            </p>
            <ul className="space-y-4 mb-6">
              <li>
                <h3 className="text-lg font-semibold text-primary">Thrall (Go'el)</h3>
                <p>Though better known as a shaman, Thrall began as a gladiator and warrior before becoming Warchief of the Horde. His name means "slave" in Common, given to him by humans, but he reclaimed it as a symbol of his journey.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Grommash Hellscream</h3>
                <p>The legendary chieftain of the Warsong clan, known for his fierce battle cry and ultimately sacrificing himself to free the orcs from demonic corruption.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Varok Saurfang</h3>
                <p>The High Overlord of the Kor'kron Guard and veteran of all of the Horde's wars, Saurfang embodied the honor and warrior spirit of the orcs.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Broxigar the Red</h3>
                <p>The only mortal to ever wound Sargeras, Broxigar was sent back in time during the War of the Ancients and died a hero's death fighting the Burning Legion.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Garrosh Hellscream</h3>
                <p>Son of Grommash and former Warchief of the Horde, Garrosh was a powerful warrior whose name became controversial due to his later actions.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Orgrim Doomhammer</h3>
                <p>Former Warchief of the Horde and wielder of the legendary Doomhammer, he led the orcs during the Second War and was known for his tactical brilliance.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Durotan</h3>
                <p>Chieftain of the Frostwolf clan and father of Thrall, Durotan was a principled warrior who refused to drink the blood of Mannoroth.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Eitrigg</h3>
                <p>A veteran orc warrior who befriended the human paladin Tirion Fordring, demonstrating that honor exists in both factions.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Nazgrel</h3>
                <p>A fierce warrior who served as Thrall's advisor and later commanded the Horde forces in Outland at Thrallmar.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Kargath Bladefist</h3>
                <p>Chieftain of the Shattered Hand clan, known for replacing his hand with a deadly blade after cutting it off to escape captivity.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Blackhand the Destroyer</h3>
                <p>The first Warchief of the Horde, a brutal and powerful warrior who led the initial invasion of Azeroth.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Dranosh Saurfang</h3>
                <p>Son of Varok Saurfang who died valiantly at the Wrathgate, only to be raised as a death knight by the Lich King.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Rexxar</h3>
                <p>Half-orc, half-ogre Champion of the Horde who, while primarily a hunter, is also a formidable warrior and beastmaster.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Gar'thok</h3>
                <p>A renowned blademaster who served under Thrall during the founding of Durotar, known for his exceptional skill with dual blades.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Rehgar Earthfury</h3>
                <p>Before becoming a shaman, Rehgar was a gladiator and gladiator master, renowned for his combat prowess in the fighting pits.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Overlord Runthak</h3>
                <p>A loyal warrior who served as herald and champion to multiple Warchiefs, known for his unwavering dedication to the Horde.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Kor'gall</h3>
                <p>A powerful warrior who became chieftain of the Stonemaul ogres after Rexxar defeated the previous leader, despite being an orc.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Jorin Deadeye</h3>
                <p>Son of Kilrogg Deadeye and chieftain of the Bleeding Hollow clan after his father's death, a skilled warrior who led his clan in Outland.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Fenris Wolfbrother</h3>
                <p>A legendary warrior of the Frostwolf clan who was known for fighting alongside giant wolves in battle.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Garm Wolfbrother</h3>
                <p>Brother of Fenris and a fierce Frostwolf warrior who helped defend the clan during their exile in Alterac Valley.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Burx</h3>
                <p>A Warsong commander who led forces in Ashenvale, known for his aggressive tactics and fierce loyalty to Garrosh Hellscream.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Krenna</h3>
                <p>A fierce female orc warrior who commanded the Horde forces at Conquest Hold in Grizzly Hills, known for her ruthless efficiency.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Gorgonna</h3>
                <p>Sister of Krenna and a more level-headed warrior who eventually took command after her sister's extremism went too far.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Malgor Devilslay</h3>
                <p>A veteran of the Third War who earned his name by slaying scores of demons during the Battle of Mount Hyjal.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Rak'gor Bloodrazor</h3>
                <p>A fearsome warrior known for his custom-made serrated axe that caused grievous wounds that were nearly impossible to heal.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Gorfax Angerfang</h3>
                <p>A veteran warrior who served as a drill sergeant for new Horde recruits in the Valley of Trials, shaping a generation of orc warriors.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Kagtha</h3>
                <p>A female orc warrior who rose to prominence as a Kor'kron elite under Garrosh's reign, known for her unwavering discipline.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Grommash "Grom" Hellscream (Alternate)</h3>
                <p>The version of Grommash from alternate Draenor who never drank demon blood and led the Iron Horde, showcasing his natural warrior prowess uncorrupted by fel energy.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Lantresor of the Blade</h3>
                <p>A half-orc, half-draenei blademaster who led the Burning Blade clan in Outland, renowned for his exceptional skill with a sword.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Eitrigg</h3>
                <p>A veteran orc warrior who befriended the human paladin Tirion Fordring, demonstrating that honor exists in both factions.</p>
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
                <a href="/worldofwarcraft/orc-shaman" className="text-primary hover:underline">Orc Shaman Name Generator</a> - Generate spiritual names for orc shamans connected to the elements
              </li>
              <li>
                <a href="/worldofwarcraft/maghar-orc" className="text-primary hover:underline">Mag'har Orc Name Generator</a> - Create authentic names for the uncorrupted Mag'har orcs
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

export default OrcWarriorNameGenerator; 