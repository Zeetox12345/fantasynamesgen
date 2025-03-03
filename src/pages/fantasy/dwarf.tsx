import { useState, useEffect } from "react";
import { Pickaxe, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Helmet } from "react-helmet";
import { loadNameData } from "@/lib/nameUtils";
import { GeneratorImage } from "@/components/GeneratorImage";

interface DwarfNameData {
  dwarfNames: Array<{
    name: string;
    description: string;
  }>;
}

const DwarfNameGenerator = () => {
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [nameData, setNameData] = useState<DwarfNameData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [nameDescription, setNameDescription] = useState<string | null>(null);

  // Load name data when component mounts
  useEffect(() => {
    async function fetchNameData() {
      setLoading(true);
      const data = await loadNameData("fantasy", "dwarf");
      setNameData(data as DwarfNameData);
      setLoading(false);
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.dwarfNames) return;
    
    // Get 10 random names from the dwarfNames array
    const shuffled = [...nameData.dwarfNames].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setGeneratedNames(selected.map(item => item.name));
  };

  const handleNameClick = (name: string) => {
    if (!nameData || !nameData.dwarfNames) return;
    
    setSelectedName(name);
    
    // Find description for the name
    const nameEntry = nameData.dwarfNames.find(e => e.name === name);
    
    if (nameEntry) {
      setNameDescription(nameEntry.description);
    } else {
      setNameDescription(null);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>Dwarf Name Generator | 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ authentic-sounding dwarf names for your fantasy characters, D&D campaigns, stories, and games. Find the perfect sturdy, noble dwarf name with our free generator." />
        <meta name="keywords" content="dwarf names, fantasy names, name generator, dwarven names, fantasy characters, D&D dwarf names, 10000 dwarf names" />
      </Helmet>
      <div className="max-w-7xl mx-auto">
        {/* Header with back button */}
        <div className="mb-6 sm:mb-8">
          <Link 
            to="/fantasy" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4 sm:mb-6"
            onClick={() => window.scrollTo(0, 0)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            Back to Fantasy
          </Link>
          
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 rounded-lg bg-primary/10 text-primary">
              <Pickaxe className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Dwarf Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate authentic-sounding dwarf names for your fantasy characters, stories, and games.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Dwarf Names</CardTitle>
            <CardDescription>Create names for stout, sturdy folk of the mountains and deep halls</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate dwarf names"
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What Makes a Good Dwarf Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Dwarven Naming Traditions</a>
              </li>
              <li>
                <a href="#famous-dwarves" className="text-primary hover:underline">Famous Dwarf Names</a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Introduction */}
        <section id="introduction" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Introduction</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Dwarves are a staple of fantasy literature, games, and media. These stout, sturdy folk are typically depicted as 
              skilled miners, craftsmen, and warriors with a deep connection to mountains and underground realms. Their culture 
              is often characterized by strong traditions, clan loyalty, and exceptional craftsmanship—particularly in metalwork, 
              stonework, and jewelry.
            </p>
            <p className="mb-4">
              A good dwarf name should reflect these cultural elements, conveying a sense of strength, tradition, and connection 
              to stone and earth. Dwarf names often have a distinctive sound—harsh consonants, short vowels, and a rhythmic quality 
              that suggests the hammering of forge work or the echoing of deep mountain halls.
            </p>
            <p>
              This generator creates authentic-sounding dwarf names suitable for a variety of fantasy settings, from traditional 
              high fantasy worlds to more unique interpretations of dwarven culture. Whether you need a name for a character in a 
              role-playing game, a story you're writing, or any other creative project, our generator will provide names that feel 
              genuinely dwarven in nature.
            </p>
          </div>
          
          {/* Featured Image */}
          <GeneratorImage 
            src="/images/categories/fantasy/dwarf-ranger/dwarf-main.jpg"
            alt="Dwarf Warrior"
            caption="A stout dwarf warrior stands proudly in his mountain hall, adorned with intricate armor and wielding a mighty war hammer."
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Dwarf Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Effective dwarf names typically share certain qualities that evoke the essence of dwarven culture:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Strong Consonants:</span> 
                <span>Names with hard sounds like 'k', 'g', 'th', and 'r' convey the toughness associated with dwarven kind.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Compact Structure:</span> 
                <span>Shorter names with one or two syllables reflect the practical, no-nonsense nature of dwarves.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Earth-Related Elements:</span> 
                <span>References to stone, metal, mountains, or mining in names connect to dwarven affinity for the underground.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Nordic or Germanic Feel:</span> 
                <span>Many fantasy dwarves draw inspiration from Norse mythology, so names with this influence feel authentic.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Clan or Family Focus:</span> 
                <span>Names that indicate lineage or clan membership reflect the strong family ties in dwarven society.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* How to Use */}
        <section id="how-to-use" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">How to Use the Generator</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">Using our Dwarf Name Generator is straightforward:</p>
            <ol className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">1.</span> 
                <span>Click the "Generate Names" button to create a list of 10 unique dwarf names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">2.</span> 
                <span>Click on any name to see its meaning and background information.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">3.</span> 
                <span>Generate new sets of names as many times as you like until you find the perfect one.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">4.</span> 
                <span>Use the generated names for characters in stories, role-playing games, or other creative projects.</span>
              </li>
            </ol>
            <p>
              Each generated name comes with a description that provides insight into its meaning or origin, helping you develop 
              your character's background and personality further.
            </p>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Dwarven Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Across various fantasy settings, dwarven naming traditions often share common elements:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Clan Names:</span> 
                <span>Many dwarves use their clan name as a surname, such as "Ironforge," "Stonehammer," or "Goldbeard."</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Patronymics:</span> 
                <span>Some dwarves use their father's name as a surname, often with a suffix like "-son" or "-dottir."</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Craft-Based Names:</span> 
                <span>Names that reference a dwarf's profession or craft, like "Anvilhand" or "Brewmaster."</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Deed Names:</span> 
                <span>Honorifics earned through notable achievements, such as "Trollslayer" or "Dragonbane."</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Secret Names:</span> 
                <span>In some settings, dwarves have a true name known only to close family, used in private or sacred contexts.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Famous Dwarves */}
        <section id="famous-dwarves" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Famous Dwarf Names</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Looking at well-known dwarves from fantasy literature and media can provide inspiration:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 mb-6">
              <div>
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Gimli:</span> 
                    <span>Son of Glóin, a member of the Fellowship of the Ring in J.R.R. Tolkien's "The Lord of the Rings."</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Thorin Oakenshield:</span> 
                    <span>Leader of the company of dwarves in "The Hobbit," seeking to reclaim the Lonely Mountain.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Balin:</span> 
                    <span>A respected dwarf lord who attempted to reclaim the ancient dwarf kingdom of Moria.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Dáin Ironfoot:</span> 
                    <span>King under the Mountain after the Battle of Five Armies in "The Hobbit."</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Durin:</span> 
                    <span>The first of the Seven Fathers of the Dwarves in Tolkien's mythology.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Fíli:</span> 
                    <span>Nephew of Thorin Oakenshield who joined the quest to reclaim Erebor.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Kíli:</span> 
                    <span>Brother of Fíli and nephew of Thorin Oakenshield in "The Hobbit."</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Bombur:</span> 
                    <span>The rotund dwarf known for his appetite in Thorin's company.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Glóin:</span> 
                    <span>Father of Gimli and one of the dwarves who accompanied Thorin Oakenshield.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Bifur:</span> 
                    <span>A dwarf with an axe embedded in his forehead from Thorin's company.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Bofur:</span> 
                    <span>A friendly, hat-wearing dwarf from Thorin's company in "The Hobbit."</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Dori:</span> 
                    <span>The strongest dwarf in Thorin's company and older brother to Nori and Ori.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Nori:</span> 
                    <span>A dwarf with a distinctive star-shaped hairstyle in Thorin's company.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Ori:</span> 
                    <span>The youngest dwarf in Thorin's company, known for his writing skills.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Óin:</span> 
                    <span>Brother of Glóin and a skilled healer among the dwarves.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Thrór:</span> 
                    <span>King under the Mountain before Smaug's attack and grandfather of Thorin.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Thráin:</span> 
                    <span>Son of Thrór and father of Thorin Oakenshield.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Dís:</span> 
                    <span>Sister of Thorin Oakenshield and mother of Fíli and Kíli.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Dwalin:</span> 
                    <span>A fierce warrior and loyal companion to Thorin Oakenshield.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Fundin:</span> 
                    <span>Father of Balin and Dwalin in Tolkien's Middle-earth.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Náin:</span> 
                    <span>A dwarf lord who fought in the Battle of Azanulbizar.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Azaghâl:</span> 
                    <span>A dwarf lord of Belegost who wounded Glaurung the dragon.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Telchar:</span> 
                    <span>A legendary dwarf-smith of Nogrod who forged famous weapons.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Mîm:</span> 
                    <span>One of the last of the Petty-dwarves in Tolkien's "The Silmarillion."</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Bruenor Battlehammer:</span> 
                    <span>King of Mithral Hall in R.A. Salvatore's Forgotten Realms novels.</span>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Flint Fireforge:</span> 
                    <span>A gruff dwarf hero from the Dragonlance series.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Muradin Bronzebeard:</span> 
                    <span>A notable dwarf from the Warcraft universe, brother to King Magni.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Magni Bronzebeard:</span> 
                    <span>Former king of Ironforge in the Warcraft universe.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Brann Bronzebeard:</span> 
                    <span>Famous explorer and archaeologist in the Warcraft universe.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Moira Thaurissan:</span> 
                    <span>Daughter of Magni and queen regent of the Dark Iron clan in Warcraft.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Varric Tethras:</span> 
                    <span>A dwarf rogue and storyteller from the Dragon Age video game series.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Oghren:</span> 
                    <span>A boisterous warrior dwarf from the Dragon Age series.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Harrowmont:</span> 
                    <span>A noble dwarf and potential king of Orzammar in Dragon Age.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Bhelen Aeducan:</span> 
                    <span>A cunning dwarf prince in Dragon Age: Origins.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Cheery Littlebottom:</span> 
                    <span>A female dwarf from Terry Pratchett's Discworld series.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Carrot Ironfoundersson:</span> 
                    <span>A human raised by dwarves in Terry Pratchett's Discworld.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Durkon Thundershield:</span> 
                    <span>A dwarven cleric from the webcomic "Order of the Stick."</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Grombrindal:</span> 
                    <span>The White Dwarf, a legendary figure in Warhammer Fantasy.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Gotrek Gurnisson:</span> 
                    <span>A famous Slayer from the Warhammer Fantasy universe.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Ungrim Ironfist:</span> 
                    <span>The Slayer King of Karak Kadrin in Warhammer Fantasy.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Thorgrim Grudgebearer:</span> 
                    <span>High King of the Dwarfs in Warhammer Fantasy.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Belegar Ironhammer:</span> 
                    <span>The King in Exile of Karak Eight Peaks in Warhammer Fantasy.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Kazador Thunderhorn:</span> 
                    <span>King of Karak Azul in the Warhammer universe.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Alrik Ranulfsson:</span> 
                    <span>A legendary Slayer in Warhammer Fantasy lore.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Josef Bugman:</span> 
                    <span>A master brewer and ranger in Warhammer Fantasy.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Kragg the Grim:</span> 
                    <span>A dwarf hero from various fantasy settings.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Urist McRanger:</span> 
                    <span>A common dwarf name format in the game Dwarf Fortress.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Bardin Goreksson:</span> 
                    <span>A dwarf ranger from Warhammer: Vermintide.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Rogar Stonecleaver:</span> 
                    <span>A dwarf warrior from various fantasy role-playing games.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[180px]">Tordek:</span> 
                    <span>An iconic dwarf fighter from Dungeons & Dragons.</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <p>
              These characters demonstrate the range of dwarf names across fantasy settings while maintaining the distinctive 
              qualities that make them recognizably dwarven. From Tolkien's foundational works to modern video games and tabletop RPGs,
              dwarf naming conventions have evolved while preserving their unique cultural identity.
            </p>
          </div>
        </section>

        {/* Latest Generators */}
        <section id="latest-generators" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Other Fantasy Name Generators</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Looking for more fantasy name generators? Check out these other options:
            </p>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/fantasy/dwarf-ranger" 
                  className="text-primary hover:underline"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Dwarf Ranger Name Generator
                </Link> - Create names for dwarven rangers who patrol the mountains and deep valleys
              </li>
              <li>
                <Link 
                  to="/fantasy/elven-ranger" 
                  className="text-primary hover:underline"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Elven Ranger Name Generator
                </Link> - Generate names for graceful elven scouts and forest guardians
              </li>
              <li>
                <Link 
                  to="/fantasy/dark-ranger" 
                  className="text-primary hover:underline"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Dark Ranger Name Generator
                </Link> - Craft names for mysterious rangers who walk in shadow
              </li>
              <li>
                <Link 
                  to="/lovecraftian" 
                  className="text-primary hover:underline"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Lovecraftian Name Generators
                </Link> - Create cosmic horror names for entities, cults, and cursed towns
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DwarfNameGenerator; 