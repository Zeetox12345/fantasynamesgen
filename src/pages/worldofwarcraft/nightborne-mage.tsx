import { useState, useEffect } from "react";
import { Wand2, Info } from "lucide-react";
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

const NightborneMageNameGenerator = () => {
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
        const data = await import('@/data/WorldofWarcraft/nightborne-mage.json');
        setNameData(data.default || data);
      } catch (error) {
        console.error("Error loading Nightborne Mage name data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.nightborneMageNames || !nameData.nightborneMageNames.length) {
      console.error("No Nightborne Mage name data available");
      return;
    }
    
    // Randomly select 10 names from the data
    const shuffled = [...nameData.nightborneMageNames].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setGeneratedNames(selected.map(entry => entry.name));
  };

  const handleNameClick = (name: string) => {
    if (!nameData || !nameData.nightborneMageNames) return;
    
    setSelectedName(name);
    
    // Find the description for the selected name
    const nameEntry = nameData.nightborneMageNames.find(entry => entry.name === name);
    if (nameEntry) {
      setNameDescription(nameEntry.description);
    } else {
      setNameDescription(null);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>Nightborne Mage Name Generator - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ authentic Nightborne Mage names for World of Warcraft. Perfect for roleplaying, character creation, and fan fiction. Create the perfect arcane-wielding Shal'dorei character with our free name generator!" />
        <meta name="keywords" content="World of Warcraft, WoW, Nightborne, Mage, Name Generator, Shal'dorei, Arcane, Nightwell, Suramar, Blizzard, Legion, Battle for Azeroth, Shadowlands, Dragonflight" />
      </Helmet>
      <div className="max-w-7xl mx-auto">
        {/* Header with back button */}
        <div className="mb-6 sm:mb-8">
          <Link 
            to="/worldofwarcraft" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4 sm:mb-6"
            onClick={() => window.scrollTo(0, 0)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            Back to World of Warcraft
          </Link>
          
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 rounded-lg bg-primary/10 text-primary">
              <Wand2 className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Nightborne Mage Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate mystical names for the arcane-wielding Nightborne mages of Suramar.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Nightborne Mage Names</CardTitle>
            <CardDescription>Create mystical names for the arcane-wielding Nightborne mages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate Nightborne Mage names"
              >
                {loading ? "Loading..." : "Generate Nightborne Mage Names"}
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What Makes a Good Nightborne Mage Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Nightborne Naming Traditions</a>
              </li>
              <li>
                <a href="#famous-nightborne" className="text-primary hover:underline">Famous Nightborne Mages</a>
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
              The Nightborne (or Shal'dorei) are an ancient elven race from the city of Suramar, who have evolved 
              over 10,000 years of isolation behind a magical barrier. Their close connection to the Nightwell, 
              a font of arcane power, has transformed them physically and made them naturally gifted in the 
              arcane arts.
            </p>
            <p className="mb-4">
              Nightborne mages are among the most skilled spellcasters in Azeroth, with a deep understanding of 
              arcane magic that has been refined over millennia. Their names often reflect their ancient heritage, 
              sophisticated culture, and connection to arcane energies.
            </p>
            <p>
              Whether you're creating a character for World of Warcraft, writing fan fiction, or developing a 
              character for a role-playing game, this generator provides authentic-sounding Nightborne mage names 
              that capture the essence of these elegant and powerful spellcasters.
            </p>
          </div>
          
          {/* Hero Image */}
          <GeneratorImage 
            src="/images/categories/worldofwarcraft/nightborne-mage/nightborne-mage-main.jpg" 
            alt="Nightborne Mage" 
            caption="Create mystical names for the arcane-wielding Nightborne mages of Suramar"
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Nightborne Mage Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A fitting Nightborne mage name should capture their ancient elven heritage and arcane affinity:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Elegant Sounds:</span> 
                <span>Nightborne names typically feature flowing, melodic sounds with many vowels and soft consonants.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Arcane References:</span> 
                <span>Names that subtly evoke magical concepts, celestial bodies, or arcane terminology fit their identity as mages.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ancient Elements:</span> 
                <span>Incorporating elements that suggest antiquity and timelessness reflects their 10,000-year history.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Elven Suffixes:</span> 
                <span>Endings like -thil, -diel, -wyn, -astra, and -thel are common in Nightborne naming conventions.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Sophisticated Tone:</span> 
                <span>Names that convey refinement and nobility match the Nightborne's cultured society.</span>
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
                <span>Click the "Generate Nightborne Mage Names" button to create a list of authentic Nightborne names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">2.</span> 
                <span>Click on any name to see more details about the character or magical style associated with that name.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">3.</span> 
                <span>Generate as many times as you like until you find the perfect name for your character.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">4.</span> 
                <span>Use the name for your World of Warcraft character, fan fiction, role-playing games, or creative projects.</span>
              </li>
            </ol>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Nightborne Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Nightborne naming conventions reflect their ancient heritage and sophisticated culture:
            </p>
            <ul className="space-y-4 mb-6">
              <li>
                <h3 className="text-lg font-semibold text-primary">Historical Significance</h3>
                <p>Nightborne names often carry historical significance, with family names passed down through generations of noble houses in Suramar. Many names reference ancient events, locations, or figures from before the city was sealed away.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Arcane Connections</h3>
                <p>As a society deeply connected to arcane magic, many Nightborne incorporate magical concepts into their naming traditions. Names may reference stars, magical phenomena, or arcane principles.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Linguistic Structure</h3>
                <p>Nightborne names typically follow elven linguistic patterns with melodic sounds and flowing syllables. They often feature combinations of soft consonants (l, th, s, v) and long vowels, creating an elegant, sophisticated sound.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Social Status</h3>
                <p>In Nightborne society, names can indicate social standing. Those from noble houses may have longer, more elaborate names with specific prefixes or suffixes denoting their lineage, while those of lower status might have simpler names.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* Famous Nightborne */}
        <section id="famous-nightborne" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Famous Nightborne Mages</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Several notable Nightborne mages have made their mark on Azeroth's history:
            </p>
            <ul className="space-y-4 mb-6">
              <li>
                <h3 className="text-lg font-semibold text-primary">First Arcanist Thalyssra</h3>
                <p>Once a high-ranking official in Suramar and now the leader of the Nightfallen rebellion, Thalyssra is a powerful arcanist who fought against Elisande's alliance with the Legion.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Grand Magistrix Elisande</h3>
                <p>The former ruler of Suramar who allied with the Burning Legion to protect her people, Elisande was a chronomancer with the ability to manipulate time itself.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Oculeth</h3>
                <p>A brilliant telemancer who created the teleportation network throughout Suramar, Oculeth joined the Nightfallen rebellion and provided crucial magical support.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Valtrois</h3>
                <p>An arcanist specializing in ley line manipulation, Valtrois joined the rebellion against Elisande and helped harness the city's magical resources.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Spellblade Aluriel</h3>
                <p>A powerful mage who served as one of Grand Magistrix Elisande's most trusted lieutenants, mastering frost, fire, and arcane magic.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Ly'leth Lunastre</h3>
                <p>A noblewoman and skilled arcanist who secretly aided the rebellion while maintaining her position in Elisande's court, using her political influence and magical talents.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Aluril Starweaver</h3>
                <p>A master of astromancy who studied the celestial bodies to enhance arcane spells, known for creating illusions of breathtaking cosmic beauty.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Victoire Duskmere</h3>
                <p>A shadow arcanist who specialized in void magic, pushing the boundaries of acceptable magic use in Nightborne society before the Legion's arrival.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Silgryn</h3>
                <p>Though not primarily a mage, this noble Nightborne possessed considerable arcane talent and used it to help the resistance against the Legion.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Theryn Voidwhisper</h3>
                <p>A controversial researcher of void energies who blended arcane and shadow magic, creating spells that could pierce through magical defenses.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Elindya Feathermoon</h3>
                <p>A specialist in illusion magic who created the most convincing arcane mirages in Suramar, capable of fooling even other skilled mages.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Vandros Nightfall</h3>
                <p>A powerful arcanist who specialized in manipulating the Nightwell's energy, creating artifacts that could store and release arcane power.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Shalasyr</h3>
                <p>A renowned teacher of arcane arts in Suramar who trained many of the city's elite mages, including several who would later serve in Elisande's court.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Morgane Devaux</h3>
                <p>A time manipulation specialist who worked alongside Elisande, helping to develop the temporal magic that protected Suramar from Legion threats.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Anarys Lunastre</h3>
                <p>A member of the noble Lunastre family and a gifted pyromancer who developed spells that could burn even through magical barriers.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Lespin Silverleaf</h3>
                <p>A master of frost magic who created beautiful ice sculptures throughout Suramar that doubled as arcane focus points for the city's defenses.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Cyrille Starwhisper</h3>
                <p>An arcanist who specialized in communication magic, developing spells that allowed instantaneous messaging across vast distances.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Allaris Narassin</h3>
                <p>A powerful conjurer who could create semi-permanent arcane constructs to serve as guardians and assistants throughout the city.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Thorel Moonwhisper</h3>
                <p>A specialist in arcane healing who developed spells that could mend wounds and cure ailments by manipulating the body's natural energies.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Ivrenne Moonblade</h3>
                <p>A battle mage who served in Suramar's defense forces, known for her ability to channel arcane energy into devastating offensive spells.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Sylthian Moonshadow</h3>
                <p>A specialist in portal magic who expanded on Oculeth's work, creating stable portals that could connect to previously unreachable locations.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Vanthir</h3>
                <p>The owner of the Waning Crescent tavern who possessed considerable magical talent, using it to hide rebels and create illusions to deceive Legion forces.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Esara Verrinde</h3>
                <p>A master of arcane enchantment who created many of the magical items used by Suramar's elite, imbuing objects with powerful and lasting spells.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Thaedris Feathersong</h3>
                <p>A specialist in weather manipulation magic who could control the environment within Suramar's dome, creating ideal conditions for the city's inhabitants.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Lyandra Sunstrider</h3>
                <p>A distant relative of the Sunstrider dynasty who chose to remain in Suramar, becoming one of the city's most powerful arcane researchers.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Cordressa Briarbloom</h3>
                <p>An arcanist who specialized in combining nature magic with arcane energy, creating spells that could accelerate plant growth and shape living wood.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Anarys Lunastre</h3>
                <p>A member of the noble Lunastre family and a gifted pyromancer who developed spells that could burn even through magical barriers.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Stellagosa</h3>
                <p>While not a Nightborne herself, this blue dragon worked closely with Nightborne mages to study ley line magic and shared knowledge between their cultures.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Victoire Duskwatcher</h3>
                <p>A specialist in scrying and divination who could see distant events and potential futures, serving as an advisor to Suramar's leadership.</p>
              </li>
              <li>
                <h3 className="text-lg font-semibold text-primary">Auriel Starsong</h3>
                <p>A master of sound-based arcane magic who could create powerful sonic illusions and manipulate emotions through magical harmonies.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* Latest Generators */}
        <section id="latest-generators" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Latest Generators</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Explore our other World of Warcraft name generators:
            </p>
            <ul className="space-y-2">
              <li>
                <a href="/worldofwarcraft/orc-warrior" className="text-primary hover:underline">Orc Warrior Name Generator</a> - Create powerful names for your Horde orc warriors
              </li>
              <li>
                <a href="/worldofwarcraft/orc-shaman" className="text-primary hover:underline">Orc Shaman Name Generator</a> - Generate spiritual names for orc shamans connected to the elements
              </li>
              <li>
                <a href="/worldofwarcraft/maghar-orc" className="text-primary hover:underline">Mag'har Orc Name Generator</a> - Create authentic names for the uncorrupted Mag'har orcs
              </li>
              <li>
                <a href="/worldofwarcraft/earthen-dwarf" className="text-primary hover:underline">Earthen Dwarf Name Generator</a> - Generate stony names for the titan-forged Earthen dwarves
              </li>
              <li>
                <a href="/fantasy/dwarf" className="text-primary hover:underline">Dwarf Name Generator</a> - Create names for fantasy dwarves from any world
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NightborneMageNameGenerator; 