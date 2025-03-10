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

const MaleHalfElfNameGenerator = () => {
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
        const data = await import('@/data/dnd/male-half-elf.json');
        setNameData(data.default || data);
      } catch (error) {
        console.error("Error loading D&D male half-elf name data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.maleHalfElfNames || !nameData.maleHalfElfNames.length) {
      console.error("No D&D male half-elf name data available");
      return;
    }
    
    // Randomly select 10 names from the data
    const shuffled = [...nameData.maleHalfElfNames].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setGeneratedNames(selected.map(entry => entry.name));
  };

  const handleNameClick = (name: string) => {
    if (!nameData || !nameData.maleHalfElfNames) return;
    
    setSelectedName(name);
    
    // Find the description for the selected name
    const nameEntry = nameData.maleHalfElfNames.find(entry => entry.name === name);
    if (nameEntry) {
      setNameDescription(nameEntry.description);
    } else {
      setNameDescription(null);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>DnD Male Half-Elf Name Generator - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ authentic and diverse names for male half-elf characters in Dungeons & Dragons. Create the perfect name for your next D&D campaign!" />
        <meta name="keywords" content="D&D, DnD, Dungeons and Dragons, half-elf names, male half-elf, fantasy names, RPG character names, D&D 5e" />
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
            <h1 className="font-display text-3xl sm:text-4xl font-bold">DnD Male Half-Elf Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate authentic and diverse names for male half-elf characters in Dungeons & Dragons.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Male Half-Elf Names</CardTitle>
            <CardDescription>Create authentic and diverse names for male half-elf characters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate male half-elf names"
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What Makes a Good Male Half-Elf Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Half-Elf Naming Traditions</a>
              </li>
              <li>
                <a href="#popular-names" className="text-primary hover:underline">Popular Half-Elf Names</a>
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
              Half-elves stand in two worlds, walking the boundaries between the human and elven societies. 
              Their dual heritage is often reflected in their names, which can draw from both human and elven 
              naming traditions, creating unique combinations that honor both lineages.
            </p>
            <p className="mb-4">
              In Dungeons & Dragons, male half-elves often have names that blend the melodic, flowing quality 
              of elven names with the more straightforward, practical nature of human names. This duality 
              creates characters with rich cultural backgrounds and complex identities.
            </p>
            <p>
              Whether you're creating a character for your next D&D campaign, writing fantasy fiction, or 
              developing an NPC for your homebrew world, this generator provides authentic and diverse 
              options for male half-elf characters that reflect their unique place in fantasy worlds.
            </p>
          </div>
          
          {/* Hero Image */}
          <GeneratorImage 
            src="/images/categories/dungeonsanddragons/male-half-elf/male-half-elf-main.jpg" 
            alt="Male Half-Elf Names" 
            caption="Create authentic and diverse names for male half-elf characters in Dungeons & Dragons"
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Male Half-Elf Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A compelling male half-elf name should reflect the character's dual heritage and unique place in the world:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Cultural Blending:</span> 
                <span>The best half-elf names often combine elements from both human and elven naming traditions, reflecting their mixed heritage.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Melodic Quality:</span> 
                <span>Half-elf names typically retain some of the musical, flowing quality of elven names, even when they lean more toward human naming conventions.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Meaningful Elements:</span> 
                <span>Names that incorporate meaningful syllables or elements from elven languages can add depth to a character's background.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Adaptability:</span> 
                <span>Good half-elf names often have variants or nicknames that allow the character to fit in with either human or elven society as needed.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Personal History:</span> 
                <span>Names that hint at the character's upbringing (whether primarily among humans or elves) can add richness to their backstory.</span>
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
                <span>Click the "Generate Names" button to create a list of male half-elf names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">2.</span> 
                <span>Click on any name to see more details about its meaning, origin, or cultural significance.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">3.</span> 
                <span>Generate as many times as you like until you find the perfect name for your character.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">4.</span> 
                <span>Consider combining different names or elements to create a unique full name that fits your character's background.</span>
              </li>
            </ol>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Half-Elf Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Half-elves have diverse naming traditions that reflect their unique position between two worlds:
            </p>
            <ul className="space-y-4 mb-6">
              <li>
                <h3 className="font-semibold text-primary text-lg">Dual Heritage Names</h3>
                <p>Many half-elves have both a human and an elven name, using one or the other depending on the company they keep. This practice allows them to navigate both societies more easily.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Blended Names</h3>
                <p>Some half-elves have names that deliberately combine human and elven elements, creating unique names that honor both sides of their heritage.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Cultural Upbringing</h3>
                <p>Half-elves raised primarily among humans often have human-sounding names with subtle elven influences, while those raised among elves typically have more traditional elven names.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Family Names</h3>
                <p>Half-elves might take the family name of either their human or elven parent, or in some cases, create a new family name that represents their unique identity.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Self-Chosen Names</h3>
                <p>Some half-elves, particularly those who feel caught between worlds, choose their own names as adults to reflect their personal identity rather than their heritage.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* Popular Names */}
        <section id="popular-names" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Popular Male Half-Elf Names</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Here are 30 popular male half-elf names from D&D lore and fantasy worlds, each with unique characteristics and meanings:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Talon Evereska:</span> 
                    <span>A name combining human directness with elven melodic quality, suggesting keen perception.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Varis Meliamne:</span> 
                    <span>A half-elf name with strong elven influences, meaning "protector of the ancient woods."</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Adran Galanodel:</span> 
                    <span>A balanced name drawing from both human and elven traditions, suggesting nobility and wisdom.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Elian Silverfrond:</span> 
                    <span>A name with a human first name and descriptive elven surname referring to silver-leafed trees.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Thervan Amakiir:</span> 
                    <span>A name with strong ties to elven heritage, meaning "gemflower" in Elvish.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Keth Ilphelkiir:</span> 
                    <span>A short, human-like first name paired with a complex elven family name meaning "gem blossom."</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Laucian Xiloscient:</span> 
                    <span>An elegant name with ancient elven roots, suggesting one who understands the language of trees.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Maeveyn Tordurr:</span> 
                    <span>A name blending elven grace with dwarven influences, reflecting diverse heritage.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Rolen Nightbreeze:</span> 
                    <span>A name suggesting stealth and connection to night air, popular among ranger half-elves.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Sariel Dawnshard:</span> 
                    <span>A name with celestial overtones, meaning "dawn's fragment" and suggesting divine heritage.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Theren Liadon:</span> 
                    <span>A name meaning "silver-tongued forest walker," popular among half-elf bards.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Quarion Wintervale:</span> 
                    <span>A name suggesting one who thrives in winter landscapes, with a melodic elven quality.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Pyrran Moonshadow:</span> 
                    <span>A name with mystical connotations, suggesting one who walks between worlds.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Darien Talindras:</span> 
                    <span>A human-sounding first name with an elven surname meaning "crown of stars."</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Erevan Stormwind:</span> 
                    <span>A name suggesting connection to weather elements, popular among half-elf druids.</span>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Finnian Celanil:</span> 
                    <span>A name with Gaelic human roots and elven suffix meaning "of the silver leaves."</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Zephyr Naïlo:</span> 
                    <span>A name meaning "west wind nightingale," suggesting freedom and musical talent.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Korvin Darathar:</span> 
                    <span>A strong human name with an elven surname meaning "from the ancient valley."</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Aeson Wyndreth:</span> 
                    <span>A name suggesting "star of the wind path," popular among half-elf travelers.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Lysander Aeliron:</span> 
                    <span>A classical human name with an elven surname suggesting "iron light."</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Caelum Starweaver:</span> 
                    <span>A name meaning "heaven's tapestry," suggesting one who works with celestial magic.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Dorian Sylvanis:</span> 
                    <span>A human name paired with an elven surname meaning "of the forest," popular among druids.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Elwin Galadiir:</span> 
                    <span>A name meaning "elf friend of the radiant moon," suggesting diplomatic skills.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Gareth Ithilnor:</span> 
                    <span>A human warrior name with an elven suffix meaning "moon runner."</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Naeris Valmaxian:</span> 
                    <span>A name suggesting "one who brings justice," popular among half-elf paladins.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Orym Silverhand:</span> 
                    <span>A short, practical name with a descriptive surname suggesting magical talent.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Peren Amastacia:</span> 
                    <span>A name meaning "boundary walker of the starflower," suggesting one who crosses worlds.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Quinlan Woodsoul:</span> 
                    <span>A Celtic-inspired human name with a descriptive surname suggesting forest connection.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Sylas Evenwood:</span> 
                    <span>A name suggesting balance between light and shadow, popular among half-elf rogues.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Thalion Duskwalker:</span> 
                    <span>A name meaning "dauntless twilight guardian," suggesting protective instincts.</span>
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
                <CardTitle className="text-lg">Wood Half-Elf Name Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Generate nature-inspired names for wood half-elf characters</p>
                <Link to="/dungeonsanddragons/wood-half-elf" onClick={() => window.scrollTo(0, 0)}>
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
                <CardTitle className="text-lg">Female Half-Elf Name Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Generate elegant and diverse names for female half-elf characters</p>
                <Link to="/dungeonsanddragons/female-half-elf" onClick={() => window.scrollTo(0, 0)}>
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

export default MaleHalfElfNameGenerator; 