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

const BeybladeBurstNameGenerator = () => {
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
        const data = await import('@/data/beyblade/burst.json');
        setNameData(data.default || data);
      } catch (error) {
        console.error("Error loading Beyblade Burst name data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.burstNames || !nameData.burstNames.length) {
      console.error("No Beyblade Burst name data available");
      return;
    }
    
    // Randomly select 10 names from the data
    const shuffled = [...nameData.burstNames].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setGeneratedNames(selected.map(entry => entry.name));
  };

  const handleNameClick = (name: string) => {
    if (!nameData || !nameData.burstNames) return;
    
    setSelectedName(name);
    
    // Find the description for the selected name
    const nameEntry = nameData.burstNames.find(entry => entry.name === name);
    if (nameEntry) {
      setNameDescription(nameEntry.description);
    } else {
      setNameDescription(null);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>Beyblade Burst Name Generator - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ modern Beyblade Burst names for your spinning tops. Create the perfect Burst Beyblade with our free name generator!" />
        <meta name="keywords" content="Beyblade Burst, Beyblade names, spinning tops, Beyblade Burst Evolution, Beyblade Burst Turbo, Takara Tomy, Hasbro" />
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
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Beyblade Burst Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate modern names for Beyblade Burst series beyblades.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Beyblade Burst Names</CardTitle>
            <CardDescription>Create modern names for Beyblade Burst series beyblades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate Beyblade Burst names"
              >
                {loading ? "Loading..." : "Generate Burst Names"}
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What Makes a Good Beyblade Burst Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Beyblade Burst Naming Conventions</a>
              </li>
              <li>
                <a href="#popular-names" className="text-primary hover:underline">Popular Beyblade Burst Names</a>
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
              Beyblade Burst, the latest evolution in the Beyblade franchise, introduced a revolutionary 
              new system where Beyblades can "burst" apart during battle, adding an exciting new dimension 
              to the competitive spinning top game.
            </p>
            <p className="mb-4">
              Burst Beyblades feature a distinctive naming system that reflects their modular nature, 
              with names often incorporating the Beyblade's Energy Layer, Forge Disc, and Performance Tip 
              components. These modern Beyblades combine technical specifications with mythological and 
              powerful imagery in their naming conventions.
            </p>
            <p>
              Whether you're designing a custom Burst Beyblade, creating fan content, or just exploring 
              the exciting world of modern Beyblade battles, this generator provides authentic-sounding 
              Burst Beyblade names that capture the essence of this dynamic toy line.
            </p>
          </div>
          
          {/* Hero Image */}
          <GeneratorImage 
            src="/images/categories/beyblade/burst/burst-main.jpg" 
            alt="Beyblade Burst Names" 
            caption="Generate modern names for Beyblade Burst series beyblades"
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Beyblade Burst Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A great Beyblade Burst name should reflect the modern, technical nature of the Burst series:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Component Structure:</span> 
                <span>Burst names often follow a format that references the Beyblade's components, like "Valtryek V2" or "Spriggan Requiem S3".</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Technical Terms:</span> 
                <span>Words like "Evolution," "Genesis," "Requiem," or "Turbo" add a modern, high-tech feel to Burst Beyblade names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Mythological Basis:</span> 
                <span>Many Burst Beyblades are named after mythological figures or concepts, like Valtryek (Valkyrie), Spriggan, or Fafnir.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Alphanumeric Codes:</span> 
                <span>Adding numbers and letters (like "V2" or "S3") gives Burst names a technical, product-like quality that fits their modular nature.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Evolution Terms:</span> 
                <span>Words that suggest growth or power increase, like "Ultimate," "God," or "Cho-Z," reflect how Beyblades evolve throughout the series.</span>
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
                <span>Click the "Generate Burst Names" button to create a list of modern Beyblade Burst names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">2.</span> 
                <span>Click on any name to see more details about the style or theme of that particular Beyblade Burst name.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">3.</span> 
                <span>Generate as many times as you want until you find the perfect name for your Burst Beyblade.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">4.</span> 
                <span>Use the name for your custom Beyblade design, fan fiction, artwork, or competitive play.</span>
              </li>
            </ol>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Beyblade Burst Naming Conventions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Beyblade Burst names follow specific patterns across different seasons of the anime and toy releases:
            </p>
            <ul className="space-y-4 mb-6">
              <li>
                <h3 className="text-lg font-semibold text-primary">Original Burst</h3>
                <p>The first Burst Beyblades had relatively simple names like Valtryek or Spryzen, often based on mythological figures but with altered spelling.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Burst Evolution/God Layer</h3>
                <p>The second generation added terms like "God" (Japanese) or "Evolution" (English) to names, such as God Valkyrie or Strike God Valtryek.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Burst Turbo/Cho-Z</h3>
                <p>The third generation used "Cho-Z" (Japanese) or "Turbo" (English) prefixes, creating names like Turbo Spryzen or Cho-Z Valkyrie.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">GT/Rise</h3>
                <p>The fourth generation introduced "GT" (Japanese) or "Rise" (English) system with names like Union Achilles or Imperial Dragon.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Sparking/Surge</h3>
                <p>The fifth generation used "Sparking" (Japanese) or "Surge" (English) with names like World Spriggan or Brave Valkyrie.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">DB/Dynamite Battle</h3>
                <p>The sixth generation introduced the "DB" or "Dynamite Battle" system with names like Savior Valkyrie or Dynamite Belial.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* Popular Names */}
        <section id="popular-names" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Popular Beyblade Burst Names</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Some of the most iconic Beyblade Burst names throughout the series include:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Valtryek/Valkyrie:</span> 
                <span>The signature Beyblade of protagonist Valt Aoi, with many evolutions including Victory Valtryek, Strike God Valtryek, and Wonder Valtryek.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Spryzen/Spriggan:</span> 
                <span>Shu Kurenai's Beyblade that evolved through forms like Legend Spryzen, Storm Spryzen, and Spryzen Requiem.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Fafnir:</span> 
                <span>Free De La Hoya's left-spinning Beyblade with versions including Drain Fafnir F3, Geist Fafnir F3, and Mirage Fafnir F5.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Achilles:</span> 
                <span>Aiger Akabane's Beyblade that evolved from Z Achilles A4 to Turbo Achilles A4 and beyond.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Longinus:</span> 
                <span>Lui Shirosagi's powerful attack-type Beyblade with forms including Lost Longinus, Nightmare Longinus, and Rage Longinus.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Victory Valtryek V2:</span> 
                <span>An evolution of Valtryek featuring a distinctive wing-shaped Energy Layer for improved aerial attacks.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Genesis Valtryek V3:</span> 
                <span>A God Layer evolution with improved striking power and a more aggressive design.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Wonder Valtryek W3:</span> 
                <span>A SwitchStrike Beyblade with the ability to change its performance mid-battle.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Winning Valkyrie:</span> 
                <span>The Cho-Z evolution featuring metal on its layer for increased attack power and durability.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Slash Valkyrie:</span> 
                <span>The GT/Rise evolution with a sword-shaped blade for precise attacks.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Brave Valkyrie:</span> 
                <span>The Superking/Sparking evolution with a metal chip core for devastating attacks.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Savior Valkyrie:</span> 
                <span>The Dynamite Battle evolution with a powerful low-center design for improved stability.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Storm Spryzen S2:</span> 
                <span>An early evolution of Shu's Beyblade with dual-spin capability and improved stamina.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Legend Spryzen S3:</span> 
                <span>A SwitchStrike Beyblade that can change modes between attack and defense.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Spryzen Requiem S3:</span> 
                <span>A powerful evolution with rubber blades that can absorb attacks in defense mode.</span>
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
                <span className="font-semibold text-primary min-w-[180px]">Astral Spriggan:</span> 
                <span>The Dynamite Battle evolution with a high/low mode change mechanism.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Drain Fafnir F3:</span> 
                <span>Free's first Beyblade with rubber on its Energy Layer to absorb opponent's spin power.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Geist Fafnir F3:</span> 
                <span>An evolution with improved spin-stealing capabilities and stamina.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Wizard Fafnir F4:</span> 
                <span>A GT/Rise evolution with enhanced rubber for better spin absorption.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Mirage Fafnir F5:</span> 
                <span>The Superking/Sparking evolution with a unique rubber core for maximum spin-stealing.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Z Achilles A4:</span> 
                <span>Aiger's first Beyblade with a strong attack-focused design and distinctive red coloring.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Turbo Achilles A4:</span> 
                <span>The Cho-Z evolution with metal elements for increased power and durability.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Union Achilles A5:</span> 
                <span>The GT/Rise evolution with a unique unified layer system for improved attack.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Infinite Achilles A6:</span> 
                <span>The Superking/Sparking evolution with a powerful metal chip core.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Xcalius X2:</span> 
                <span>Xander's sword-themed attack-type Beyblade with excellent slashing power.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Xcalius X3:</span> 
                <span>The SwitchStrike evolution with improved attack capabilities and a more aggressive design.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Buster Xcalibur X4:</span> 
                <span>The Cho-Z evolution with metal elements for devastating attacks.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Dynamite Belial:</span> 
                <span>Bell's signature Beyblade in DB/Dynamite Battle with a unique core system.</span>
              </li>
            </ul>
            <p>
              These names showcase the technical, evolutionary naming system that makes Beyblade Burst names distinctive from earlier generations.
            </p>
          </div>
        </section>

        {/* Latest Generators */}
        <section id="latest-generators" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Latest Generators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Beyblade Name Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Create powerful and epic names for your Beyblade</p>
                <Link to="/beyblade/beyblade-names" onClick={() => window.scrollTo(0, 0)}>
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

export default BeybladeBurstNameGenerator; 