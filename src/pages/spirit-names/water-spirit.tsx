import { useState, useEffect } from "react";
import { Droplet, Info } from "lucide-react";
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

interface NameEntry {
  name: string;
  description: string;
}

interface SpiritNameData {
  waterspiritNames: NameEntry[];
}

const WaterSpiritNameGenerator = () => {
  const [generatedNames, setGeneratedNames] = useState<NameEntry[]>([]);
  const [nameData, setNameData] = useState<SpiritNameData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [nameDescription, setNameDescription] = useState<string | null>(null);

  // Load name data when component mounts
  useEffect(() => {
    async function fetchNameData() {
      setLoading(true);
      try {
        const response = await import('@/data/spirit-names/water-spirit.json');
        const data = response.default || response;
        // Ensure the data has the expected structure
        if ('waterspiritNames' in data) {
          setNameData(data as SpiritNameData);
        } else {
          console.error("Unexpected data structure in water-spirit.json");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error loading water spirit name data:", error);
        setLoading(false);
      }
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.waterspiritNames || nameData.waterspiritNames.length === 0) return;
    
    const names: NameEntry[] = [];
    const availableNames = [...nameData.waterspiritNames];
    
    // Generate 10 random names
    for (let i = 0; i < 10; i++) {
      if (availableNames.length === 0) break;
      
      const randomIndex = Math.floor(Math.random() * availableNames.length);
      names.push(availableNames[randomIndex]);
      
      // Remove the selected name to avoid duplicates
      availableNames.splice(randomIndex, 1);
    }
    
    setGeneratedNames(names);
  };

  const handleNameClick = (entry: NameEntry) => {
    setSelectedName(entry.name);
    setNameDescription(entry.description);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>Water Spirit Name Generator - Ocean, River & Lake Spirit Names | FantasyNamesGen</title>
        <meta name="description" content="Generate mystical names for water spirits, sea deities, river guardians, and aquatic entities. Perfect for fantasy stories, water-themed characters, and oceanic adventures." />
        <meta name="keywords" content="water spirit names, sea spirits, river spirits, lake spirits, water deities, fantasy names, name generator" />
      </Helmet>
      <div className="max-w-7xl mx-auto">
        {/* Header with back button */}
        <div className="mb-6 sm:mb-8">
          <Link 
            to="/spirit-names" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4 sm:mb-6"
            onClick={() => window.scrollTo(0, 0)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            Back to Spirit Names
          </Link>
          
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 rounded-lg bg-primary/10 text-primary">
              <Droplet className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Water Spirit Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate names for spirits that embody the essence of oceans, rivers, lakes, and other bodies of water.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Water Spirit Names</CardTitle>
            <CardDescription>
              Click generate to create names for aquatic entities and water deities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate water spirit names"
              >
                {loading ? "Loading..." : "Generate Names"}
              </Button>
              
              {loading && <p>Loading name data...</p>}
              
              {!loading && generatedNames.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
                  {generatedNames.map((entry, index) => (
                    <Dialog key={index}>
                      <DialogTrigger asChild>
                        <div 
                          className="p-3 sm:p-4 rounded-md bg-secondary/20 border border-border hover:border-primary cursor-pointer flex justify-between items-center"
                          onClick={() => handleNameClick(entry)}
                        >
                          <span>{entry.name}</span>
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
              
              {!loading && generatedNames.length === 0 && (
                <div className="text-center p-6 text-muted-foreground">
                  Click "Generate Names" to create water spirit names
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
                <a href="#about-water-spirits" className="text-primary hover:underline">About Water Spirit Names</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Water Spirit Naming Traditions</a>
              </li>
              <li>
                <a href="#popular-names" className="text-primary hover:underline">Most Popular Water Spirit Names</a>
              </li>
              <li>
                <a href="#latest-generators" className="text-primary hover:underline">Latest Spirit Generators</a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Introduction */}
        <section id="introduction" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Introduction</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Water spirits are mystical entities that embody the essence and energy of various bodies of water. They appear in mythologies and folklore across cultures, from Greek and Norse legends to Japanese Shinto and Native American traditions.
            </p>
            <p className="mb-4">
              These spirits can take many forms, from powerful ocean deities who rule over the vast seas to gentle river guardians who protect the flowing waters and playful lake spirits that dwell in still waters.
            </p>
          </div>
          
          {/* Hero Image */}
          <GeneratorImage 
            src="/images/categories/spirit-names/water-spirit/water-spirit-main.jpg" 
            alt="Water Spirit Names" 
            caption="Generate names for spirits that embody the essence of oceans, rivers, lakes, and other bodies of water"
          />
        </section>

        {/* About Water Spirit Names */}
        <section id="about-water-spirits" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">About Water Spirit Names</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              These spirits can take many forms, including:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ocean Deities:</span> 
                <span>Powerful entities who rule over the vast seas</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">River Guardians:</span> 
                <span>Spirits that protect the flowing waters</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Lake Spirits:</span> 
                <span>Entities that dwell in still waters</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Waterfall Entities:</span> 
                <span>Spirits that embody the power of cascading waters</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Rain Spirits:</span> 
                <span>Beings that bring life-giving precipitation</span>
              </li>
            </ul>
            <p className="mb-4">
              Use these names for:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Fantasy Characters:</span> 
                <span>Water elementals, merfolk, or sea deities</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Role-Playing:</span> 
                <span>Water-themed games and adventures</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Creative Writing:</span> 
                <span>Stories about oceanic or river adventures</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Personification:</span> 
                <span>Giving voice to bodies of water in stories or poems</span>
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
                <span>Click the "Generate Names" button to create a list of water spirit names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">2.</span> 
                <span>Click on any name to see more details about the spirit's domain and powers.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">3.</span> 
                <span>Generate as many times as you like until you find the perfect water spirit name for your needs.</span>
              </li>
            </ol>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Water Spirit Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              The names of water spirits often reflect their aquatic nature, incorporating elements like:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Water Features:</span> 
                <span>References to waves, tides, currents, and various water bodies.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Aquatic Life:</span> 
                <span>Names may incorporate fish, coral, seaweed, or other aquatic flora and fauna.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Water Sounds:</span> 
                <span>Names that mimic the sounds of water, like rippling, splashing, or flowing.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Water Colors:</span> 
                <span>References to blue, turquoise, azure, or other water-associated colors.</span>
              </li>
            </ul>
            <p>
              These names often sound fluid and flowing, mimicking the sound of water itself, creating a sense of movement and life that reflects the dynamic nature of water spirits.
            </p>
          </div>
        </section>

        {/* Most Popular Names */}
        <section id="popular-names" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Most Popular Water Spirit Names</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-6">
              Here are some of the most popular water spirit names, each with its own unique connection to aquatic realms:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Tidecaller</h3>
                <p className="text-sm text-muted-foreground">A powerful ocean spirit that can command the rising and falling of tides, influencing coastal regions.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Rippleheart</h3>
                <p className="text-sm text-muted-foreground">A gentle lake spirit whose emotions create concentric ripples across still waters.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Azuremist</h3>
                <p className="text-sm text-muted-foreground">A spirit that creates blue-tinted fog over water surfaces at dawn, blurring the boundary between water and air.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Coralguard</h3>
                <p className="text-sm text-muted-foreground">A protective spirit of reef ecosystems, nurturing coral growth and defending against threats.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Streamdancer</h3>
                <p className="text-sm text-muted-foreground">A playful spirit that moves with the currents of streams and brooks, creating melodious sounds.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Depthwhisper</h3>
                <p className="text-sm text-muted-foreground">A mysterious spirit of the ocean depths, keeper of ancient secrets and lost treasures.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Rainsinger</h3>
                <p className="text-sm text-muted-foreground">A spirit that brings gentle precipitation, singing melodies that can be heard in the patter of raindrops.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Wavecrest</h3>
                <p className="text-sm text-muted-foreground">A spirit that rides the tops of ocean waves, guiding them safely to shore.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Pearlkeeper</h3>
                <p className="text-sm text-muted-foreground">A spirit that oversees the formation of pearls, embedding bits of wisdom in each one.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Frostflow</h3>
                <p className="text-sm text-muted-foreground">A winter water spirit that guides the freezing of rivers and lakes, creating safe ice passages.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Seafoam</h3>
                <p className="text-sm text-muted-foreground">A spirit born where ocean meets shore, ephemeral and playful, dancing along beaches.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Cascadeheart</h3>
                <p className="text-sm text-muted-foreground">A waterfall spirit that embodies the power and beauty of falling water, creating rainbows in mist.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Tidesong</h3>
                <p className="text-sm text-muted-foreground">A spirit whose voice can be heard in the rhythmic coming and going of ocean tides.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Mistweaver</h3>
                <p className="text-sm text-muted-foreground">A spirit that creates morning mist over lakes and rivers, veiling them in mystery.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Riverguide</h3>
                <p className="text-sm text-muted-foreground">A spirit that knows all the paths and secrets of rivers, helping travelers navigate safely.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Stormtide</h3>
                <p className="text-sm text-muted-foreground">A powerful spirit that commands the seas during storms, both destructive and cleansing.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Dewsparkle</h3>
                <p className="text-sm text-muted-foreground">A dawn spirit that places glistening dewdrops on plants, each containing a tiny reflection of the world.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Abyssgaze</h3>
                <p className="text-sm text-muted-foreground">A spirit of the deepest ocean trenches, rarely seen but always watching from the darkness below.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Lagoonwhisper</h3>
                <p className="text-sm text-muted-foreground">A spirit of sheltered coastal waters, creating safe havens for aquatic life.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Iceflow</h3>
                <p className="text-sm text-muted-foreground">A spirit of glaciers and icebergs, slowly shaping landscapes with frozen water.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Springkeeper</h3>
                <p className="text-sm text-muted-foreground">A guardian spirit of natural springs, ensuring the purity of water as it emerges from the earth.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Maelstrom</h3>
                <p className="text-sm text-muted-foreground">A powerful whirlpool spirit that can create circular currents in open water, both dangerous and mesmerizing.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Blueveil</h3>
                <p className="text-sm text-muted-foreground">A spirit that creates the blue hue of deep water, controlling how light penetrates the depths.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Pondguardian</h3>
                <p className="text-sm text-muted-foreground">A protective spirit of small water bodies, maintaining balance in these miniature ecosystems.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Currentweaver</h3>
                <p className="text-sm text-muted-foreground">A spirit that directs ocean currents, influencing global weather patterns and marine migrations.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Deltatide</h3>
                <p className="text-sm text-muted-foreground">A spirit of river deltas, where freshwater meets the sea, creating fertile grounds for life.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Fogweaver</h3>
                <p className="text-sm text-muted-foreground">A spirit that creates dense fog over water, blurring boundaries and creating mysterious atmospheres.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Crystalpool</h3>
                <p className="text-sm text-muted-foreground">A spirit of clear mountain pools, so transparent that they reflect the sky like mirrors.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Stormsurge</h3>
                <p className="text-sm text-muted-foreground">A powerful spirit that raises water levels during storms, both destructive and necessary for coastal ecosystems.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Aquamarine</h3>
                <p className="text-sm text-muted-foreground">A spirit that embodies the beautiful blue-green color of tropical waters, bringing clarity and calm.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Spirit Generators */}
        <section id="latest-generators" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Latest Spirit Generators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/spirit-names/indian-spirit" className="p-4 rounded-md bg-secondary/10 border border-border hover:border-primary transition-colors">
              <h3 className="text-lg font-semibold text-primary mb-1">Indian Spirit Names</h3>
              <p className="text-sm text-muted-foreground">Generate mystical names inspired by Native American spiritual traditions.</p>
            </Link>
            <Link to="/spirit-names/jjk-cursed-spirit" className="p-4 rounded-md bg-secondary/10 border border-border hover:border-primary transition-colors">
              <h3 className="text-lg font-semibold text-primary mb-1">JJK Cursed Spirit Names</h3>
              <p className="text-sm text-muted-foreground">Create dark and powerful names for cursed spirits from Jujutsu Kaisen.</p>
            </Link>
            <Link to="/spirit-names/nature-spirit" className="p-4 rounded-md bg-secondary/10 border border-border hover:border-primary transition-colors">
              <h3 className="text-lg font-semibold text-primary mb-1">Nature Spirit Names</h3>
              <p className="text-sm text-muted-foreground">Generate names for spirits that embody the essence of the natural world.</p>
            </Link>
            <Link to="/spirit-names/water-spirit" className="p-4 rounded-md bg-secondary/10 border border-border hover:border-primary transition-colors">
              <h3 className="text-lg font-semibold text-primary mb-1">Water Spirit Names</h3>
              <p className="text-sm text-muted-foreground">Generate names for spirits that embody the essence of oceans, rivers, and lakes.</p>
            </Link>
            <Link to="/spirit-names/fox-spirit" className="p-4 rounded-md bg-secondary/10 border border-border hover:border-primary transition-colors">
              <h3 className="text-lg font-semibold text-primary mb-1">Fox Spirit Names</h3>
              <p className="text-sm text-muted-foreground">Generate names for mystical fox spirits and shapeshifters from various mythologies.</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WaterSpiritNameGenerator;
