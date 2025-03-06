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

const SplatoonTeamNameGenerator = () => {
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
        const data = await import('@/data/Splatoon/team.json');
        setNameData(data.default || data);
      } catch (error) {
        console.error("Error loading Splatoon team name data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.teamNames || !nameData.teamNames.length) {
      console.error("No Splatoon team name data available");
      return;
    }
    
    // Randomly select 10 names from the data
    const shuffled = [...nameData.teamNames].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setGeneratedNames(selected.map(entry => entry.name));
  };

  const handleNameClick = (name: string) => {
    if (!nameData || !nameData.teamNames) return;
    
    setSelectedName(name);
    
    // Find the description for the selected name
    const nameEntry = nameData.teamNames.find(entry => entry.name === name);
    if (nameEntry) {
      setNameDescription(nameEntry.description);
    } else {
      setNameDescription(null);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>Splatoon Team Name Generator - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ colorful and catchy team names for Splatoon. Create the perfect squad identity for Turf War, Ranked Battles, and more!" />
        <meta name="keywords" content="Splatoon team names, Splatoon 3, competitive Splatoon, Turf War teams, Ranked Battle teams, Nintendo, Inkling teams, Octoling teams" />
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
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Splatoon Team Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate colorful and catchy team names for your Splatoon squad.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Splatoon Team Names</CardTitle>
            <CardDescription>Create colorful and competitive names for your Splatoon squad</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate Splatoon team names"
              >
                {loading ? "Loading..." : "Generate Team Names"}
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What Makes a Good Splatoon Team Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Splatoon Team Naming Traditions</a>
              </li>
              <li>
                <a href="#popular-names" className="text-primary hover:underline">Notable Splatoon Teams</a>
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
              In the ink-splattered arenas of Splatoon, teams battle for turf, glory, and the thrill of competition. 
              Whether you're forming a squad for casual Turf War matches, climbing the ranks in Anarchy Battles, or 
              preparing for a Splatfest, a great team name is essential to establish your identity in the colorful 
              world of Inklings and Octolings.
            </p>
            <p className="mb-4">
              Splatoon team names are vibrant, catchy, and often reference the game's unique elements—ink, sea creatures, 
              weapons, and the distinctive visual style that makes Splatoon stand out. From professional competitive teams 
              to casual friend groups, a memorable name helps your squad make its mark.
            </p>
            <p>
              This generator creates team names that capture the spirit of Splatoon's competitive scene, providing you 
              with fresh options that would fit right into Inkopolis Square or Splatsville's battle lobbies.
            </p>
          </div>
          
          {/* Hero Image */}
          <GeneratorImage 
            src="/images/categories/splatoon/team/team-main.jpg" 
            alt="Splatoon Team Names" 
            caption="Create colorful and competitive team names for your Splatoon squad"
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Splatoon Team Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A great Splatoon team name should capture the game's competitive spirit and unique aesthetic:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ink References:</span> 
                <span>Names that incorporate ink, splats, and color terminology connect directly to the game's core mechanic.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Weapon Inspiration:</span> 
                <span>References to popular weapons like Splattershot, Roller, or Charger create an immediate connection to gameplay.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Aquatic Themes:</span> 
                <span>Sea creature references and oceanic terminology fit perfectly in the world of evolved sea creatures.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Competitive Edge:</span> 
                <span>Words that convey skill, speed, and dominance help establish your team as a force to be reckoned with.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Memorability:</span> 
                <span>Short, punchy names that are easy to remember and chant during tournaments or streams.</span>
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
                <span>Click the "Generate Team Names" button to create a list of colorful Splatoon team names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">2.</span> 
                <span>Click on any name to see more details about the style or theme of that particular team name.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">3.</span> 
                <span>Generate as many times as you like until you find the perfect team name for your Splatoon squad.</span>
              </li>
            </ol>
            <p>
              Remember that these names are starting points—feel free to modify them to better suit your team's playstyle, 
              favorite weapons, or the personalities of your squad members!
            </p>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Splatoon Team Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              In the Splatoon competitive scene, team names follow several common patterns:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Color + Noun:</span> 
                <span>Names like "Cyan Sharks" that combine a color with a sea creature or object.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ink Action Words:</span> 
                <span>Names that incorporate splat, spray, splash and other ink-related verbs.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Weapon + Descriptor:</span> 
                <span>Combinations like "Rapid Rollers" or "Precision Chargers" that reference weapon types.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Sea Creature Focus:</span> 
                <span>Names that directly reference squids, octopuses, and other marine life.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Competitive Terminology:</span> 
                <span>Names that incorporate words like "elite," "champions," or "legends" to establish dominance.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Popular Names */}
        <section id="popular-names" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Notable Splatoon Teams</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Here are 30 of the most memorable teams from the Splatoon competitive scene:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">FTWin:</span> 
                <span>A top competitive team whose name plays on "For The Win" and emphasizes victory.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Kraken Paradise:</span> 
                <span>Named after the powerful Kraken special from the original Splatoon.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Ink Pulse:</span> 
                <span>A team name that evokes the rhythmic flow of ink during intense battles.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Splashdown:</span> 
                <span>Named after the dramatic special weapon that creates a massive ink explosion.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Tentacool:</span> 
                <span>A play on "tentacle" and "cool," perfect for an Octoling-focused team.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Inkredibles:</span> 
                <span>A pun combining "ink" and "incredibles," suggesting an extraordinary team.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Squid Force:</span> 
                <span>A straightforward name that emphasizes power and Inkling identity.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Octo Elites:</span> 
                <span>A name suggesting top-tier skill and Octoling composition.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Ink Storm:</span> 
                <span>Named after the special weapon that rains ink from above.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Roller Squad:</span> 
                <span>A team that specializes in using Roller-type weapons.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Charger Champions:</span> 
                <span>Known for their precision and skill with long-range Charger weapons.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Splatling Stars:</span> 
                <span>A team that excels with rapid-fire Splatling weapons.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Brush Brigade:</span> 
                <span>Specialists in using various Brush weapons for quick, stealthy play.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Turf Titans:</span> 
                <span>A team known for their dominance in Turf War mode.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Ranked Royalty:</span> 
                <span>Specialists in Ranked Battle modes like Tower Control and Rainmaker.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Salmon Runners:</span> 
                <span>A team that excels in the cooperative Salmon Run mode.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Bubble Blowers:</span> 
                <span>Named after the Bubble Blower special weapon.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Tenta Missiles:</span> 
                <span>A team known for their coordinated special weapon usage.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Booyah Bombers:</span> 
                <span>Named after the Booyah Bomb special, known for their powerful specials.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Ultra Stamp:</span> 
                <span>A team that crushes the competition like the Ultra Stamp special.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Reef-Lux:</span> 
                <span>Named after the Reef-Lux 450 weapon, known for their stylish play.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Tri-Stringer:</span> 
                <span>A team that specializes in the bow-like Tri-Stringer weapon.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Splatana Wipers:</span> 
                <span>Named after the sword-like Splatana weapon, known for aggressive play.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Zipcaster Crew:</span> 
                <span>A team that utilizes the Zipcaster special for mobility and surprise attacks.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Wave Breakers:</span> 
                <span>Named after the Wave Breaker sub weapon, experts at area control.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Tacticool Turtles:</span> 
                <span>A defensive team known for their strategic play and staying power.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Splat Zone:</span> 
                <span>Specialists in the Splat Zones ranked mode.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Tower Control:</span> 
                <span>A team that excels in the Tower Control ranked mode.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Rainmaker Rush:</span> 
                <span>Experts in the Rainmaker ranked mode, known for quick pushes.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Clam Blitz:</span> 
                <span>A team that dominates in the Clam Blitz ranked mode.</span>
              </div>
            </div>
            <p className="mt-4">
              These teams demonstrate the creativity and variety in Splatoon team naming, combining game elements with 
              competitive spirit to create memorable identities. Many teams name themselves after weapons, special abilities, 
              or game modes they excel in, while others use wordplay and puns to create unique identities that stand out 
              in tournaments and casual play alike.
            </p>
            <p className="mt-4">
              In the competitive Splatoon scene, a team's name often reflects their playstyle, preferred weapons, or 
              strategic approach to the game. Some teams choose intimidating names to psychologically impact opponents, 
              while others opt for fun, lighthearted names that showcase their personality and love for the game.
            </p>
          </div>
        </section>

        {/* Latest Generators */}
        <section id="latest-generators" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Latest Splatoon Generators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Splatoon Name Tag Generator</CardTitle>
                <CardDescription>Create cool name tags for your Splatoon character</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/splatoon/name-tag" className="text-primary hover:underline">Try the generator →</Link>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Splatoon City Name Generator</CardTitle>
                <CardDescription>Generate unique city names for the Splatoon universe</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/splatoon/city" className="text-primary hover:underline">Try the generator →</Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SplatoonTeamNameGenerator; 