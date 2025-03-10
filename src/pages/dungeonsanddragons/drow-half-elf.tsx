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

const DrowHalfElfNameGenerator = () => {
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
        const data = await import('@/data/dnd/drow-half-elf.json');
        setNameData(data.default || data);
      } catch (error) {
        console.error("Error loading D&D drow half-elf name data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.drowHalfElfNames || !nameData.drowHalfElfNames.length) {
      console.error("No D&D drow half-elf name data available");
      return;
    }
    
    // Randomly select 10 names from the data
    const shuffled = [...nameData.drowHalfElfNames].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setGeneratedNames(selected.map(entry => entry.name));
  };

  const handleNameClick = (name: string) => {
    if (!nameData || !nameData.drowHalfElfNames) return;
    
    setSelectedName(name);
    
    // Find the description for the selected name
    const nameEntry = nameData.drowHalfElfNames.find(entry => entry.name === name);
    if (nameEntry) {
      setNameDescription(nameEntry.description);
    } else {
      setNameDescription(null);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>DnD Drow Half-Elf Name Generator - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ mysterious and exotic names for drow half-elf characters in Dungeons & Dragons. Create the perfect name for your next D&D campaign!" />
        <meta name="keywords" content="D&D, DnD, Dungeons and Dragons, half-elf names, drow half-elf, fantasy names, RPG character names, D&D 5e, Underdark" />
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
            <h1 className="font-display text-3xl sm:text-4xl font-bold">DnD Drow Half-Elf Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate mysterious and exotic names for drow half-elf characters in Dungeons & Dragons.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Drow Half-Elf Names</CardTitle>
            <CardDescription>Create mysterious and exotic names for drow half-elf characters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate drow half-elf names"
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What Makes a Good Drow Half-Elf Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Drow Half-Elf Naming Traditions</a>
              </li>
              <li>
                <a href="#popular-names" className="text-primary hover:underline">Popular Drow Half-Elf Names</a>
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
              Drow half-elves embody one of the most complex and fascinating heritages in the Dungeons & Dragons universe. 
              Born of the union between the surface world and the mysterious Underdark, these individuals often struggle 
              with conflicting cultural influences and the prejudices that follow both their drow and human lineages.
            </p>
            <p className="mb-4">
              In D&D lore, drow half-elves typically have names that reflect their unique position between worlds. 
              Their names often combine the exotic, consonant-heavy qualities of drow naming conventions with elements 
              from human cultures, creating distinctive identities that speak to their complex heritage.
            </p>
            <p>
              Whether you're creating a character with a troubled past, a champion seeking redemption, or an enigmatic 
              figure with mysterious origins, this generator provides names that capture the exotic and sometimes 
              dark nature of drow half-elves while honoring their dual heritage.
            </p>
          </div>
          
          {/* Hero Image */}
          <GeneratorImage 
            src="/images/categories/dungeonsanddragons/drow-half-elf/drow-half-elf-main.jpg" 
            alt="Drow Half-Elf Names" 
            caption="Create mysterious and exotic names for drow half-elf characters in Dungeons & Dragons"
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Drow Half-Elf Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A compelling drow half-elf name should reflect the character's complex heritage and often conflicted nature:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Exotic Sounds:</span> 
                <span>The best drow half-elf names often incorporate the distinctive consonant clusters and exotic phonetics associated with drow language.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Dark Imagery:</span> 
                <span>Names that evoke shadows, darkness, or the mysterious depths of the Underdark can reflect the drow aspect of their heritage.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Cultural Fusion:</span> 
                <span>Effective names often blend elements from both drow naming traditions and human or surface cultures, creating a unique hybrid identity.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Meaningful Contrasts:</span> 
                <span>Names that juxtapose light and dark, surface and depths, or acceptance and rejection can symbolize the character's internal struggles.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Adaptable Forms:</span> 
                <span>Names that can be shortened or modified to fit in different societies allow the character to navigate both the surface world and Underdark communities.</span>
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
                <span>Click the "Generate Names" button to create a list of drow half-elf names.</span>
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
                <span>Consider how your character's name might reflect their relationship with both their drow and human heritage.</span>
              </li>
            </ol>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Drow Half-Elf Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Drow half-elves have complex naming traditions that reflect their position between two very different worlds:
            </p>
            <ul className="space-y-4 mb-6">
              <li>
                <h3 className="font-semibold text-primary text-lg">Dual Identity Names</h3>
                <p>Many drow half-elves maintain two separate names—one for use in drow society and another for the surface world—allowing them to navigate both cultures more safely.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Rejection Names</h3>
                <p>Some drow half-elves raised in the Underdark who later escape to the surface deliberately choose new names that reject their drow heritage, symbolizing their break from that society.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Hybrid Naming</h3>
                <p>Those who embrace both aspects of their heritage might create names that deliberately blend drow and human linguistic elements, creating unique identifiers that acknowledge their complex origins.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">House Affiliations</h3>
                <p>Drow half-elves raised in drow society might retain the house name of their drow parent, though often in a modified form that acknowledges their mixed blood status.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Symbolic Names</h3>
                <p>Some choose or are given names that symbolize their unique status, often referencing twilight, boundaries, or other concepts that represent their position between the surface and Underdark worlds.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* Popular Names */}
        <section id="popular-names" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Popular Drow Half-Elf Names</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Here are 30 popular drow half-elf names from D&D lore and fantasy worlds, each with unique characteristics and dark undertones:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Ilvara Nightshadow:</span> 
                    <span>A name combining drow naming patterns with a descriptive surname evoking darkness and stealth.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Zak'neth Darkhope:</span> 
                    <span>A name with distinctive drow consonants paired with a surname suggesting complex emotions.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Viconia DeVir:</span> 
                    <span>A famous character name combining a unique first name with a traditional drow house name.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Ryltar Keth'alen:</span> 
                    <span>A name with exotic sounds and apostrophes characteristic of drow naming conventions.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Seldra Tylmarande:</span> 
                    <span>A name blending surface-world sounds with the complex syllables of drow surnames.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Xullrae Zauviir:</span> 
                    <span>A distinctly exotic name with strong drow influences and unusual phonetics.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Kalannar Oblodra:</span> 
                    <span>A name referencing a fallen drow house known for psionic powers, suggesting hidden abilities.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Jhael'ress Hunzrin:</span> 
                    <span>A name with traditional drow feminine suffix paired with a house known for beast mastery.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Talinth Shadowweaver:</span> 
                    <span>A name suggesting manipulation of darkness and shadow magic, popular among sorcerers.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Vesryn Baenre:</span> 
                    <span>A name connecting to the most powerful drow house, suggesting noble but dangerous heritage.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Quarra Mizzrym:</span> 
                    <span>A name linking to a drow house known for illusion magic, suggesting deceptive talents.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Nathrae Despana:</span> 
                    <span>A name with a house known for demon worship, suggesting a dark and dangerous lineage.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Irae T'sarran:</span> 
                    <span>A name with apostrophe typical of drow naming, suggesting ancient and arcane bloodlines.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Malice Do'Urden:</span> 
                    <span>A name meaning "cruelty" paired with a famous drow house name, suggesting a conflicted heritage.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Xune Tuin'Tarl:</span> 
                    <span>A name with complex consonants and apostrophe, suggesting ancient drow lineage.</span>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Azrinae Vandree:</span> 
                    <span>A name with a house known for trading with the surface, suggesting diplomatic skills.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Drada Mylyl:</span> 
                    <span>A short, sharp name with a house known for assassination, suggesting deadly precision.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Elerra Fey-Branche:</span> 
                    <span>A name blending drow and surface elf naming conventions, suggesting a bridge between worlds.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Filraena Xorlarrin:</span> 
                    <span>A name with a house known for fire magic, suggesting pyromantic abilities.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Ghilanna Duskryn:</span> 
                    <span>A melodic name with a house known for producing skilled warriors, suggesting combat prowess.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Haelra Melarn:</span> 
                    <span>A name with a house known for earth magic, suggesting connection to stone and minerals.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Irrae Kenafin:</span> 
                    <span>A name with a lesser-known house, suggesting one who has escaped notice and survived.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Jhaelryna Tlabbar:</span> 
                    <span>A complex name with a house known for poison use, suggesting subtle and deadly methods.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Liriel Dhuurniv:</span> 
                    <span>A name meaning "lure" with a house known for hunting, suggesting a dangerous attraction.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Minolin Fey-Umbra:</span> 
                    <span>A name blending fey and shadow elements, suggesting one who walks between light and dark.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Nedylene Zinard:</span> 
                    <span>A name with a house known for arcane research, suggesting scholarly pursuits.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Olorae Misrim:</span> 
                    <span>A name with a house known for beast taming, suggesting affinity with Underdark creatures.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Pellanistra Ousstyl:</span> 
                    <span>A long, formal name with a house known for diplomacy, suggesting political acumen.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Rilrae Duskwalker:</span> 
                    <span>A name blending drow sounds with a surface surname, suggesting one who travels between worlds.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Szordrin Starlight:</span> 
                    <span>A name with harsh drow consonants paired with a hopeful surface surname, suggesting redemption.</span>
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

export default DrowHalfElfNameGenerator; 