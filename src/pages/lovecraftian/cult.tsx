import { useState, useEffect } from "react";
import { Skull, Info } from "lucide-react";
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
import { loadNameData } from "@/lib/nameUtils";
import { GeneratorImage } from "@/components/GeneratorImage";

interface LovecraftianCultData {
  lovecraftiancultNames: Array<{
    name: string;
    description: string;
  }>;
}

const LovecraftianCultNameGenerator = () => {
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [nameData, setNameData] = useState<LovecraftianCultData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [nameDescription, setNameDescription] = useState<string | null>(null);

  // Load name data when component mounts
  useEffect(() => {
    async function fetchNameData() {
      setLoading(true);
      const data = await loadNameData("lovecraftian", "cult");
      setNameData(data as LovecraftianCultData);
      setLoading(false);
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.lovecraftiancultNames) return;
    
    // Get 10 random names from the lovecraftiancultNames array
    const shuffled = [...nameData.lovecraftiancultNames].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setGeneratedNames(selected.map(item => item.name));
  };

  const handleNameClick = (name: string) => {
    if (!nameData || !nameData.lovecraftiancultNames) return;
    
    setSelectedName(name);
    
    // Find description for the name
    const nameEntry = nameData.lovecraftiancultNames.find(e => e.name === name);
    
    if (nameEntry) {
      setNameDescription(nameEntry.description);
    } else {
      setNameDescription(null);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>Lovecraftian Cult Name Generator | 10,000+ Secret Society Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ names for sinister cults and secret societies inspired by H.P. Lovecraft's cosmic horror universe. Perfect for creating antagonist groups for horror stories, games, and Call of Cthulhu campaigns." />
        <meta name="keywords" content="lovecraftian cult names, secret societies, cosmic horror, cthulhu mythos, name generator, horror antagonists, 10000 cult names" />
      </Helmet>
      <div className="max-w-7xl mx-auto">
        {/* Header with back button */}
        <div className="mb-6 sm:mb-8">
          <Link 
            to="/lovecraftian" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4 sm:mb-6"
            onClick={() => window.scrollTo(0, 0)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            Back to Lovecraftian
          </Link>
          
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 rounded-lg bg-primary/10 text-primary">
              <Skull className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Lovecraftian Cult Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate names for mysterious cults and secret societies inspired by H.P. Lovecraft's cosmic horror universe.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Lovecraftian Cult Names</CardTitle>
            <CardDescription>Create names for secret societies devoted to cosmic entities and forbidden knowledge</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate Lovecraftian cult names"
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What Makes a Good Lovecraftian Cult Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Lovecraftian Cult Naming Traditions</a>
              </li>
              <li>
                <a href="#famous-cults" className="text-primary hover:underline">Famous Lovecraftian Cults</a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Introduction */}
        <section id="introduction" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Introduction</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              In the shadowy world of cosmic horror, cults serve as human intermediaries between our reality and the incomprehensible entities
              that exist beyond the veil of normal perception. These secretive groups dedicate themselves to ancient, forbidden knowledge and
              the worship of cosmic beings whose very existence defies human understanding.
            </p>
            <p className="mb-4">
              H.P. Lovecraft and subsequent authors in the genre created numerous cults with names that evoke mystery, dread, and ancient
              origins. From the infamous Esoteric Order of Dagon to the mysterious Cult of Cthulhu, these organizations operate in the
              shadows, conducting rituals and working toward goals that would horrify ordinary people.
            </p>
            <p>
              This generator creates names suitable for cults and secret societies in Lovecraftian settings, perfect for use in fiction,
              role-playing games, or other creative projects set in worlds where cosmic horror lurks beneath the surface of everyday reality.
            </p>
          </div>
          
          {/* Featured Image */}
          <GeneratorImage 
            src="/images/categories/lovecraftian/lovecraftian-cult/lovecraftian-cult-main.jpg"
            alt="Lovecraftian Cult"
            caption="Robed figures gather in a hidden chamber, performing arcane rituals by candlelight to summon forces from beyond the stars."
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Lovecraftian Cult Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Effective Lovecraftian cult names typically share certain qualities that evoke the cosmic horror genre:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Formal Structure:</span> 
                <span>Names that use formal organizational terms like "Order," "Brotherhood," "Society," or "Church" to suggest legitimacy.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Arcane Terminology:</span> 
                <span>Incorporation of obscure or archaic words that suggest hidden knowledge or ancient origins.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Deity References:</span> 
                <span>Names that directly reference the cosmic entity or force the cult worships or serves.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Symbolic Elements:</span> 
                <span>References to cosmic symbols, celestial bodies, or abstract concepts like "void," "beyond," or "eternal."</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Unsettling Combinations:</span> 
                <span>Juxtaposition of seemingly unrelated terms that create a sense of wrongness or dissonance.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* How to Use */}
        <section id="how-to-use" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">How to Use the Generator</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">Using our Lovecraftian Cult Name Generator is straightforward:</p>
            <ol className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">1.</span> 
                <span>Click the "Generate Names" button to create a list of 10 unique Lovecraftian cult names.</span>
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
                <span>Use the generated names for antagonist organizations in stories, role-playing games, or other creative projects.</span>
              </li>
            </ol>
            <p>
              Each generated name comes with a description that provides insight into the cult's possible practices, beliefs, or the
              cosmic entity they serve, helping you develop your narrative further.
            </p>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Lovecraftian Cult Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Lovecraft established several patterns in naming the cults and secret societies in his stories:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Formal Titles:</span> 
                <span>Using organizational structures like "Order," "Church," or "Brotherhood" to suggest an established hierarchy.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Esoteric Adjectives:</span> 
                <span>Modifiers like "Esoteric," "Hidden," "Inner," or "Ancient" to emphasize secrecy and exclusive knowledge.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Entity Worship:</span> 
                <span>Direct references to the cosmic entity being worshipped, often with titles like "Those Who Serve" or "Followers of."</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Symbolic Objects:</span> 
                <span>References to significant symbols or artifacts associated with the cult's practices or beliefs.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Geographical Ties:</span> 
                <span>Sometimes incorporating the location where the cult is based or where their deity is imprisoned/dormant.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Famous Cults */}
        <section id="famous-cults" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Famous Lovecraftian Cults</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Lovecraft and subsequent authors created numerous iconic cults that have become central to the mythos of cosmic horror:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 mb-6">
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Esoteric Order of Dagon:</span> 
                <span>A cult from "The Shadow Over Innsmouth" that worships deep sea entities and facilitates hybridization with humans.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Cult of Cthulhu:</span> 
                <span>Worshippers of the Great Old One who lies dreaming in the sunken city of R'lyeh, working to hasten his awakening.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">The Church of Starry Wisdom:</span> 
                <span>A Providence-based cult from "The Haunter of the Dark" that used the Shining Trapezohedron to communicate with an avatar of Nyarlathotep.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Brotherhood of the Yellow Sign:</span> 
                <span>Followers of the King in Yellow who seek to bring about the coming of the Last King.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">The Black Brotherhood:</span> 
                <span>A secret society of sorcerers dedicated to the darker aspects of the mythos, often serving as antagonists in later works.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Chesuncook Witch Coven:</span> 
                <span>A group of witches from rural Maine who worship Shub-Niggurath and practice human sacrifice.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Chorazos Cult:</span> 
                <span>Worshippers of Yog-Sothoth who seek to open gates between dimensions to allow their deity passage.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Cult of the Bloody Tongue:</span> 
                <span>African worshippers of Nyarlathotep who practice blood rituals and human sacrifice.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">The Whateleys:</span> 
                <span>Less a formal cult than a family dedicated to Yog-Sothoth, attempting to bring forth hybrid offspring.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Cthulhu Cult of Louisiana:</span> 
                <span>A bayou-based cult mixing voodoo practices with worship of Cthulhu, featured in "The Call of Cthulhu."</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">The Starry Wisdom Sect:</span> 
                <span>A splinter group of the Church of Starry Wisdom, focused on astronomical observations to predict cosmic events.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Order of the Sword of Saint Jerome:</span> 
                <span>A rare example of a "good" cult in the mythos, dedicated to fighting the servants of the Great Old Ones.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Cult of the Skull:</span> 
                <span>Worshippers of Nyarlathotep who wear skull masks and practice necromancy.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Brotherhood of the Beast:</span> 
                <span>A cult dedicated to awakening the Great Beast Chaugnar Faugn from its slumber.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">The Believers:</span> 
                <span>A modern cult that worships Gla'aki, receiving immortality through being impaled on its spines.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Children of the Deep Ones:</span> 
                <span>Human-Deep One hybrids who worship Dagon and Hydra, preparing for their eventual transformation.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Cult of the Goat:</span> 
                <span>Rural worshippers of Shub-Niggurath who practice fertility rituals and seek to birth monstrous offspring.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">The Hermetic Order of the Silver Twilight:</span> 
                <span>A seemingly respectable lodge that secretly practices dark magic and worships ancient entities.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Tcho-Tcho People:</span> 
                <span>An Asian tribe that worships Zhar and Lloigor, known for their cannibalistic practices.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">The Cult of Twin Obscenities:</span> 
                <span>Worshippers of the twin entities Zhar and Lloigor, practicing rituals involving twins and duality.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">The Dreamers of Leng:</span> 
                <span>A cult that uses drugs to access the Dreamlands and commune with the entities that dwell there.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">The Chosen of Azathoth:</span> 
                <span>Worshippers of the Blind Idiot God who seek to bring about universal chaos and destruction.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">The Esoteric Order of the Old Ones:</span> 
                <span>A scholarly cult that studies forbidden texts and attempts to communicate with entities from beyond.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">The Keepers of the Flame:</span> 
                <span>Worshippers of Cthugha who practice fire rituals and seek to bring their burning god to Earth.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">The Servants of Glaaki:</span> 
                <span>Undead cultists created by Glaaki's spines, who seek to bring others to their master.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">The Society of the Yellow Sign:</span> 
                <span>A secret organization dedicated to the King in Yellow and the spread of the Yellow Sign.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">The Cult of the Worm:</span> 
                <span>Worshippers of Yig who practice serpent-handling and seek to transform into snake-like beings.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">The Chesuncook Witch-Cult:</span> 
                <span>A coven of witches in Maine who worship various entities and practice human sacrifice.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">The Cult of the Faceless God:</span> 
                <span>Worshippers of Nyarlathotep in his faceless form, who wear blank masks during their rituals.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">The Brood of Bubastis:</span> 
                <span>A cult that worships Bast in her cosmic horror aspect, involving feline transformations.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">The Cult of the Sleeper:</span> 
                <span>Dedicated to Tsathoggua, practicing rituals in caves and underground chambers.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">The Sisterhood of the Skin:</span> 
                <span>Female cultists who worship Shub-Niggurath and practice flaying rituals.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">The Covenant of Dagon:</span> 
                <span>A more formalized version of the Esoteric Order, with strict hierarchies and initiation rites.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">The Cult of the Crawling Chaos:</span> 
                <span>Direct worshippers of Nyarlathotep who serve as his messengers and agents on Earth.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">The Cabal of Eibon:</span> 
                <span>Followers of the ancient sorcerer Eibon who seek to recover his lost knowledge and spells.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">The Cult of the Feaster from Afar:</span> 
                <span>Worshippers of Chaugnar Faugn who offer blood sacrifices to their elephant-like deity.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">The Inheritors of Y'ha-nthlei:</span> 
                <span>Human-Deep One hybrids who prepare coastal areas for the rising of underwater cities.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">The Cult of the Watching Eye:</span> 
                <span>Worshippers of Cyäegha who practice rituals involving eye symbolism and blindfolding.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">The Keepers of the Trapezohedron:</span> 
                <span>Guardians of the Shining Trapezohedron who use it to communicate with the Haunter of the Dark.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">The Cult of the Veiled One:</span> 
                <span>Worshippers of Hastur who wear yellow veils and practice rituals involving theater and madness.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">The Seekers of the Silver Key:</span> 
                <span>A group dedicated to finding Randolph Carter's silver key and accessing the Ultimate Gate.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">The Cult of the Bloated Woman:</span> 
                <span>Worshippers of a female aspect of Shub-Niggurath, focusing on fertility and birth rituals.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">The Cult of the Drowned:</span> 
                <span>Worshippers who believe in transformation through drowning, dedicated to various aquatic deities.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">The Cult of the Spiral:</span> 
                <span>Followers obsessed with spiral patterns, believing they are gateways to other dimensions.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">The Cult of the Unspeakable:</span> 
                <span>Worshippers of Hastur who take vows of silence and communicate only through written text.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">The Cult of the Withered Heart:</span> 
                <span>Necromancers who worship Yog-Sothoth as the gateway to returning the dead to life.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">The Cult of the Yuggya:</span> 
                <span>Worshippers of the Mi-Go who seek to have their brains preserved in metal cylinders.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">The Cult of Those Who Wait:</span> 
                <span>Patient worshippers who believe their deities will return when the stars are right.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">The Cult of the Thousand Young:</span> 
                <span>Direct worshippers of Shub-Niggurath who seek to birth her monstrous offspring into our world.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">The Cult of the Dreamer:</span> 
                <span>Worshippers who believe reality is Cthulhu's dream, and seek to prevent him from awakening.</span>
              </div>
            </div>
            
            <p>
              These organizations demonstrate the effective use of naming conventions to create sinister groups that feel both grounded in
              human psychology and connected to cosmic horror, serving as excellent examples for your own creative endeavors.
            </p>
          </div>
        </section>

        {/* Other Lovecraftian Generators */}
        <section id="other-generators" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Other Lovecraftian Name Generators</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Explore our other Lovecraftian name generators to create a complete cosmic horror setting:
            </p>
            <ul className="space-y-2">
              <li>
                <Link to="/lovecraftian/town" className="text-primary hover:underline" onClick={() => window.scrollTo(0, 0)}>
                  Lovecraftian Town Name Generator
                </Link> - Create names for isolated, cursed settlements with dark secrets.
              </li>
              <li>
                <Link to="/lovecraftian/monster" className="text-primary hover:underline" onClick={() => window.scrollTo(0, 0)}>
                  Lovecraftian Monster Name Generator
                </Link> - Create names for horrifying creatures from beyond.
              </li>
              <li>
                <Link to="/lovecraftian/deity" className="text-primary hover:underline" onClick={() => window.scrollTo(0, 0)}>
                  Lovecraftian Deity Name Generator
                </Link> - Generate names for cosmic entities and elder gods.
              </li>
              <li>
                <Link to="/lovecraftian/female" className="text-primary hover:underline" onClick={() => window.scrollTo(0, 0)}>
                  Female Lovecraftian Name Generator
                </Link> - Generate names for women with connections to cosmic entities.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LovecraftianCultNameGenerator; 