import { useState, useEffect } from "react";
import { Gamepad, Info } from "lucide-react";
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
import { loadNameData } from "@/lib/nameUtils";
import { GeneratorImage } from "@/components/GeneratorImage";

const SplatoonCityNameGenerator = () => {
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
        const data = await import('@/data/Splatoon/city.json');
        setNameData(data.default || data);
      } catch (error) {
        console.error("Error loading Splatoon city name data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.cityNames || !nameData.cityNames.length) {
      console.error("No Splatoon city name data available");
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
        <title>Splatoon City Name Generator - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ unique city names for the Splatoon universe. Create the perfect urban settings for your fan fiction, art, and worldbuilding!" />
        <meta name="keywords" content="Splatoon city names, Inkopolis, Splatsville, Splatoon 3, Nintendo, Splatoon locations, Splatoon worldbuilding" />
      </Helmet>
      <div className="max-w-7xl mx-auto">
        {/* Header with back button */}
        <div className="mb-6 sm:mb-8">
          <Link 
            to="/splatoon" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4 sm:mb-6"
            onClick={() => window.scrollTo(0, 0)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            Back to Splatoon
          </Link>
          
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 rounded-lg bg-primary/10 text-primary">
              <Gamepad className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Splatoon City Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate unique city names for the colorful world of Splatoon.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Splatoon City Names</CardTitle>
            <CardDescription>Create unique urban centers for the Splatoon universe</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate Splatoon city names"
              >
                {loading ? "Loading..." : "Generate City Names"}
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What Makes a Good Splatoon City Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Splatoon City Naming Traditions</a>
              </li>
              <li>
                <a href="#popular-names" className="text-primary hover:underline">Famous Splatoon Cities</a>
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
              The Splatoon universe takes place in a post-apocalyptic world where sea creatures have evolved to become 
              the dominant species after the extinction of humans. In this vibrant setting, cities like Inkopolis and 
              Splatsville serve as central hubs where Inklings and Octolings gather to battle, shop, and socialize.
            </p>
            <p className="mb-4">
              These urban centers are characterized by their colorful architecture, unique districts, and playful names 
              that often incorporate references to ink, sea creatures, and aquatic themes. From the bustling Inkopolis 
              Square to the chaotic streets of Splatsville, these cities reflect the game's distinctive aesthetic and lore.
            </p>
            <p>
              Whether you're creating fan fiction, developing a custom map, or expanding the Splatoon universe with your 
              own worldbuilding, this generator provides unique city names that would fit perfectly alongside the iconic 
              locations from the games.
            </p>
          </div>
          
          {/* Hero Image */}
          <GeneratorImage 
            src="/images/categories/splatoon/city/city-main.jpg" 
            alt="Splatoon City Names" 
            caption="Create unique urban centers for the colorful world of Splatoon"
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Splatoon City Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A great Splatoon city name should capture the game's unique setting and aesthetic:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ink References:</span> 
                <span>Names that incorporate ink, splats, and color terminology, like "Inkopolis" combining "ink" and "metropolis."</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Aquatic Terminology:</span> 
                <span>References to water, oceans, and marine environments that reflect the aquatic origins of the characters.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Sea Creature Elements:</span> 
                <span>Incorporating terms related to squids, octopuses, and other sea creatures that inhabit the world.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Playful Wordplay:</span> 
                <span>Puns and creative combinations that capture the game's lighthearted and fun atmosphere.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Post-Apocalyptic Hints:</span> 
                <span>Subtle references to the world's post-human setting, like modified versions of real-world city names.</span>
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
                <span>Click the "Generate City Names" button to create a list of unique Splatoon city names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">2.</span> 
                <span>Click on any name to see more details about the style or theme of that particular city.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">3.</span> 
                <span>Generate as many times as you like until you find the perfect city name for your Splatoon creation.</span>
              </li>
            </ol>
            <p>
              Remember that these names are starting points—feel free to modify them to better suit your specific 
              worldbuilding needs or to add your own creative touch to the Splatoon universe!
            </p>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Splatoon City Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              In the Splatoon universe, city names follow several common patterns:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ink + Urban Term:</span> 
                <span>"Inkopolis" combines "ink" with "metropolis" to create the name of the main hub city.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Splat Combinations:</span> 
                <span>"Splatsville" uses the game's core "splat" terminology combined with a traditional city suffix.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Aquatic Prefixes:</span> 
                <span>Names that start with aquatic terms like "Wave," "Reef," or "Tide" followed by urban terminology.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Color References:</span> 
                <span>Cities named after colors that are prominent in the game, often combined with geographical features.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Modified Real Names:</span> 
                <span>Playful twists on real-world city names, reflecting the post-apocalyptic setting where human civilization has been lost.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Popular Names */}
        <section id="popular-names" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Famous Splatoon Cities</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Here are 30 of the most notable urban locations from the Splatoon universe:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Inkopolis:</span> 
                <span>The main hub city from the original Splatoon, home to Inkopolis Plaza.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Inkopolis Square:</span> 
                <span>The central plaza in Splatoon 2, featuring shops, the Deca Tower, and Off the Hook's studio.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Splatsville:</span> 
                <span>Known as the "city of chaos," this is the main hub in Splatoon 3, located in the Splatlands.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Alterna:</span> 
                <span>The mysterious location featured in Splatoon 3's single-player campaign.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Octo Valley:</span> 
                <span>The underground region where Octarians live, featured in the original Splatoon's campaign.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Octo Canyon:</span> 
                <span>Another Octarian-controlled area that serves as the setting for Splatoon 2's campaign.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Deepsea Metro:</span> 
                <span>The underground subway system featured in the Octo Expansion DLC.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Wahoo World:</span> 
                <span>A seaside amusement park that serves as a battle stage in Splatoon 2.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Chromopolis:</span> 
                <span>A vibrant city known for its colorful architecture and art districts.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Tentacle Town:</span> 
                <span>A coastal settlement with buildings designed to resemble tentacles.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Squidopolis:</span> 
                <span>One of the oldest Inkling settlements, with traditional architecture.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Octo Outpost:</span> 
                <span>A frontier settlement where Octolings first began integrating with Inkling society.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Reef Ridge:</span> 
                <span>A hillside city built on ancient coral formations.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Port Mackerel:</span> 
                <span>A busy industrial harbor that also serves as a battle stage.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Manta Maria:</span> 
                <span>A floating city built on a massive converted ship.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Moray Towers:</span> 
                <span>A vertical city with towering skyscrapers connected by ramps.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Arowana Mall:</span> 
                <span>A major shopping district that doubles as a battle stage.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Kelp Dome:</span> 
                <span>An agricultural center housed in a massive greenhouse.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Blackbelly Skatepark:</span> 
                <span>A recreational area popular with young Inklings and Octolings.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Camp Triggerfish:</span> 
                <span>A lakeside summer camp that serves as a battle stage.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Hammerhead Bridge:</span> 
                <span>A major transportation hub connecting different parts of Inkopolis.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Flounder Heights:</span> 
                <span>A residential district built on a hillside with apartment complexes.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Saltspray Rig:</span> 
                <span>An offshore industrial platform converted for residential use.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Bluefin Depot:</span> 
                <span>A transportation hub with train yards and warehouses.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Urchin Underpass:</span> 
                <span>A network of tunnels and underpasses beneath Inkopolis.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Walleye Warehouse:</span> 
                <span>An industrial district with storage facilities and factories.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Shellendorf Institute:</span> 
                <span>A prestigious museum and research center studying pre-Inkling artifacts.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Goby Arena:</span> 
                <span>A major sports complex hosting competitive events.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Starfish Mainstage:</span> 
                <span>A popular concert venue where major bands perform.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Ancho-V Games:</span> 
                <span>The headquarters of a major video game development company.</span>
              </div>
            </div>
            <p className="mt-4">
              These locations showcase the diverse urban environments in the Splatoon world, from bustling city centers 
              to specialized districts and facilities. Many of these locations serve dual purposes as both living spaces 
              and battle stages, reflecting how Turf War and other competitions are integrated into Inkling and Octoling society.
            </p>
            <p className="mt-4">
              The architecture and design of these locations often incorporate aquatic themes, bright colors, and 
              post-apocalyptic elements that hint at the world's history. Human structures have been repurposed and 
              rebuilt by the new sea creature civilizations, creating a unique aesthetic that blends the familiar with 
              the fantastical.
            </p>
          </div>
        </section>

        {/* Latest Generators */}
        <section id="latest-generators" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Latest Splatoon Generators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Splatoon Song Name Generator</CardTitle>
                <CardDescription>Create catchy titles for Splatoon songs and tracks</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/splatoon/song" className="text-primary hover:underline">Try the generator →</Link>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Splatoon Band Name Generator</CardTitle>
                <CardDescription>Generate fresh and funky names for Splatoon bands</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/splatoon/band" className="text-primary hover:underline">Try the generator →</Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SplatoonCityNameGenerator; 