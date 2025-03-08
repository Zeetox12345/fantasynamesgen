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

const BeybladeSpecialMoveNameGenerator = () => {
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
        const data = await import('@/data/beyblade/special-move.json');
        setNameData(data.default || data);
      } catch (error) {
        console.error("Error loading Beyblade special move name data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.specialMoveNames || !nameData.specialMoveNames.length) {
      console.error("No Beyblade special move name data available");
      return;
    }
    
    // Randomly select 10 names from the data
    const shuffled = [...nameData.specialMoveNames].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setGeneratedNames(selected.map(entry => entry.name));
  };

  const handleNameClick = (name: string) => {
    if (!nameData || !nameData.specialMoveNames) return;
    
    setSelectedName(name);
    
    // Find the description for the selected name
    const nameEntry = nameData.specialMoveNames.find(entry => entry.name === name);
    if (nameEntry) {
      setNameDescription(nameEntry.description);
    } else {
      setNameDescription(null);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>Beyblade Special Move Name Generator - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ epic special move names for your Beyblade battles. Create the perfect finishing move with our free name generator!" />
        <meta name="keywords" content="Beyblade, special moves, finishing moves, Beyblade attacks, Beyblade battles, Takara Tomy, Hasbro" />
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
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Beyblade Special Move Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate epic special move names for your Beyblade battles.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Special Move Names</CardTitle>
            <CardDescription>Create epic special move names for your Beyblade battles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate Beyblade special move names"
              >
                {loading ? "Loading..." : "Generate Special Moves"}
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What Makes a Good Beyblade Special Move Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Special Move Naming Traditions</a>
              </li>
              <li>
                <a href="#popular-names" className="text-primary hover:underline">Famous Beyblade Special Moves</a>
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
              In the world of Beyblade, special moves are signature attacks that bladers use to 
              unleash the full power of their Beyblades during critical moments in battle. These 
              dramatic finishing moves often represent the bond between a blader and their Beyblade, 
              and are accompanied by spectacular visual effects in the anime.
            </p>
            <p className="mb-4">
              From Tyson's iconic "Galaxy Storm" to Gingka's "Starblast Attack" and Valt's "Rush Launch," 
              special moves combine powerful imagery, elemental forces, and dynamic action words to create 
              memorable battle moments that fans love to recreate in their own Beyblade battles.
            </p>
            <p>
              Whether you're creating a character for fan fiction, roleplaying as a blader, or just want 
              to add some excitement to your real-life Beyblade battles, this generator provides epic 
              special move names that capture the dramatic flair of the Beyblade franchise.
            </p>
          </div>
          
          {/* Hero Image */}
          <GeneratorImage 
            src="/images/categories/beyblade/special-move/special-move-main.jpg" 
            alt="Beyblade Special Move Names" 
            caption="Create epic special move names for your Beyblade battles"
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Beyblade Special Move Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A great Beyblade special move name should convey power, action, and the unique characteristics of your Beyblade:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Dynamic Action Words:</span> 
                <span>Terms like "Strike," "Burst," "Slash," or "Crush" convey the forceful nature of special moves.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Elemental References:</span> 
                <span>Many special moves incorporate elements like fire, lightning, wind, or earth that match the Beyblade's theme.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Cosmic Terminology:</span> 
                <span>Words like "Galaxy," "Cosmic," "Stellar," or "Nova" add an epic scale to special move names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Beyblade References:</span> 
                <span>Including your Beyblade's name or theme in the special move creates a personal connection (e.g., "Pegasus Starblast Attack").</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Dramatic Flair:</span> 
                <span>Terms like "Ultimate," "Supreme," or "Final" emphasize the move's power as a finishing attack.</span>
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
                <span>Click the "Generate Special Moves" button to create a list of epic Beyblade special move names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">2.</span> 
                <span>Click on any name to see more details about the style or theme of that particular special move.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">3.</span> 
                <span>Generate as many times as you want until you find the perfect special move name for your Beyblade.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">4.</span> 
                <span>Customize the name further by adding your Beyblade's name or specific elements that match its design.</span>
              </li>
            </ol>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Special Move Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Beyblade special moves follow different naming patterns across the various series:
            </p>
            <ul className="space-y-4 mb-6">
              <li>
                <h3 className="text-lg font-semibold text-primary">Original Series</h3>
                <p>The first generation often used straightforward, powerful names like "Dragoon Storm," "Flame Saber," or "Tiger Claw" that directly referenced the bit-beast's nature.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Metal Saga</h3>
                <p>Metal Fusion/Masters/Fury special moves became more elaborate, with names like "Starblast Attack," "Lightning Sword Flash," or "King Lion Reverse Wind Strike" that combined multiple powerful elements.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Burst Series</h3>
                <p>The modern Burst series often uses more technical-sounding special moves like "Rush Launch," "Flash Launch," or "Turbo Awakening" that reflect the mechanical nature of Burst Beyblades.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Ultimate Moves</h3>
                <p>Many protagonists have ultimate special moves that are saved for climactic battles, often with "Ultimate," "Supreme," or "God" in their names to emphasize their power.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* Popular Names */}
        <section id="popular-names" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Famous Beyblade Special Moves</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Some of the most iconic special moves throughout the Beyblade franchise include:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Galaxy Storm:</span> 
                <span>Tyson Granger's signature move with Dragoon, creating a powerful tornado that overwhelms opponents.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Starblast Attack:</span> 
                <span>Gingka Hagane's aerial special move with Storm Pegasus, diving from above to strike with maximum force.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Lion Gale Force Wall:</span> 
                <span>Ray Kon's defensive move with Driger, creating a protective barrier against attacks.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Dragon Emperor Life Destructor:</span> 
                <span>Ryuga's ultimate move with L-Drago, drawing power from opponents to fuel a devastating attack.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Rush Launch:</span> 
                <span>Valt Aoi's signature move with Valtryek in the Burst series, using a powerful launch technique to gain an early advantage.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Phantom Hurricane:</span> 
                <span>Tyson's move that creates a massive hurricane to trap and damage opponents.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Victory Tornado:</span> 
                <span>Tyson's ultimate attack that combines the power of all four bit-beasts into one devastating tornado.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Flame Saber:</span> 
                <span>Kai's attack with Dranzer that creates a fiery blade to slice through opponents.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Volcano Emission:</span> 
                <span>Kai's powerful move that unleashes a volcanic eruption of flames to overwhelm opponents.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Tiger Claw:</span> 
                <span>Ray's swift attack that mimics a tiger's slashing claws for precise strikes.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Gravity Control:</span> 
                <span>Max's defensive technique that uses Draciel's weight to create a gravitational pull, drawing opponents in.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Special Move Tornado Wing:</span> 
                <span>Daichi's attack with Strata Dragoon that creates a powerful upward tornado.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Pegasus Starblast Attack:</span> 
                <span>Gingka's aerial attack where Pegasus gains altitude before crashing down on opponents.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Storm Bringer:</span> 
                <span>Gingka's move that creates a massive storm to disorient and damage opponents.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Special Move Galaxy Nova:</span> 
                <span>Gingka's ultimate attack with Galaxy Pegasus, channeling cosmic energy for a devastating strike.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">King Lion Tearing Blast:</span> 
                <span>Kyoya's signature move with Leone, creating three powerful tornadoes to trap opponents.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Lion Gale Force Wall:</span> 
                <span>Kyoya's defensive move that creates a wall of wind to repel attacks.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">King Lion Reverse Wind Strike:</span> 
                <span>Kyoya's advanced move that reverses Leone's rotation to create a powerful counter-attack.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Inferno Blast:</span> 
                <span>Tsubasa's special move with Earth Eagle, creating a powerful updraft to launch opponents into the air.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Sonic Wave:</span> 
                <span>Yu's attack with Flame Libra that creates destructive sound waves to destabilize opponents.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Armageddon:</span> 
                <span>Rago's apocalyptic special move with Diablo Nemesis that channels dark energy to devastate opponents.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Flash Launch:</span> 
                <span>Valt's technique that uses a quick, powerful launch to gain immediate momentum in battle.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Genesis Reboot:</span> 
                <span>Valt's special move with Genesis Valtryek that uses the Performance Tip's reboot feature for a sudden burst of speed.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Spring Attack:</span> 
                <span>Valt's move that utilizes Valtryek's spring-loaded blade for increased attack power.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Turbo Awakening:</span> 
                <span>Aiger's special ability that awakens the full power of his Turbo Achilles for increased performance.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Z Breaker:</span> 
                <span>Aiger's powerful attack with Z Achilles that delivers a concentrated strike to a specific point.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Counter Break:</span> 
                <span>Shu's defensive technique with Spryzen that absorbs an opponent's attack and counters with equal force.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Upper Launch:</span> 
                <span>Free's launching technique that gives Fafnir an upward trajectory for better spin-stealing.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Drain Spin:</span> 
                <span>Free's signature move with Drain Fafnir that absorbs the opponent's spin power to increase Fafnir's stamina.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Dragon Crash:</span> 
                <span>Tyson's basic but powerful attack that channels Dragoon's raw power into a direct hit.</span>
              </li>
            </ul>
            <p>
              These special moves showcase the dramatic, powerful naming conventions that have made Beyblade battles so exciting for fans.
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

export default BeybladeSpecialMoveNameGenerator; 