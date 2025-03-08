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

const OrcShamanNameGenerator = () => {
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
        const data = await import('@/data/WorldofWarcraft/orc-shaman.json');
        setNameData(data.default || data);
      } catch (error) {
        console.error("Error loading Orc Shaman name data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.orcShamanNames || !nameData.orcShamanNames.length) {
      console.error("No Orc Shaman name data available");
      return;
    }
    
    // Randomly select 10 names from the data
    const shuffled = [...nameData.orcShamanNames].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setGeneratedNames(selected.map(entry => entry.name));
  };

  const handleNameClick = (name: string) => {
    if (!nameData || !nameData.orcShamanNames) return;
    
    setSelectedName(name);
    
    // Find the description for the selected name
    const nameEntry = nameData.orcShamanNames.find(entry => entry.name === name);
    if (nameEntry) {
      setNameDescription(nameEntry.description);
    } else {
      setNameDescription(null);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>Orc Shaman Name Generator - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ spiritual Orc Shaman names for World of Warcraft. Perfect for roleplaying, character creation, and fan fiction. Create the perfect elemental-wielding Horde character with our free name generator!" />
        <meta name="keywords" content="World of Warcraft, WoW, Orc, Shaman, Name Generator, Horde, Elements, Thrall, Durotan, Drek'Thar, Elemental, Restoration, Enhancement, Dragonflight" />
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
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Orc Shaman Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate spiritual names for orc shamans connected to the elements in World of Warcraft.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Orc Shaman Names</CardTitle>
            <CardDescription>Create spiritual names for orc shamans connected to the elements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate Orc Shaman names"
              >
                {loading ? "Loading..." : "Generate Orc Shaman Names"}
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What Makes a Good Orc Shaman Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Orc Shaman Naming Traditions</a>
              </li>
              <li>
                <a href="#famous-shamans" className="text-primary hover:underline">Famous Orc Shamans</a>
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
              Shamanism is at the heart of traditional orc culture in World of Warcraft. Before the corruption 
              of the Burning Legion, orcs were deeply spiritual people who communed with the elements and 
              ancestral spirits through their shamans.
            </p>
            <p className="mb-4">
              Orc shamans serve as spiritual leaders, healers, and powerful wielders of elemental magic. 
              They call upon the forces of fire, earth, water, and air to aid their allies and smite their 
              enemies. Their names often reflect their connection to the elements, spirits, and the natural world.
            </p>
            <p>
              Whether you're creating a character for World of Warcraft, writing fan fiction, or developing a 
              character for a role-playing game, this generator provides authentic-sounding orc shaman names 
              that capture the essence of these spiritual elemental masters.
            </p>
          </div>
          
          {/* Hero Image */}
          <GeneratorImage 
            src="/images/categories/worldofwarcraft/orc-shaman/orc-shaman-main.jpg" 
            alt="Orc Shaman" 
            caption="Create spiritual names for orc shamans connected to the elements in World of Warcraft"
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Orc Shaman Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A fitting orc shaman name should capture their spiritual nature and elemental connection:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Elemental References:</span> 
                <span>Names that evoke fire, earth, water, air, or storm connect to a shaman's elemental powers.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Natural Imagery:</span> 
                <span>References to mountains, rivers, thunder, lightning, or other natural phenomena reflect their bond with nature.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Spiritual Terms:</span> 
                <span>Names that suggest wisdom, vision, spirits, or ancestors highlight their role as spiritual leaders.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Traditional Sounds:</span> 
                <span>Orc shaman names often include guttural sounds but may be slightly more melodic than warrior names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Totemic Animals:</span> 
                <span>References to wolves, eagles, bears, or other totemic animals important in orcish shamanism.</span>
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
                <span>Click the "Generate Orc Shaman Names" button to create a list of authentic orc shaman names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">2.</span> 
                <span>Click on any name to see more details about the character or shamanic style associated with that name.</span>
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Orc Shaman Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Orc shaman naming conventions reflect their spiritual role and elemental connections:
            </p>
            <ul className="space-y-4 mb-6">
              <li>
                <h3 className="text-lg font-semibold text-primary">Vision Names</h3>
                <p>Many orc shamans receive their names during vision quests or spiritual experiences. These names often come from ancestral spirits or elemental beings and reflect the shaman's destiny or power.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Elemental Titles</h3>
                <p>As shamans grow in power and develop affinities for particular elements, they may earn titles like "Stormbringer," "Earthcaller," or "Flameshaper" that become part of their identity.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Ancestral Connections</h3>
                <p>Some shamans take on names that honor great shamans of the past or their own ancestors, creating a spiritual lineage that connects them to their heritage.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Natural Symbolism</h3>
                <p>Names that reference natural phenomena like thunder, lightning, rivers, or mountains are common among shamans, reflecting their connection to the natural world.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* Famous Shamans */}
        <section id="famous-shamans" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Famous Orc Shamans</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Several legendary orc shamans have shaped the history of Azeroth:
            </p>
            <ul className="space-y-4 mb-6">
              <li>
                <h3 className="text-lg font-semibold text-primary">Thrall (Go'el)</h3>
                <p>Perhaps the most famous orc shaman, Thrall was raised as a gladiator but discovered his true calling as a shaman. He went on to become Warchief of the Horde and later the World Shaman, working with the Earthen Ring to heal Azeroth.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Drek'Thar</h3>
                <p>The elder shaman of the Frostwolf clan and Thrall's mentor, Drek'Thar is blind but possesses powerful spiritual sight. He maintained the shamanic traditions when most orcs had abandoned them.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Ner'zhul</h3>
                <p>Once the greatest shaman of the orcs before being deceived by Kil'jaeden, Ner'zhul's fall from grace led to the corruption of the orcs and eventually his transformation into the original Lich King.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Rehgar Earthfury</h3>
                <p>A former gladiator master who returned to shamanism, Rehgar became an advisor to Thrall and a member of the Earthen Ring, working to heal Azeroth's elemental unrest.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Mother Kashur</h3>
                <p>An ancient and powerful shaman of the Frostwolf clan who passed her knowledge to Drek'Thar, helping preserve orcish shamanic traditions during dark times.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Greatmother Geyah</h3>
                <p>Thrall's grandmother and a respected shaman of the Mag'har orcs in Nagrand, who helped reconnect Thrall with his heritage and shamanic roots.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Magatha Grimtotem</h3>
                <p>Though a tauren, this manipulative shaman interacted extensively with orc shamans and eventually betrayed Cairne Bloodhoof, showing the darker potential of shamanic powers.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Kalthar</h3>
                <p>A powerful Blackrock shaman who maintained the clan's connection to the elements even after many turned to warlock magic, secretly preserving ancient traditions.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Garm Wolfbrother</h3>
                <p>A shaman of the Frostwolf clan who specialized in communing with the spirits of wolves, strengthening the clan's traditional bond with these animals.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Kag'ar Winterfang</h3>
                <p>A frost-focused shaman who developed techniques to survive in the harsh mountains of Alterac Valley, teaching the Frostwolf clan to endure extreme cold.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Zuluhed the Whacked</h3>
                <p>Originally a powerful shaman of the Dragonmaw clan before turning to darker practices, showing the corruption of once-noble shamanic traditions.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Gar'dal Grimsight</h3>
                <p>A shaman who specialized in divination through fire, providing guidance to the Warsong clan through visions seen in the flames.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Mogor the Ogre</h3>
                <p>While technically half-ogre, this powerful shaman ruled the arena at Nagrand, combining orcish shamanic traditions with brutal ogre strength.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Rokhan</h3>
                <p>Though a troll, this shadow hunter worked closely with orc shamans, blending troll voodoo with orcish elemental shamanism to create powerful new techniques.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Earthcaller Yevaa</h3>
                <p>A powerful female orc shaman who specialized in communing with earth elementals, helping to stabilize the land after the cataclysm.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Stormspeaker Mylra</h3>
                <p>An orc shaman who mastered the art of calling upon storm elementals, serving as a key member of the Earthen Ring during elemental crises.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Aggra (Farseer)</h3>
                <p>A Mag'har orc shaman who became Thrall's mate and helped him reconnect with the elements after he lost his connection following the defeat of Deathwing.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Krog Deadeye</h3>
                <p>A one-eyed shaman of the Bleeding Hollow clan who specialized in spirit sight, able to perceive threats and opportunities invisible to others.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Gar'dul Bloodfury</h3>
                <p>A shaman who specialized in enhancement techniques, developing ways to imbue weapons with elemental power to devastating effect.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Tagar Spinebreaker</h3>
                <p>A powerful shaman who led the Bonechewer clan after they were driven from their lands, using earth magic to find safe havens.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Karthog Wildspirit</h3>
                <p>A shaman who developed a unique bond with the spirits of beasts, blending aspects of shamanism and hunting to track prey across vast distances.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Kor'gall</h3>
                <p>Before becoming chieftain of the Stonemaul ogres, Kor'gall was trained in basic shamanic arts, giving him an edge in understanding elemental forces.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Garm Wolfbrother</h3>
                <p>A shaman of the Frostwolf clan who specialized in communing with the spirits of wolves, strengthening the clan's traditional bond with these animals.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Drek'Thar (Alternate)</h3>
                <p>The version of Drek'Thar from alternate Draenor who maintained his connection to the elements and helped the Frostwolf clan resist the Iron Horde.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Sunwalker Dezco</h3>
                <p>Though a tauren, this paladin-shaman hybrid worked closely with orc shamans, showing how different spiritual traditions could complement each other.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Gar'mak Bladetwist</h3>
                <p>A shaman who developed techniques to enhance his combat abilities with elemental power, becoming one of the most feared duelists in orcish society.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Kalthar Bloodseeker</h3>
                <p>A shaman who specialized in healing magic, using the restorative powers of water to mend even the most grievous wounds on the battlefield.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Gar'thok Hammerbreak</h3>
                <p>A shaman who focused on the destructive aspects of the elements, calling down lightning and fire to devastate enemies of the Horde.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Nazgrel</h3>
                <p>While primarily a warrior, Nazgrel incorporated shamanic blessings into his combat style, showing the integration of spiritual practices into orcish warfare.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Gar'tok Bladefist</h3>
                <p>A shaman who learned to channel elemental energies through his weapons, creating devastating combinations of physical and elemental attacks.</p>
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

export default OrcShamanNameGenerator; 