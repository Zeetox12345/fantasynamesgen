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

const SorcererNameGenerator = () => {
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
        const data = await import('@/data/dnd/sorcerer.json');
        setNameData(data.default || data);
      } catch (error) {
        console.error("Error loading D&D sorcerer name data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.sorcererNames || !nameData.sorcererNames.length) {
      console.error("No D&D sorcerer name data available");
      return;
    }
    
    // Randomly select 10 names from the data
    const shuffled = [...nameData.sorcererNames].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setGeneratedNames(selected.map(entry => entry.name));
  };

  const handleNameClick = (name: string) => {
    if (!nameData || !nameData.sorcererNames) return;
    
    setSelectedName(name);
    
    // Find the description for the selected name
    const nameEntry = nameData.sorcererNames.find(entry => entry.name === name);
    if (nameEntry) {
      setNameDescription(nameEntry.description);
    } else {
      setNameDescription(null);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>DnD Sorcerer Name Generator - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ mystical and powerful names for sorcerer characters in Dungeons & Dragons. Create the perfect name for your next D&D campaign!" />
        <meta name="keywords" content="D&D, DnD, Dungeons and Dragons, sorcerer names, fantasy names, RPG character names, D&D 5e, magic users" />
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
            <h1 className="font-display text-3xl sm:text-4xl font-bold">DnD Sorcerer Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate mystical and powerful names for sorcerer characters in Dungeons & Dragons.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Sorcerer Names</CardTitle>
            <CardDescription>Create mystical and powerful names for sorcerer characters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate sorcerer names"
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What Makes a Good Sorcerer Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Sorcerer Naming Traditions</a>
              </li>
              <li>
                <a href="#popular-names" className="text-primary hover:underline">Popular Sorcerer Names</a>
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
              Sorcerers in Dungeons & Dragons are unique among spellcasters, drawing their arcane power not from 
              study or devotion, but from an innate magical connection. Whether their abilities stem from draconic 
              bloodlines, wild magic, divine souls, or other mystical origins, sorcerers embody raw magical potential.
            </p>
            <p className="mb-4">
              The names of these natural spellcasters often reflect their unusual heritage or the primal nature of 
              their magic. Sorcerer names frequently incorporate elements that evoke power, mystery, and the 
              otherworldly sources of their abilities.
            </p>
            <p>
              Whether you're creating a character for your next D&D campaign, developing an NPC with innate magical 
              talents, or writing fantasy fiction featuring natural spellcasters, this generator provides mystical 
              and powerful names that capture the essence of sorcerous magic.
            </p>
          </div>
          
          {/* Hero Image */}
          <GeneratorImage 
            src="/images/categories/dungeonsanddragons/sorcerer/sorcerer-main.jpg" 
            alt="Sorcerer Names" 
            caption="Create mystical and powerful names for sorcerer characters in Dungeons & Dragons"
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Sorcerer Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A compelling sorcerer name should reflect the character's innate magical nature and unique heritage:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Magical Resonance:</span> 
                <span>The best sorcerer names often have a melodic or rhythmic quality that suggests the flow of magical energies.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Heritage References:</span> 
                <span>Names that subtly hint at the sorcerer's unusual ancestry—whether draconic, celestial, or otherworldly—add depth to the character.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Elemental Qualities:</span> 
                <span>References to primal elements or natural forces can reflect the raw, untamed nature of sorcerous magic.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Mystical Sounds:</span> 
                <span>Names with unusual phonetics or exotic syllable combinations can evoke the otherworldly nature of innate magic.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Cultural Blending:</span> 
                <span>Sorcerers often exist at the intersection of different worlds or bloodlines, and names that blend multiple cultural influences can reflect this.</span>
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
                <span>Click the "Generate Names" button to create a list of sorcerer names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">2.</span> 
                <span>Click on any name to see more details about its meaning, origin, or magical associations.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">3.</span> 
                <span>Generate as many times as you like until you find the perfect name for your character.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">4.</span> 
                <span>Consider how your chosen name might reflect your sorcerer's specific magical origin, such as draconic ancestry, wild magic, or divine soul.</span>
              </li>
            </ol>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Sorcerer Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Sorcerers have diverse naming traditions that often reflect their unusual origins and innate magical nature:
            </p>
            <ul className="space-y-4 mb-6">
              <li>
                <h3 className="font-semibold text-primary text-lg">Ancestral Echoes</h3>
                <p>Many sorcerers with draconic bloodlines incorporate draconic language elements or references to their draconic ancestor in their names, such as "Kavaryx" or "Essemere Goldscale."</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Manifestation Names</h3>
                <p>Some sorcerers are named after unusual events or phenomena that occurred at their birth, particularly those with wild magic origins, leading to names like "Stormborn" or "Frostwhisper."</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Celestial or Infernal Influences</h3>
                <p>Sorcerers with divine soul or fiendish origins might have names with celestial or infernal linguistic elements, often featuring unusual combinations of vowels and consonants that evoke their otherworldly heritage.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Elemental Associations</h3>
                <p>Names that reference primal elements or natural forces are common among sorcerers, particularly those whose magic manifests in elemental forms, such as "Emberfell" or "Tidecaller."</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Transformation Names</h3>
                <p>Some sorcerers adopt new names when their powers manifest, symbolizing their transformation from ordinary person to magical being, often choosing names that reflect their new identity and abilities.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* Popular Names */}
        <section id="popular-names" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Popular DnD Sorcerer Names</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Here are 30 popular sorcerer names from D&D lore and fantasy worlds, each with unique characteristics and magical origins:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Zephyros Stormblood:</span> 
                    <span>A storm sorcerer whose name evokes the west wind, known for controlling lightning and thunder.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Ignatia Emberborn:</span> 
                    <span>A draconic bloodline sorcerer with red dragon ancestry, known for devastating fire magic.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Thaddeus Shadowheart:</span> 
                    <span>A shadow magic sorcerer whose power stems from the Shadowfell, master of darkness and fear.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Lysandra Wildmagic:</span> 
                    <span>A wild magic sorcerer whose spells produce unpredictable and often spectacular effects.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Caelius Frostblood:</span> 
                    <span>A draconic bloodline sorcerer with white dragon ancestry, specializing in ice and cold magic.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Seraphina Celestialis:</span> 
                    <span>A divine soul sorcerer with celestial heritage, channeling radiant healing and protective magic.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Malakai Voidcaller:</span> 
                    <span>An aberrant mind sorcerer whose powers come from contact with entities beyond the stars.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Elara Tidespeaker:</span> 
                    <span>A sea sorcery practitioner whose magic controls water and communicates with ocean creatures.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Dorian Chaosweaver:</span> 
                    <span>A wild magic sorcerer who embraces the unpredictable nature of his spells for creative solutions.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Lilith Infernalis:</span> 
                    <span>A divine soul sorcerer with fiendish heritage, wielding hellfire and necrotic energies.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Valerian Stoneblood:</span> 
                    <span>A draconic bloodline sorcerer with earth dragon ancestry, commanding stone and metal.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Nyx Umbrashadow:</span> 
                    <span>A shadow magic sorcerer who can step between shadows and manipulate darkness as a weapon.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Orion Starshaper:</span> 
                    <span>A cosmic sorcerer whose magic draws power from constellations and celestial alignments.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Sylvia Stormchaser:</span> 
                    <span>A storm sorcerer who can predict and control weather patterns, summoning targeted lightning.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Kaius Blackscale:</span> 
                    <span>A draconic bloodline sorcerer with black dragon ancestry, specializing in acid and corruption.</span>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Elysia Feymind:</span> 
                    <span>A wild magic sorcerer with fey ancestry, whose spells incorporate unpredictable natural elements.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Thorne Abysswalker:</span> 
                    <span>An aberrant mind sorcerer who gained powers after surviving contact with the Far Realm.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Aurelia Dawnsoul:</span> 
                    <span>A divine soul sorcerer descended from a solar, specializing in light and healing magic.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Cyrus Tempestborn:</span> 
                    <span>A storm sorcerer conceived during a magical hurricane, with innate control over wind and rain.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Morgana Soulweaver:</span> 
                    <span>A shadow magic sorcerer who can temporarily capture and manipulate fragments of souls.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Darius Copperblood:</span> 
                    <span>A draconic bloodline sorcerer with copper dragon ancestry, specializing in transmutation.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Isolde Frostwhisper:</span> 
                    <span>A sea sorcery practitioner who specializes in ice magic and freezing water into complex forms.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Lucian Voidtouched:</span> 
                    <span>An aberrant mind sorcerer with telepathic abilities and power over the minds of others.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Selene Moonshadow:</span> 
                    <span>A wild magic sorcerer whose powers wax and wane with the lunar cycle, strongest at full moon.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Azrael Flameheart:</span> 
                    <span>A divine soul sorcerer with fallen angel heritage, balancing holy fire with dark energies.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Vivienne Stormsinger:</span> 
                    <span>A storm sorcerer who can "sing" to storms, directing their power with musical incantations.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Gareth Bronzeblood:</span> 
                    <span>A draconic bloodline sorcerer with bronze dragon ancestry, commanding lightning and the sea.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Ophelia Nightveil:</span> 
                    <span>A shadow magic sorcerer who can weave shadows into illusions and temporary constructs.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Talon Starspeaker:</span> 
                    <span>An aberrant mind sorcerer who receives visions from distant stars and unknown entities.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Rhiannon Chaosborn:</span> 
                    <span>A wild magic sorcerer born during a magical catastrophe, with particularly volatile spellcasting.</span>
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
                <CardTitle className="text-lg">Gladiator Name Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Create powerful and memorable names for gladiator characters</p>
                <Link to="/dungeonsanddragons/gladiator" onClick={() => window.scrollTo(0, 0)}>
                  <Button variant="outline" size="sm" className="w-full">Explore</Button>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Group Name Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Generate unique and catchy names for adventuring parties and groups</p>
                <Link to="/dungeonsanddragons/group" onClick={() => window.scrollTo(0, 0)}>
                  <Button variant="outline" size="sm" className="w-full">Explore</Button>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Dwarf Clan Name Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Generate traditional and robust names for dwarf clans and families</p>
                <Link to="/dungeonsanddragons/dwarf-clan" onClick={() => window.scrollTo(0, 0)}>
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

export default SorcererNameGenerator; 