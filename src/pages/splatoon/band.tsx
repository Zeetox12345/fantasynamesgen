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

const SplatoonBandNameGenerator = () => {
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
        const data = await import('@/data/Splatoon/band.json');
        setNameData(data.default || data);
      } catch (error) {
        console.error("Error loading Splatoon band name data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.bandNames || !nameData.bandNames.length) {
      console.error("No Splatoon band name data available");
      return;
    }
    
    // Randomly select 10 names from the data
    const shuffled = [...nameData.bandNames].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setGeneratedNames(selected.map(entry => entry.name));
  };

  const handleNameClick = (name: string) => {
    if (!nameData || !nameData.bandNames) return;
    
    setSelectedName(name);
    
    // Find the description for the selected name
    const nameEntry = nameData.bandNames.find(entry => entry.name === name);
    if (nameEntry) {
      setNameDescription(nameEntry.description);
    } else {
      setNameDescription(null);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>Splatoon Band Name Generator - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ fresh and funky band names for the Splatoon universe. Create the perfect musical identity with our free name generator!" />
        <meta name="keywords" content="Splatoon, band names, Splatoon music, Squid Sisters, Off the Hook, Nintendo, Splatoon 3, Inkling bands" />
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
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Splatoon Band Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate fresh and funky band names for the colorful world of Splatoon.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Splatoon Band Names</CardTitle>
            <CardDescription>Create fresh and funky names for Splatoon bands</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate Splatoon band names"
              >
                {loading ? "Loading..." : "Generate Band Names"}
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What Makes a Good Splatoon Band Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Splatoon Band Naming Traditions</a>
              </li>
              <li>
                <a href="#popular-names" className="text-primary hover:underline">Popular Splatoon Bands</a>
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
              In the vibrant world of Splatoon, music is more than just entertainment—it's a cultural cornerstone. 
              Bands like the Squid Sisters, Off the Hook, and Deep Cut don't just provide catchy tunes; they host 
              Splatfests, deliver news, and shape the very identity of Inkling and Octoling society.
            </p>
            <p className="mb-4">
              Splatoon band names are colorful, quirky, and often reference aquatic themes, ink, or musical styles 
              with a fresh twist that captures the game's unique aesthetic. From "Wet Floor" to "Ink Theory," these 
              names are as vibrant as the world they inhabit.
            </p>
            <p>
              Whether you're creating fan content, developing characters for a Splatoon-inspired story, or just 
              curious about what your own Inkling band might be called, this generator provides fresh and funky 
              options that would fit right into Inkopolis Square or Splatsville.
            </p>
          </div>
          
          {/* Hero Image */}
          <GeneratorImage 
            src="/images/categories/splatoon/band/band-main.jpg" 
            alt="Splatoon Band Names" 
            caption="Create fresh and funky band names for the colorful world of Splatoon"
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Splatoon Band Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A great Splatoon band name should capture the game's unique aesthetic and musical culture:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Aquatic References:</span> 
                <span>Names that incorporate sea creatures, water, or oceanic terminology fit perfectly in the world of evolved sea creatures.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ink Terminology:</span> 
                <span>References to ink, splats, and colors connect directly to the game's core mechanic and visual style.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Musical Genre Twist:</span> 
                <span>Taking real-world music genres and giving them a Splatoon spin creates authentic-feeling band names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Catchy & Memorable:</span> 
                <span>Short, punchy names that are easy to remember work best for bands that might headline a Splatfest.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Playful Wordplay:</span> 
                <span>Puns and clever word combinations reflect the game's lighthearted and fun atmosphere.</span>
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
                <span>Click the "Generate Band Names" button to create a list of fresh Splatoon band names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">2.</span> 
                <span>Click on any name to see more details about the style or theme of that particular band name.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">3.</span> 
                <span>Generate as many times as you like until you find the perfect band name for your Splatoon creation.</span>
              </li>
            </ol>
            <p>
              Remember that these names are starting points—feel free to modify them to better suit your specific band concept or musical style!
            </p>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Splatoon Band Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              In the Splatoon universe, band names follow several common patterns:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Aquatic + Object:</span> 
                <span>Names like "Wet Floor" that combine water references with everyday items.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Sea Creature Focus:</span> 
                <span>Names that directly reference sea creatures, like "Bottom Feeders" or "Squid Sisters."</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Music Genre + Twist:</span> 
                <span>Taking musical terminology and adding a Splatoon spin, like "Ink Theory" (a play on "music theory").</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Colorful Descriptors:</span> 
                <span>Names that incorporate vibrant colors or visual elements, like "High-Color Times."</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Playful Alliteration:</span> 
                <span>Names with repeating sounds that are fun to say, like "Chirpy Chips."</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Popular Names */}
        <section id="popular-names" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Popular Splatoon Bands</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Here are 30 of the most iconic bands from the Splatoon universe:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Squid Sisters:</span> 
                <span>The original idol duo from Splatoon, consisting of Callie and Marie.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Off the Hook:</span> 
                <span>The popular idol duo from Splatoon 2, featuring Pearl and Marina.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Deep Cut:</span> 
                <span>The trio from Splatoon 3, consisting of Shiver, Frye, and Big Man.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Wet Floor:</span> 
                <span>A popular rock band known for their energetic battle music.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Ink Theory:</span> 
                <span>A jazz fusion band with complex compositions and sophisticated sound.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Bottom Feeders:</span> 
                <span>A punk rock band with a raw, aggressive sound.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Chirpy Chips:</span> 
                <span>An electronic band known for their chiptune-inspired sound.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Diss-Pair:</span> 
                <span>A duo known for their melancholy sound and emotional lyrics.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">SashiMori:</span> 
                <span>A traditional-meets-modern band with a unique cultural sound.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">ω-3:</span> 
                <span>An experimental band pushing the boundaries of Inkling music.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Turquoise October:</span> 
                <span>An Octoling band with a mysterious underground following.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Squid Squad:</span> 
                <span>One of the original bands from the first Splatoon game.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Hightide Era:</span> 
                <span>A surf rock band with a retro beach vibe.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Ink Spots:</span> 
                <span>A classic-inspired vocal group with smooth harmonies.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Tentacle Beats:</span> 
                <span>An electronic dance music collective known for their hypnotic rhythms.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Splat Jam:</span> 
                <span>A hip-hop group that incorporates battle sounds into their tracks.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Coral Reef:</span> 
                <span>An ambient music project creating underwater soundscapes.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">The Inklings:</span> 
                <span>A classic rock band with a squid-themed twist.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Octo Octave:</span> 
                <span>An Octoling a cappella group known for their vocal range.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Kraken Attack:</span> 
                <span>A heavy metal band with intense, aggressive performances.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Inkblot Rhythm:</span> 
                <span>A funk band with groovy basslines and colorful performances.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Sea Sirens:</span> 
                <span>An all-female vocal group with enchanting melodies.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Splatterhouse:</span> 
                <span>An electronic house music producer known for colorful drops.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Tentacool Jazz:</span> 
                <span>A smooth jazz ensemble with tentacle-themed improvisations.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Ink Floyd:</span> 
                <span>A progressive rock band with conceptual albums about ink.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">The Squiddies:</span> 
                <span>A pop-punk band popular with younger Inklings.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Octo Expansion:</span> 
                <span>An experimental group formed by Octolings after reaching the surface.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Bubble Pop:</span> 
                <span>A bubblegum pop group with catchy, upbeat tunes.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Neon Tentacles:</span> 
                <span>A synthwave project with retro-futuristic aesthetics.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Splatastic Five:</span> 
                <span>A five-piece band known for their theatrical performances.</span>
              </div>
            </div>
            <p className="mt-4">
              These bands showcase the diverse musical landscape of the Splatoon universe, from idol groups to underground 
              collectives, each with their own unique sound and aesthetic that contributes to the game's vibrant culture.
            </p>
          </div>
        </section>

        {/* Latest Generators */}
        <section id="latest-generators" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Latest Splatoon Generators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Splatoon Idol Group Names</CardTitle>
                <CardDescription>Create catchy names for idol groups like Squid Sisters and Off the Hook</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/splatoon/idol-group" className="text-primary hover:underline">Try the generator →</Link>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Splatoon Team Names</CardTitle>
                <CardDescription>Generate colorful and catchy names for your Splatoon squad</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/splatoon/team" className="text-primary hover:underline">Try the generator →</Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SplatoonBandNameGenerator; 