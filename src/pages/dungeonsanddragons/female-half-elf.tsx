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

const FemaleHalfElfNameGenerator = () => {
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
        const data = await import('@/data/dnd/female-half-elf.json');
        setNameData(data.default || data);
      } catch (error) {
        console.error("Error loading D&D female half-elf name data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.femaleHalfElfNames || !nameData.femaleHalfElfNames.length) {
      console.error("No D&D female half-elf name data available");
      return;
    }
    
    // Randomly select 10 names from the data
    const shuffled = [...nameData.femaleHalfElfNames].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setGeneratedNames(selected.map(entry => entry.name));
  };

  const handleNameClick = (name: string) => {
    if (!nameData || !nameData.femaleHalfElfNames) return;
    
    setSelectedName(name);
    
    // Find the description for the selected name
    const nameEntry = nameData.femaleHalfElfNames.find(entry => entry.name === name);
    if (nameEntry) {
      setNameDescription(nameEntry.description);
    } else {
      setNameDescription(null);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>DnD Female Half-Elf Name Generator - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ elegant and diverse names for female half-elf characters in DnD. Create the perfect character with our free name generator!" />
        <meta name="keywords" content="DnD, Dungeons and Dragons, half-elf names, female character names, fantasy names, RPG, tabletop games, half-elven" />
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
            <h1 className="font-display text-3xl sm:text-4xl font-bold">DnD Female Half-Elf Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate elegant and diverse names for female half-elf characters in your DnD campaign.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Female Half-Elf Names</CardTitle>
            <CardDescription>Create elegant and diverse names for female half-elf characters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate female half-elf names"
              >
                {loading ? "Loading..." : "Generate Female Half-Elf Names"}
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What Makes a Good Female Half-Elf Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#half-elf-culture" className="text-primary hover:underline">Half-Elf Culture in DnD</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Half-Elven Naming Traditions</a>
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
              In the diverse worlds of Dungeons & Dragons, half-elves stand at a unique cultural crossroads. 
              Born of human and elven parents, they inherit the grace and magical affinity of their elven 
              heritage along with the adaptability and ambition of their human side. Female half-elves in 
              particular often embody this duality in fascinating ways.
            </p>
            <p className="mb-4">
              Half-elf names in DnD typically reflect their mixed heritage, often combining elements from both 
              human and elven naming traditions. Female half-elf names tend to be melodic and flowing 
              like elven names, but may be shorter or more practical than pure elven names, reflecting their 
              human heritage.
            </p>
            <p>
              Whether you're creating a character for your next campaign, designing an NPC with an interesting 
              backstory, or simply exploring the rich cultural tapestry of DnD's worlds, this generator provides 
              names that capture the unique blend of elegance and practicality that defines half-elven identity.
            </p>
          </div>
          
          {/* Hero Image */}
          <GeneratorImage 
            src="/images/categories/dungeonsanddragons/female-half-elf/female-half-elf-main.jpg" 
            alt="DnD Female Half-Elf Names" 
            caption="Create elegant and diverse names for female half-elf characters in your DnD campaign"
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Female Half-Elf Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A compelling female half-elf name should reflect their dual heritage and unique place in the world:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Cultural Blending:</span> 
                <span>Names that combine elements from both human and elven naming traditions (like an elven first name with a human surname, or vice versa) reflect their mixed heritage.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Melodic Quality:</span> 
                <span>Names with a flowing, musical quality that's slightly less elaborate than pure elven names strike the perfect balance between their ancestries.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Meaningful Elements:</span> 
                <span>Names that incorporate terms for beauty, grace, or adaptability—qualities often associated with half-elves—add depth to the character.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Regional Influences:</span> 
                <span>Half-elves raised in predominantly human or elven communities might have names that lean more heavily toward that culture's naming conventions.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Unique Identifiers:</span> 
                <span>Some half-elves choose or are given names that specifically acknowledge their mixed heritage, setting them apart from both parent cultures.</span>
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
                <span>Click the "Generate Female Half-Elf Names" button to create a list of elegant and diverse names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">2.</span> 
                <span>Click on any name to see more details about the meaning or cultural origins of that particular name.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">3.</span> 
                <span>Generate as many times as you like until you find the perfect name for your character or NPC.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">4.</span> 
                <span>Use the descriptions as inspiration for developing your character's background, personality, and connection to their dual heritage.</span>
              </li>
            </ol>
          </div>
        </section>

        {/* Half-Elf Culture */}
        <section id="half-elf-culture" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Half-Elf Culture in DnD</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Understanding half-elf society can help you create more authentic characters:
            </p>
            <ul className="space-y-4 mb-6">
              <li>
                <h3 className="font-semibold text-primary text-lg">Cultural Ambassadors</h3>
                <p>Many half-elves find themselves naturally suited to roles as diplomats, traders, or cultural intermediaries between human and elven communities. Their dual perspective allows them to understand and navigate both worlds with unique insight.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Identity and Belonging</h3>
                <p>Half-elves often struggle with questions of identity and belonging, never fully fitting into either parent culture. Some embrace this uniqueness as a strength, while others may feel perpetually caught between worlds. This struggle can be particularly formative for female half-elves, who may face different expectations in human versus elven societies.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Adaptability</h3>
                <p>The ability to adapt to different environments and social situations is a hallmark of half-elven culture. They often develop a chameleon-like ability to adjust their behavior and presentation to fit in wherever they go, making them excellent adventurers.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Longevity and Perspective</h3>
                <p>With lifespans longer than humans but shorter than elves, half-elves occupy a unique temporal perspective. They form deep bonds with humans while knowing they will outlive them, yet cannot fully embrace the centuries-spanning outlook of their elven relatives.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Independent Communities</h3>
                <p>In some settings, half-elves have established their own communities where their mixed heritage is the norm rather than the exception. These settlements often develop unique cultural practices that blend human and elven traditions in creative ways.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Half-Elven Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Half-elven naming practices vary widely depending on their upbringing and cultural context:
            </p>
            <ul className="space-y-4 mb-6">
              <li>
                <h3 className="font-semibold text-primary text-lg">Human-Raised Half-Elves</h3>
                <p>Half-elves raised in human communities often have human-style names, though perhaps with a slightly more melodic quality. Their parents might choose names that sound "elvish" to human ears without necessarily being authentic elven names. Examples include names like Ariana, Elira, or Selina.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Elven-Raised Half-Elves</h3>
                <p>Those raised among elves typically have traditional elven names, though perhaps slightly simplified. They might use their human parent's name or a human-style name as a second name or identifier. Examples include Faelinn, Tiariel, or Elyndra.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Dual-Heritage Names</h3>
                <p>Some half-elves embrace both sides of their heritage by using both human and elven names—perhaps an elven first name with a human surname, or maintaining separate names for use in different communities. Examples include Liriel Woodhart or Mira Silverleaf.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Unique Half-Elven Names</h3>
                <p>In regions where half-elves are common, distinct naming traditions might emerge that are neither purely human nor elven, but uniquely half-elven. These often combine elements from both traditions in creative ways. Examples include names like Thalia, Lysandra, or Evanthe.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Chosen Names</h3>
                <p>Many half-elves, especially those who have struggled with their identity, choose their own names as adults. These chosen names often reflect personal experiences or aspirations rather than cultural traditions. A half-elf might choose a name meaning "bridge," "harmony," or "between" to reflect their dual nature.</p>
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
                <CardTitle className="text-lg">Dark Urge Name Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Generate mysterious and ominous names for your dark urge characters</p>
                <Link to="/dungeonsanddragons/dark-urge" onClick={() => window.scrollTo(0, 0)}>
                  <Button variant="outline" size="sm" className="w-full">Try Generator</Button>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Elf Druid Name Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Generate nature-attuned names for elven druids and their circles</p>
                <Link to="/dungeonsanddragons/elf-druid" onClick={() => window.scrollTo(0, 0)}>
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

export default FemaleHalfElfNameGenerator; 