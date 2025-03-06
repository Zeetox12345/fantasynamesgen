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

const SplatoonNameTagGenerator = () => {
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
        const data = await import('@/data/Splatoon/name-tags.json');
        setNameData(data.default || data);
      } catch (error) {
        console.error("Error loading Splatoon name tag data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.nameTags || !nameData.nameTags.length) {
      console.error("No Splatoon name tag data available");
      return;
    }
    
    // Randomly select 10 names from the data
    const shuffled = [...nameData.nameTags].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setGeneratedNames(selected.map(entry => entry.name));
  };

  const handleNameClick = (name: string) => {
    if (!nameData || !nameData.nameTags) return;
    
    setSelectedName(name);
    
    // Find the description for the selected name
    const nameEntry = nameData.nameTags.find(entry => entry.name === name);
    if (nameEntry) {
      setNameDescription(nameEntry.description);
    } else {
      setNameDescription(null);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>Splatoon Name Tag Generator - 10,000+ Name Tags | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ cool name tags for your Splatoon character. Stand out in battles with unique player identities perfect for Turf War and Ranked Battles!" />
        <meta name="keywords" content="Splatoon name tags, Splatoon usernames, Inkling names, Octoling names, Splatoon 3, Nintendo, Splatoon player names" />
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
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Splatoon Name Tag Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate cool name tags for your Splatoon character.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Splatoon Name Tags</CardTitle>
            <CardDescription>Create unique player identities for your Splatoon character</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate Splatoon name tags"
              >
                {loading ? "Loading..." : "Generate Name Tags"}
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What Makes a Good Splatoon Name Tag?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Splatoon Name Tag Traditions</a>
              </li>
              <li>
                <a href="#popular-names" className="text-primary hover:underline">Popular Splatoon Name Tag Styles</a>
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
              In the colorful world of Splatoon, your name tag (or player name) is your identity in battles, 
              on the leaderboards, and throughout the game's social spaces. It's how other players recognize you, 
              whether you're dominating in Turf War, creating posts in the plaza, or participating in Splatfests.
            </p>
            <p className="mb-4">
              Splatoon name tags are as vibrant and creative as the game itself, often featuring playful wordplay, 
              references to ink and sea creatures, and special characters that make them stand out. From competitive 
              players to casual fans, everyone wants a name tag that captures their personality and playstyle.
            </p>
            <p>
              This generator creates cool and unique name tags that would fit perfectly in the Splatoon universe, 
              helping you establish your identity in this ink-splattered world. Whether you're looking for something 
              intimidating for competitive play or something cute and colorful for casual matches, we've got you covered.
            </p>
          </div>
          
          {/* Hero Image */}
          <GeneratorImage 
            src="/images/categories/splatoon/name-tag/name-tag-main.jpg" 
            alt="Splatoon Name Tags" 
            caption="Create unique player identities for your Splatoon character"
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Splatoon Name Tag?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A great Splatoon name tag should capture your personality and playstyle while fitting the game's aesthetic:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ink References:</span> 
                <span>Names that incorporate ink, splats, and color terminology to connect with the game's core mechanic.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Sea Creature Elements:</span> 
                <span>References to squids, octopuses, and other marine life that reflect your character's species.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Weapon Inspiration:</span> 
                <span>Names that reference your favorite weapon or playstyle, like "Roller" or "Charger."</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Special Characters:</span> 
                <span>Symbols like ~, *, and • that add visual flair and make your name stand out in the plaza.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Brevity & Impact:</span> 
                <span>Short, punchy names that are easy to remember and make an impression during battles.</span>
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
                <span>Click the "Generate Name Tags" button to create a list of cool Splatoon player names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">2.</span> 
                <span>Click on any name to see more details about the style or theme of that particular name tag.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">3.</span> 
                <span>Generate as many times as you like until you find the perfect name tag for your Splatoon character.</span>
              </li>
            </ol>
            <p>
              Remember that these name tags are starting points—feel free to modify them to better suit your 
              personality, playstyle, or to make them more unique. Also keep in mind that Splatoon has character 
              limits for player names, so you may need to adjust longer suggestions.
            </p>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Splatoon Name Tag Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              In the Splatoon community, player name tags follow several common patterns:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Symbol Framing:</span> 
                <span>Using symbols like ★ or ✧ at the beginning and end of names to create visual emphasis.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Squid/Octo Prefixes:</span> 
                <span>Adding "Squid" or "Octo" before another word to identify with your character's species.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ink Wordplay:</span> 
                <span>Creating puns with "ink," "splat," or color terms, like "InkRedible" or "SplatMaster."</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Weapon Identity:</span> 
                <span>Names that incorporate your main weapon, like "RollerKing" or "SplatlingPro."</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Team Affiliation:</span> 
                <span>Adding clan or team tags in brackets, like "[Ink]" or "[Squid]" before your name.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Popular Names */}
        <section id="popular-names" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Popular Splatoon Name Tag Styles</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Here are 30 of the most popular name tag styles from the Splatoon community:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">★Woomy★:</span> 
                <span>Using the iconic Inkling sound with star symbols for emphasis.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">~InkMaster~:</span> 
                <span>Descriptive names with tildes that suggest fluid movement like ink.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Agent_3:</span> 
                <span>References to the single-player campaign characters with underscores.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">SplatSquad:</span> 
                <span>Compound words that combine Splatoon terminology with team concepts.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">[Ink]Blaster:</span> 
                <span>Team tags combined with weapon references for competitive players.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">FreshSquid:</span> 
                <span>Names that incorporate the Splatoon slang term "fresh" with species references.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">•Octo•Kid•:</span> 
                <span>Multiple words separated by dot symbols for a clean, organized look.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Veemo!:</span> 
                <span>Simple names using Octoling sound effects with exclamation points for enthusiasm.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">xXSplatXx:</span> 
                <span>Classic gaming style with "xX" bookends for a nostalgic feel.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Squid_Kid_42:</span> 
                <span>Underscore-separated words with numbers, a common online username format.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">InkSplash💦:</span> 
                <span>Names with emoji that represent ink or water for visual flair.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">BOOYAH!:</span> 
                <span>All-caps names with exclamation points referencing in-game callouts.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">⚔️RollerMain⚔️:</span> 
                <span>Weapon-specific names with matching weapon emojis on both sides.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Squiddo:</span> 
                <span>Cute, shortened versions of "squid" with playful suffixes.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">OctoGirl:</span> 
                <span>Species identifier combined with gender for a straightforward name.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">TurfKing:</span> 
                <span>Names that claim dominance in specific game modes.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">✨FreshPrincess✨:</span> 
                <span>Sparkle emojis framing names that reference freshness and royalty.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Ngyes!:</span> 
                <span>Another Inkling sound effect used as a simple, recognizable name.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">S3XRank:</span> 
                <span>Names referencing competitive ranks with game abbreviations.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">InklingBoi:</span> 
                <span>Species names with casual slang terms for a friendly vibe.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">SalmonRunner:</span> 
                <span>Names referencing the Salmon Run game mode for PvE specialists.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">🦑TentaKool🦑:</span> 
                <span>Squid emojis framing tentacle-related puns.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">SplatMaster3000:</span> 
                <span>Futuristic-sounding names with numbers for a tech vibe.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">CephaloKid:</span> 
                <span>Scientific terminology for cephalopods combined with casual terms.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">InkSniperPro:</span> 
                <span>Names indicating weapon specialization with professional status.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">SquidJump:</span> 
                <span>References to the in-game arcade game Squid Jump.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">MarieFan2:</span> 
                <span>Names showing allegiance to specific idol group members.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">BigMan❤️:</span> 
                <span>Simple names of favorite characters with heart emojis.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Splatooniverse:</span> 
                <span>Creative portmanteaus combining "Splatoon" with other words.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">DJ_Octavio:</span> 
                <span>Names referencing villain characters from the games.</span>
              </div>
            </div>
            <p className="mt-4">
              These name tag styles showcase the creativity of the Splatoon community and how players express 
              their identity through their in-game names. From competitive players who want to intimidate opponents 
              to casual fans who just want a cute or funny name, there's a wide variety of naming conventions that 
              have developed within the community.
            </p>
            <p className="mt-4">
              Name tags in Splatoon serve multiple purposes: they identify you in battles, appear on the leaderboards, 
              show up when you post messages in the plaza, and become part of your overall identity in the game. 
              Top players often become recognizable by their unique name tags, which can become part of their brand 
              if they create content or participate in tournaments.
            </p>
            <p className="mt-4">
              When choosing a name tag, consider what aspect of your Splatoon identity you want to emphasize—your 
              preferred weapon, your species (Inkling or Octoling), your playstyle, or your personality. The best 
              name tags are memorable, unique, and true to who you are as a player.
            </p>
          </div>
        </section>

        {/* Latest Generators */}
        <section id="latest-generators" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Latest Splatoon Generators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Splatoon Team Name Generator</CardTitle>
                <CardDescription>Create colorful and catchy names for your Splatoon squad</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/splatoon/team" className="text-primary hover:underline">Try the generator →</Link>
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

export default SplatoonNameTagGenerator; 