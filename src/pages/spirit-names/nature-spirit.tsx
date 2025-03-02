import { useState, useEffect } from "react";
import { Leaf, Info } from "lucide-react";
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
  naturespiritNames: NameEntry[];
}

const NatureSpiritNameGenerator = () => {
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
        const response = await import('@/data/spirit-names/nature-spirit.json');
        const data = response.default || response;
        // Ensure the data has the expected structure
        if ('naturespiritNames' in data) {
          setNameData(data as SpiritNameData);
        } else {
          console.error("Unexpected data structure in nature-spirit.json");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error loading nature spirit name data:", error);
        setLoading(false);
      }
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.naturespiritNames || nameData.naturespiritNames.length === 0) return;
    
    const names: NameEntry[] = [];
    const availableNames = [...nameData.naturespiritNames];
    
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
        <title>Nature Spirit Name Generator - Elemental & Forest Spirit Names | FantasyNamesGen</title>
        <meta name="description" content="Generate mystical names for nature spirits, forest guardians, and elemental beings. Perfect for fantasy stories, druid characters, and nature-themed projects." />
        <meta name="keywords" content="nature spirit names, forest spirits, elemental spirits, druid names, fantasy names, name generator" />
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
              <Leaf className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Nature Spirit Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate names for spirits that embody the essence of the natural world.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Nature Spirit Names</CardTitle>
            <CardDescription>
              Click generate to create names for forest guardians and elemental beings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate nature spirit names"
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
                  Click "Generate Names" to create nature spirit names
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
                <a href="#about-nature-spirits" className="text-primary hover:underline">About Nature Spirit Names</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Nature Spirit Naming Traditions</a>
              </li>
              <li>
                <a href="#popular-names" className="text-primary hover:underline">Most Popular Nature Spirit Names</a>
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
              Nature spirits are mystical entities that embody the essence and energy of the natural world. They are present in many mythologies and spiritual traditions around the world, from ancient Celtic beliefs to Japanese Shinto and beyond.
            </p>
            <p className="mb-4">
              These spirits can take many forms, including forest guardians who protect ancient woodlands, elemental beings representing earth, air, fire, and water, and seasonal entities that govern the changing cycles of nature.
            </p>
          </div>
          
          {/* Hero Image */}
          <GeneratorImage 
            src="/images/categories/spirit-names/nature-spirit/nature-spirit-main.jpg" 
            alt="Nature Spirit Names" 
            caption="Generate names for spirits that embody the essence of the natural world"
          />
        </section>

        {/* About Nature Spirit Names */}
        <section id="about-nature-spirits" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">About Nature Spirit Names</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              These spirits can take many forms, including:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Forest Guardians:</span> 
                <span>Spirits that protect ancient woodlands and their inhabitants</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Elemental Beings:</span> 
                <span>Entities representing earth, air, fire, and water</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Plant Spirits:</span> 
                <span>Beings that embody the life force of specific trees or flowers</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Seasonal Entities:</span> 
                <span>Spirits that govern the changing cycles of nature</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Mountain Spirits:</span> 
                <span>Entities that dwell in rocky peaks and valleys</span>
              </li>
            </ul>
            <p className="mb-4">
              Use these names for:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Fantasy Characters:</span> 
                <span>Druids, rangers, or elemental beings</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Role-Playing:</span> 
                <span>Nature-themed games and adventures</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Creative Writing:</span> 
                <span>Stories about the natural world</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Personification:</span> 
                <span>Giving voice to natural forces in stories or poems</span>
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
                <span>Click the "Generate Names" button to create a list of nature spirit names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">2.</span> 
                <span>Click on any name to see more details about the spirit's domain and abilities.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">3.</span> 
                <span>Generate as many times as you like until you find the perfect nature spirit name for your needs.</span>
              </li>
            </ol>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Nature Spirit Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              The names of nature spirits often reflect their connection to the natural world, incorporating elements like:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Plant References:</span> 
                <span>Names may include trees, flowers, or other plant life that the spirit is connected to.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Seasonal Terms:</span> 
                <span>References to spring, summer, autumn, or winter for spirits tied to the changing seasons.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Weather Elements:</span> 
                <span>Terms related to rain, wind, sunshine, or storms for spirits that influence weather.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Natural Materials:</span> 
                <span>References to stone, crystal, wood, or other natural substances.</span>
              </li>
            </ul>
            <p>
              These names often sound melodic and flowing, like the rustling of leaves or the babbling of brooks, reflecting the harmonious nature of these spirits.
            </p>
          </div>
        </section>

        {/* Most Popular Names */}
        <section id="popular-names" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Most Popular Nature Spirit Names</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-6">
              Here are some of the most popular nature spirit names, each with its own unique connection to the natural world:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Sylvanroot</h3>
                <p className="text-sm text-muted-foreground">An ancient forest spirit that connects all trees in its domain through a vast underground root network.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Whisperwind</h3>
                <p className="text-sm text-muted-foreground">A gentle air spirit that carries messages between distant forests and mountains.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Mossbeard</h3>
                <p className="text-sm text-muted-foreground">A guardian spirit of ancient groves, with a form covered in centuries-old moss and lichen.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Dawnbloom</h3>
                <p className="text-sm text-muted-foreground">A flower spirit that opens its petals only at first light, blessing the day with hope and renewal.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Stoneheart</h3>
                <p className="text-sm text-muted-foreground">A mountain spirit with immense patience and wisdom, watching over valleys and peaks for millennia.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Autumnsong</h3>
                <p className="text-sm text-muted-foreground">A seasonal spirit that orchestrates the changing of leaves and the preparation for winter.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Fernwhisper</h3>
                <p className="text-sm text-muted-foreground">A shy forest floor spirit that tends to ferns and mushrooms in shaded woodland areas.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Thundercrown</h3>
                <p className="text-sm text-muted-foreground">A powerful storm spirit that brings necessary rain to drought-stricken lands.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Willowsigh</h3>
                <p className="text-sm text-muted-foreground">A melancholic spirit that dwells in weeping willows near still waters, singing sorrowful yet beautiful melodies.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Meadowdancer</h3>
                <p className="text-sm text-muted-foreground">A playful spirit that creates patterns in grassy fields as it moves with the wind.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Crystalvein</h3>
                <p className="text-sm text-muted-foreground">A spirit that forms and tends to crystal formations deep within mountain caves.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Oakfather</h3>
                <p className="text-sm text-muted-foreground">An ancient guardian spirit of oak groves, embodying strength, endurance, and protection.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Mistweaver</h3>
                <p className="text-sm text-muted-foreground">A spirit that creates morning mists and fog, veiling the landscape in mystery.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Vineheart</h3>
                <p className="text-sm text-muted-foreground">A spirit that guides the growth of vines and climbing plants, creating natural tapestries.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Frostpetal</h3>
                <p className="text-sm text-muted-foreground">A winter spirit that creates delicate frost patterns on leaves and flowers during cold mornings.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Emberleaf</h3>
                <p className="text-sm text-muted-foreground">A spirit of autumn that turns leaves to brilliant reds and oranges before they fall.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Dewdrop</h3>
                <p className="text-sm text-muted-foreground">A morning spirit that places beads of dew on grass and spider webs at dawn.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Pineguard</h3>
                <p className="text-sm text-muted-foreground">A vigilant spirit of coniferous forests, protecting evergreen trees through harsh winters.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Sunflare</h3>
                <p className="text-sm text-muted-foreground">A radiant spirit that guides sunlight through forest canopies, creating dappled patterns on the ground.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Rootweaver</h3>
                <p className="text-sm text-muted-foreground">A spirit that guides tree roots around obstacles and toward water sources underground.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Breezewhisper</h3>
                <p className="text-sm text-muted-foreground">A gentle wind spirit that carries pollen and seeds to help plants reproduce and spread.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Petalfall</h3>
                <p className="text-sm text-muted-foreground">A spring spirit that orchestrates the blossoming and eventual falling of flower petals.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Mapleheart</h3>
                <p className="text-sm text-muted-foreground">A spirit that tends to maple trees, ensuring their vibrant colors in autumn and sweet sap in spring.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Stormcaller</h3>
                <p className="text-sm text-muted-foreground">A powerful spirit that summons thunderstorms to cleanse the air and nourish the earth.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Mosswalker</h3>
                <p className="text-sm text-muted-foreground">A quiet spirit that spreads soft moss over stones and fallen logs, creating cushioned forest floors.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Twilightshade</h3>
                <p className="text-sm text-muted-foreground">A dusk spirit that eases the transition from day to night, bringing a peaceful calm to the forest.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Seedkeeper</h3>
                <p className="text-sm text-muted-foreground">A guardian spirit that protects dormant seeds through winter until conditions are right for growth.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Wildflower</h3>
                <p className="text-sm text-muted-foreground">A free-spirited entity that encourages flowers to bloom in unexpected places, bringing color to barren areas.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Valleysong</h3>
                <p className="text-sm text-muted-foreground">A spirit that creates natural acoustics in valleys, amplifying the sounds of nature into harmonious melodies.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Aspenwhisper</h3>
                <p className="text-sm text-muted-foreground">A spirit that causes aspen leaves to tremble and rustle, creating a constant gentle music in the forest.</p>
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

export default NatureSpiritNameGenerator;
