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

const BeybladeNameGenerator = () => {
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
        const data = await import('@/data/beyblade/beyblade-names.json');
        setNameData(data.default || data);
      } catch (error) {
        console.error("Error loading Beyblade name data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.beybladeNames || !nameData.beybladeNames.length) {
      console.error("No Beyblade name data available");
      return;
    }
    
    // Randomly select 10 names from the data
    const shuffled = [...nameData.beybladeNames].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setGeneratedNames(selected.map(entry => entry.name));
  };

  const handleNameClick = (name: string) => {
    if (!nameData || !nameData.beybladeNames) return;
    
    setSelectedName(name);
    
    // Find the description for the selected name
    const nameEntry = nameData.beybladeNames.find(entry => entry.name === name);
    if (nameEntry) {
      setNameDescription(nameEntry.description);
    } else {
      setNameDescription(null);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>Beyblade Name Generator - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ powerful and epic Beyblade names for your spinning tops. Create the perfect Beyblade with our free name generator!" />
        <meta name="keywords" content="Beyblade, Beyblade names, spinning tops, Beyblade Burst, Beyblade Metal Fusion, Takara Tomy, Hasbro" />
      </Helmet>
      <div className="max-w-7xl mx-auto">
        {/* Header with back button */}
        <div className="mb-6 sm:mb-8">
          <Link 
            to="/beyblade" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4 sm:mb-6"
            onClick={() => window.scrollTo(0, 0)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            Back to Beyblade
          </Link>
          
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 rounded-lg bg-primary/10 text-primary">
              <Sword className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Beyblade Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate powerful and epic names for your Beyblade spinning tops.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Beyblade Names</CardTitle>
            <CardDescription>Create powerful and epic names for your Beyblade</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate Beyblade names"
              >
                {loading ? "Loading..." : "Generate Beyblade Names"}
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What Makes a Good Beyblade Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Beyblade Naming Traditions</a>
              </li>
              <li>
                <a href="#popular-names" className="text-primary hover:underline">Popular Beyblade Names</a>
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
              Beyblade, the globally popular spinning top battle system, has captivated fans with its 
              high-octane competitions and distinctive, powerful tops. Each Beyblade has a unique name 
              that reflects its design, abilities, and the spirit it embodies.
            </p>
            <p className="mb-4">
              From the original series to Metal Fusion and the modern Burst series, Beyblade names 
              combine elements of power, nature, mythology, and cosmic forces to create memorable 
              identities for these battle-ready spinning tops.
            </p>
            <p>
              Whether you're a competitive blader looking for the perfect name for your custom Beyblade, 
              a collector seeking inspiration, or a fan creating original content, this generator provides 
              powerful and epic name options that capture the essence of what makes Beyblades so exciting.
            </p>
          </div>
          
          {/* Hero Image */}
          <GeneratorImage 
            src="/images/categories/beyblade/beyblade-names/beyblade-names-main.jpg" 
            alt="Beyblade Names" 
            caption="Create powerful and epic names for your Beyblade spinning tops"
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Beyblade Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A great Beyblade name should capture the essence of power and competition that defines the franchise:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Power Elements:</span> 
                <span>Names that incorporate terms like "strike," "fury," "blaze," or "storm" convey the raw power of a Beyblade.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Mythological References:</span> 
                <span>Drawing from gods, legendary creatures, and cosmic entities adds depth and grandeur to Beyblade names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Natural Forces:</span> 
                <span>Elements like fire, lightning, earth, and wind are common in Beyblade names, reflecting their dynamic abilities.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Animal Imagery:</span> 
                <span>Many Beyblades are named after powerful animals like dragons, lions, or eagles, symbolizing their spirit and strength.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Compound Names:</span> 
                <span>Combining two powerful words (like "DragonForce" or "ThunderStrike") creates distinctive and memorable Beyblade names.</span>
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
                <span>Click the "Generate Beyblade Names" button to create a list of powerful Beyblade names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">2.</span> 
                <span>Click on any name to see more details about the style or theme of that particular Beyblade name.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">3.</span> 
                <span>Generate as many times as you want until you find the perfect name for your Beyblade.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">4.</span> 
                <span>Use the name for your custom Beyblade, fan fiction, artwork, or competitive play.</span>
              </li>
            </ol>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Beyblade Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Beyblade names have evolved across different series, each with their own naming conventions:
            </p>
            <ul className="space-y-4 mb-6">
              <li>
                <h3 className="text-lg font-semibold text-primary">Original Series</h3>
                <p>The first generation of Beyblades often had straightforward names that described their appearance or abilities, like Dragoon, Dranzer, and Driger, often based on mythical creatures.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Metal Saga</h3>
                <p>The Metal Fusion/Masters/Fury era introduced more complex naming with prefixes indicating the Beyblade's type (Storm, Lightning, Rock) combined with a powerful noun (Pegasus, Leone, Eagle).</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Burst Series</h3>
                <p>Modern Burst Beyblades often have names that reflect their layer, disc, and driver components, creating technical-sounding names like Valtryek V2, Spryzen Requiem, or Fafnir F4.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Special Editions</h3>
                <p>Limited editions and special releases often add descriptive terms like "Ultimate," "Infinite," or "God" to emphasize their power and rarity.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* Popular Names */}
        <section id="popular-names" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Popular Beyblade Names</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Some of the most iconic Beyblades throughout the franchise's history include:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Storm Pegasus:</span> 
                <span>Gingka Hagane's signature Beyblade in Metal Fusion, known for its incredible speed and attack power.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Lightning L-Drago:</span> 
                <span>The first left-rotating Beyblade in the Metal Saga, used by the antagonist Ryuga.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Dragoon:</span> 
                <span>Tyson Granger's iconic Beyblade from the original series, based on a powerful dragon spirit.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Valtryek:</span> 
                <span>Valt Aoi's signature Beyblade in the Burst series, known for its versatility and evolution throughout the series.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Spriggan:</span> 
                <span>Shu Kurenai's powerful Beyblade that has multiple forms throughout the Burst series.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Rock Leone:</span> 
                <span>Kyoya Tategami's defense-type Beyblade with excellent stamina and stability.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Dranzer:</span> 
                <span>Kai Hiwatari's phoenix-based Beyblade from the original series, specializing in attack power.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Driger:</span> 
                <span>Ray Kon's white tiger Beyblade known for its balance and agility in battle.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Draciel:</span> 
                <span>Max Tate's defensive turtle Beyblade with exceptional endurance capabilities.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Galaxy Pegasus:</span> 
                <span>The evolved form of Storm Pegasus, with increased power and a unique design.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Cosmic Pegasus:</span> 
                <span>The final evolution of Gingka's Beyblade in Metal Fury, combining four-season powers.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Meteo L-Drago:</span> 
                <span>The evolved form of Lightning L-Drago with improved rubber components for spin-stealing.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">L-Drago Destructor:</span> 
                <span>The final form of Ryuga's Beyblade, with devastating attack power and left-rotation.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Fang Leone:</span> 
                <span>The evolved form of Rock Leone with a more aggressive design for both defense and attack.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Flame Libra:</span> 
                <span>Yu Tendo's stamina-type Beyblade known for its sonic vibration attacks.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Earth Eagle:</span> 
                <span>Tsubasa Otori's balance-type Beyblade with excellent aerial attack capabilities.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Phantom Orion:</span> 
                <span>Chris's legendary stamina-type Beyblade with near-infinite rotation capabilities.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Diablo Nemesis:</span> 
                <span>Rago's forbidden Beyblade that absorbs and channels dark power from other Beyblades.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Twisted Tempo:</span> 
                <span>Faust's heavy defense-type Beyblade with incredible weight and stability.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Victory Valtryek:</span> 
                <span>An evolution of Valtryek with enhanced attack capabilities and wing-shaped design.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Genesis Valtryek:</span> 
                <span>A God Layer Beyblade with improved striking power and stamina.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Winning Valkyrie:</span> 
                <span>The Cho-Z evolution of Valtryek with metal on its layer for increased attack power.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Brave Valkyrie:</span> 
                <span>The Superking/Sparking evolution with a sword-shaped metal chip for devastating attacks.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Legend Spryzen:</span> 
                <span>An early evolution of Shu's Beyblade with dual-spin capability.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Spryzen Requiem:</span> 
                <span>A powerful evolution with rubber blades that can switch between attack and defense modes.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Cho-Z Spriggan:</span> 
                <span>A metal-infused evolution with improved dual-spin capabilities and attack power.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">World Spriggan:</span> 
                <span>The Superking/Sparking evolution with a unique chassis system and dual-spin capability.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Xcalius:</span> 
                <span>Xander Shakadera's sword-themed attack-type Beyblade with excellent slashing power.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Luinor/Longinus:</span> 
                <span>Lui Shirosagi's aggressive attack-type Beyblade designed to burst opponents quickly.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Drain Fafnir:</span> 
                <span>Free De La Hoya's left-spinning Beyblade that can absorb opponent's spin power.</span>
              </li>
            </ul>
            <p>
              These names exemplify the powerful, mythological naming conventions that have made Beyblade such a distinctive franchise.
            </p>
          </div>
        </section>

        {/* Latest Generators */}
        <section id="latest-generators" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Latest Generators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Beyblade Burst Name Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Generate modern names for Beyblade Burst series beyblades</p>
                <Link to="/beyblade/burst" onClick={() => window.scrollTo(0, 0)}>
                  <Button variant="outline" className="w-full">Try Generator</Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Beyblade Special Move Name Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Create epic special move names for your Beyblade battles</p>
                <Link to="/beyblade/special-move" onClick={() => window.scrollTo(0, 0)}>
                  <Button variant="outline" className="w-full">Try Generator</Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Fantasy Name Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Generate names for elves, dwarves, and magical beings</p>
                <Link to="/fantasy" onClick={() => window.scrollTo(0, 0)}>
                  <Button variant="outline" className="w-full">Try Generator</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BeybladeNameGenerator; 