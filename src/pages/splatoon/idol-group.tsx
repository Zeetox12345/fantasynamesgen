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

const SplatoonIdolGroupNameGenerator = () => {
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
        const data = await import('@/data/Splatoon/idol-group.json');
        setNameData(data.default || data);
      } catch (error) {
        console.error("Error loading Splatoon idol group name data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.idolGroupNames || !nameData.idolGroupNames.length) {
      console.error("No Splatoon idol group name data available");
      return;
    }
    
    // Randomly select 10 names from the data
    const shuffled = [...nameData.idolGroupNames].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setGeneratedNames(selected.map(entry => entry.name));
  };

  const handleNameClick = (name: string) => {
    if (!nameData || !nameData.idolGroupNames) return;
    
    setSelectedName(name);
    
    // Find the description for the selected name
    const nameEntry = nameData.idolGroupNames.find(entry => entry.name === name);
    if (nameEntry) {
      setNameDescription(nameEntry.description);
    } else {
      setNameDescription(null);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>Splatoon Idol Group Name Generator - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ catchy idol group names for the Splatoon universe. Create the perfect pop sensation with our free name generator!" />
        <meta name="keywords" content="Splatoon, idol groups, Squid Sisters, Off the Hook, Deep Cut, Splatoon 3, Nintendo, Splatoon idols" />
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
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Splatoon Idol Group Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate catchy idol group names for the colorful world of Splatoon.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Splatoon Idol Group Names</CardTitle>
            <CardDescription>Create catchy names for idol groups like Squid Sisters and Off the Hook</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate Splatoon idol group names"
              >
                {loading ? "Loading..." : "Generate Idol Group Names"}
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What Makes a Good Idol Group Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Splatoon Idol Group Naming Traditions</a>
              </li>
              <li>
                <a href="#popular-names" className="text-primary hover:underline">Famous Splatoon Idol Groups</a>
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
              In the Splatoon universe, idol groups are more than just musicians—they're cultural icons, news anchors, 
              and the hosts of the all-important Splatfests that shape the game's world. Each main entry in the series 
              introduces a new idol group that becomes the face of the game.
            </p>
            <p className="mb-4">
              From the Squid Sisters in the original Splatoon to Off the Hook in Splatoon 2 and Deep Cut in Splatoon 3, 
              these charismatic performers have captured the hearts of players with their catchy tunes, distinctive 
              personalities, and memorable catchphrases.
            </p>
            <p>
              Whether you're creating fan content, developing characters for a Splatoon-inspired story, or imagining 
              what the next generation of Splatoon idols might be called, this generator provides catchy and creative 
              names that would fit perfectly alongside the iconic groups from the games.
            </p>
          </div>
          
          {/* Hero Image */}
          <GeneratorImage 
            src="/images/categories/splatoon/idol-group/idol-group-main.jpg" 
            alt="Splatoon Idol Group Names" 
            caption="Create catchy names for idol groups in the colorful world of Splatoon"
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Idol Group Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A great Splatoon idol group name should capture the game's unique aesthetic and pop culture:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Aquatic References:</span> 
                <span>Names that incorporate sea creatures or oceanic terminology, like "Squid Sisters" directly referencing the characters' species.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Catchy & Memorable:</span> 
                <span>Short, punchy names that are easy to remember and chant at concerts or Splatfests.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Wordplay:</span> 
                <span>Clever puns or double meanings, like "Off the Hook" referring both to telephone terminology and being extremely cool.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Member References:</span> 
                <span>Names that subtly hint at the members' characteristics, like "Deep Cut" referencing Frye's deep cut forehead.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Musical Terminology:</span> 
                <span>References to music, performance, or entertainment that fit the group's role in the game.</span>
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
                <span>Click the "Generate Idol Group Names" button to create a list of catchy Splatoon idol group names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">2.</span> 
                <span>Click on any name to see more details about the style or theme of that particular idol group.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">3.</span> 
                <span>Generate as many times as you like until you find the perfect idol group name for your Splatoon creation.</span>
              </li>
            </ol>
            <p>
              Remember that these names are starting points—feel free to modify them to better suit your specific idol group concept or the personalities of your characters!
            </p>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Splatoon Idol Group Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              In the Splatoon universe, idol group names follow several common patterns:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Species + Relationship:</span> 
                <span>"Squid Sisters" combines the species (squid) with a relationship term (sisters), even though they're actually cousins.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Slang Expressions:</span> 
                <span>"Off the Hook" uses a popular slang phrase that has connections to both telephone terminology and being extremely cool.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Descriptive Phrases:</span> 
                <span>"Deep Cut" is a descriptive phrase that references both music (a deep cut track) and a physical characteristic (Frye's forehead).</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Duo/Trio Format:</span> 
                <span>Splatoon idol groups are typically duos (Squid Sisters, Off the Hook) or trios (Deep Cut), which influences their naming.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Cultural References:</span> 
                <span>Names often include subtle references to the members' cultural inspirations or backgrounds.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Popular Names */}
        <section id="popular-names" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Famous Splatoon Idol Groups</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Here are 30 of the most notable idol groups from the Splatoon universe:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Squid Sisters:</span> 
                <span>Callie and Marie, the original duo from Splatoon who host Inkopolis News and Splatfests.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Off the Hook:</span> 
                <span>Pearl and Marina, the duo from Splatoon 2 who took over hosting duties in Inkopolis Square.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Deep Cut:</span> 
                <span>Shiver, Frye, and Big Man, the trio from Splatoon 3 who host Anarchy Splatcast in Splatsville.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Ink Theory:</span> 
                <span>A sophisticated jazz fusion idol group with intellectual appeal.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Tentacle Harmony:</span> 
                <span>A five-member vocal group known for their perfect harmonies.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Splash Wave:</span> 
                <span>A high-energy dance group with synchronized choreography.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Octo Idols:</span> 
                <span>The first all-Octoling idol group to gain popularity on the surface.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Coral Chorus:</span> 
                <span>A traditional-inspired group blending ancient sea melodies with modern beats.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Neon Ink:</span> 
                <span>A cyberpunk-themed duo with futuristic aesthetics and electronic sound.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Bubble Pop:</span> 
                <span>A colorful quartet specializing in upbeat, catchy pop tunes.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Splat Beats:</span> 
                <span>A hip-hop focused idol group with impressive freestyle abilities.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Inkantation:</span> 
                <span>A mystical trio whose songs are said to have magical properties.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Sea Sirens:</span> 
                <span>An all-female group known for their enchanting melodies and visual performances.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Kraken Kids:</span> 
                <span>A youth-oriented group targeting younger Inklings with positive messages.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Tentacool:</span> 
                <span>A laid-back trio with a chill vibe and relaxed performance style.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Ink Blasters:</span> 
                <span>An energetic group that incorporates actual ink spraying into their performances.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Chromatic Squids:</span> 
                <span>A group where each member represents a different color of the rainbow.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Octo Octave:</span> 
                <span>An eight-member Octoling group, each representing a different musical note.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Fresh Ink:</span> 
                <span>A trendsetting group known for starting new fashion movements.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Splatfest Stars:</span> 
                <span>A group that only performs during special Splatfest events.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Turquoise Tide:</span> 
                <span>A blue-themed group with water and wave-based choreography.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Inkling Idols:</span> 
                <span>The first major idol group that paved the way for others in Inkling culture.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Squid Squad:</span> 
                <span>A four-member group with each member specializing in a different battle style.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Cephalo-Pop:</span> 
                <span>A group that blends traditional cephalopod sounds with modern pop music.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Inkredibles:</span> 
                <span>A superhero-themed group with elaborate costumes and stage effects.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Splashdown:</span> 
                <span>A high-impact group known for their dramatic stage entrances.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Tentacle Tunes:</span> 
                <span>A group that uses their tentacles as instruments during performances.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Ink Harmony:</span> 
                <span>A group focused on perfect vocal blending and a cappella performances.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Squid Sync:</span> 
                <span>A group famous for their perfectly synchronized dance routines.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[140px]">Octo Opus:</span> 
                <span>An Octoling group that performs complex, classical-inspired compositions.</span>
              </div>
            </div>
            <p className="mt-4">
              These idol groups represent the diverse entertainment landscape of the Splatoon universe, each with their 
              own unique style, sound, and fanbase. From the canonical groups that appear in the games to fan-imagined 
              extensions of the universe, idol culture is a central part of Splatoon's vibrant world.
            </p>
            <p className="mt-4">
              Each of the canonical groups (Squid Sisters, Off the Hook, and Deep Cut) has their own unique style, catchphrases, and musical sound:
            </p>
            <ul className="space-y-2 mb-6">
              <li>
                <strong>Squid Sisters</strong> are known for their traditional Inkling pop sound and their iconic "Stay Fresh!" catchphrase.
              </li>
              <li>
                <strong>Off the Hook</strong> blend Pearl's aggressive rap style with Marina's electronic music expertise, ending broadcasts with "Don't get cooked, stay off the hook!"
              </li>
              <li>
                <strong>Deep Cut</strong> feature a diverse mix of styles from Shiver's traditional sound to Frye's energetic vocals and Big Man's... well, Big Man noises, closing with "Splatsville, splat with us!"
              </li>
            </ul>
          </div>
        </section>

        {/* Latest Generators */}
        <section id="latest-generators" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Latest Splatoon Generators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Splatoon Band Names</CardTitle>
                <CardDescription>Create fresh and funky names for Splatoon bands</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/splatoon/band" className="text-primary hover:underline">Try the generator →</Link>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Splatoon Song Names</CardTitle>
                <CardDescription>Generate catchy titles for Splatoon songs and tracks</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/splatoon/song" className="text-primary hover:underline">Try the generator →</Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SplatoonIdolGroupNameGenerator; 