import { useState, useEffect } from "react";
import { Heart, Info } from "lucide-react";
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

const HeroNameGenerator = () => {
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
        // Import the data directly since it might not follow the standard format
        const data = await import('@/data/mha/mha_hero_names_based_on_powers.json');
        setNameData(data.default || data);
      } catch (error) {
        console.error("Error loading hero name data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.heroNames || !nameData.heroNames.length) {
      console.error("No hero name data available");
      return;
    }
    
    // Randomly select 10 names from the data
    const shuffled = [...nameData.heroNames].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setGeneratedNames(selected.map(entry => entry.name));
  };

  const handleNameClick = (name: string) => {
    if (!nameData || !nameData.heroNames) return;
    
    setSelectedName(name);
    
    // Find the description for the selected name
    const nameEntry = nameData.heroNames.find(entry => entry.name === name);
    if (nameEntry) {
      setNameDescription(nameEntry.description);
    } else {
      setNameDescription(null);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>MHA Hero Name Generator Based on Powers - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ unique hero names based on quirks and powers from My Hero Academia. Create the perfect hero identity that matches your character's abilities!" />
        <meta name="keywords" content="MHA, My Hero Academia, hero names, quirk-based names, power-based names, superhero names, anime names, 10000 hero names" />
      </Helmet>
      <div className="max-w-7xl mx-auto">
        {/* Header with back button */}
        <div className="mb-6 sm:mb-8">
          <Link 
            to="/mha" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4 sm:mb-6"
            onClick={() => window.scrollTo(0, 0)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            Back to My Hero Academia
          </Link>
          
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 rounded-lg bg-primary/10 text-primary">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Hero Name Generator Based on Powers</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate hero names based on quirks and powers from the world of My Hero Academia.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Hero Names</CardTitle>
            <CardDescription>Create hero names based on quirks and powers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate hero names"
              >
                {loading ? "Loading..." : "Generate Names"}
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What Makes a Good Hero Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Hero Naming Traditions</a>
              </li>
              <li>
                <a href="#popular-names" className="text-primary hover:underline">Popular Hero Names</a>
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
              In the world of My Hero Academia, hero names are more than just identifiers—they're statements of purpose, 
              reflections of quirks, and symbols that inspire hope in civilians. A well-chosen hero name can launch a 
              career and become synonymous with heroism itself.
            </p>
            <p className="mb-4">
              This generator creates hero names based on different types of quirks and powers, helping you find the 
              perfect heroic identity that reflects your character's unique abilities and personality.
            </p>
            <p>
              Whether you're creating an original character for fan fiction, roleplaying, or just for fun, this 
              generator will help you find a name worthy of joining the ranks of Pro Heroes.
            </p>
          </div>
          
          {/* Hero Image */}
          <GeneratorImage 
            src="/images/categories/mha/hero-powers/hero-powers-main.jpg" 
            alt="Hero Names Based on Powers" 
            caption="Create the perfect hero name that reflects your character's unique quirk and abilities"
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Hero Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A good hero name in the MHA universe should reflect several key elements:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Quirk Reference:</span> 
                <span>The best hero names often reference the character's quirk or power in some way.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Memorable Quality:</span> 
                <span>Names should be catchy and easy to remember for media coverage and public recognition.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Heroic Imagery:</span> 
                <span>Words that evoke strength, protection, or other heroic qualities help establish the right image.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Personal Meaning:</span> 
                <span>The best names have personal significance to the hero, reflecting their goals or values.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Marketability:</span> 
                <span>In the commercial world of professional heroes, names that work well for merchandise are advantageous.</span>
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
                <span>Click the "Generate Names" button to create a list of hero names based on various quirks and powers.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">2.</span> 
                <span>Click on any name to see more details about the type of quirk or power it might be associated with.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">3.</span> 
                <span>Generate as many times as you like until you find the perfect hero name for your character.</span>
              </li>
            </ol>
            <p>
              Remember that these names are starting points—feel free to modify them to better suit your character's 
              specific quirk or personality!
            </p>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Hero Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              In My Hero Academia, hero names follow several common patterns:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Quirk-Based Names:</span> 
                <span>Many heroes choose names that directly reference their quirk, like "Froppy" for a frog quirk.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Title + Name Format:</span> 
                <span>Using titles like "The Flame Hero: Endeavor" or "The Everything Hero: Creati" is common.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Symbolic References:</span> 
                <span>Names that symbolize the hero's values or goals, like "All Might" representing strength and hope.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Word Combinations:</span> 
                <span>Combining words related to the quirk or heroic qualities, like "Red Riot" or "Ingenium."</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Popular Names */}
        <section id="popular-names" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Popular Hero Names</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Here are 30 of the most iconic and creative hero names based on powers from the MHA universe:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">All Might:</span> 
                <span>The Symbol of Peace, whose name represents his overwhelming strength and presence.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Deku:</span> 
                <span>Izuku Midoriya's hero name, reclaiming a once-derogatory nickname as a symbol of perseverance.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ground Zero:</span> 
                <span>Katsuki Bakugo's hero name, referencing his explosive quirk and personality.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Shoto:</span> 
                <span>Shoto Todoroki simply uses his given name, representing his journey to define himself on his own terms.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Froppy:</span> 
                <span>Tsuyu Asui's frog-themed hero name that perfectly captures her quirk and personality.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Uravity:</span> 
                <span>Ochaco Uraraka's name combines "gravity" with "levity," reflecting her zero-gravity quirk.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ingenium:</span> 
                <span>The Iida family hero name, representing their engine quirks and drive to protect others.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Red Riot:</span> 
                <span>Eijiro Kirishima's homage to his idol Crimson Riot, reflecting his hardening quirk and fighting spirit.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Creati:</span> 
                <span>Momo Yaoyorozu's hero name, referencing her creation quirk and inventive nature.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Earphone Jack:</span> 
                <span>Kyoka Jiro's name directly references her quirk that allows her to extend and use her earlobes as audio jacks.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Chargebolt:</span> 
                <span>Denki Kaminari's name combines "charge" and "bolt," perfectly describing his electricity quirk.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Cellophane:</span> 
                <span>Hanta Sero's hero name references the tape-like substance he can produce from his elbows.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Pinky:</span> 
                <span>Mina Ashido's playful hero name that matches her pink appearance and bubbly personality.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Tailman:</span> 
                <span>Mashirao Ojiro's straightforward name that directly references his tail quirk.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Anima:</span> 
                <span>Koji Koda's hero name, referencing his ability to communicate with and command animals.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Invisible Girl:</span> 
                <span>Toru Hagakure's name directly states her invisibility quirk in a simple, memorable way.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Sugarman:</span> 
                <span>Rikido Sato's hero name that references his sugar-based strength enhancement quirk.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Tentacole:</span> 
                <span>Mezo Shoji's name combines "tentacle" and "cole" (from "colossal"), reflecting his Dupli-Arms quirk.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Tsukuyomi:</span> 
                <span>Fumikage Tokoyami's name references the Japanese god of night, matching his Dark Shadow quirk.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Can't Stop Twinkling:</span> 
                <span>Yuga Aoyama's flamboyant hero name that matches his sparkling personality and navel laser quirk.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Lemillion:</span> 
                <span>Mirio Togata's hero name representing his goal to save a million people, complementing his permeation quirk.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Suneater:</span> 
                <span>Tamaki Amajiki's name references his ability to manifest the properties of things he eats.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Nejire-chan:</span> 
                <span>Nejire Hado's cute and approachable hero name that matches her energetic personality.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Mirko:</span> 
                <span>The Rabbit Hero whose name complements her rabbit-like abilities and fierce fighting style.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Hawks:</span> 
                <span>The Wing Hero whose name directly references his wing quirk and predatory, observant nature.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Edgeshot:</span> 
                <span>The Ninja Hero whose name reflects his ability to fold his body thin as paper for quick, precise attacks.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ryukyu:</span> 
                <span>The Dragon Hero whose name references her ability to transform into a dragon.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Gang Orca:</span> 
                <span>A hero with orca-like features whose name directly states his animal-based quirk.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Wash:</span> 
                <span>The laundry-themed hero whose simple name belies his powerful cleaning quirk.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Cementoss:</span> 
                <span>The hero who can manipulate cement, with a name that combines "cement" and "colossus."</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Latest Generators */}
        <section id="latest-generators" className="mb-8 sm:mb-12 border-t border-border pt-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Latest MHA Generators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
            <Link to="/mha/male" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
              <h3 className="font-bold mb-2">Male Hero Names</h3>
              <p className="text-sm text-muted-foreground">Generate powerful names for male heroes in the MHA universe</p>
            </Link>
            <Link to="/mha" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
              <h3 className="font-bold mb-2">My Hero Academia</h3>
              <p className="text-sm text-muted-foreground">Explore all My Hero Academia name generators</p>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 sm:mt-24 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>Copyright 2025 – FantasyNamesGen</p>
        </footer>
      </div>
    </div>
  );
};

export default HeroNameGenerator; 