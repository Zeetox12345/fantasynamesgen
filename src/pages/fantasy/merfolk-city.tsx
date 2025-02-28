import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Wand2, Building2, Waves, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { loadNameData, generateNames, LocationNameData, NameEntry } from "@/lib/nameUtils";
import { GeneratorImage } from "@/components/GeneratorImage";

const MerfolkCityGenerator = () => {
  const [cityType, setCityType] = useState<"metropolis" | "settlement">("metropolis");
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [nameData, setNameData] = useState<LocationNameData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [nameDescription, setNameDescription] = useState<string | null>(null);

  // Load name data when component mounts
  useEffect(() => {
    async function fetchNameData() {
      setLoading(true);
      console.log("Fetching merfolk city name data...");
      try {
        const data = await loadNameData("fantasy", "merfolk-city");
        console.log("Merfolk city data loaded:", data);
        setNameData(data as LocationNameData);
      } catch (error) {
        console.error("Error loading merfolk city data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData) {
      console.log("No merfolk city name data available");
      return;
    }
    
    console.log("Generating merfolk city names with data:", nameData);
    
    // Get the city names from the JSON data
    const cityNameEntries = nameData.cityNames as NameEntry[] || [];
    console.log("Available city names:", cityNameEntries.length);
    
    // Extract just the names
    const availableNames = cityNameEntries.map(entry => entry.name);
    
    // Check if we have enough names to generate
    if (availableNames.length === 0) {
      console.log("No city names available in the data");
      return;
    }
    
    // Create an array to store the generated names
    const newNames: string[] = [];
    
    // Generate unique names
    const maxAttempts = 50; // Prevent infinite loop if we can't find enough unique names
    let attempts = 0;
    
    while (newNames.length < 10 && attempts < maxAttempts) {
      // Get a random index
      const nameIndex = Math.floor(Math.random() * availableNames.length);
      const name = availableNames[nameIndex];
      
      // Only add if it's not already in the list
      if (!newNames.includes(name)) {
        newNames.push(name);
      }
      
      attempts++;
    }
    
    console.log("Generated merfolk city names:", newNames);
    setGeneratedNames(newNames);
  };

  const handleNameClick = (name: string) => {
    if (!nameData) return;
    
    setSelectedName(name);
    console.log("Clicked on merfolk city name:", name);
    
    // Find the name in the cityNames array
    const nameList = nameData.cityNames as NameEntry[] || [];
    const entry = nameList.find(e => e.name === name);
    
    console.log("Name entry found:", entry);
    
    let description = '';
    if (entry) {
      // The description format in the JSON is "Atlantmere, A mystical city resting in the depths of the ocean trench"
      // We need to extract just the description part after the comma
      const parts = entry.description.split(', ');
      if (parts.length > 1) {
        description = parts[1]; // Take the part after the comma
      } else {
        description = entry.description;
      }
    } else {
      // Provide a fallback description if none is found
      const cityTypeText = cityType === 'metropolis' ? 'metropolis' : 'settlement';
      description = `A magnificent merfolk ${cityTypeText} known as ${name}, featuring unique underwater architecture and cultural significance.`;
    }
    
    console.log("Final merfolk city description:", description);
    setNameDescription(description);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>Merfolk City Name Generator - Underwater Kingdoms | FantasyNamesGen</title>
        <meta name="description" content="Generate majestic and mystical names for underwater merfolk cities and settlements. Create unique aquatic civilizations for your fantasy world." />
        <meta name="keywords" content="merfolk city names, underwater city, aquatic settlement, fantasy location, mermaid kingdom, name generator, sea kingdom" />
      </Helmet>
      <div className="max-w-7xl mx-auto">
        {/* Header with back button */}
        <div className="mb-6 sm:mb-8">
          <Link 
            to="/fantasy" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4 sm:mb-6"
            onClick={() => window.scrollTo(0, 0)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            Back to Fantasy
          </Link>
          
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 rounded-lg bg-primary/10 text-primary">
              <Waves className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Merfolk City Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate majestic and mystical names for underwater merfolk cities and settlements.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Merfolk City Names</CardTitle>
            <CardDescription>Select city type and generate unique underwater settlement names</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <span className="text-sm font-medium">City Type:</span>
                <div className="flex gap-2">
                  <Toggle 
                    pressed={cityType === "metropolis"} 
                    onPressedChange={() => setCityType("metropolis")}
                    variant="outline"
                    aria-label="Select metropolis cities"
                  >
                    Metropolis
                  </Toggle>
                  <Toggle 
                    pressed={cityType === "settlement"} 
                    onPressedChange={() => setCityType("settlement")}
                    variant="outline"
                    aria-label="Select settlement cities"
                  >
                    Settlement
                  </Toggle>
                </div>
              </div>
              
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate merfolk city names"
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What is a Good Merfolk City Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Merfolk City Naming Traditions</a>
              </li>
              <li>
                <a href="#popular-names" className="text-primary hover:underline">Most Popular Merfolk City Names</a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Introduction */}
        <section id="introduction" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Introduction</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Merfolk cities are the hidden wonders of the deep sea, magnificent underwater settlements where 
              aquatic humanoids build their civilizations. These underwater kingdoms range from sprawling metropolises 
              carved into coral reefs to intimate settlements nestled in protected grottos.
            </p>
            <p className="mb-4">
              The architecture of merfolk cities often utilizes natural formations like coral, shells, and ocean crystals, 
              creating shimmering displays of light and color that dance with the currents. Some cities rise like towers 
              from the ocean floor, while others spread horizontally across the seafloor or are built into the sides of 
              underwater cliffs and trenches.
            </p>
            <p>
              This generator creates names for these magical underwater realms, providing you with authentic-sounding 
              merfolk city names that evoke the mystery and beauty of aquatic civilization.
            </p>
          </div>
          
          {/* Featured Merfolk City Image */}
          <GeneratorImage 
            src="/images/categories/fantasy/merfolk-city/merfolk-city-main.jpg"
            alt="Merfolk City"
            caption="A luminous merfolk metropolis built among vast coral formations, with bioluminescent structures and elegant spires rising from the ocean floor."
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Merfolk City Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A good merfolk city name should evoke the splendor and otherworldliness of underwater civilization. 
              Here are some characteristics that make for effective merfolk city names:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Fluid Sounds:</span> 
                <span>Names with flowing phonetics that mimic the movement of water, often with soft consonants and long vowels.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Sea References:</span> 
                <span>Elements that reference ocean features, marine life, or underwater phenomena like currents and tides.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Crystal and Pearl:</span> 
                <span>Incorporation of precious underwater materials that merfolk might use in their architecture.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ancient Quality:</span> 
                <span>Names that suggest age and endurance, as many merfolk civilizations are ancient and unchanged by surface events.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Musical Elements:</span> 
                <span>Components that hint at the musical traditions often associated with merfolk culture.</span>
              </li>
            </ul>
            <p>
              Great merfolk city names like "Coralspire," "Tidewhisper Haven," or "Deepgleam" instantly transport the reader 
              to these magical underwater realms and hint at the unique features or history of each settlement.
            </p>
          </div>
        </section>

        {/* How to Use */}
        <section id="how-to-use" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">How to Use the Generator</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Using the Merfolk City Name Generator is simple and intuitive. Here's how to get the most out of it:
            </p>
            <ol className="space-y-3 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">1.</span> 
                <span>Select whether you want to generate names for major metropolises or smaller settlements using the toggles.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">2.</span> 
                <span>Click the "Generate Names" button to create a list of merfolk city names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">3.</span> 
                <span>Browse through the generated names for one that fits your fantasy world or story.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">4.</span> 
                <span>If you want to see the meaning or description of a name, click on it to view more details.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">5.</span> 
                <span>Generate new sets of names as many times as you wish until you find the perfect one.</span>
              </li>
            </ol>
            <p>
              Our generator combines prefixes and suffixes inspired by oceanic terminology, merfolk folklore, and 
              underwater features to create authentic-sounding names for your aquatic civilizations.
            </p>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Merfolk City Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Merfolk city naming traditions reflect their unique aquatic culture and environment. Here are some of the 
              common patterns and traditions:
            </p>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-primary">Geographic Features</h3>
              <p>
                Many merfolk cities are named after the natural formations they inhabit or are built around. 
                A city built among a coral reef might incorporate "coral" or "reef" in its name, while one in 
                a deep trench might reference "deep" or "abyss."
              </p>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-primary">Historical Events</h3>
              <p>
                Some cities are named to commemorate significant events in merfolk history – perhaps a great victory, 
                the discovery of a precious resource, or the founding by a legendary leader. These names often have 
                a storytelling quality that preserves history through language.
              </p>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-primary">Magical Properties</h3>
              <p>
                Cities that are centers of merfolk magic might have names referencing enchantment, transformation, 
                or the specific type of magic practiced there. Words like "song," "whisper," or "charm" might 
                indicate the musical or enchanting nature of merfolk spellcasting.
              </p>
            </div>
          </div>
          
          {/* Featured Merfolk City Image */}
          <GeneratorImage 
            src="/images/categories/fantasy/merfolk-city/merfolk-city-interior.jpg"
            alt="Interior of a Merfolk City"
            caption="The interior of a merfolk settlement showing luminescent pathways, shell-inspired architecture, and merfolk citizens going about their daily activities."
          />
        </section>

        {/* Popular Names */}
        <section id="popular-names" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Most Popular Merfolk City Names</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-6">
              Throughout fantasy literature and gaming, certain merfolk city names have become iconic. 
              Below we've compiled extensive lists of names for merfolk metropolises and settlements.
            </p>
            
            {/* Major Metropolises */}
            <h3 className="text-xl font-semibold mb-3 text-primary">Famous Merfolk Metropolises</h3>
            <p className="mb-4">
              Major merfolk cities are often grand, ancient capital cities or important cultural hubs. These metropolises typically feature extensive architecture, magical infrastructure, and significant political importance.
            </p>
            <div className="overflow-x-auto mb-8">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Notable Features</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Atlantis</TableCell>
                    <TableCell>Atlantic Ocean</TableCell>
                    <TableCell>The quintessential sunken city, often depicted with advanced technology and architecture</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Aquatropolis</TableCell>
                    <TableCell>Tropical waters</TableCell>
                    <TableCell>A modern underwater city featuring domes and bridges between structures</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Azshara</TableCell>
                    <TableCell>Deep ocean trenches</TableCell>
                    <TableCell>An ancient capital city often associated with naga or merfolk royalty</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Nereidia</TableCell>
                    <TableCell>Mediterranean Sea</TableCell>
                    <TableCell>City of columns and statues named after the Nereids, sea nymphs of Greek mythology</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Poseidonis</TableCell>
                    <TableCell>Ocean floor plains</TableCell>
                    <TableCell>Named after Poseidon, featuring massive trident-shaped towers and grand temples</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Coral Crown</TableCell>
                    <TableCell>Great Barrier Reef</TableCell>
                    <TableCell>A sprawling metropolis built into living coral formations with natural architecture</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">New Lemuria</TableCell>
                    <TableCell>Indian Ocean</TableCell>
                    <TableCell>Modern merfolk capital city built upon ruins of a mythical ancient civilization</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Deepholm</TableCell>
                    <TableCell>Oceanic abyssal zone</TableCell>
                    <TableCell>Bioluminescent city that harnesses deep-sea thermal vents for energy</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Tritonis</TableCell>
                    <TableCell>Coastal shelf</TableCell>
                    <TableCell>Named for Triton, featuring conch-shell architecture and massive amphitheaters</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Abyssia</TableCell>
                    <TableCell>Hadal trenches</TableCell>
                    <TableCell>Deepest known merfolk city, built where sunlight never reaches</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Pelagia</TableCell>
                    <TableCell>Open ocean</TableCell>
                    <TableCell>Floating/swimming city that follows ocean currents and migrates seasonally</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Sea'adoria</TableCell>
                    <TableCell>Sunken mountain range</TableCell>
                    <TableCell>Multi-level city carved into underwater mountains with terraced architecture</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            {/* Smaller Settlements */}
            <h3 className="text-xl font-semibold mb-3 text-primary">Merfolk Settlements and Outposts</h3>
            <p className="mb-4">
              Smaller merfolk settlements include outposts, villages, and specialized communities. These often have more specific purposes such as trading, agriculture, or defense.
            </p>
            <div className="overflow-x-auto mb-8">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Notable Features</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Coralspire</TableCell>
                    <TableCell>Artisan village</TableCell>
                    <TableCell>A settlement built within and around living coral formations, known for crafting</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Tidewhisper</TableCell>
                    <TableCell>Bardic community</TableCell>
                    <TableCell>A smaller community known for its bards and connection to ocean magic</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Pearl Harbor</TableCell>
                    <TableCell>Trading post</TableCell>
                    <TableCell>Settlement specializing in pearl cultivation and trading with surface dwellers</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Kelpreed</TableCell>
                    <TableCell>Agricultural hamlet</TableCell>
                    <TableCell>Community dedicated to cultivating kelp forests and other ocean crops</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Wavecrest</TableCell>
                    <TableCell>Border outpost</TableCell>
                    <TableCell>Guardian settlement near the shallows that monitors surface world activity</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Shellhaven</TableCell>
                    <TableCell>Refugee sanctuary</TableCell>
                    <TableCell>Settlement built inside massive shell formations, offering protection to displaced merfolk</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Mistpool</TableCell>
                    <TableCell>Healing spa</TableCell>
                    <TableCell>Village centered around thermal vents with healing properties</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Saltsong</TableCell>
                    <TableCell>Cultural hub</TableCell>
                    <TableCell>Small but influential settlement known for preserving traditional merfolk music</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Reefshadow</TableCell>
                    <TableCell>Defensive garrison</TableCell>
                    <TableCell>Military outpost hidden within reef structures, protecting key waterways</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Abyssal Anchor</TableCell>
                    <TableCell>Mining colony</TableCell>
                    <TableCell>Deep-water settlement focused on harvesting rare minerals from the ocean floor</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Bubbleforge</TableCell>
                    <TableCell>Alchemical workshop</TableCell>
                    <TableCell>Settlement with numerous air pockets used for specialized crafting and alchemy</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            {/* Name Elements */}
            <h3 className="text-xl font-semibold mb-3 text-primary">Common Merfolk City Name Elements</h3>
            <p className="mb-4">
              Merfolk cities often include specific prefixes, suffixes, and language elements that reflect their aquatic nature and culture.
            </p>
            <div className="overflow-x-auto mb-8">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name Element</TableHead>
                    <TableHead>Origin/Meaning</TableHead>
                    <TableHead>Examples</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Aqua-</TableCell>
                    <TableCell>Latin, "water"</TableCell>
                    <TableCell>Aquatropolis, Aqualia, Aquamar</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">-meer</TableCell>
                    <TableCell>Germanic, "sea/lake"</TableCell>
                    <TableCell>Glimmermeer, Deepmeer, Crystalmeer</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Coral-</TableCell>
                    <TableCell>Marine structure</TableCell>
                    <TableCell>Coralspire, Coralheim, Coralheart</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">-tide</TableCell>
                    <TableCell>Ocean movement</TableCell>
                    <TableCell>Silvertide, Hightide, Moontide</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Deep-</TableCell>
                    <TableCell>Ocean depth</TableCell>
                    <TableCell>Deepwater, Deepglow, Deepcrest</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">-shell</TableCell>
                    <TableCell>Marine protection</TableCell>
                    <TableCell>Pearlshell, Spiralshell, Goldshell</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Reef-</TableCell>
                    <TableCell>Marine ecosystem</TableCell>
                    <TableCell>Reefhome, Reefspire, Reefshadow</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">-swell</TableCell>
                    <TableCell>Ocean current</TableCell>
                    <TableCell>Starswell, Crystalswell, Deepswell</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            <h3 className="text-xl font-semibold mb-3 text-primary">Using Our Generator</h3>
            <p className="mb-3">
              Our generator creates evocative merfolk city names by combining elements that reference oceanic features, marine life, 
              and aquatic qualities. Each name includes a description that explains its significance or key features.
            </p>
            <p>
              For endless possibilities beyond these examples, use the generator at the top of the page to create
              distinctive merfolk settlement names for your fantasy world or creative projects.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MerfolkCityGenerator; 