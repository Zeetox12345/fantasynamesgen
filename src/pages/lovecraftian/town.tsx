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
import { loadNameData, LocationNameData } from "@/lib/nameUtils";
import { GeneratorImage } from "@/components/GeneratorImage";

interface LovecraftianTownData {
  lovecraftiantownNames: Array<{
    name: string;
    description: string;
  }>;
}

const LovecraftianTownNameGenerator = () => {
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [nameData, setNameData] = useState<LovecraftianTownData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [nameDescription, setNameDescription] = useState<string | null>(null);

  // Load name data when component mounts
  useEffect(() => {
    async function fetchNameData() {
      setLoading(true);
      const data = await loadNameData("lovecraftian", "town");
      setNameData(data as LovecraftianTownData);
      setLoading(false);
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.lovecraftiantownNames) return;
    
    // Get 10 random names from the lovecraftiantownNames array
    const shuffled = [...nameData.lovecraftiantownNames].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setGeneratedNames(selected.map(item => item.name));
  };

  const handleNameClick = (name: string) => {
    if (!nameData || !nameData.lovecraftiantownNames) return;
    
    setSelectedName(name);
    
    // Find description for the name
    const nameEntry = nameData.lovecraftiantownNames.find(e => e.name === name);
    
    if (nameEntry) {
      setNameDescription(nameEntry.description);
    } else {
      setNameDescription(null);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>Lovecraftian Town Name Generator | 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ names for eerie, cursed towns and settlements inspired by H.P. Lovecraft's cosmic horror universe. Perfect for creating atmospheric locations for horror stories, games, and Call of Cthulhu campaigns." />
        <meta name="keywords" content="lovecraftian town names, cosmic horror locations, cursed settlements, cthulhu mythos, name generator, horror settings, 10000 town names" />
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
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Lovecraftian Town Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate names for eerie, mysterious towns and settlements in the style of H.P. Lovecraft's cosmic horror.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Lovecraftian Town Names</CardTitle>
            <CardDescription>Create names for isolated, cursed, or strange settlements with dark secrets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate Lovecraftian town names"
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What Makes a Good Lovecraftian Town Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Lovecraftian Town Naming Traditions</a>
              </li>
              <li>
                <a href="#famous-towns" className="text-primary hover:underline">Famous Lovecraftian Towns</a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Introduction */}
        <section id="introduction" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Introduction</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              In the realm of cosmic horror literature, towns and settlements often serve as focal points for unspeakable events and ancient terrors.
              These isolated communities, often shrouded in fog and surrounded by foreboding landscapes, harbor dark secrets and connections to
              forces beyond human comprehension.
            </p>
            <p className="mb-4">
              H.P. Lovecraft created several iconic fictional towns that have become synonymous with cosmic horror, from the decaying port of
              Innsmouth to the witch-haunted Arkham. These locations are characterized by their unsettling names that often combine archaic
              elements with subtle phonetic dissonance.
            </p>
            <p>
              This generator creates names suitable for towns and settlements in Lovecraftian settings, perfect for use in fiction, role-playing
              games, or other creative projects set in worlds where cosmic horror lurks beneath the veneer of ordinary life.
            </p>
          </div>
          
          {/* Featured Image */}
          <GeneratorImage 
            src="/images/categories/lovecraftian/lovecraftian-town/lovecraftian-town-main.jpg"
            alt="Lovecraftian Town"
            caption="A fog-shrouded coastal town with ancient architecture, where shadows seem to move of their own accord and the sea hides unimaginable secrets."
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Lovecraftian Town Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Effective Lovecraftian town names typically share certain qualities that evoke the cosmic horror genre:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Old English Elements:</span> 
                <span>Names that incorporate archaic English terms or constructions, often with suffixes like "-ham," "-mouth," or "-port."</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Geographical Features:</span> 
                <span>References to unsettling landscapes such as mists, marshes, depths, or isolated coastal features.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Subtle Wrongness:</span> 
                <span>Names that sound almost normal but contain an element that creates unease or suggests something not quite right.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Historical Echoes:</span> 
                <span>Names that suggest a long, possibly troubled history, often with Puritan or colonial American influences.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Phonetic Dissonance:</span> 
                <span>Combinations of sounds that create a slightly jarring or uncomfortable effect when pronounced.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* How to Use */}
        <section id="how-to-use" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">How to Use the Generator</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">Using our Lovecraftian Town Name Generator is straightforward:</p>
            <ol className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">1.</span> 
                <span>Click the "Generate Names" button to create a list of 10 unique Lovecraftian town names.</span>
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
                <span>Use the generated names for settings in stories, role-playing games, or other creative projects.</span>
              </li>
            </ol>
            <p>
              Each generated name comes with a description that provides insight into the town's possible history, atmosphere, or the horrors
              that might lurk within its boundaries, helping you develop your setting further.
            </p>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Lovecraftian Town Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Lovecraft established several patterns in naming the fictional towns and cities in his stories:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">New England Influence:</span> 
                <span>Names that echo the colonial settlements of Massachusetts, Rhode Island, and surrounding areas.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Coastal Connections:</span> 
                <span>Many Lovecraftian towns are situated on the coast, with names reflecting their relationship to the sea.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ancient Foundations:</span> 
                <span>Names suggesting settlements built upon older, possibly pre-human sites or civilizations.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Isolation Indicators:</span> 
                <span>Elements that hint at the town's remoteness or separation from mainstream society.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Corrupted Names:</span> 
                <span>Sometimes normal place names that have been slightly altered to suggest something unwholesome or wrong.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Famous Towns */}
        <section id="famous-towns" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Famous Lovecraftian Towns</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Lovecraft created numerous iconic fictional towns and locations that have become central to the mythos of cosmic horror:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 mb-6">
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Arkham:</span> 
                <span>A witch-haunted town in Massachusetts, home to Miskatonic University and its forbidden library of occult texts.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Innsmouth:</span> 
                <span>A decaying coastal town whose inhabitants have made pacts with deep sea entities, resulting in their gradual transformation.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Dunwich:</span> 
                <span>An isolated rural community in the hills, site of the Whateley family's attempts to bring forth entities from beyond.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Kingsport:</span> 
                <span>A dreamlike coastal town with ancient architecture and connections to realms beyond normal space and time.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">R'lyeh:</span> 
                <span>Not a town but a sunken city of non-Euclidean geometry where Cthulhu lies dreaming beneath the Pacific Ocean.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ulthar:</span> 
                <span>A town in the Dreamlands where no man may kill a cat, due to an ancient and mysterious law.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Y'ha-nthlei:</span> 
                <span>An underwater city inhabited by Deep Ones, located off the coast of Innsmouth.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Carcosa:</span> 
                <span>A mysterious city mentioned in "The King in Yellow," associated with Hastur and madness.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Leng:</span> 
                <span>A vast plateau in the Dreamlands (or possibly Central Asia) inhabited by strange beings and ancient horrors.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Kadath:</span> 
                <span>A mysterious mountain in the cold waste where the gods dwell, sought by dreamers and madmen.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Irem:</span> 
                <span>The City of Pillars, an ancient metropolis lost in the Arabian desert, associated with the Outer Gods.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Sarnath:</span> 
                <span>A doomed city that was destroyed after its inhabitants killed the beings of Ib, a nearby settlement.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ib:</span> 
                <span>An ancient city inhabited by gray-green beings, destroyed by the people of Sarnath who later faced retribution.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Pnakotus:</span> 
                <span>The Great Library city of the Elder Things, containing the Pnakotic Manuscripts.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Thalarion:</span> 
                <span>The City of a Thousand Wonders in the Dreamlands, ruled by the demon-monarch Lathi.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Dylath-Leen:</span> 
                <span>A port city in the Dreamlands known for its black galleys and trade with sinister moon-beings.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Hlanith:</span> 
                <span>A trading city in the Dreamlands, known for its marble walls and merchant vessels.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Celephais:</span> 
                <span>A city created in the dreams of Kuranes, who became its king after his physical death.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Olathoë:</span> 
                <span>An ancient city in the land of Lomar, destroyed by the advancing ice age and the Gnophkehs.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Inquanok:</span> 
                <span>A remote city in the Dreamlands built of black onyx, lying near the dangerous plateau of Leng.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Skai:</span> 
                <span>A river and the city along its banks in the Dreamlands, known for its marble bridges.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Thran:</span> 
                <span>An ancient city mentioned in the Pnakotic Manuscripts, known for its strange technologies.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Commoriom:</span> 
                <span>The greatest city in the prehistoric land of Hyperborea, abandoned due to the prophecies of Yhoundeh.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Uzuldaroum:</span> 
                <span>A fabulous city in the Dreamlands known for its high terraces and golden domes.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Zul-Bha-Sair:</span> 
                <span>A city where the dead are not buried but given to Mordiggian, the Charnel God.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Yian:</span> 
                <span>An ancient city in the jungle plateau of Tsang, known for its eight-armed idol.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Yian-Ho:</span> 
                <span>A hidden city in the wastes of Thibet, where the Tcho-Tcho people dwell.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ngranek:</span> 
                <span>A mountain in the Dreamlands with a great carved face of the gods on its cliff.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Sarkomand:</span> 
                <span>An underground city in the Dreamlands, once great but now abandoned and in ruins.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Mnar:</span> 
                <span>An ancient land containing the cities of Sarnath and Ib, known for its stone idols and lake.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Oriab:</span> 
                <span>An island in the Southern Sea of the Dreamlands, home to the city of Baharna.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Baharna:</span> 
                <span>A city on the island of Oriab in the Dreamlands, known for its lighthouse and marble quays.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Olathoe:</span> 
                <span>A city in the land of Lomar, destroyed by the advancing ice and the Gnophkehs.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Parg:</span> 
                <span>A city in the Dreamlands known for its horsemen and the nearness of the dangerous Plateau of Leng.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Hatheg-Kla:</span> 
                <span>A mountain in the Dreamlands where the gods sometimes dance on certain nights.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Kled:</span> 
                <span>A trading town in the Dreamlands, located on the River Ai between Hlanith and Ulthar.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Nir:</span> 
                <span>A city in the Dreamlands known for its vast pastures and the worship of water-beings.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Thraa:</span> 
                <span>A city in the Dreamlands known for its temples and religious practices.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ilarnek:</span> 
                <span>A desert city in the Dreamlands, built of clay bricks and known for its marketplace.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Kadiphonek:</span> 
                <span>A city in the Dreamlands known for its chalcedony street and turquoise temples.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ardathoth:</span> 
                <span>A sunken city mentioned in the Ponape Scripture, home to strange aquatic beings.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Yhe:</span> 
                <span>An ancient city associated with the worship of Yig, the Father of Serpents.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Lh-yib:</span> 
                <span>A city of the Tcho-Tcho people, known for its strange rituals and inhuman practices.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Xuthltan:</span> 
                <span>A forgotten city in the Australian desert, associated with the toad-god Tsathoggua.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">G'harne:</span> 
                <span>A ruined city in Africa where the entity Shudde M'ell is imprisoned beneath stone monoliths.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Chorazin:</span> 
                <span>A cursed city mentioned in the Necronomicon, associated with the worship of Azathoth.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Yaanek:</span> 
                <span>A mountain in the polar regions where strange lights and sounds emanate from its peak.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Yuggoth:</span> 
                <span>Not a town but a planet at the edge of our solar system, home to the fungoid Mi-Go.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Cykranosh:</span> 
                <span>The planet Saturn in the Hyperborean cycle, home to strange entities and civilizations.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Kythamil:</span> 
                <span>An ancient city known for its association with the worship of Shub-Niggurath.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Mu:</span> 
                <span>A lost continent in the Pacific, home to an advanced civilization destroyed by cataclysm.</span>
              </div>
            </div>
            
            <p>
              These locations demonstrate the effective use of naming conventions to create settings that feel both grounded in reality
              and touched by cosmic horror, serving as excellent examples for your own creative endeavors.
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

export default LovecraftianTownNameGenerator; 