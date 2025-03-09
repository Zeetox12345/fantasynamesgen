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

const SeaNameGenerator = () => {
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
        const data = await import('@/data/dnd/sea.json');
        setNameData(data.default || data);
      } catch (error) {
        console.error("Error loading D&D sea name data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.seaNames || !nameData.seaNames.length) {
      console.error("No D&D sea name data available");
      return;
    }
    
    // Randomly select 10 names from the data
    const shuffled = [...nameData.seaNames].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setGeneratedNames(selected.map(entry => entry.name));
  };

  const handleNameClick = (name: string) => {
    if (!nameData || !nameData.seaNames) return;
    
    setSelectedName(name);
    
    // Find the description for the selected name
    const nameEntry = nameData.seaNames.find(entry => entry.name === name);
    if (nameEntry) {
      setNameDescription(nameEntry.description);
    } else {
      setNameDescription(null);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>DnD Sea Name Generator - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ evocative names for seas, oceans, and other bodies of water in your DnD world. Create immersive maritime settings with our free name generator!" />
        <meta name="keywords" content="DnD, Dungeons and Dragons, sea names, ocean names, fantasy waters, maritime settings, fantasy maps, RPG, tabletop games" />
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
            <h1 className="font-display text-3xl sm:text-4xl font-bold">DnD Sea Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate evocative names for seas, oceans, and other bodies of water in your DnD world.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Sea Names</CardTitle>
            <CardDescription>Create evocative names for seas, oceans, and other bodies of water</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate sea names"
              >
                {loading ? "Loading..." : "Generate Sea Names"}
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What Makes a Good Sea Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#types-of-waters" className="text-primary hover:underline">Types of Bodies of Water in DnD</a>
              </li>
              <li>
                <a href="#famous-seas" className="text-primary hover:underline">Famous Seas in DnD Settings</a>
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
              In the vast worlds of Dungeons & Dragons, seas and oceans are more than just blue expanses on a map—they're 
              realms of adventure, mystery, and danger. From the storm-tossed waters that hide ancient treasures to the 
              calm bays where coastal cities thrive, bodies of water shape civilizations and create natural boundaries.
            </p>
            <p className="mb-4">
              Sea names in DnD often reflect their distinctive characteristics, histories, or the cultures that sail 
              their waters. They might reference colors, weather patterns, legendary creatures, or historical events 
              that occurred in their depths.
            </p>
            <p>
              Whether you're a Dungeon Master creating a new coastal region, designing a maritime campaign, or simply 
              adding detail to your world map, this generator provides evocative names that will bring your aquatic 
              settings to life.
            </p>
          </div>
          
          {/* Hero Image */}
          <GeneratorImage 
            src="/images/categories/dungeonsanddragons/sea/sea-main.jpg" 
            alt="DnD Sea Names" 
            caption="Create evocative names for seas, oceans, and other bodies of water in your DnD world"
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Sea Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              An effective sea or ocean name should evoke its character and significance in your world:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Descriptive Elements:</span> 
                <span>Names that reference color, temperature, or behavior (like "Azure Deep" or "Raging Expanse") immediately convey the water's character.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Cultural Influences:</span> 
                <span>Seas named by specific cultures might reflect their language, values, or mythology (such as "The Dwarven Straits" or "Elven Tides").</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Historical References:</span> 
                <span>Names that commemorate battles, disasters, or discoveries add depth to your world's lore (like "Shipbreaker Bay" or "Discoverer's Passage").</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Creature Associations:</span> 
                <span>Seas named after the creatures that inhabit them create immediate adventure hooks (such as "Kraken's Reach" or "Dragon Turtle Gulf").</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Geographical Context:</span> 
                <span>Names that reference nearby landmarks or regions help place the body of water in your world (like "Frostpeak Sea" or "Shadowwood Bay").</span>
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
                <span>Click the "Generate Sea Names" button to create a list of evocative names for bodies of water.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">2.</span> 
                <span>Click on any name to see more details about the potential characteristics or lore of that particular sea.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">3.</span> 
                <span>Generate as many times as you like until you find the perfect name for your world's maritime features.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">4.</span> 
                <span>Use the descriptions as inspiration for developing the history, dangers, and opportunities associated with these waters.</span>
              </li>
            </ol>
          </div>
        </section>

        {/* Types of Waters */}
        <section id="types-of-waters" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Types of Bodies of Water in DnD</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Understanding different types of water features can help you choose the right name and develop appropriate adventures:
            </p>
            <ul className="space-y-4 mb-6">
              <li>
                <h3 className="font-semibold text-primary text-lg">Oceans</h3>
                <p>The largest bodies of water, oceans span vast distances and often separate continents. They're home to the most powerful aquatic creatures and can contain entire underwater civilizations. Ocean names tend to be grand and ancient.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Seas</h3>
                <p>Smaller than oceans but still substantial, seas are often partially enclosed by land. They frequently serve as trade routes between nations and can have distinct cultural influences from surrounding regions.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Bays and Gulfs</h3>
                <p>These coastal indentations provide natural harbors for cities and are often named after nearby settlements, founding heroes, or distinctive features. They're excellent settings for pirate hideouts or merchant hubs.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Straits and Channels</h3>
                <p>Narrow waterways connecting larger bodies of water, these are strategic chokepoints that might be controlled by powerful nations or creatures. Their names often reflect their dangerous or valuable nature.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Magical Waters</h3>
                <p>In D&D worlds, some bodies of water have magical properties—healing springs, portals to the Elemental Plane of Water, or cursed waters that transform those who drink them. Their names should hint at these supernatural qualities.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* Famous Seas */}
        <section id="famous-seas" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Famous Seas in DnD Settings</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              These iconic bodies of water from DnD lore can inspire your own creations:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <ul className="space-y-4 mb-6">
                  <li>
                    <h3 className="font-semibold text-primary text-lg">The Sea of Fallen Stars</h3>
                    <p>Also known as the Inner Sea, this massive inland sea is the heart of trade in the Forgotten Realms. Its name references a legend that it was created when the goddess Selûne cast down rebellious gods.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">The Trackless Sea</h3>
                    <p>This vast ocean west of Faerûn is home to numerous islands and the feared Nelanther Isles pirates. Its name evokes the difficulty of navigation and the ease with which ships can become lost.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">The Sea of Swords</h3>
                    <p>Running along the Sword Coast, this dangerous body of water earned its name from the many shipwrecks caused by its jagged coastal rocks, which resemble sword blades jutting from the water.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">The Shining Sea</h3>
                    <p>Located south of Calimshan, this sea is known for its unusually clear, sparkling waters and the wealthy trade cities along its shores.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">The Sea of Moving Ice</h3>
                    <p>This northern body of water is filled with icebergs and ice floes that constantly shift position, making navigation treacherous. It's home to frost giants, white dragons, and other cold-dwelling creatures.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">The Moonsea</h3>
                    <p>A large, cold lake in the north of Faerûn, surrounded by harsh lands and ruled by city-states with a reputation for producing tough, no-nonsense folk.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">The Dragonmere</h3>
                    <p>The western arm of the Sea of Fallen Stars, named for its vague dragon-like shape and the numerous dragon turtles that inhabit its depths.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">The Alamber Sea</h3>
                    <p>The eastern arm of the Sea of Fallen Stars, known for its amber-colored waters caused by mineral deposits and the unique marine life that has adapted to these conditions.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">The Great Sea</h3>
                    <p>The massive ocean south of Faerûn, home to the island kingdoms of Lantan and Nimbral, and the distant, mysterious continent of Zakhara.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">The Lake of Steam</h3>
                    <p>Despite its name, this is actually a saltwater inlet of the Shining Sea, known for the volcanic activity that causes parts of it to steam and boil.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">The Endless Ocean</h3>
                    <p>The vast body of water that covers much of Eberron's surface, dotted with island nations and home to underwater civilizations of merfolk and sahuagin.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">The Thunder Sea</h3>
                    <p>A storm-wracked body of water in Eberron, named for the perpetual thunderstorms that rage across its surface, created by the ongoing conflict between various elemental powers.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">The Lhazaar Sea</h3>
                    <p>Home to the Lhazaar Principalities in Eberron, this sea is known for its pirate princes and the constant political intrigue that takes place across its island domains.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">The Bitter Sea</h3>
                    <p>A body of water with unusually high salt content, making it difficult for many forms of life to survive but creating a unique ecosystem of specially adapted creatures.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">The Sea of Sorrows</h3>
                    <p>Named for a great tragedy in which an entire fleet was lost during a magical storm, said to be haunted by the ghosts of drowned sailors who appear during foggy nights.</p>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-4 mb-6">
                  <li>
                    <h3 className="font-semibold text-primary text-lg">The Celestial Sea</h3>
                    <p>A magical body of water that reflects the night sky so perfectly that sailors can navigate by the stars even during the day, said to occasionally connect to the Astral Plane during certain astronomical alignments.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">The Emerald Sea</h3>
                    <p>Named for its distinctive green waters caused by a unique algae that also produces air bubbles, allowing certain areas to be breathable underwater for short periods.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">The Boiling Sea</h3>
                    <p>A sea above an area of intense volcanic activity, with patches of water that literally boil and geysers that occasionally erupt from below, home to fire elementals and other heat-loving creatures.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">The Whispering Tides</h3>
                    <p>A mysterious sea where the movement of the water creates sounds that seem like whispered conversations, believed by some to be the voices of ancient entities communicating with each other.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">The Twilight Depths</h3>
                    <p>A sea where the boundary between the Material Plane and the Shadowfell is thin, causing the water to appear perpetually in twilight regardless of the actual time of day.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">The Crystalline Gulf</h3>
                    <p>Known for its incredibly clear waters and the crystal formations that grow both above and below the surface, creating a maze-like environment that's as beautiful as it is dangerous to navigate.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">The Mistral Sea</h3>
                    <p>Perpetually covered in a thick fog that never fully dissipates, requiring specialized navigation techniques and often leading to ships becoming lost and discovering uncharted islands.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">The Temporal Bay</h3>
                    <p>A small sea affected by time distortions, where a journey that takes days in one direction might take only hours on the return, or where sailors occasionally find themselves briefly transported to past or future versions of the bay.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">The Prismatic Ocean</h3>
                    <p>Named for the rainbow-like effect visible on its surface when sunlight hits it at certain angles, caused by microscopic crystalline organisms that float near the surface.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">The Midnight Sea</h3>
                    <p>A body of water with waters so dark they appear black, absorbing light rather than reflecting it, making it a perfect hiding place for those wishing to avoid detection.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">The Sargasso of Doom</h3>
                    <p>A region of relatively still water filled with a dense mass of magical seaweed that can entangle ships and slowly draw them down, rumored to hide the wrecks of countless vessels and their treasures.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">The Luminous Depths</h3>
                    <p>A sea filled with bioluminescent creatures that create spectacular light displays at night, used by local cultures for religious ceremonies and as a natural calendar.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">The Abyssal Reach</h3>
                    <p>An incredibly deep ocean trench where the boundary with the Abyss grows thin, occasionally allowing demons and other abyssal creatures to enter the Material Plane.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">The Singing Sea</h3>
                    <p>Named for the haunting, musical tones produced when the wind passes through the unique rock formations along its coast, attracting bards from across the world who seek inspiration.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">The Dreaming Gulf</h3>
                    <p>A sea where those who sail its waters often experience vivid, prophetic dreams, believed to be influenced by a slumbering primordial entity deep beneath the waves.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Generators */}
        <section id="latest-generators" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Latest Generators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Blacksmith Name Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Create memorable names for blacksmiths and their forges in your D&D world</p>
                <Link to="/dungeonsanddragons/blacksmith" onClick={() => window.scrollTo(0, 0)}>
                  <Button variant="outline" size="sm" className="w-full">Try Generator</Button>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Merfolk Name Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Create flowing and aquatic names for merfolk characters and tribes</p>
                <Link to="/dungeonsanddragons/merfolk" onClick={() => window.scrollTo(0, 0)}>
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
          </div>
        </section>
      </div>
    </div>
  );
};

export default SeaNameGenerator; 