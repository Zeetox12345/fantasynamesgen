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

interface LovecraftianFemaleData {
  female: Array<{
    name: string;
    description: string;
  }>;
}

const FemaleLovecraftianNameGenerator = () => {
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [nameData, setNameData] = useState<LovecraftianFemaleData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [nameDescription, setNameDescription] = useState<string | null>(null);

  // Load name data when component mounts
  useEffect(() => {
    async function fetchNameData() {
      setLoading(true);
      const data = await loadNameData("lovecraftian", "female");
      setNameData(data as LovecraftianFemaleData);
      setLoading(false);
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.female) return;
    
    // Get 10 random names from the female array
    const shuffled = [...nameData.female].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setGeneratedNames(selected.map(item => item.name));
  };

  const handleNameClick = (name: string) => {
    if (!nameData || !nameData.female) return;
    
    setSelectedName(name);
    
    // Find description for the name
    const nameEntry = nameData.female.find(e => e.name === name);
    
    if (nameEntry) {
      setNameDescription(nameEntry.description);
    } else {
      setNameDescription(null);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>Female Lovecraftian Name Generator | 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ mysterious and otherworldly female names inspired by H.P. Lovecraft's cosmic horror universe. Perfect for stories, games, and roleplaying in the Cthulhu mythos." />
        <meta name="keywords" content="lovecraftian female names, cosmic horror, cthulhu mythos, name generator, fantasy names, horror character names, 10000 lovecraftian names" />
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
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Female Lovecraftian Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate mysterious and otherworldly female names inspired by H.P. Lovecraft's cosmic horror universe.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Female Lovecraftian Names</CardTitle>
            <CardDescription>Create names for women with connections to cosmic entities or ancient knowledge</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate female Lovecraftian names"
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What Makes a Good Lovecraftian Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Lovecraftian Naming Traditions</a>
              </li>
              <li>
                <a href="#popular-names" className="text-primary hover:underline">Notable Lovecraftian Female Names</a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Introduction */}
        <section id="introduction" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Introduction</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              In the shadowy realms of cosmic horror literature, female characters often possess names that evoke a sense of otherworldliness,
              ancient knowledge, and subtle dread. These names carry echoes of forgotten civilizations, arcane practices, and connections to
              forces beyond human comprehension.
            </p>
            <p className="mb-4">
              H.P. Lovecraft and authors inspired by his work created a unique naming style that blends archaic elements with unsettling
              phonetic combinations. Female characters in these stories might be mysterious scholars, members of ancient bloodlines with
              dark secrets, or individuals marked by cosmic forces.
            </p>
            <p>
              This generator creates names suitable for female characters in Lovecraftian settings, whether for use in fiction, role-playing
              games, or other creative projects set in worlds where cosmic horror lurks just beyond the veil of ordinary reality.
            </p>
          </div>
          
          {/* Featured Image */}
          <GeneratorImage 
            src="/images/categories/lovecraftian/female-lovecraftian/female-lovecraftian-main.jpg"
            alt="Female Lovecraftian Character"
            caption="A woman stands before ancient tomes, her face partially illuminated by candlelight as she studies forbidden knowledge from beyond the stars."
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Lovecraftian Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Effective Lovecraftian names for female characters typically share certain qualities that evoke the cosmic horror genre:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Archaic Elements:</span> 
                <span>Names that draw from ancient languages or have an old-world quality to them.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Unusual Phonetics:</span> 
                <span>Combinations of sounds that feel slightly alien or uncomfortable to pronounce.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Celestial References:</span> 
                <span>Subtle connections to stars, cosmic entities, or astronomical phenomena.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Unsettling Meanings:</span> 
                <span>Names with etymologies related to darkness, secrets, forbidden knowledge, or ancient mysteries.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Subtle Dread:</span> 
                <span>Names that create a sense of unease without being overtly horrific.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* How to Use */}
        <section id="how-to-use" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">How to Use the Generator</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">Using our Female Lovecraftian Name Generator is straightforward:</p>
            <ol className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">1.</span> 
                <span>Click the "Generate Names" button to create a list of 10 unique Lovecraftian female names.</span>
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
              Each generated name comes with a description that provides insight into its meaning or the character traits it might represent,
              helping you choose a name that fits your creative vision.
            </p>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Lovecraftian Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              In Lovecraftian fiction, names often follow certain patterns or traditions that reflect the cosmic horror genre:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ancient Lineages:</span> 
                <span>Names that suggest descent from old families with dark secrets or forbidden knowledge.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Occult Connections:</span> 
                <span>Names that hint at involvement with arcane practices or esoteric studies.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Non-Human Origins:</span> 
                <span>Names that subtly suggest inhuman ancestry or influence from cosmic entities.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Geographical Ties:</span> 
                <span>Names connected to isolated, ancient, or mysterious locations.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Symbolic Elements:</span> 
                <span>Names containing references to stars, depths, dreams, or other Lovecraftian motifs.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Popular Names */}
        <section id="popular-names" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Notable Lovecraftian Female Names</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              While female characters were less common in Lovecraft's original works, the expanded mythos and modern Lovecraftian fiction
              have introduced many memorable female characters with names that exemplify the style:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 mb-6">
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Asenath Waite:</span> 
                <span>A character from "The Thing on the Doorstep," whose name combines biblical origins with an unsettling quality.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Lavinia Whateley:</span> 
                <span>From "The Dunwich Horror," bearing an archaic-sounding name with sinister implications.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Keziah Mason:</span> 
                <span>A witch from "Dreams in the Witch House," with a name combining biblical elements and common surname.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Elspeth Marsh:</span> 
                <span>A name typical of the Innsmouth lineage, suggesting ancient and inhuman connections.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Cassilda:</span> 
                <span>From "The King in Yellow," a name with an otherworldly, melodic quality.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Nyarla Thep:</span> 
                <span>A feminine adaptation of Nyarlathotep, suggesting a female avatar of the Crawling Chaos.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Shub-Niggurath:</span> 
                <span>The Black Goat of the Woods with a Thousand Young, often depicted as feminine in modern interpretations.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ephraima Waite:</span> 
                <span>A name suggesting connection to the Waite family of Innsmouth, with an archaic feminine suffix.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Yidhra:</span> 
                <span>The Dream Witch, a lesser-known entity from the expanded mythos with a distinctly alien name.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Mordiggian:</span> 
                <span>The Great Ghoul, sometimes portrayed as feminine in modern adaptations of Clark Ashton Smith's work.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Eihort's Daughter:</span> 
                <span>A mythical figure said to be born of the labyrinth-dwelling entity Eihort.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Hydra:</span> 
                <span>A name borrowed from Greek mythology but reimagined in cosmic horror as an entity from beyond the stars.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Zylac:</span> 
                <span>A priestess of Cthulhu with a name featuring the alien consonant combinations typical of the mythos.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Nitocris:</span> 
                <span>Based on a historical Egyptian queen, reimagined as an undead sorceress in Lovecraft's work.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Yhoundeh:</span> 
                <span>A goddess mentioned in the expanded mythos, with a name featuring unusual phonetics.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Lilith Marsh:</span> 
                <span>Combining the biblical first woman's name with the Innsmouth surname to suggest ancient evil.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Cthylla:</span> 
                <span>Daughter of Cthulhu and Idh-yaa, with a name that feminizes the famous deity's name.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Idh-yaa:</span> 
                <span>Mother of Cthulhu's offspring, with a name featuring the apostrophe common in alien entity names.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Eibhleann:</span> 
                <span>A Celtic-inspired name for a witch with connections to the Outer Gods.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Kassogtha:</span> 
                <span>Sister of Cthulhu in some expanded mythos stories, with a name echoing the phonetics of her brother.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Morella Waite:</span> 
                <span>Combining a Poe reference with the infamous Innsmouth surname for literary resonance.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Zkauba:</span> 
                <span>A female entity from Yaddith with a name featuring unusual consonant combinations.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Nug:</span> 
                <span>Offspring of Yog-Sothoth and Shub-Niggurath, sometimes portrayed as feminine.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Yeb:</span> 
                <span>Twin of Nug, also offspring of cosmic entities, with a deceptively simple yet alien name.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ereshkigal:</span> 
                <span>Borrowed from Mesopotamian mythology but reimagined as a cosmic entity in modern Lovecraftian fiction.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Lamashtu:</span> 
                <span>Adapted from ancient mythology into the Lovecraftian pantheon, with a name suggesting ancient evil.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Nephren-Ka:</span> 
                <span>The Black Pharaoh, sometimes portrayed as female in modern adaptations.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ymnar:</span> 
                <span>A priestess of Yog-Sothoth with a name featuring the consonant-heavy structure typical of the mythos.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Zoth-Ommog:</span> 
                <span>A Great Old One sometimes depicted as feminine, with a hyphenated name typical of cosmic entities.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Hagarg Ryonis:</span> 
                <span>A female entity mentioned in the expanded mythos, with a name combining harsh and flowing sounds.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Baoht Z'uqqa:</span> 
                <span>The Bringer of Pestilence, with a name featuring apostrophes and unusual phonetics.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Lilith Noctis:</span> 
                <span>Combining biblical references with Latin to create a name suggesting night and darkness.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ithaqua's Daughter:</span> 
                <span>A mythical figure said to be born of the Wind-Walker, with power over ice and cold.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Yibb-Tstll:</span> 
                <span>The Patient One, sometimes portrayed as feminine, with a name featuring difficult consonant combinations.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Mnomquah:</span> 
                <span>Lord of the Black Lake, occasionally depicted as female in modern interpretations.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Pharol:</span> 
                <span>A female entity associated with dreams and nightmares in the expanded mythos.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Vulthoom:</span> 
                <span>A Martian entity sometimes portrayed as feminine, with a name suggesting ancient power.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Aylith:</span> 
                <span>A priestess of Azathoth with a name combining archaic elements with cosmic horror phonetics.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Zstylzhemgni:</span> 
                <span>A female entity with an almost unpronounceable name, typical of the most alien cosmic beings.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Rhagorthua:</span> 
                <span>A sorceress from ancient times with a name suggesting connections to forgotten languages.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Cthalpa:</span> 
                <span>A Great Old One sometimes depicted as feminine, with a name echoing Cthulhu but distinct.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Nyogtha:</span> 
                <span>The Thing That Should Not Be, occasionally portrayed as female in modern adaptations.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Sfatlicllp:</span> 
                <span>A female entity with a name featuring nearly impossible consonant combinations.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ubb:</span> 
                <span>A Great Old One with a deceptively simple name, sometimes portrayed as feminine.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Xiurhn:</span> 
                <span>A priestess of Tsathoggua with a name featuring unusual consonant combinations.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Y'golonac:</span> 
                <span>The god of depravity, occasionally depicted as female in some modern interpretations.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Zhar:</span> 
                <span>Twin of Lloigor, sometimes portrayed as feminine, with a short but alien-sounding name.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Aphoom-Zhah:</span> 
                <span>The Cold Flame, occasionally depicted as female, with a hyphenated name typical of cosmic entities.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Bastet:</span> 
                <span>The Egyptian cat goddess reimagined in the Lovecraftian mythos as an alien entity.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Cynothoglys:</span> 
                <span>A female entity with a name combining Greek elements with cosmic horror phonetics.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Dveahtehs:</span> 
                <span>A sorceress from the distant past with a name featuring unusual vowel combinations.</span>
              </div>
            </div>
            
            <p>
              These names demonstrate the balance between human familiarity and subtle strangeness that characterizes effective
              Lovecraftian naming conventions for female characters, whether they are human cultists, hybrid beings, or cosmic entities.
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
                <Link to="/lovecraftian/deity" className="text-primary hover:underline" onClick={() => window.scrollTo(0, 0)}>
                  Lovecraftian Deity Name Generator
                </Link> - Generate names for cosmic entities and elder gods.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FemaleLovecraftianNameGenerator; 