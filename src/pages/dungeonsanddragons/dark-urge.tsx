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

const DarkUrgeNameGenerator = () => {
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
        const data = await import('@/data/dnd/dark-urge.json');
        setNameData(data.default || data);
      } catch (error) {
        console.error("Error loading D&D dark urge name data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.darkUrgeNames || !nameData.darkUrgeNames.length) {
      console.error("No D&D dark urge name data available");
      return;
    }
    
    // Randomly select 10 names from the data
    const shuffled = [...nameData.darkUrgeNames].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setGeneratedNames(selected.map(entry => entry.name));
  };

  const handleNameClick = (name: string) => {
    if (!nameData || !nameData.darkUrgeNames) return;
    
    setSelectedName(name);
    
    // Find the description for the selected name
    const nameEntry = nameData.darkUrgeNames.find(entry => entry.name === name);
    if (nameEntry) {
      setNameDescription(nameEntry.description);
    } else {
      setNameDescription(null);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>DnD Dark Urge Name Generator - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ mysterious and ominous names for your dark urge characters in DnD. Create compelling villains or anti-heroes with our free name generator!" />
        <meta name="keywords" content="DnD, Dungeons and Dragons, dark urge names, villain names, evil character names, Baldur's Gate 3, fantasy names, RPG" />
      </Helmet>
      <div className="max-w-7xl mx-auto">
        {/* Header with back button */}
        <div className="mb-6 sm:mb-8">
          <Link 
            to="/dungeonsanddragons" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4 sm:mb-6"
            onClick={() => window.scrollTo(0, 0)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            Back to Dungeons and Dragons
          </Link>
          
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 rounded-lg bg-primary/10 text-primary">
              <Sword className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">DnD Dark Urge Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate mysterious and ominous names for your dark urge characters in DnD campaigns.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Dark Urge Names</CardTitle>
            <CardDescription>Create mysterious and ominous names for your dark urge characters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate dark urge names"
              >
                {loading ? "Loading..." : "Generate Dark Urge Names"}
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What Makes a Good Dark Urge Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#dark-urge-origins" className="text-primary hover:underline">Dark Urge Origins in D&D</a>
              </li>
              <li>
                <a href="#roleplaying-tips" className="text-primary hover:underline">Roleplaying a Dark Urge Character</a>
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
              In Dungeons & Dragons, particularly in games like Baldur's Gate 3, the "Dark Urge" represents characters 
              driven by mysterious, often malevolent impulses beyond their control. These characters struggled with 
              inner darkness, making them complex anti-heroes or compelling villains.
            </p>
            <p className="mb-4">
              Dark Urge names in DnD often reflect the ominous, mysterious nature of these characters. They typically 
              incorporated elements that suggest darkness, corruption, or internal conflict—names that hinted at 
              a troubled past or a dangerous future.
            </p>
            <p>
              Whether you're creating a character with a sinister backstory, a villain driven by dark impulses, 
              or simply want to explore the more shadowy aspects of roleplaying, this generator provided names 
              that evoked the perfect blend of mystery and menace.
            </p>
          </div>
          
          {/* Hero Image */}
          <GeneratorImage 
            src="/images/categories/dungeonsanddragons/dark-urge/dark-urge-main.jpg" 
            alt="DnD Dark Urge Names" 
            caption="Create mysterious and ominous names for your dark urge characters in DnD campaigns"
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Dark Urge Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              An effective Dark Urge name should evoke a sense of mystery and foreboding:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ominous Meaning:</span> 
                <span>Names that referenced darkness, shadow, blood, or corruption created an immediate sense of danger.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Harsh Sounds:</span> 
                <span>Sharp consonants and sibilant sounds (like 'z', 'x', 'th', 'sh') created names that felt dangerous when spoken.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ancient Origins:</span> 
                <span>Names derived from forgotten languages or ancient cultures suggested power from beyond normal understanding.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Duality:</span> 
                <span>Names that hinted at internal conflict or transformation reflected the struggle between light and dark within the character.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Subtle Menace:</span> 
                <span>Sometimes the most effective names were those that sounded innocent but carried sinister undertones or hidden meanings.</span>
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
                <span>Click the "Generate Dark Urge Names" button to create a list of mysterious and ominous names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">2.</span> 
                <span>Click on any name to see more details about the meaning or connotations of that particular name.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">3.</span> 
                <span>Generate as many times as you like until you found the perfect name for your dark character.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">4.</span> 
                <span>Use the descriptions as inspiration for developing your character's backstory, motivations, and inner conflicts.</span>
              </li>
            </ol>
          </div>
        </section>

        {/* Dark Urge Origins */}
        <section id="dark-urge-origins" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Dark Urge Origins in D&D</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              The concept of the Dark Urge had several possible origins in D&D lore:
            </p>
            <ul className="space-y-4 mb-6">
              <li>
                <h3 className="font-semibold text-primary text-lg">Infernal Heritage</h3>
                <p>Characters with tiefling ancestry or those descended from fiends might struggled with inherent dark impulses tied to their bloodline.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Ancient Curse</h3>
                <p>A character might be afflicted by a curse passed down through generations or acquired through contact with a cursed artifact.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Mind Flayer Tadpole</h3>
                <p>As seen in Baldur's Gate 3, characters infected with a mind flayer parasite experienced dark urges as the creature influenced their thoughts.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Possession</h3>
                <p>Partial possession by a demon, ghost, or other malevolent entity could create a dual nature within a character.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Dark Pact</h3>
                <p>Warlocks or other characters who have made deals with sinister powers might experienced urges as part of the price they pay.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* Roleplaying Tips */}
        <section id="roleplaying-tips" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Roleplaying a Dark Urge Character</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Playing a character with dark urges could create compelling storytelling opportunities:
            </p>
            <ul className="space-y-4 mb-6">
              <li>
                <h3 className="font-semibold text-primary text-lg">Internal Conflict</h3>
                <p>Focus on the struggle between the character's normal personality and their darker impulses. This tension created depth and drama.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Triggers</h3>
                <p>Establish specific situations that might trigger the dark urge—perhaps the sight of blood, moments of extreme stress, or proximity to certain magical energies.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Redemption Arc</h3>
                <p>Consider whether your character is fighting against their dark nature or embracing it. A journey toward redemption could be especially powerful.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Physical Manifestations</h3>
                <p>When the dark urge took hold, described subtle physical changes—eyes darkening, voice deepening, or temperature dropping around the character.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Group Dynamics</h3>
                <p>Explore how the party reacted to and helped manage the character's dark side. This could strengthen bonds between characters.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* Latest Generators */}
        <section id="latest-generators" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Latest Generators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Dwarf City Name Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Create authentic and immersive names for dwarven cities and strongholds</p>
                <Link to="/dungeonsanddragons/dwarf-city" onClick={() => window.scrollTo(0, 0)}>
                  <Button variant="outline" size="sm" className="w-full">Try Generator</Button>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Merfolk Name Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Create flowing and aquatic names for merfolk characters and tribes</p>
                <Link to="/dungeonsanddragons/merfolk" onClick={() => window.scrollTo(0, 0)}>
                  <Button variant="outline" size="sm" className="w-full">Try Generator</Button>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Female Half-Elf Name Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Generate elegant and diverse names for female half-elf characters</p>
                <Link to="/dungeonsanddragons/female-half-elf" onClick={() => window.scrollTo(0, 0)}>
                  <Button variant="outline" size="sm" className="w-full">Try Generator</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DarkUrgeNameGenerator; 