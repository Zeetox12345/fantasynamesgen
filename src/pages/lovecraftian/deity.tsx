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

interface LovecraftianDeityData {
  lovecraftiandeityNames: Array<{
    name: string;
    description: string;
  }>;
}

const LovecraftianDeityNameGenerator = () => {
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [nameData, setNameData] = useState<LovecraftianDeityData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [nameDescription, setNameDescription] = useState<string | null>(null);

  // Load name data when component mounts
  useEffect(() => {
    async function fetchNameData() {
      setLoading(true);
      const data = await loadNameData("lovecraftian", "deity");
      setNameData(data as LovecraftianDeityData);
      setLoading(false);
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.lovecraftiandeityNames) return;
    
    // Get 10 random names from the lovecraftiandeityNames array
    const shuffled = [...nameData.lovecraftiandeityNames].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setGeneratedNames(selected.map(item => item.name));
  };

  const handleNameClick = (name: string) => {
    if (!nameData || !nameData.lovecraftiandeityNames) return;
    
    setSelectedName(name);
    
    // Find description for the name
    const nameEntry = nameData.lovecraftiandeityNames.find(e => e.name === name);
    
    if (nameEntry) {
      setNameDescription(nameEntry.description);
    } else {
      setNameDescription(null);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>Lovecraftian Deity Name Generator | 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ names for cosmic entities, elder gods, and Great Old Ones inspired by H.P. Lovecraft's mythos. Create terrifying deities for your horror stories, games, and RPG campaigns." />
        <meta name="keywords" content="lovecraftian deity names, elder gods, great old ones, cosmic horror, cthulhu mythos, name generator, 10000 deity names" />
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
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Lovecraftian Deity Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate names for cosmic deities, elder gods, and ancient entities inspired by H.P. Lovecraft's cosmic horror universe.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Lovecraftian Deity Names</CardTitle>
            <CardDescription>Create names for ancient cosmic entities that exist beyond human comprehension</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate Lovecraftian deity names"
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What Makes a Good Lovecraftian Deity Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Lovecraftian Deity Naming Traditions</a>
              </li>
              <li>
                <a href="#famous-deities" className="text-primary hover:underline">Famous Lovecraftian Deities</a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Introduction */}
        <section id="introduction" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Introduction</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              In the vast cosmos of Lovecraftian horror, deities and cosmic entities represent forces beyond human comprehension. 
              These ancient beings exist outside conventional reality, indifferent to humanity yet capable of driving mortals to 
              madness with their mere presence or influence.
            </p>
            <p className="mb-4">
              H.P. Lovecraft created a pantheon of cosmic entities with names that evoke a sense of alien otherness and primordial dread. 
              These names often feature unusual phonetic combinations, archaic elements, and a quality that makes them difficult to 
              pronounce or fully comprehend.
            </p>
            <p>
              This generator creates names suitable for cosmic deities and elder gods in Lovecraftian settings, perfect for use in 
              fiction, role-playing games, or other creative projects that explore the themes of cosmic horror and existential dread.
            </p>
          </div>
          
          {/* Featured Image */}
          <GeneratorImage 
            src="/images/categories/lovecraftian/lovecraftian-deity/lovecraftian-deity-main.jpg"
            alt="Lovecraftian Deity"
            caption="A vast, incomprehensible entity looms beyond the stars, its form shifting between dimensions as cultists on Earth perform rituals to invoke its terrible presence."
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Lovecraftian Deity Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Effective Lovecraftian deity names typically share certain qualities that evoke the cosmic horror genre:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Unpronounceable Elements:</span> 
                <span>Combinations of consonants and syllables that are difficult for human tongues to articulate.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Apostrophes and Hyphens:</span> 
                <span>Punctuation that suggests alien phonetics or pauses not found in human languages.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ancient Sounds:</span> 
                <span>Phonetic elements that evoke ancient or primordial languages, suggesting entities that predate humanity.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Cosmic Vastness:</span> 
                <span>Names that somehow convey a sense of immensity, eternity, or existence beyond conventional space-time.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Unsettling Resonance:</span> 
                <span>Sounds that create a subtle sense of wrongness or discomfort when spoken aloud.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* How to Use */}
        <section id="how-to-use" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">How to Use the Generator</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">Using our Lovecraftian Deity Name Generator is straightforward:</p>
            <ol className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">1.</span> 
                <span>Click the "Generate Names" button to create a list of 10 unique Lovecraftian deity names.</span>
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
                <span>Use the generated names for cosmic entities in your horror fiction, RPG campaigns, or creative projects.</span>
              </li>
            </ol>
            <p>
              Each generated name comes with a description that provides insight into the entity's nature or domain,
              helping you choose a name that fits your creative vision for an elder god or cosmic horror.
            </p>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Lovecraftian Deity Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              In Lovecraftian fiction, deity names often follow certain patterns or traditions that reflect their cosmic nature:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Syllabic Patterns:</span> 
                <span>Names often feature repeating syllables or phonetic elements (like "thoth" or "goth").</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Titles and Epithets:</span> 
                <span>Many entities have descriptive titles that accompany their names (e.g., "The Blind Idiot God").</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Multiple Names:</span> 
                <span>Cosmic entities may be known by different names to different cultures or in different dimensions.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Forbidden Utterances:</span> 
                <span>Some names are said to be dangerous to speak aloud, as they may draw the attention of the entity.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Symbolic Connections:</span> 
                <span>Names may contain subtle references to the entity's domain, nature, or cosmic role.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Famous Deities */}
        <section id="famous-deities" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Famous Lovecraftian Deities</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              H.P. Lovecraft and authors who expanded his mythos created numerous iconic cosmic entities that have become
              synonymous with cosmic horror:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 mb-6">
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Azathoth:</span> 
                <span>The "Blind Idiot God" who exists at the center of infinity, a nuclear chaos beyond space and time.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Cthulhu:</span> 
                <span>The Great Old One who lies dead but dreaming in the sunken city of R'lyeh, waiting to rise again.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Nyarlathotep:</span> 
                <span>The Crawling Chaos, a shape-shifting entity who serves as messenger of the Outer Gods.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Yog-Sothoth:</span> 
                <span>The All-in-One and One-in-All, coterminous with all time and space yet locked outside our universe.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Shub-Niggurath:</span> 
                <span>The Black Goat of the Woods with a Thousand Young, an outer god associated with fertility and perversion.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Hastur:</span> 
                <span>The Unspeakable One, He Who Must Not Be Named, associated with the Yellow Sign and the lost city of Carcosa.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Dagon:</span> 
                <span>A deity worshipped by the Deep Ones, often depicted as a massive aquatic entity.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Tsathoggua:</span> 
                <span>The Sleeper of N'kai, a toad-like entity worshipped in ancient Hyperborea.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ithaqua:</span> 
                <span>The Wind-Walker, a Great Old One associated with arctic winds and freezing death.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Yig:</span> 
                <span>The Father of Serpents, a reptilian deity worshipped by various cults throughout history.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Abhoth:</span> 
                <span>The Source of Uncleanliness, a pool of gray matter that constantly spawns bizarre life forms.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Atlach-Nacha:</span> 
                <span>The Spider God, weaving a web between the waking world and the Dreamlands.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Bokrug:</span> 
                <span>The Great Water Lizard, worshipped in the land of Mnar and known for its vengeance.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Chaugnar Faugn:</span> 
                <span>The Horror from the Hills, an elephant-like entity that feeds on blood through its trunk.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Cthugha:</span> 
                <span>A living flame entity, associated with the star Fomalhaut and summoned through fire rituals.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Cyäegha:</span> 
                <span>The Waiting Dark, a Great Old One with a central eye surrounded by tentacles.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Daoloth:</span> 
                <span>The Render of the Veils, an entity whose true form cannot be perceived by human minds.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Eihort:</span> 
                <span>The God of the Labyrinth, a pale entity that implants its brood in human hosts.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ghatanothoa:</span> 
                <span>The Dark God, whose visage petrifies any who gaze upon it while preserving their consciousness.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Gla'aki:</span> 
                <span>A spiny, metallic entity dwelling in a lake, who creates undead servants through its spines.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Hypnos:</span> 
                <span>The Lord of Sleep, a deity associated with dreams and the boundary between waking and dreaming.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Iod:</span> 
                <span>The Shining Hunter, a luminous entity that pursues prey across dimensions.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Kthanid:</span> 
                <span>A benevolent entity resembling Cthulhu but with golden eyes, representing a cosmic balance.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Lloigor:</span> 
                <span>Energy beings from the Andromeda Galaxy who can possess humans and manipulate matter.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">M'nagalah:</span> 
                <span>The Mound, a cancer-like deity of knowledge and transformation.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Mordiggian:</span> 
                <span>The Charnel God, a deity of death worshipped in the city of Zul-Bha-Sair.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Nodens:</span> 
                <span>Lord of the Great Abyss, one of the few entities in the mythos who opposes the other gods.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Nyogtha:</span> 
                <span>The Thing That Should Not Be, a formless entity dwelling beneath the earth.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Quachil Uttaus:</span> 
                <span>The Treader of the Dust, a desiccated entity that ages anything it touches to dust.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Rhan-Tegoth:</span> 
                <span>A Great Old One with a body combining crustacean, insect, and human features.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Shudde M'ell:</span> 
                <span>The Burrower Beneath, progenitor of the Cthonians who dwell within the earth.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Tulzscha:</span> 
                <span>A green flame entity that burns in the center of ultimate chaos alongside Azathoth.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ubbo-Sathla:</span> 
                <span>The Unbegotten Source, a massive protoplasmic entity from which all earthly life descended.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Vulthoom:</span> 
                <span>A plant-like entity worshipped on Mars, also known as Gsarthotegga.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Xexanoth:</span> 
                <span>An entity that exists outside of time, capable of altering the flow of temporal events.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Y'golonac:</span> 
                <span>The god of perversion and depravity, whose true form includes mouths in the palms of its hands.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Yhoundeh:</span> 
                <span>The Elk Goddess, worshipped in Hyperborea and opposed to Tsathoggua.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Yibb-Tstll:</span> 
                <span>The Patient One, an entity surrounded by faceless servants who extract a substance from victims.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Zhar:</span> 
                <span>Twin of Lloigor, an entity dwelling beneath the earth in the Vale of Pnath.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Zoth-Ommog:</span> 
                <span>A Great Old One dwelling beneath the ocean, son of Cthulhu and grandson of Yog-Sothoth.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Aphoom-Zhah:</span> 
                <span>The Cold Flame, a being of living fire that burns with extreme cold rather than heat.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Basatan:</span> 
                <span>The Master of the Crabs, an entity worshipped by crustaceans and island-dwelling humans.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Bugg-Shash:</span> 
                <span>The Black One, a formless entity composed of slime and tentacles that absorbs victims.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Byatis:</span> 
                <span>The Berkeley Toad, a toad-like entity with a single eye and tentacles beneath its mouth.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Cynothoglys:</span> 
                <span>The Mortician God, associated with death and the preparation of corpses.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Dhumin:</span> 
                <span>The Burrower from the Bluff, an entity that creates elaborate tunnel systems.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ei'lor:</span> 
                <span>The Star-Seed, an entity that travels through space as a comet-like object.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ghisguth:</span> 
                <span>The Sound in Space, an entity that manifests as vibrations and harmonics in the void.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Hnarqu:</span> 
                <span>The Bone Shaper, an entity that can manipulate and transform skeletal structures.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Knygathin Zhaum:</span> 
                <span>A deity worshipped in Theem'hdra, associated with corruption and decay.</span>
              </div>
            </div>
            
            <p>
              These entities exemplify the naming conventions and thematic elements that make Lovecraftian deities so distinctive
              and unsettling. Their names have become iconic in horror literature and continue to influence cosmic horror naming
              traditions to this day.
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
                <Link to="/lovecraftian/cult" className="text-primary hover:underline" onClick={() => window.scrollTo(0, 0)}>
                  Lovecraftian Cult Name Generator
                </Link> - Generate names for secret societies dedicated to cosmic entities.
              </li>
              <li>
                <Link to="/lovecraftian/monster" className="text-primary hover:underline" onClick={() => window.scrollTo(0, 0)}>
                  Lovecraftian Monster Name Generator
                </Link> - Create names for horrifying creatures from beyond.
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

export default LovecraftianDeityNameGenerator; 