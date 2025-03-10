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

const GroupNameGenerator = () => {
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
        const data = await import('@/data/dnd/group.json');
        setNameData(data.default || data);
      } catch (error) {
        console.error("Error loading D&D group name data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.groupNames || !nameData.groupNames.length) {
      console.error("No D&D group name data available");
      return;
    }
    
    // Randomly select 10 names from the data
    const shuffled = [...nameData.groupNames].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setGeneratedNames(selected.map(entry => entry.name));
  };

  const handleNameClick = (name: string) => {
    if (!nameData || !nameData.groupNames) return;
    
    setSelectedName(name);
    
    // Find the description for the selected name
    const nameEntry = nameData.groupNames.find(entry => entry.name === name);
    if (nameEntry) {
      setNameDescription(nameEntry.description);
    } else {
      setNameDescription(null);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>DnD Group Name Generator - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ unique and catchy names for adventuring parties and groups in Dungeons & Dragons. Create the perfect name for your next D&D campaign!" />
        <meta name="keywords" content="D&D, DnD, Dungeons and Dragons, group names, adventuring party, fantasy names, RPG party names, D&D 5e" />
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
            <h1 className="font-display text-3xl sm:text-4xl font-bold">DnD Group Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate unique and catchy names for adventuring parties and groups in Dungeons & Dragons.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Group Names</CardTitle>
            <CardDescription>Create unique and catchy names for adventuring parties and groups</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate group names"
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What Makes a Good Group Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Adventuring Party Naming Traditions</a>
              </li>
              <li>
                <a href="#popular-names" className="text-primary hover:underline">Popular Group Names</a>
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
              In the world of Dungeons & Dragons, adventuring parties are more than just random collections of 
              individuals—they're legendary teams whose names echo through taverns, royal courts, and the annals 
              of history. A great group name can define your party's identity, reflect your shared goals, and 
              strike fear (or laughter) into the hearts of your enemies.
            </p>
            <p className="mb-4">
              Whether your party formed through chance encounters at a roadside inn or was deliberately assembled 
              for a specific mission, having a memorable name helps establish your collective reputation and gives 
              NPCs something to spread in rumors and tales of your exploits.
            </p>
            <p>
              This generator provides a wide variety of group names suitable for any adventuring party, mercenary 
              company, thieves' guild, or heroic fellowship in your D&D campaign. From the noble and serious to 
              the quirky and humorous, you'll find options that perfectly capture your party's unique character.
            </p>
          </div>
          
          {/* Hero Image */}
          <GeneratorImage 
            src="/images/categories/dungeonsanddragons/group/group-main.jpg" 
            alt="Group Names" 
            caption="Create unique and catchy names for adventuring parties and groups in Dungeons & Dragons"
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Group Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A compelling adventuring party name should capture the essence of your group and be memorable to both players and NPCs:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Shared Theme:</span> 
                <span>The best group names often reflect a common element among party members, such as their goals, backgrounds, or a significant shared experience.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Memorability:</span> 
                <span>A good name is easy to remember and distinctive enough that NPCs can quickly recognize and spread word of your exploits.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Tone Alignment:</span> 
                <span>The name should match the tone of your campaign—heroic and noble for serious quests, or witty and irreverent for more lighthearted adventures.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Growth Potential:</span> 
                <span>The best names can evolve with your party, perhaps gaining epithets or modifiers as your reputation grows and your adventures become more legendary.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Player Buy-in:</span> 
                <span>A name that all players enjoy and feel represents their characters will be used more consistently and enthusiastically throughout the campaign.</span>
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
                <span>Click the "Generate Names" button to create a list of adventuring party names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">2.</span> 
                <span>Click on any name to see more details about its potential meaning or the type of group it might represent.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">3.</span> 
                <span>Generate as many times as you like until you find a name that resonates with your group.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">4.</span> 
                <span>Consider modifying the chosen name to better reflect your specific party composition, goals, or inside jokes.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">5.</span> 
                <span>Present a few options to your fellow players and vote on the one that best represents your collective identity.</span>
              </li>
            </ol>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Adventuring Party Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Adventuring parties in D&D worlds tend to follow certain naming patterns that have become traditions across the multiverse:
            </p>
            <ul className="space-y-4 mb-6">
              <li>
                <h3 className="font-semibold text-primary text-lg">The "Company" Format</h3>
                <p>Many groups adopt a structure like "The [Adjective] [Noun] Company," such as "The Silver Talon Company" or "The Midnight Veil Company," creating a name that sounds professional and established.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Symbolic Animals or Objects</h3>
                <p>Groups often adopt a significant animal or object as their symbol, leading to names like "The Crimson Ravens" or "The Broken Shield," which are easy to represent visually on banners or insignias.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Location-Based Names</h3>
                <p>Some parties name themselves after their place of origin or a significant location in their shared history, such as "The Neverwinter Nine" or "Defenders of Silverymoon," creating an immediate geographic association.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Deed-Based Epithets</h3>
                <p>As parties gain fame, they might become known for a particular achievement, leading to names like "Dragonslayers of the North" or "Breakers of the Iron Crown," which commemorate their greatest exploits.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Humorous Self-Deprecation</h3>
                <p>Some groups, particularly those with a lighthearted approach to adventuring, choose intentionally ironic or self-deprecating names like "The Unfortunate Few" or "Disaster Waiting to Happen," which often endear them to common folk.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* Popular Names */}
        <section id="popular-names" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Popular DnD Group Names</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Here are 30 popular group names from D&D lore and fantasy worlds, each with unique characteristics and adventuring reputations:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">The Silver Ravens:</span> 
                    <span>A group of freedom fighters known for liberating towns from tyrannical rulers, leaving silver raven tokens as their calling card.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Crimson Vanguard:</span> 
                    <span>Elite mercenaries who specialize in front-line combat, recognizable by their blood-red armor and disciplined formations.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">The Emerald Enclave:</span> 
                    <span>A faction of druids, rangers, and nature-aligned adventurers who protect wilderness areas from corruption.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Dawnbringers:</span> 
                    <span>Paladins and clerics dedicated to fighting undead and other creatures of darkness, known for their radiant magic.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">The Obsidian Order:</span> 
                    <span>A secretive group of spellcasters who collect and guard dangerous magical artifacts from misuse.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Stormchasers:</span> 
                    <span>Adventurers who specialize in elemental magic and exploration of the planes, often found where magical storms rage.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">The Gilded Hand:</span> 
                    <span>A wealthy merchant consortium that funds expeditions to recover lost treasures, taking a substantial cut of findings.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Nightwatch Brigade:</span> 
                    <span>Urban defenders who patrol city streets after dark, protecting citizens from monsters and criminals alike.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">The Arcane Fist:</span> 
                    <span>Battle mages who combine martial prowess with devastating spellcasting, known for their enchanted gauntlets.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Verdant Seekers:</span> 
                    <span>Explorers dedicated to finding lost druidic groves and ancient nature magic, often led by elves and half-elves.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">The Iron Wolves:</span> 
                    <span>A band of shapeshifters and rangers who protect frontier settlements from monstrous threats.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Shadowblades:</span> 
                    <span>Rogues and assassins who specialize in espionage and covert operations, often hired for political intrigue.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">The Phoenix Guard:</span> 
                    <span>Elite warriors sworn to protect a royal lineage, each member ritually bound to return to duty even after death.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Mistwalkers:</span> 
                    <span>Adventurers who navigate treacherous swamps and misty realms, experts at finding hidden paths and lost treasures.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">The Platinum Shield:</span> 
                    <span>Devoted followers of Bahamut who hunt evil dragons and their cultists, known for their silvery-platinum armor.</span>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Duskrunners:</span> 
                    <span>Specialists in twilight operations, combining stealth with speed to complete missions between day and night.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">The Runic Veil:</span> 
                    <span>Scholar-adventurers who decipher ancient magical scripts and protect the world from forgotten curses.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Frostborne Legion:</span> 
                    <span>Warriors from northern realms who specialize in cold-weather combat and fighting ice creatures.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">The Amber Dirks:</span> 
                    <span>Treasure hunters who specialize in recovering items from amber deposits, often containing preserved ancient magic.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Stormhammer Clan:</span> 
                    <span>Dwarven warriors and craftsmen who forge weapons imbued with lightning, renowned for their thunderous attacks.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">The Veiled Court:</span> 
                    <span>A mysterious collective of nobles and spies who manipulate politics from the shadows for the greater good.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Sunfire Wardens:</span> 
                    <span>Desert-dwelling protectors who harness solar magic, guarding ancient tombs from would-be plunderers.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">The Cobalt Soul:</span> 
                    <span>An order of monks and scholars dedicated to collecting and preserving knowledge through direct experience.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Grimwater Company:</span> 
                    <span>Seafaring adventurers who explore dangerous coastal caves and underwater ruins for forgotten treasures.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">The Ashen Wolves:</span> 
                    <span>Survivors of a great catastrophe who now hunt those responsible, recognizable by their gray cloaks and burn scars.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Thornguard Circle:</span> 
                    <span>Protectors of sacred groves who use plant magic to ensnare enemies and heal allies.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">The Midnight Choir:</span> 
                    <span>Bards and spellcasters who weave magic through music, known for infiltrating enemy strongholds through performance.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Starfall Sentinels:</span> 
                    <span>Watchers of the night sky who track celestial omens and fight threats from beyond the stars.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">The Copper Talons:</span> 
                    <span>Griffon-riding scouts and messengers who serve as elite reconnaissance for armies and kingdoms.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Voidwalkers:</span> 
                    <span>Adventurers who have survived the Far Realm and returned with strange powers, hunting aberrations that breach reality.</span>
                  </li>
                </ul>
              </div>
            </div>
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
                <CardTitle className="text-lg">Sorcerer Name Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Create mystical and powerful names for sorcerer characters</p>
                <Link to="/dungeonsanddragons/sorcerer" onClick={() => window.scrollTo(0, 0)}>
                  <Button variant="outline" size="sm" className="w-full">Explore</Button>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Dwarf Clan Name Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Generate traditional and robust names for dwarf clans and families</p>
                <Link to="/dungeonsanddragons/dwarf-clan" onClick={() => window.scrollTo(0, 0)}>
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

export default GroupNameGenerator; 