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

const DwarfCityNameGenerator = () => {
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
        const data = await import('@/data/dnd/dwarf-city.json');
        setNameData(data.default || data);
      } catch (error) {
        console.error("Error loading D&D dwarf city name data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.cityNames || !nameData.cityNames.length) {
      console.error("No D&D dwarf city name data available");
      return;
    }
    
    // Randomly select 10 names from the data
    const shuffled = [...nameData.cityNames].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setGeneratedNames(selected.map(entry => entry.name));
  };

  const handleNameClick = (name: string) => {
    if (!nameData || !nameData.cityNames) return;
    
    setSelectedName(name);
    
    // Find the description for the selected name
    const nameEntry = nameData.cityNames.find(entry => entry.name === name);
    if (nameEntry) {
      setNameDescription(nameEntry.description);
    } else {
      setNameDescription(null);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>DnD Dwarf City Name Generator - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ authentic dwarf city names for your DnD campaign. Create the perfect stronghold, mountain fortress, or underground city with our free name generator!" />
        <meta name="keywords" content="DnD, Dungeons and Dragons, dwarf city names, dwarven stronghold, mountain fortress, fantasy names, RPG, tabletop games" />
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
            <h1 className="font-display text-3xl sm:text-4xl font-bold">DnD Dwarf City Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate authentic and immersive names for dwarven cities and strongholds in your DnD campaign.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Dwarf City Names</CardTitle>
            <CardDescription>Create authentic names for dwarven cities and strongholds</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate dwarf city names"
              >
                {loading ? "Loading..." : "Generate Dwarf City Names"}
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What Makes a Good Dwarf City Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Dwarven Naming Traditions</a>
              </li>
              <li>
                <a href="#famous-cities" className="text-primary hover:underline">Famous Dwarven Cities in D&D</a>
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
              In the world of Dungeons & Dragons, dwarven cities are legendary marvels of engineering and craftsmanship. 
              Carved into mountain ranges or deep underground, these strongholds are known for their impenetrable defenses, 
              grand halls, and rich mines filled with precious metals and gems.
            </p>
            <p className="mb-4">
              Dwarf city names in DnD often reflect the hardy, industrious nature of their creators. They typically 
              incorporate elements of the dwarven language, which has a distinctive sound with hard consonants, 
              guttural syllables, and references to stone, metal, and craftsmanship.
            </p>
            <p>
              Whether you're a Dungeon Master creating a new settlement for your campaign, a player developing your 
              character's backstory, or simply a fan of dwarven lore, this generator provides authentic-sounding 
              names that capture the essence of dwarven culture and architecture.
            </p>
          </div>
          
          {/* Hero Image */}
          <GeneratorImage 
            src="/images/categories/dungeonsanddragons/dwarf-city/dwarf-city-main.jpg" 
            alt="DnD Dwarf City Names" 
            caption="Create authentic and immersive names for dwarven cities and strongholds in your DnD campaign"
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Dwarf City Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A compelling dwarven city name should evoke the culture, history, and environment of these master craftsmen:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Geological References:</span> 
                <span>Names that incorporate stone, mountain, or underground terminology reflect the dwarves' connection to earth and rock.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Metallurgical Elements:</span> 
                <span>References to metals, forging, and craftsmanship honor the dwarves' legendary skill as smiths and artisans.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Clan Connections:</span> 
                <span>Many dwarven settlements are named after founding clans or legendary heroes, preserving their history.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Harsh Consonants:</span> 
                <span>Authentic dwarven names often feature hard sounds like 'k', 'g', 'th', and 'kh' that reflect their rugged nature.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Descriptive Suffixes:</span> 
                <span>Terms like '-hold', '-delve', '-forge', or '-home' often complete dwarven settlement names, indicating their purpose.</span>
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
                <span>Click the "Generate Dwarf City Names" button to create a list of authentic dwarven settlement names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">2.</span> 
                <span>Click on any name to see more details about the meaning or characteristics of that particular city.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">3.</span> 
                <span>Generate as many times as you like until you find the perfect name for your campaign or character backstory.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">4.</span> 
                <span>Use the descriptions as inspiration for developing the city's history, appearance, and notable features.</span>
              </li>
            </ol>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Dwarven Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Dwarven cities in D&D follow several naming conventions that reflect their culture and values:
            </p>
            <ul className="space-y-4 mb-6">
              <li>
                <h3 className="font-semibold text-primary text-lg">Founder-Based Names</h3>
                <p>Many dwarven settlements are named after their founding clan or a legendary hero. Examples include Gauntlgrym (named after King Gauntlgrym) or Citadel Adbar (established by Adbar the Magnificent).</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Resource-Inspired Names</h3>
                <p>Cities are often named after valuable resources found in the area, such as Mithral Hall, Silverymoon, or Ironforge, highlighting the dwarves' connection to mining and metalworking.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Descriptive Geographic Names</h3>
                <p>Physical features of the location frequently inspire names, like Deepholm (deep valley), Stonespire (prominent rock formation), or Highpeak (mountain summit).</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Compound Constructions</h3>
                <p>Dwarven city names often combine two or more words to create a descriptive whole, such as Irondelve, Stonehammer, or Forgelight, reflecting both location and purpose.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* Famous Cities */}
        <section id="famous-cities" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Famous Dwarven Cities in DnD</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              These legendary dwarven settlements from DnD lore can inspire your own creations:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <ul className="space-y-4 mb-6">
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Gauntlgrym</h3>
                    <p>An ancient dwarven city beneath the Sword Mountains in the Forgotten Realms, known for its Great Forge powered by a primordial of fire.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Mithral Hall</h3>
                    <p>Home of Clan Battlehammer and made famous by Bruenor Battlehammer, this city is renowned for its mithral mines and defensive tunnels.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Citadel Felbarr</h3>
                    <p>Also known as the Citadel of Many Arrows, this fortress has been lost and reclaimed multiple times throughout its history.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Citadel Adbar</h3>
                    <p>A virtually impregnable fortress-city in the Silver Marches, designed to withstand any siege with its massive walls and underground food supplies.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Ironmaster</h3>
                    <p>A dwarven mining city known for its exceptional iron and steel production, supplying weapons throughout the North.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Khazad-dûm (Moria)</h3>
                    <p>The greatest of all dwarven realms, this vast underground kingdom spans an entire mountain range with countless halls and mines of mithral.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Sundabar</h3>
                    <p>A fortress-city built atop ancient dwarven ruins, known for its strong walls and as a trading hub between the North and the Silver Marches.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Earthfast</h3>
                    <p>A remote mountain stronghold known for its secretive inhabitants and ancient treasures hidden deep within its mines.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Hammerhold</h3>
                    <p>Famous for its massive central forge shaped like a hammer, this city produces some of the finest dwarven weapons in the realms.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Irondelve</h3>
                    <p>Built around a massive iron deposit, this city's architecture features intricate ironwork and mechanical marvels powered by underground streams.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Thornhold</h3>
                    <p>A coastal fortress that changed hands many times, now reclaimed by dwarves who use it as a trading port and naval base.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Gracklstugh</h3>
                    <p>A duergar city in the Underdark known for its skilled smiths and the constant smoke from its many forges that fills the cavern.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Iltkazar</h3>
                    <p>One of the last surviving shield dwarf kingdoms in the Underdark, known for its ancient libraries and defensive magic.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Blingdenstone</h3>
                    <p>Though primarily a deep gnome settlement, it has significant dwarven quarters and showcases unique collaborative architecture.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Thunderholme</h3>
                    <p>Built into a mountain struck regularly by lightning, its smiths harness this power for creating magical weapons and armor.</p>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-4 mb-6">
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Glitterhame</h3>
                    <p>Named for the precious gems that stud its walls, this city is known for its jewelers and the magical illumination that makes the entire cavern sparkle.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Ironhome</h3>
                    <p>A fortress city with walls of solid iron, known for its impenetrability and the constant ringing of hammers from its many smithies.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Deepstone</h3>
                    <p>The deepest known dwarven settlement, famous for its rare minerals and strange fungi gardens that provide food for the entire city.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Karak Eight Peaks</h3>
                    <p>Built beneath eight mountain peaks, this massive city features eight grand halls, each dedicated to a different aspect of dwarven craft.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Silverymoon</h3>
                    <p>While primarily a surface city, its dwarven district is renowned for its silver crafts and magical items created by dwarven artificers.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Stoneshaft</h3>
                    <p>Built around a massive vertical shaft that connects multiple levels of mines, known for its elaborate elevator system powered by water wheels.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Hammergrim</h3>
                    <p>A war-focused fortress city with multiple defensive rings and training grounds that produce some of the finest dwarven warriors.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Firebrand</h3>
                    <p>Built near a volcanic vent, its smiths use the natural heat for forging, creating weapons with distinctive red-tinged metal.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Khundrukar</h3>
                    <p>Also known as the Glitterhame, this abandoned dwarven hold contains vast riches but is now inhabited by dangerous creatures.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Mirabar</h3>
                    <p>A surface city with extensive mines beneath, known for its metal trade and the Undercity where most dwarves live and work.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Gharraghaur</h3>
                    <p>A city carved into a series of waterfalls, using water power for its forges and featuring spectacular water-carved architecture.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Ironslag</h3>
                    <p>A fire giant fortress built from an ancient dwarven city, still containing many dwarven architectural elements and forge designs.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Tzindylspar</h3>
                    <p>Known for its crystal mines and artisans who craft magical focusing lenses and scrying devices from the rare crystals found there.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Eartheart</h3>
                    <p>The gold dwarf capital in the Great Rift, known for its open-air design that combines underground halls with surface structures.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Undermountain</h3>
                    <p>While primarily a dungeon, its deepest levels contain ancient dwarven halls with architectural marvels and forgotten treasures.</p>
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
                <CardTitle className="text-lg">Dark Urge Name Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Generate mysterious and ominous names for your dark urge characters</p>
                <Link to="/dungeonsanddragons/dark-urge" onClick={() => window.scrollTo(0, 0)}>
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

export default DwarfCityNameGenerator; 