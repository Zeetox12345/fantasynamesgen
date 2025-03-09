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

const MerfolkNameGenerator = () => {
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
        const data = await import('@/data/dnd/merfolk.json');
        setNameData(data.default || data);
      } catch (error) {
        console.error("Error loading D&D merfolk name data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.merfolkNames || !nameData.merfolkNames.length) {
      console.error("No D&D merfolk name data available");
      return;
    }
    
    // Randomly select 10 names from the data
    const shuffled = [...nameData.merfolkNames].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setGeneratedNames(selected.map(entry => entry.name));
  };

  const handleNameClick = (name: string) => {
    if (!nameData || !nameData.merfolkNames) return;
    
    setSelectedName(name);
    
    // Find the description for the selected name
    const nameEntry = nameData.merfolkNames.find(entry => entry.name === name);
    if (nameEntry) {
      setNameDescription(nameEntry.description);
    } else {
      setNameDescription(null);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>DnD Merfolk Name Generator - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ flowing and aquatic names for merfolk characters and tribes in DnD. Create the perfect underwater inhabitants with our free name generator!" />
        <meta name="keywords" content="DnD, Dungeons and Dragons, merfolk names, triton names, sea elf names, aquatic races, fantasy names, RPG, tabletop games" />
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
            <h1 className="font-display text-3xl sm:text-4xl font-bold">DnD Merfolk Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate flowing and aquatic names for merfolk characters and tribes in your DnD campaign.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Merfolk Names</CardTitle>
            <CardDescription>Create flowing and aquatic names for merfolk characters and tribes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate merfolk names"
              >
                {loading ? "Loading..." : "Generate Merfolk Names"}
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What Makes a Good Merfolk Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#merfolk-culture" className="text-primary hover:underline">Merfolk Culture in DnD</a>
              </li>
              <li>
                <a href="#playing-merfolk" className="text-primary hover:underline">Playing a Merfolk Character</a>
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
              In the vast oceans and seas of Dungeons & Dragons worlds, merfolk are among the most fascinating 
              aquatic races. These half-humanoid, half-fish beings inhabit underwater kingdoms of coral and 
              pearl, with rich cultures and societies hidden beneath the waves.
            </p>
            <p className="mb-4">
              Merfolk names in DnD often reflect their aquatic nature and connection to the sea. They typically 
              incorporate flowing sounds, references to water and ocean life, and elements that suggest the 
              mysterious depths they call home.
            </p>
            <p>
              Whether you're creating a merfolk character, populating an underwater city for your campaign, 
              or simply exploring the possibilities of aquatic adventures, this generator provides names that 
              capture the essence of these enigmatic sea dwellers.
            </p>
          </div>
          
          {/* Hero Image */}
          <GeneratorImage 
            src="/images/categories/dungeonsanddragons/merfolk/merfolk-main.jpg" 
            alt="DnD Merfolk Names" 
            caption="Create flowing and aquatic names for merfolk characters and tribes in your DnD campaign"
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Merfolk Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A compelling merfolk name should evoke their aquatic nature and unique culture:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Flowing Sounds:</span> 
                <span>Names with liquid consonants like 'l', 'm', and 'n' and long vowels create a flowing, water-like quality.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Oceanic References:</span> 
                <span>Incorporating terms related to the sea, tides, coral, pearls, and other underwater elements connects the name to their environment.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Melodic Quality:</span> 
                <span>Merfolk are often associated with enchanting songs, so names with a musical or rhythmic quality are particularly fitting.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ancient Elements:</span> 
                <span>As one of the oldest races in many D&D settings, merfolk names often have an ancient, timeless quality to them.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Tribal Indicators:</span> 
                <span>Suffixes or prefixes that denote clan, reef, or current affiliations can add depth to merfolk naming conventions.</span>
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
                <span>Click the "Generate Merfolk Names" button to create a list of flowing and aquatic names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">2.</span> 
                <span>Click on any name to see more details about the meaning or characteristics of that particular name.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">3.</span> 
                <span>Generate as many times as you like until you find the perfect name for your character or NPC.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">4.</span> 
                <span>Use the descriptions as inspiration for developing your character's background, personality, and connections to merfolk society.</span>
              </li>
            </ol>
          </div>
        </section>

        {/* Merfolk Culture */}
        <section id="merfolk-culture" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Merfolk Culture in DnD</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Understanding merfolk society can help you create more authentic characters:
            </p>
            <ul className="space-y-4 mb-6">
              <li>
                <h3 className="font-semibold text-primary text-lg">Social Structure</h3>
                <p>Many merfolk societies are organized around coral reef "cities" led by councils of elders or monarchs. Some follow a tribal structure based on different ocean territories or currents.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Art and Music</h3>
                <p>Merfolk are renowned for their haunting songs and intricate coral sculptures. Music plays a central role in their culture, used for communication, history-keeping, and magic.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Religion and Magic</h3>
                <p>Many merfolk worship sea deities like Deep Sashelas or primordial water elementals. Their magic often focuses on control of water, weather, and communication with sea creatures.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Relations with Surface Dwellers</h3>
                <p>Attitudes toward land-dwellers vary widely among merfolk groups. Some are curious and friendly, while others are isolationist or even hostile due to past conflicts or environmental destruction.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Crafts and Trade</h3>
                <p>Merfolk are skilled craftspeople who work with coral, pearls, shells, and salvaged materials. Some engage in trade with coastal communities, exchanging underwater treasures for surface goods.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* Playing a Merfolk */}
        <section id="playing-merfolk" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Playing a Merfolk Character</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Tips for roleplaying a merfolk character in your D&D campaign:
            </p>
            <ul className="space-y-4 mb-6">
              <li>
                <h3 className="font-semibold text-primary text-lg">Adaptation to Land</h3>
                <p>Consider how your character moves on land. Some merfolk can magically transform their tails into legs, while others might use magic items or mechanical devices to navigate the surface world.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Cultural Perspective</h3>
                <p>Think about how a being from an underwater civilization might view surface customs. Concepts like fire, riding animals, or even stairs might be fascinating or confusing to a merfolk character.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Environmental Awareness</h3>
                <p>Merfolk often have a strong connection to natural waterways and may be particularly concerned with environmental threats like pollution or overfishing.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Communication Style</h3>
                <p>Consider incorporating elements of merfolk communication into your roleplaying. They might use more fluid gestures, musical tones in their speech, or references to currents and tides in their metaphors.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Class Choices</h3>
                <p>While any class can work for a merfolk character, they make particularly good bards, druids, and warlocks with oceanic patrons. Their natural connection to water can inform how you flavor your character's abilities.</p>
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
                <CardTitle className="text-lg">Dwarf City Name Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Create authentic and immersive names for dwarven cities and strongholds</p>
                <Link to="/dungeonsanddragons/dwarf-city" onClick={() => window.scrollTo(0, 0)}>
                  <Button variant="outline" size="sm" className="w-full">Try Generator</Button>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Sea Name Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Generate evocative names for seas, oceans, and other bodies of water</p>
                <Link to="/dungeonsanddragons/sea" onClick={() => window.scrollTo(0, 0)}>
                  <Button variant="outline" size="sm" className="w-full">Try Generator</Button>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Elf Druid Name Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Generate nature-attuned names for elven druids and their circles</p>
                <Link to="/dungeonsanddragons/elf-druid" onClick={() => window.scrollTo(0, 0)}>
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

export default MerfolkNameGenerator; 