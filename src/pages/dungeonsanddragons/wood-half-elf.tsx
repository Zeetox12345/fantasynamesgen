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

const WoodHalfElfNameGenerator = () => {
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
        const data = await import('@/data/dnd/wood-half-elf.json');
        setNameData(data.default || data);
      } catch (error) {
        console.error("Error loading D&D wood half-elf name data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.woodHalfElfNames || !nameData.woodHalfElfNames.length) {
      console.error("No D&D wood half-elf name data available");
      return;
    }
    
    // Randomly select 10 names from the data
    const shuffled = [...nameData.woodHalfElfNames].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setGeneratedNames(selected.map(entry => entry.name));
  };

  const handleNameClick = (name: string) => {
    if (!nameData || !nameData.woodHalfElfNames) return;
    
    setSelectedName(name);
    
    // Find the description for the selected name
    const nameEntry = nameData.woodHalfElfNames.find(entry => entry.name === name);
    if (nameEntry) {
      setNameDescription(nameEntry.description);
    } else {
      setNameDescription(null);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>DnD Wood Half-Elf Name Generator - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ nature-inspired names for wood half-elf characters in Dungeons & Dragons. Create the perfect name for your next D&D campaign!" />
        <meta name="keywords" content="D&D, DnD, Dungeons and Dragons, half-elf names, wood half-elf, fantasy names, RPG character names, D&D 5e" />
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
            <h1 className="font-display text-3xl sm:text-4xl font-bold">DnD Wood Half-Elf Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate nature-inspired names for wood half-elf characters in Dungeons & Dragons.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Wood Half-Elf Names</CardTitle>
            <CardDescription>Create nature-inspired names for wood half-elf characters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate wood half-elf names"
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What Makes a Good Wood Half-Elf Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Wood Half-Elf Naming Traditions</a>
              </li>
              <li>
                <a href="#popular-names" className="text-primary hover:underline">Popular Wood Half-Elf Names</a>
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
              Wood half-elves represent a unique blend of human adaptability and the natural affinity of wood elves. 
              These individuals often inherit a deep connection to forests and natural environments, along with the 
              curiosity and versatility of their human heritage.
            </p>
            <p className="mb-4">
              In Dungeons & Dragons, wood half-elves typically have names that reflect their strong ties to nature, 
              often incorporating elements that evoke trees, plants, animals, and the rhythms of the forest. Their 
              names tend to be melodic and flowing, with a distinctly sylvan quality.
            </p>
            <p>
              Whether you're creating a character for your next D&D campaign, writing fantasy fiction, or 
              developing an NPC for your homebrew world, this generator provides nature-inspired 
              options for wood half-elf characters that capture their unique connection to the natural world.
            </p>
          </div>
          
          {/* Hero Image */}
          <GeneratorImage 
            src="/images/categories/dungeonsanddragons/wood-half-elf/wood-half-elf-main.jpg" 
            alt="Wood Half-Elf Names" 
            caption="Create nature-inspired names for wood half-elf characters in Dungeons & Dragons"
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Wood Half-Elf Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A compelling wood half-elf name should reflect the character's connection to nature and dual heritage:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Nature Elements:</span> 
                <span>The best wood half-elf names often incorporate references to trees, plants, animals, or natural phenomena.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Sylvan Sounds:</span> 
                <span>Wood half-elf names typically have a melodic, flowing quality that evokes the rustling of leaves or the gentle sounds of the forest.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Seasonal References:</span> 
                <span>Names that incorporate elements of seasons or natural cycles can reflect the wood half-elf's attunement to the rhythms of nature.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Human Influence:</span> 
                <span>Despite their strong connection to nature, good wood half-elf names often retain some human elements, reflecting their dual heritage.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Woodland Imagery:</span> 
                <span>Names that evoke images of forest glades, dappled sunlight, or the deep woods can capture the essence of wood half-elf culture.</span>
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
                <span>Click the "Generate Names" button to create a list of wood half-elf names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">2.</span> 
                <span>Click on any name to see more details about its meaning, origin, or natural significance.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">3.</span> 
                <span>Generate as many times as you like until you find the perfect name for your character.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">4.</span> 
                <span>Consider combining different names or elements to create a unique full name that fits your character's connection to the natural world.</span>
              </li>
            </ol>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Wood Half-Elf Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Wood half-elves have unique naming traditions that reflect their connection to nature and their mixed heritage:
            </p>
            <ul className="space-y-4 mb-6">
              <li>
                <h3 className="font-semibold text-primary text-lg">Nature-Bound Names</h3>
                <p>Many wood half-elves receive names that directly reference natural elements, such as trees, plants, animals, or natural phenomena, reflecting their deep connection to the forest.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Seasonal Naming</h3>
                <p>Some wood half-elves are named after the season of their birth or a significant natural event that occurred around that time, such as the first bloom of spring or the autumn harvest.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Dual-Nature Names</h3>
                <p>Wood half-elves often have names that combine elements from both human and wood elf naming traditions, creating unique names that honor both sides of their heritage while emphasizing their connection to nature.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Coming-of-Age Naming</h3>
                <p>Some wood half-elves receive a childhood name at birth but choose or are given a new name during a coming-of-age ceremony that reflects their personal connection to the natural world.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Forest Clan Names</h3>
                <p>Wood half-elves might take a surname that references their forest home, the specific grove they were born in, or a natural feature that holds significance to their family or community.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* Popular Names */}
        <section id="popular-names" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Popular Wood Half-Elf Names</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Here are 30 popular wood half-elf names from D&D lore and fantasy worlds, each with unique characteristics and connections to nature:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Alder Oakenheart:</span> 
                    <span>A name combining a tree species with a nature-inspired surname, suggesting strength and resilience.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Fern Willowbrook:</span> 
                    <span>A name evoking forest undergrowth and a peaceful woodland setting, popular among druids.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Rowan Greenleaf:</span> 
                    <span>A name referencing both a tree and the vibrant color of forest foliage, suggesting vitality.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Briar Mossfoot:</span> 
                    <span>A name combining woodland plants with a nature-connected surname, suggesting stealth.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Aspen Dawnwood:</span> 
                    <span>A name referencing a tree species and the morning light filtering through the forest.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Hazel Streamwalker:</span> 
                    <span>A name combining a woodland plant with a reference to forest waterways, suggesting harmony.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Thorne Wildbloom:</span> 
                    <span>A name suggesting both protection and beauty, popular among wood half-elf rangers.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Elm Fernwhisper:</span> 
                    <span>A name evoking ancient trees and the gentle sounds of forest undergrowth.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Linden Oakenshaw:</span> 
                    <span>A name referencing a sacred tree and a grove of oaks, suggesting a connection to old growth.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Sorrel Pineleaf:</span> 
                    <span>A name combining an herb and evergreen trees, suggesting adaptability through seasons.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Birch Silverbrook:</span> 
                    <span>A name evoking the distinctive white bark of birch trees and clear forest streams.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Cypress Dewgather:</span> 
                    <span>A name suggesting connection to wetland forests and the morning mist, popular among druids.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Juniper Thornvale:</span> 
                    <span>A name combining an evergreen shrub with a reference to protective thorny thickets.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Wren Leafdancer:</span> 
                    <span>A name referencing a forest bird and the movement of leaves, suggesting agility.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Sage Rootwalker:</span> 
                    <span>A name suggesting both wisdom and a deep connection to the forest floor.</span>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Laurel Greenshadow:</span> 
                    <span>A name evoking victory (laurel wreath) and the dappled light of forest canopies.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Reed Riverwhisper:</span> 
                    <span>A name suggesting connection to waterways and the sounds of flowing water in forests.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Ash Wildrunner:</span> 
                    <span>A name referencing a forest tree and suggesting speed and freedom in natural settings.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Bramble Foxfriend:</span> 
                    <span>A name suggesting both protection (thorns) and kinship with forest animals.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Cedar Moontracker:</span> 
                    <span>A name combining an evergreen tree with lunar navigation skills, popular among scouts.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Maple Autumnheart:</span> 
                    <span>A name evoking the vibrant colors of fall foliage and seasonal transitions.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Thorn Barkweaver:</span> 
                    <span>A name suggesting both protection and craftsmanship with natural materials.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Willow Rainsinger:</span> 
                    <span>A name combining a water-loving tree with an appreciation for forest precipitation.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Fen Mistwalker:</span> 
                    <span>A name suggesting comfort in wetland forests and foggy environments, popular among rangers.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Orrin Woodsoul:</span> 
                    <span>A human-sounding first name with a surname suggesting deep spiritual connection to forests.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Sylvan Nightshade:</span> 
                    <span>A name directly referencing forests and nocturnal plants, suggesting comfort in darkness.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Tamarack Frostleaf:</span> 
                    <span>A name combining a cold-resistant tree with winter imagery, suggesting resilience.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Forrest Vinecaller:</span> 
                    <span>A direct reference to woodlands with a surname suggesting druidic plant manipulation.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Hollis Greenbough:</span> 
                    <span>A name meaning "dweller by the holly trees" with a verdant surname, suggesting guardianship.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Leif Sunspeckle:</span> 
                    <span>A name literally meaning "leaf" paired with a reference to dappled forest sunlight.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Generators */}
        <section id="latest-generators" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Latest Generators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Male Half-Elf Name Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Create authentic and diverse names for male half-elf characters</p>
                <Link to="/dungeonsanddragons/male-half-elf" onClick={() => window.scrollTo(0, 0)}>
                  <Button variant="outline" size="sm" className="w-full">Explore</Button>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Drow Half-Elf Name Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Create mysterious and exotic names for drow half-elf characters</p>
                <Link to="/dungeonsanddragons/drow-half-elf" onClick={() => window.scrollTo(0, 0)}>
                  <Button variant="outline" size="sm" className="w-full">Explore</Button>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">High Half-Elf Name Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Generate elegant and noble names for high half-elf characters</p>
                <Link to="/dungeonsanddragons/high-half-elf" onClick={() => window.scrollTo(0, 0)}>
                  <Button variant="outline" size="sm" className="w-full">Explore</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WoodHalfElfNameGenerator; 