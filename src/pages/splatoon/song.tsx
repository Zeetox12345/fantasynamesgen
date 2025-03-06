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

const SplatoonSongNameGenerator = () => {
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
        const data = await import('@/data/Splatoon/song.json');
        setNameData(data.default || data);
      } catch (error) {
        console.error("Error loading Splatoon song name data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.songNames || !nameData.songNames.length) {
      console.error("No Splatoon song name data available");
      return;
    }
    
    // Randomly select 10 names from the data
    const shuffled = [...nameData.songNames].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setGeneratedNames(selected.map(entry => entry.name));
  };

  const handleNameClick = (name: string) => {
    if (!nameData || !nameData.songNames) return;
    
    setSelectedName(name);
    
    // Find the description for the selected name
    const nameEntry = nameData.songNames.find(entry => entry.name === name);
    if (nameEntry) {
      setNameDescription(nameEntry.description);
    } else {
      setNameDescription(null);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>Splatoon Song Name Generator - 10,000+ Song Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ catchy song titles for the Splatoon universe. Create perfect track names for your fictional bands, fan music, and creative projects!" />
        <meta name="keywords" content="Splatoon songs, Splatoon music, Squid Sisters songs, Off the Hook songs, Deep Cut songs, Splatoon 3, Nintendo, Splatoon soundtrack" />
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
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Splatoon Song Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate catchy song titles for the colorful world of Splatoon.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Splatoon Song Names</CardTitle>
            <CardDescription>Create catchy titles for songs and tracks in the Splatoon universe</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate Splatoon song names"
              >
                {loading ? "Loading..." : "Generate Song Names"}
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What Makes a Good Splatoon Song Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Splatoon Song Naming Traditions</a>
              </li>
              <li>
                <a href="#popular-names" className="text-primary hover:underline">Famous Splatoon Songs</a>
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
              Music is the beating heart of the Splatoon universe. From the moment the first game launched, 
              its distinctive soundtrack has been inseparable from the gameplay experience, creating a unique 
              audio-visual identity that sets Splatoon apart from other games.
            </p>
            <p className="mb-4">
              The fictional bands of Splatoon—Squid Sisters, Off the Hook, Deep Cut, and others—have produced 
              iconic tracks that have transcended the game to become cultural phenomena, with real-world concerts 
              and merchandise. Songs like "Calamari Inkantation" and "Ebb & Flow" are instantly recognizable to fans.
            </p>
            <p>
              Splatoon song titles are as colorful and creative as the game itself, often featuring wordplay, 
              references to ink and sea creatures, and a mix of energetic and cool vibes that match the game's 
              aesthetic. Whether you're creating fan music, developing a fictional band, or just exploring the 
              musical side of Splatoon, this generator provides fresh track titles that would fit right into 
              the game's vibrant soundscape.
            </p>
          </div>
          
          {/* Hero Image */}
          <GeneratorImage 
            src="/images/categories/splatoon/song/song-main.jpg" 
            alt="Splatoon Song Names" 
            caption="Create catchy titles for songs and tracks in the Splatoon universe"
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Splatoon Song Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A great Splatoon song title should capture the game's unique musical style and aesthetic:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ink References:</span> 
                <span>Titles that incorporate ink, splats, and color terminology to connect with the game's core mechanic.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Aquatic Terminology:</span> 
                <span>References to water, waves, and oceanic themes that reflect the characters' origins.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Wordplay & Puns:</span> 
                <span>Clever combinations and double meanings that capture the game's playful spirit.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Energy & Attitude:</span> 
                <span>Titles that convey the high-energy, upbeat nature of most Splatoon music.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Musical Terminology:</span> 
                <span>References to musical elements like rhythm, beat, or flow, often with a Splatoon twist.</span>
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
                <span>Click the "Generate Song Names" button to create a list of catchy Splatoon song titles.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">2.</span> 
                <span>Click on any title to see more details about the style or theme of that particular song.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">3.</span> 
                <span>Generate as many times as you like until you find the perfect song title for your Splatoon creation.</span>
              </li>
            </ol>
            <p>
              Remember that these titles are starting points—feel free to modify them to better suit your specific 
              musical style, band concept, or creative project!
            </p>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Splatoon Song Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              In the Splatoon universe, song titles follow several common patterns:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ampersand Pairings:</span> 
                <span>"Ebb & Flow" exemplifies the common pattern of pairing related concepts with an ampersand.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ink-Related Wordplay:</span> 
                <span>Titles that cleverly incorporate ink terminology, like "Inkoming!" or "Splattack!"</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Aquatic Metaphors:</span> 
                <span>Names that use water and ocean metaphors, like "Tide Goes Out" or "Wave Prism."</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Battle References:</span> 
                <span>Titles that reference the competitive nature of the game, like "Now or Never!" or "Seaskape."</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Cultural Fusion:</span> 
                <span>Names that blend different musical or cultural influences, reflecting the diverse styles in Splatoon music.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Popular Names */}
        <section id="popular-names" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Famous Splatoon Songs</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Here are 30 of the most memorable songs from the Splatoon series:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[160px]">Calamari Inkantation:</span> 
                <span>The Squid Sisters' iconic song that plays a pivotal role in the series' story.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[160px]">Ebb & Flow:</span> 
                <span>One of Off the Hook's signature tracks from Splatoon 2.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[160px]">Now or Never!:</span> 
                <span>The intense battle countdown music that plays in the final minute of matches.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[160px]">Anarchy Rainbow:</span> 
                <span>A popular Deep Cut track from Splatoon 3.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[160px]">Splattack!:</span> 
                <span>One of the original battle themes from the first Splatoon.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[160px]">Ink Me Up:</span> 
                <span>An energetic track that captures the essence of Turf War battles.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[160px]">Shark Bytes:</span> 
                <span>A popular battle theme with a distinctive electronic sound.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[160px]">Fins & Fiddles:</span> 
                <span>A Big Man solo from Splatoon 3 with a unique musical style.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[160px]">City of Color:</span> 
                <span>The Squid Sisters' theme for Inkopolis Plaza in the original Splatoon.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[160px]">Tide Goes Out:</span> 
                <span>Marie's solo song that plays during her hero mode appearances.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[160px]">Bomb Rush Blush:</span> 
                <span>Callie's solo song with an energetic pop sound.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[160px]">Fly Octo Fly:</span> 
                <span>A motivational track from the Octo Expansion DLC.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[160px]">Into the Light:</span> 
                <span>The emotional finale song from the Octo Expansion.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[160px]">Nasty Majesty:</span> 
                <span>A hard-hitting track by Off the Hook featuring aggressive vocals.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[160px]">Acid Hues:</span> 
                <span>A psychedelic track from Splatoon 3 with vibrant sound design.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[160px]">Seafoam Shanty:</span> 
                <span>A sea-shanty inspired track with a nautical theme.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[160px]">Inkoming!:</span> 
                <span>An upbeat battle theme that plays during Turf War matches.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[160px]">Rip Entry:</span> 
                <span>A high-energy track with a punk rock influence.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[160px]">Seaskape:</span> 
                <span>A relaxed, beachy track that plays on certain stages.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[160px]">Wave Prism:</span> 
                <span>A track with shimmering synths and aquatic sound effects.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[160px]">Tentacular Circus:</span> 
                <span>A quirky, carnival-themed track with playful instrumentation.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[160px]">Ink or Sink:</span> 
                <span>A battle anthem with a driving beat and competitive energy.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[160px]">Octo Canyon:</span> 
                <span>The mysterious theme that plays in Octo Canyon in Splatoon 2.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[160px]">Fresh Start:</span> 
                <span>An optimistic track that plays during character creation.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[160px]">Splatfest Anthem:</span> 
                <span>The celebratory theme that plays during Splatfest events.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[160px]">Octoling Rendezvous:</span> 
                <span>A track that plays during encounters with Octoling enemies.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[160px]">Inkvisible:</span> 
                <span>A stealthy track with subtle beats and atmospheric sounds.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[160px]">Splattack Remix:</span> 
                <span>A fresh take on the original Splattack theme with new elements.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[160px]">Color Pulse:</span> 
                <span>A vibrant electronic track with pulsing rhythms and colorful synths.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[160px]">Squid Melody:</span> 
                <span>A melodic track featuring traditional Inkling instruments.</span>
              </div>
            </div>
            <p className="mt-4">
              These songs showcase the diverse musical styles in Splatoon, from pop and rock to electronic and 
              experimental. The soundtrack is a crucial part of the Splatoon experience, with each game introducing 
              new musical styles and artists that contribute to the world's vibrant culture.
            </p>
            <p className="mt-4">
              Splatoon's music is known for its unique "Inkling language" vocals, which are actually scrambled and 
              distorted Japanese or English lyrics. This creates a distinctive sound that's both alien and familiar, 
              perfectly matching the game's post-apocalyptic yet colorful world. Many of these songs have become popular 
              beyond the game, with official concerts and merchandise dedicated to the fictional bands that perform them.
            </p>
          </div>
        </section>

        {/* Latest Generators */}
        <section id="latest-generators" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Latest Splatoon Generators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Splatoon Idol Group Name Generator</CardTitle>
                <CardDescription>Create catchy names for idol groups like Squid Sisters and Off the Hook</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/splatoon/idol-group" className="text-primary hover:underline">Try the generator →</Link>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Splatoon Name Tag Generator</CardTitle>
                <CardDescription>Generate cool name tags for your Splatoon character</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/splatoon/name-tag" className="text-primary hover:underline">Try the generator →</Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SplatoonSongNameGenerator; 