import { useState, useEffect } from "react";
import { Info } from "lucide-react";
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

interface NameEntry {
  name: string;
  description: string;
}

interface SpiritNameData {
  foxspiritNames: NameEntry[];
}

const FoxSpiritNameGenerator = () => {
  const [generatedNames, setGeneratedNames] = useState<NameEntry[]>([]);
  const [nameData, setNameData] = useState<SpiritNameData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [nameDescription, setNameDescription] = useState<string | null>(null);

  // Load name data when component mounts
  useEffect(() => {
    async function fetchNameData() {
      setLoading(true);
      try {
        const response = await import('@/data/spirit-names/fox-spirit.json');
        const data = response.default || response;
        // Ensure the data has the expected structure
        if ('foxspiritNames' in data) {
          setNameData(data as SpiritNameData);
        } else {
          console.error("Unexpected data structure in fox-spirit.json");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error loading fox spirit name data:", error);
        setLoading(false);
      }
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.foxspiritNames || nameData.foxspiritNames.length === 0) return;
    
    const names: NameEntry[] = [];
    const availableNames = [...nameData.foxspiritNames];
    
    // Generate 10 random names
    for (let i = 0; i < 10; i++) {
      if (availableNames.length === 0) break;
      
      const randomIndex = Math.floor(Math.random() * availableNames.length);
      names.push(availableNames[randomIndex]);
      
      // Remove the selected name to avoid duplicates
      availableNames.splice(randomIndex, 1);
    }
    
    setGeneratedNames(names);
  };

  const handleNameClick = (entry: NameEntry) => {
    setSelectedName(entry.name);
    setNameDescription(entry.description);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>Fox Spirit Name Generator - 10,000+ Kitsune & Mythical Fox Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ mystical names for fox spirits, kitsune, and shapeshifting fox entities from various mythologies. Our comprehensive database offers unique names perfect for fantasy stories, folklore-inspired characters, and East Asian mythology." />
        <meta name="keywords" content="fox spirit names, kitsune names, mythical fox, shapeshifter names, fantasy names, name generator, 10000 spirit names" />
      </Helmet>
      <div className="max-w-7xl mx-auto">
        {/* Header with back button */}
        <div className="mb-6 sm:mb-8">
          <Link 
            to="/spirit-names" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4 sm:mb-6"
            onClick={() => window.scrollTo(0, 0)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            Back to Spirit Names
          </Link>
          
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 rounded-lg bg-primary/10 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6">
                <path d="M10 8.5a2.5 2.5 0 0 1 5 0v1.5a2.5 2.5 0 0 1-5 0V8.5Z"/>
                <path d="M5 9.5a7.5 7.5 0 0 0 15 0v-1A3.5 3.5 0 0 0 16.5 5H15a3.5 3.5 0 0 0-3.5 3.5v3a3.5 3.5 0 0 0 7 0V11"/>
                <path d="M9 16c0 2.25-1.5 4-4 4"/>
                <path d="M15 16c0 2.25 1.5 4 4 4"/>
              </svg>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Fox Spirit Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate names for mystical fox spirits and shapeshifters from various mythologies.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Fox Spirit Names</CardTitle>
            <CardDescription>
              Click generate to create names for kitsune and other fox entities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate fox spirit names"
              >
                {loading ? "Loading..." : "Generate Names"}
              </Button>
              
              {loading && <p>Loading name data...</p>}
              
              {!loading && generatedNames.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
                  {generatedNames.map((entry, index) => (
                    <Dialog key={index}>
                      <DialogTrigger asChild>
                        <div 
                          className="p-3 sm:p-4 rounded-md bg-secondary/20 border border-border hover:border-primary cursor-pointer flex justify-between items-center"
                          onClick={() => handleNameClick(entry)}
                        >
                          <span>{entry.name}</span>
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
              
              {!loading && generatedNames.length === 0 && (
                <div className="text-center p-6 text-muted-foreground">
                  Click "Generate Names" to create fox spirit names
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
                <a href="#about-fox-spirits" className="text-primary hover:underline">About Fox Spirit Names</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Fox Spirit Naming Traditions</a>
              </li>
              <li>
                <a href="#popular-names" className="text-primary hover:underline">Most Popular Fox Spirit Names</a>
              </li>
              <li>
                <a href="#latest-generators" className="text-primary hover:underline">Latest Spirit Generators</a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Introduction */}
        <section id="introduction" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Introduction</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Fox spirits are mystical entities found in various mythologies around the world, most prominently in East Asian folklore. These intelligent and often mischievous beings are known for their shapeshifting abilities, wisdom, and magical powers.
            </p>
            <p className="mb-4">
              Different cultures have their own versions of fox spirits, from the Japanese kitsune that grow additional tails as they age to the Chinese huli jing that can be benevolent or malicious, often depicted as female entities who can transform into beautiful women.
            </p>
          </div>
          
          {/* Hero Image */}
          <GeneratorImage 
            src="/images/categories/spirit-names/fox-spirit/fox-spirit-main.jpg" 
            alt="Fox Spirit Names" 
            caption="Generate names for mystical fox spirits and shapeshifters from various mythologies"
          />
        </section>

        {/* About Fox Spirit Names */}
        <section id="about-fox-spirits" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">About Fox Spirit Names</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Different cultures have their own versions of fox spirits:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Kitsune:</span> 
                <span>Japanese fox spirits that grow additional tails as they age and gain wisdom</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Huli jing:</span> 
                <span>Chinese fox spirits that can be benevolent or malicious</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Kumiho:</span> 
                <span>Korean fox spirits, traditionally portrayed as malevolent beings</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Western foxes:</span> 
                <span>Often portrayed as clever tricksters in Western folklore</span>
              </li>
            </ul>
            <p className="mb-4">
              Use these names for:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Fantasy Characters:</span> 
                <span>Characters inspired by East Asian mythology</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Shapeshifters:</span> 
                <span>Entities with supernatural transformation abilities</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Tricksters:</span> 
                <span>Characters with cunning and mischievous personalities</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Wise Guides:</span> 
                <span>Ancient beings who guide or test protagonists</span>
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
                <span>Click the "Generate Names" button to create a list of fox spirit names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">2.</span> 
                <span>Click on any name to see more details about the spirit's personality and powers.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">3.</span> 
                <span>Generate as many times as you like until you find the perfect fox spirit name for your needs.</span>
              </li>
            </ol>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Fox Spirit Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              The names of fox spirits often reflect their cunning nature, magical abilities, or physical attributes. They may incorporate elements like:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Fire Elements:</span> 
                <span>Many fox spirits are associated with fox-fire or magical flames.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Transformation:</span> 
                <span>References to their shapeshifting abilities and multiple forms.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Wisdom:</span> 
                <span>Terms that highlight their ancient knowledge and cunning intelligence.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Trickery:</span> 
                <span>Words that emphasize their mischievous and sometimes deceptive nature.</span>
              </li>
            </ul>
            <p>
              These naming conventions help create fox spirit names that feel authentic to their mythological origins while conveying their magical and mysterious nature.
            </p>
          </div>
        </section>

        {/* Most Popular Names */}
        <section id="popular-names" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Most Popular Fox Spirit Names</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-6">
              Here are some of the most popular fox spirit names, each with its own unique abilities and characteristics:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Kitsune-bi</h3>
                <p className="text-sm text-muted-foreground">A fox spirit that can create and manipulate mystical blue flames that burn without fuel.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Shadowtail</h3>
                <p className="text-sm text-muted-foreground">A stealthy fox spirit whose tail can extend into shadows, allowing it to move unseen between realms.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Ninko</h3>
                <p className="text-sm text-muted-foreground">A benevolent fox spirit that brings good fortune to households that show it respect and kindness.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Trickweaver</h3>
                <p className="text-sm text-muted-foreground">A mischievous spirit known for creating elaborate illusions that confuse and disorient travelers.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Kyuubi</h3>
                <p className="text-sm text-muted-foreground">A powerful nine-tailed fox spirit with immense wisdom and magical abilities gained over centuries.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Moonwhisker</h3>
                <p className="text-sm text-muted-foreground">A fox spirit that draws power from moonlight, becoming stronger and more magical during full moons.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Jade Paw</h3>
                <p className="text-sm text-muted-foreground">A Chinese fox spirit associated with prosperity, often depicted with jade-colored fur on its paws.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Dreamwalker</h3>
                <p className="text-sm text-muted-foreground">A fox spirit that can enter and manipulate dreams, sometimes offering guidance through symbolic visions.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Silvertongue</h3>
                <p className="text-sm text-muted-foreground">A persuasive fox spirit known for its eloquence and ability to talk its way out of any situation.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Ember Eyes</h3>
                <p className="text-sm text-muted-foreground">A fox spirit with glowing orange eyes that can see through illusions and into the hearts of others.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Kumiho</h3>
                <p className="text-sm text-muted-foreground">A Korean fox spirit known for its seductive abilities and hunger for human energy or livers.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Whisperleaf</h3>
                <p className="text-sm text-muted-foreground">A forest-dwelling fox spirit that can communicate with plants and control their growth.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Huli Jing</h3>
                <p className="text-sm text-muted-foreground">A Chinese fox spirit that can transform into a beautiful woman and possesses powerful illusion magic.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Starfur</h3>
                <p className="text-sm text-muted-foreground">A celestial fox spirit whose coat contains patterns resembling constellations, granting cosmic awareness.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Inari's Messenger</h3>
                <p className="text-sm text-muted-foreground">A divine fox spirit that serves as a messenger for Inari, the Japanese deity of rice, prosperity, and foxes.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Mirage Maker</h3>
                <p className="text-sm text-muted-foreground">A fox spirit specializing in creating elaborate illusions that can span entire landscapes.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Autumn Tail</h3>
                <p className="text-sm text-muted-foreground">A fox spirit whose tail changes color with the seasons, most vibrant during autumn when its power peaks.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Spiritthief</h3>
                <p className="text-sm text-muted-foreground">A fox spirit that can temporarily borrow abilities from other spirits it encounters.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Zenko</h3>
                <p className="text-sm text-muted-foreground">A benevolent fox spirit that serves as a divine messenger and brings good fortune to those it favors.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Yako</h3>
                <p className="text-sm text-muted-foreground">A field fox spirit known for its mischievous nature and tendency to play tricks on humans.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Ghostfox</h3>
                <p className="text-sm text-muted-foreground">A spectral fox spirit that can phase through solid objects and temporarily possess inanimate items.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Riddle Tail</h3>
                <p className="text-sm text-muted-foreground">A fox spirit that speaks in riddles and puzzles, offering wisdom to those clever enough to solve them.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Mystic Vixen</h3>
                <p className="text-sm text-muted-foreground">A female fox spirit with powerful divination abilities, able to see possible futures and past events.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Foxfire</h3>
                <p className="text-sm text-muted-foreground">A spirit that can create balls of ghostly light to lead travelers astray or guide them to safety.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Shapedancer</h3>
                <p className="text-sm text-muted-foreground">A fox spirit renowned for its ability to transform not just into humans but any creature it has observed.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Winter Pelt</h3>
                <p className="text-sm text-muted-foreground">A fox spirit with fur that turns pure white in winter, granting it snow magic and invisibility in blizzards.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Tenko</h3>
                <p className="text-sm text-muted-foreground">A celestial fox spirit that has lived for over a thousand years, possessing immense wisdom and power.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Jewelthief</h3>
                <p className="text-sm text-muted-foreground">A fox spirit attracted to shiny objects, known for collecting treasures and magical artifacts.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Twilight Runner</h3>
                <p className="text-sm text-muted-foreground">A fox spirit most active at dusk and dawn, when the boundaries between worlds are thinnest.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Ancient One</h3>
                <p className="text-sm text-muted-foreground">A fox spirit that has lived for millennia, with knowledge of forgotten magic and lost civilizations.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Spirit Generators */}
        <section id="latest-generators" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Latest Spirit Generators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/spirit-names/indian-spirit" className="p-4 rounded-md bg-secondary/10 border border-border hover:border-primary transition-colors">
              <h3 className="text-lg font-semibold text-primary mb-1">Indian Spirit Names</h3>
              <p className="text-sm text-muted-foreground">Generate mystical names inspired by Native American spiritual traditions.</p>
            </Link>
            <Link to="/spirit-names/jjk-cursed-spirit" className="p-4 rounded-md bg-secondary/10 border border-border hover:border-primary transition-colors">
              <h3 className="text-lg font-semibold text-primary mb-1">JJK Cursed Spirit Names</h3>
              <p className="text-sm text-muted-foreground">Create dark and powerful names for cursed spirits from Jujutsu Kaisen.</p>
            </Link>
            <Link to="/spirit-names/nature-spirit" className="p-4 rounded-md bg-secondary/10 border border-border hover:border-primary transition-colors">
              <h3 className="text-lg font-semibold text-primary mb-1">Nature Spirit Names</h3>
              <p className="text-sm text-muted-foreground">Generate names for spirits that embody the essence of the natural world.</p>
            </Link>
            <Link to="/spirit-names/water-spirit" className="p-4 rounded-md bg-secondary/10 border border-border hover:border-primary transition-colors">
              <h3 className="text-lg font-semibold text-primary mb-1">Water Spirit Names</h3>
              <p className="text-sm text-muted-foreground">Generate names for spirits that embody the essence of oceans, rivers, and lakes.</p>
            </Link>
            <Link to="/spirit-names/fox-spirit" className="p-4 rounded-md bg-secondary/10 border border-border hover:border-primary transition-colors">
              <h3 className="text-lg font-semibold text-primary mb-1">Fox Spirit Names</h3>
              <p className="text-sm text-muted-foreground">Generate names for mystical fox spirits and shapeshifters from various mythologies.</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FoxSpiritNameGenerator;
