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

const FemaleGenieNameGenerator = () => {
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
        const data = await import('@/data/dnd/female-genie.json');
        setNameData(data.default || data);
      } catch (error) {
        console.error("Error loading D&D female genie name data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.femaleGenieNames || !nameData.femaleGenieNames.length) {
      console.error("No D&D female genie name data available");
      return;
    }
    
    // Randomly select 10 names from the data
    const shuffled = [...nameData.femaleGenieNames].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setGeneratedNames(selected.map(entry => entry.name));
  };

  const handleNameClick = (name: string) => {
    if (!nameData || !nameData.femaleGenieNames) return;
    
    setSelectedName(name);
    
    // Find the description for the selected name
    const nameEntry = nameData.femaleGenieNames.find(entry => entry.name === name);
    if (nameEntry) {
      setNameDescription(nameEntry.description);
    } else {
      setNameDescription(null);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>D&D Female Genie Name Generator - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ exotic and magical names for female genie characters in Dungeons & Dragons. Create the perfect name for your next D&D campaign!" />
        <meta name="keywords" content="D&D, DnD, Dungeons and Dragons, genie names, female genie, fantasy names, RPG character names, D&D 5e, djinn" />
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
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Female Genie Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate exotic and magical names for female genie characters in Dungeons & Dragons.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Female Genie Names</CardTitle>
            <CardDescription>Create exotic and magical names for female genie characters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate female genie names"
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What Makes a Good Female Genie Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Genie Naming Traditions</a>
              </li>
              <li>
                <a href="#popular-names" className="text-primary hover:underline">Popular Female Genie Names</a>
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
              Genies in Dungeons & Dragons are powerful elemental beings from the Inner Planes, embodying the 
              primal forces of air (djinn), earth (dao), fire (efreet), and water (marid). These majestic and 
              mysterious creatures have fascinated adventurers and storytellers alike with their magical abilities 
              and complex societies.
            </p>
            <p className="mb-4">
              Female genies, like their male counterparts, possess names that reflect their elemental nature and 
              ancient heritage. Their names often incorporate flowing, exotic sounds and mystical elements that 
              evoke their otherworldly origins and magical essence.
            </p>
            <p>
              Whether you're creating a genie NPC for your campaign, developing a character with genie ancestry, 
              or crafting a story involving the elemental planes, this generator provides exotic and magical names 
              that capture the essence of female genies in all their elemental glory.
            </p>
          </div>
          
          {/* Hero Image */}
          <GeneratorImage 
            src="/images/categories/dungeonsanddragons/female-genie/female-genie-main.jpg" 
            alt="Female Genie Names" 
            caption="Create exotic and magical names for female genie characters in Dungeons & Dragons"
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Female Genie Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A compelling female genie name should evoke her elemental nature and magical essence:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Elemental Resonance:</span> 
                <span>The best genie names often incorporate subtle references to their elemental type—flowing sounds for marids, airy syllables for djinn, etc.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Exotic Phonetics:</span> 
                <span>Names with unusual combinations of sounds and syllables help convey the otherworldly nature of genies and their distant planes of origin.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Magical Qualities:</span> 
                <span>References to magical phenomena, celestial bodies, or mystical concepts can reflect the innate magical nature of genies.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Cultural Inspiration:</span> 
                <span>Drawing inspiration from Middle Eastern, Persian, or Arabian naming traditions can add authenticity, as genies (djinn) have roots in these mythologies.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Regal Quality:</span> 
                <span>Names that convey nobility and power are appropriate for genies, who often hold positions of authority in their elemental societies.</span>
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
                <span>Click the "Generate Names" button to create a list of female genie names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">2.</span> 
                <span>Click on any name to see more details about its meaning, elemental associations, or magical significance.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">3.</span> 
                <span>Generate as many times as you like until you find the perfect name for your character or NPC.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">4.</span> 
                <span>Consider which elemental type your genie belongs to (djinn, dao, efreet, or marid) and choose a name that reflects that elemental nature.</span>
              </li>
            </ol>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Genie Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Genies have diverse naming traditions that often reflect their elemental nature and ancient cultures:
            </p>
            <ul className="space-y-4 mb-6">
              <li>
                <h3 className="font-semibold text-primary text-lg">Elemental Affinity</h3>
                <p>Each type of genie tends to favor names that reflect their elemental nature. Djinn (air) often have names with flowing, breathy sounds; Efreet (fire) prefer names with sharp, crackling syllables; Dao (earth) choose names with solid, resonant tones; and Marids (water) select names with fluid, rippling qualities.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Titles and Honorifics</h3>
                <p>Noble genies often incorporate titles into their names, such as "Sultana," "Amira" (princess), or "Malika" (queen), reflecting their status in the hierarchical societies of the elemental planes.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Ancestral References</h3>
                <p>Many genies include references to their lineage or ancestral courts in their names, particularly those from prestigious bloodlines or noble houses within genie society.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Magical Epithets</h3>
                <p>Genies often adopt or are given epithets that describe their magical specialties or notable abilities, such as "Stormcaller," "Flameheart," or "Crystalweaver."</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Age Reflection</h3>
                <p>As immortal beings, older and more powerful genies sometimes incorporate ancient words or references to historical events in their names, subtly indicating their vast age and experience to those knowledgeable enough to recognize the references.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* Popular Names */}
        <section id="popular-names" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Popular Female Genie Names</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Here are 30 popular female genie names from D&D lore and fantasy worlds, each with unique elemental associations and magical qualities:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Zahra al-Nari:</span> 
                    <span>A powerful efreeti name meaning "flower of fire," associated with commanding flames and volcanic magic.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Maysun Zephyra:</span> 
                    <span>A djinni name combining "beautiful water" with "west wind," known for gentle healing breezes.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Nasira Obsidian:</span> 
                    <span>A dao name meaning "victorious," associated with precious gems and earth manipulation.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Jala Marid:</span> 
                    <span>A marid name meaning "water" or "dew," known for commanding tidal waves and ocean currents.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Farah Emberheart:</span> 
                    <span>An efreeti name meaning "joy," associated with passionate magic and fiery determination.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Samara Windwhisper:</span> 
                    <span>A djinni name meaning "night conversation," known for secrets carried on the breeze.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Kalila Stoneheart:</span> 
                    <span>A dao name meaning "beloved," associated with mountain magic and earthquake powers.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Naia Tidesinger:</span> 
                    <span>A marid name meaning "water nymph," known for enchanting songs that control water currents.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Layla Flamedancer:</span> 
                    <span>An efreeti name meaning "night," associated with mesmerizing fire performances and illusions.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Zephyrine Skysoar:</span> 
                    <span>A djinni name derived from "zephyr," known for commanding powerful storm winds.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Jamila Crystalvein:</span> 
                    <span>A dao name meaning "beautiful," associated with precious mineral creation and manipulation.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Nerissa Wavecaller:</span> 
                    <span>A marid name meaning "sea nymph," known for summoning sea creatures and controlling currents.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Aziza Emberfall:</span> 
                    <span>An efreeti name meaning "precious," associated with volcanic eruptions and ash manipulation.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Safa Breezesong:</span> 
                    <span>A djinni name meaning "purity," known for cleansing winds and healing air magic.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Yasmin Geodecrafter:</span> 
                    <span>A dao name meaning "jasmine flower," associated with creating hollow crystal chambers.</span>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Marjana Tidecaller:</span> 
                    <span>A marid name meaning "coral," known for commanding sea life and coral reef creation.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Nura Blazeborn:</span> 
                    <span>An efreeti name meaning "light," associated with blinding flames and fire divination.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Hala Stormrider:</span> 
                    <span>A djinni name meaning "halo around the moon," known for riding whirlwinds into battle.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Zaida Earthshaker:</span> 
                    <span>A dao name meaning "fortunate," associated with creating chasms and controlling tremors.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Mina Depthspeaker:</span> 
                    <span>A marid name meaning "harbor," associated with deep ocean communication and pressure control.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Rashida Infernoblade:</span> 
                    <span>An efreeti name meaning "righteous," associated with creating weapons of living flame.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Nasreen Cycloneweaver:</span> 
                    <span>A djinni name meaning "wild rose," known for creating protective wind barriers.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Farida Gemheart:</span> 
                    <span>A dao name meaning "unique," associated with creating one-of-a-kind precious stones.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Kamilah Frostwave:</span> 
                    <span>A marid name meaning "perfect," associated with ice magic and freezing water manipulation.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Soraya Phoenixflame:</span> 
                    <span>An efreeti name meaning "princess," associated with rebirth magic and eternal flames.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Amara Skyweaver:</span> 
                    <span>A djinni name meaning "eternal," known for creating lasting illusions in the clouds.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Dalila Stoneshaper:</span> 
                    <span>A dao name meaning "gentle," associated with precise earth manipulation and sculpture.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Saida Abysscaller:</span> 
                    <span>A marid name meaning "fortunate," known for communicating with deepest ocean creatures.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Zahara Ashwalker:</span> 
                    <span>An efreeti name meaning "flower," associated with walking unharmed through volcanic regions.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Taraneh Whisperwind:</span> 
                    <span>A djinni name meaning "melody," known for creating music that carries messages across realms.</span>
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
                <CardTitle className="text-lg">Sorcerer Name Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Create mystical and powerful names for sorcerer characters</p>
                <Link to="/dungeonsanddragons/sorcerer" onClick={() => window.scrollTo(0, 0)}>
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
          </div>
        </section>
      </div>
    </div>
  );
};

export default FemaleGenieNameGenerator; 