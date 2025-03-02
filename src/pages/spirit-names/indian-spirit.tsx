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
  indianspiritNames: NameEntry[];
}

const IndianSpiritNameGenerator = () => {
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
        const response = await import('@/data/spirit-names/Indian-spirit.json');
        const data = response.default || response;
        // Ensure the data has the expected structure
        if ('indianspiritNames' in data) {
          setNameData(data as SpiritNameData);
        } else {
          console.error("Unexpected data structure in Indian-spirit.json");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error loading Indian spirit name data:", error);
        setLoading(false);
      }
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.indianspiritNames || nameData.indianspiritNames.length === 0) return;
    
    const names: NameEntry[] = [];
    const availableNames = [...nameData.indianspiritNames];
    
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
        <title>Indian Spirit Name Generator - 10,000+ Mystical Native American Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ authentic and mystical Indian spirit names inspired by Native American traditions. Our comprehensive database offers unique names perfect for storytelling, role-playing games, and creative writing." />
        <meta name="keywords" content="Indian spirit names, Native American spirits, spirit name generator, mystical names, fantasy names, 10000 spirit names" />
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
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Indian Spirit Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate mystical names inspired by Native American spiritual traditions.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Indian Spirit Names</CardTitle>
            <CardDescription>
              Click generate to create mystical Indian spirit names
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate Indian spirit names"
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
                  Click "Generate Names" to create Indian spirit names
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
                <a href="#about-indian-spirits" className="text-primary hover:underline">About Indian Spirit Names</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Indian Spirit Naming Traditions</a>
              </li>
              <li>
                <a href="#popular-names" className="text-primary hover:underline">Most Popular Indian Spirit Names</a>
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
              Indian spirit names are deeply rooted in Native American traditions and spirituality. These names often reflect a profound connection to nature, ancestral wisdom, and the spiritual world.
            </p>
            <p className="mb-4">
              In many Native American cultures, spirits are believed to inhabit all aspects of the natural world - from animals and plants to rivers, mountains, and celestial bodies. These spirits often serve as guides, protectors, or messengers between the physical and spiritual realms.
            </p>
          </div>
          
          {/* Hero Image */}
          <GeneratorImage 
            src="/images/categories/spirit-names/indian-spirit/indian-spirit-main.jpg" 
            alt="Indian Spirit Names" 
            caption="Generate mystical names inspired by Native American spiritual traditions"
          />
        </section>

        {/* About Indian Spirit Names */}
        <section id="about-indian-spirits" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">About Indian Spirit Names</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              The names generated here draw inspiration from various Native American traditions, featuring elements that represent natural forces, animal spirits, and mystical concepts. They're perfect for:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Storytelling:</span> 
                <span>Characters in fantasy stories or novels</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Gaming:</span> 
                <span>Spirit guides in role-playing games</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Creative Writing:</span> 
                <span>Projects exploring Native American mythology</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Spiritual Practice:</span> 
                <span>Meditation and spiritual exploration</span>
              </li>
            </ul>
            <p>
              Each name comes with a description that provides context about the spirit's nature, abilities, or purpose in the spiritual world.
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
                <span>Click the "Generate Names" button to create a list of Indian spirit names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">2.</span> 
                <span>Click on any name to see more details about the spirit's nature and meaning.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">3.</span> 
                <span>Generate as many times as you like until you find the perfect spirit name for your needs.</span>
              </li>
            </ol>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Indian Spirit Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              In Native American traditions, spirit names often follow certain patterns and conventions:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Nature Elements:</span> 
                <span>Many spirit names incorporate natural elements like wind, fire, water, or earth.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Animal Attributes:</span> 
                <span>Spirit names may reference animal qualities, like the wisdom of the owl or the strength of the bear.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Celestial Bodies:</span> 
                <span>The sun, moon, and stars often feature in spirit names, representing guidance and eternal presence.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Descriptive Phrases:</span> 
                <span>Many spirit names are descriptive phrases that capture the essence of the spirit's nature or purpose.</span>
              </li>
            </ul>
            <p>
              These naming traditions help create names that are not only meaningful but also connect the spirit to the natural world and the cosmic order that many Native American cultures hold sacred.
            </p>
          </div>
        </section>

        {/* Most Popular Names */}
        <section id="popular-names" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Most Popular Indian Spirit Names</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-6">
              Here are some of the most popular Indian spirit names, each with its own unique meaning and significance:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Dancing Cloud</h3>
                <p className="text-sm text-muted-foreground">A spirit that moves gracefully through the sky, bringing gentle rain and good fortune to those below.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Silent Thunder</h3>
                <p className="text-sm text-muted-foreground">A powerful yet contemplative spirit that represents inner strength and the calm before great change.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Whispering Pine</h3>
                <p className="text-sm text-muted-foreground">A wise, ancient spirit that shares secrets of the forest with those who listen carefully.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Eagle Heart</h3>
                <p className="text-sm text-muted-foreground">A noble spirit that embodies courage, vision, and the ability to see beyond the horizon.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Running River</h3>
                <p className="text-sm text-muted-foreground">A spirit of constant movement and adaptation, bringing life and renewal wherever it flows.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Moon Shadow</h3>
                <p className="text-sm text-muted-foreground">A mysterious spirit that guides travelers through darkness and reveals hidden truths.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Rising Sun</h3>
                <p className="text-sm text-muted-foreground">A spirit of new beginnings, hope, and the promise of a fresh start with each day.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Wolf Singer</h3>
                <p className="text-sm text-muted-foreground">A spirit that communicates with wolf packs, embodying loyalty, family bonds, and wilderness wisdom.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Painted Sky</h3>
                <p className="text-sm text-muted-foreground">A creative spirit that brings color and beauty to the heavens, inspiring artists and dreamers.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Stone Keeper</h3>
                <p className="text-sm text-muted-foreground">An ancient spirit that preserves the memories and wisdom of the earth within sacred stones.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Autumn Leaf</h3>
                <p className="text-sm text-muted-foreground">A spirit of transition and letting go, teaching the beauty of change and the cycles of life.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Thunder Horse</h3>
                <p className="text-sm text-muted-foreground">A powerful spirit that rides storm clouds, bringing necessary change and cleansing rains.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Gentle Fawn</h3>
                <p className="text-sm text-muted-foreground">A spirit of innocence and new life, representing the tender beginnings of all things.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Talking Reed</h3>
                <p className="text-sm text-muted-foreground">A spirit that carries messages on the wind, connecting different worlds and peoples.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Sacred Flame</h3>
                <p className="text-sm text-muted-foreground">A spirit of purification and transformation, guiding ceremonies and spiritual journeys.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Dream Walker</h3>
                <p className="text-sm text-muted-foreground">A spirit that moves between the waking world and the realm of dreams, bringing visions and guidance.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Healing Waters</h3>
                <p className="text-sm text-muted-foreground">A spirit of restoration and wellness, found in sacred springs and cleansing rains.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Wise Owl</h3>
                <p className="text-sm text-muted-foreground">A spirit of knowledge and foresight, watching over the night and guiding seekers of wisdom.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Buffalo Spirit</h3>
                <p className="text-sm text-muted-foreground">A spirit of abundance and sacrifice, teaching the importance of using all gifts with respect.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Star Gazer</h3>
                <p className="text-sm text-muted-foreground">A spirit that connects the earth to the cosmos, revealing celestial mysteries and guidance.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Mountain Heart</h3>
                <p className="text-sm text-muted-foreground">A steadfast spirit of endurance and perspective, offering strength in times of challenge.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Laughing Brook</h3>
                <p className="text-sm text-muted-foreground">A joyful spirit that reminds all beings of the importance of lightness and play in life.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Raven Caller</h3>
                <p className="text-sm text-muted-foreground">A spirit that bridges worlds, carrying messages between the living and ancestral realms.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Prairie Wind</h3>
                <p className="text-sm text-muted-foreground">A free-spirited entity that carries seeds of change and whispers stories across vast distances.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Turtle Shield</h3>
                <p className="text-sm text-muted-foreground">A protective spirit embodying patience, longevity, and the wisdom of moving steadily through life.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Flaming Arrow</h3>
                <p className="text-sm text-muted-foreground">A spirit of decisive action and clear direction, helping those who need to find their path.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Winter Moon</h3>
                <p className="text-sm text-muted-foreground">A contemplative spirit that shines light in dark times, encouraging rest and inner reflection.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Singing Rain</h3>
                <p className="text-sm text-muted-foreground">A musical spirit that brings nourishment to the land through rhythmic precipitation.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Bear Medicine</h3>
                <p className="text-sm text-muted-foreground">A healing spirit that embodies strength, introspection, and the power of dreams.</p>
              </div>
              <div className="p-4 rounded-md bg-secondary/10 border border-border">
                <h3 className="text-lg font-semibold text-primary mb-1">Sunset Watcher</h3>
                <p className="text-sm text-muted-foreground">A spirit that honors endings and transitions, teaching the beauty of completion and release.</p>
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

export default IndianSpiritNameGenerator;
