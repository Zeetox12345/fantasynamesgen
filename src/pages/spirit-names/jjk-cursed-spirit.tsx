import { useState, useEffect } from "react";
import { Ghost, Info } from "lucide-react";
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
  cursedSpiritNames: NameEntry[];
}

const JJKCursedSpiritNameGenerator = () => {
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
        const response = await import('@/data/spirit-names/jjk-cursed-spirit.json');
        const data = response.default || response;
        // Ensure the data has the expected structure
        if ('cursedSpiritNames' in data) {
          setNameData(data as SpiritNameData);
        } else {
          console.error("Unexpected data structure in jjk-cursed-spirit.json");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error loading JJK cursed spirit name data:", error);
        setLoading(false);
      }
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.cursedSpiritNames || nameData.cursedSpiritNames.length === 0) return;
    
    const names: NameEntry[] = [];
    const availableNames = [...nameData.cursedSpiritNames];
    
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
        <title>JJK Cursed Spirit Name Generator - 10,000+ Jujutsu Kaisen Inspired Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ dark and powerful names for cursed spirits inspired by Jujutsu Kaisen. Our extensive collection is perfect for fan fiction, role-playing games, and creative projects." />
        <meta name="keywords" content="JJK, Jujutsu Kaisen, cursed spirit names, anime names, dark fantasy names, name generator, 10000 spirit names" />
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
              <Ghost className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">JJK Cursed Spirit Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Create dark and powerful names for cursed spirits from Jujutsu Kaisen.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Cursed Spirit Names</CardTitle>
            <CardDescription>
              Click generate to create names for malevolent cursed spirits
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate cursed spirit names"
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
                  Click "Generate Names" to create cursed spirit names
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
                <a href="#about-cursed-spirits" className="text-primary hover:underline">About JJK Cursed Spirit Names</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Cursed Spirit Naming Traditions</a>
              </li>
              <li>
                <a href="#popular-names" className="text-primary hover:underline">Most Popular JJK Cursed Spirit Names</a>
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
              In the world of Jujutsu Kaisen (JJK), cursed spirits are malevolent entities born from negative human emotions such as fear, hatred, and regret. These spirits vary greatly in power and appearance, from simple manifestations to complex, sentient beings with unique abilities.
            </p>
            <p className="mb-4">
              The names of cursed spirits in JJK often reflect their dark nature, drawing from Japanese mythology and linguistic elements that evoke a sense of dread and otherworldliness. Many cursed spirits are named after yokai (supernatural entities in Japanese folklore) or contain kanji that represent concepts like darkness, death, or suffering.
            </p>
          </div>
          
          {/* Hero Image */}
          <GeneratorImage 
            src="/images/categories/spirit-names/jjk-cursed-spirit/jjk-cursed-spirit-main.jpg" 
            alt="JJK Cursed Spirit Names" 
            caption="Create dark and powerful names for cursed spirits from Jujutsu Kaisen"
          />
        </section>

        {/* About Cursed Spirit Names */}
        <section id="about-cursed-spirits" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">About JJK Cursed Spirit Names</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              This generator creates names that capture the essence of JJK's cursed spirits, perfect for:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Fan Fiction:</span> 
                <span>Stories set in the Jujutsu Kaisen universe</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Original Characters:</span> 
                <span>Creating new cursed spirits inspired by the series</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Role-Playing:</span> 
                <span>Games with dark fantasy elements</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Creative Projects:</span> 
                <span>Exploring themes of curses and supernatural horror</span>
              </li>
            </ul>
            <p>
              Each generated name comes with a description that hints at the spirit's nature, abilities, or the type of curse it embodies.
            </p>
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
                <span>Click the "Generate Names" button to create a list of cursed spirit names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">2.</span> 
                <span>Click on any name to see more details about the spirit's nature and abilities.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">3.</span> 
                <span>Generate as many times as you like until you find the perfect cursed spirit name for your needs.</span>
              </li>
            </ol>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Cursed Spirit Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              In Jujutsu Kaisen, cursed spirit names often follow certain patterns:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Yokai References:</span> 
                <span>Many cursed spirits are named after traditional Japanese yokai or supernatural entities.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Negative Emotions:</span> 
                <span>Names often reflect the negative emotions that created the spirit, such as fear, hatred, or regret.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Physical Traits:</span> 
                <span>Some spirits are named after their distinctive physical features or abilities.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Symbolic Elements:</span> 
                <span>Names may incorporate symbolic elements like blood, darkness, or death to emphasize their malevolent nature.</span>
              </li>
            </ul>
            <p>
              These naming conventions help create cursed spirit names that feel authentic to the Jujutsu Kaisen universe while conveying the dark and supernatural nature of these entities.
            </p>
          </div>
        </section>

        {/* Most Popular Names */}
        <section id="popular-names" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Most Popular JJK Cursed Spirit Names</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-6">
              Here are some of the most popular JJK cursed spirit names, each with its own unique abilities and characteristics:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Malevolent Shrine</h3>
                <p className="text-sm text-muted-foreground">A domain expansion cursed spirit that creates a pocket dimension filled with countless slashing blades.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Hollow Shadow</h3>
                <p className="text-sm text-muted-foreground">A formless entity that feeds on fear and can manifest the deepest anxieties of those who encounter it.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Blood Veil</h3>
                <p className="text-sm text-muted-foreground">A cursed spirit born from centuries of bloodshed, capable of manipulating blood and creating weapons from it.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Rift Maw</h3>
                <p className="text-sm text-muted-foreground">A spirit with the ability to create spatial tears that devour anything that comes into contact with them.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Endless Hunger</h3>
                <p className="text-sm text-muted-foreground">A cursed spirit manifested from starvation and greed, constantly consuming cursed energy to grow stronger.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Nightmare Weaver</h3>
                <p className="text-sm text-muted-foreground">A spirit that traps victims in illusions based on their worst fears, feeding on their despair.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Void Caller</h3>
                <p className="text-sm text-muted-foreground">A cursed spirit that can summon lesser spirits from the void between worlds to do its bidding.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Death Rattle</h3>
                <p className="text-sm text-muted-foreground">A spirit whose voice causes rapid aging and decay in living beings who hear its distinctive sound.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Twisted Visage</h3>
                <p className="text-sm text-muted-foreground">A shapeshifting spirit that takes on the appearance of loved ones to lure victims into its grasp.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Cursed Womb</h3>
                <p className="text-sm text-muted-foreground">A spirit that incubates and gives birth to lesser cursed spirits, creating its own army over time.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Finger Bearer</h3>
                <p className="text-sm text-muted-foreground">A powerful vessel spirit that contains and protects a fragment of an ancient, supreme cursed spirit.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Plague Haze</h3>
                <p className="text-sm text-muted-foreground">A spirit that spreads cursed diseases, weakening jujutsu sorcerers who come into contact with its miasma.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Vengeful Shade</h3>
                <p className="text-sm text-muted-foreground">Born from centuries of accumulated resentment, this spirit targets those with strong bloodlines.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Cursed Puppet</h3>
                <p className="text-sm text-muted-foreground">A spirit that can possess and control corpses, using them as vessels to fight and gather information.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Soul Eater</h3>
                <p className="text-sm text-muted-foreground">A spirit that consumes the souls of its victims, gaining their memories and abilities temporarily.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Chaos Maw</h3>
                <p className="text-sm text-muted-foreground">A spirit with multiple mouths across its body, each capable of devouring cursed energy and techniques.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Cursed Womb: Death Paintings</h3>
                <p className="text-sm text-muted-foreground">A series of nine spirits born from the merging of human and cursed spirit, each with unique abilities.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Disaster Flame</h3>
                <p className="text-sm text-muted-foreground">A spirit born from fear of fire and destruction, capable of creating cursed flames that cannot be extinguished.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Endless Abyss</h3>
                <p className="text-sm text-muted-foreground">A spirit that creates pocket dimensions where time flows differently, trapping victims for what feels like eternity.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Cursed Specter</h3>
                <p className="text-sm text-muted-foreground">A spirit that can phase through physical matter and possess objects, making it difficult to combat.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Thousand Cuts</h3>
                <p className="text-sm text-muted-foreground">A spirit with blade-like appendages that can slice through almost any material, including cursed techniques.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Despair Echo</h3>
                <p className="text-sm text-muted-foreground">A spirit that amplifies negative emotions in its vicinity, causing victims to lose the will to fight.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Cursed Tide</h3>
                <p className="text-sm text-muted-foreground">A fluid-like spirit that can drown victims in cursed energy, absorbing their strength as they weaken.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Hanged Man</h3>
                <p className="text-sm text-muted-foreground">A spirit that can bind and restrict movement, slowly draining life force from immobilized victims.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Cursed Amalgamation</h3>
                <p className="text-sm text-muted-foreground">A spirit formed from multiple lesser curses merging together, with chaotic and unpredictable abilities.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Veil Walker</h3>
                <p className="text-sm text-muted-foreground">A spirit that can move between the physical world and the spirit realm at will, making it elusive.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Cursed Reflection</h3>
                <p className="text-sm text-muted-foreground">A spirit that can copy and use the techniques of jujutsu sorcerers it has observed in battle.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Malice Incarnate</h3>
                <p className="text-sm text-muted-foreground">A spirit born purely from hatred and ill will, capable of corrupting cursed energy it comes in contact with.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Cursed Requiem</h3>
                <p className="text-sm text-muted-foreground">A spirit that can resurrect the dead as cursed puppets, creating an army from fallen enemies.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Void Monarch</h3>
                <p className="text-sm text-muted-foreground">A high-ranking spirit with authority over lesser curses, capable of commanding them in coordinated attacks.</p>
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

export default JJKCursedSpiritNameGenerator;
