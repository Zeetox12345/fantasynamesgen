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

interface LovecraftianMonsterData {
  lovecraftianmonsterNames: Array<{
    name: string;
    description: string;
  }>;
}

const LovecraftianMonsterNameGenerator = () => {
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [nameData, setNameData] = useState<LovecraftianMonsterData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [nameDescription, setNameDescription] = useState<string | null>(null);

  // Load name data when component mounts
  useEffect(() => {
    async function fetchNameData() {
      setLoading(true);
      const data = await loadNameData("lovecraftian", "monster");
      setNameData(data as LovecraftianMonsterData);
      setLoading(false);
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.lovecraftianmonsterNames) return;
    
    // Get 10 random names from the lovecraftianmonsterNames array
    const shuffled = [...nameData.lovecraftianmonsterNames].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setGeneratedNames(selected.map(item => item.name));
  };

  const handleNameClick = (name: string) => {
    if (!nameData || !nameData.lovecraftianmonsterNames) return;
    
    setSelectedName(name);
    
    // Find description for the name
    const nameEntry = nameData.lovecraftianmonsterNames.find(e => e.name === name);
    
    if (nameEntry) {
      setNameDescription(nameEntry.description);
    } else {
      setNameDescription(null);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>Lovecraftian Monster Name Generator | 10,000+ Cosmic Horror Creature Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ names for terrifying monsters and otherworldly creatures inspired by H.P. Lovecraft's cosmic horror universe. Perfect for creating antagonists for horror stories, games, and Call of Cthulhu campaigns." />
        <meta name="keywords" content="lovecraftian monster names, cosmic horror creatures, cthulhu mythos, name generator, horror antagonists, eldritch abominations, 10000 monster names" />
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
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Lovecraftian Monster Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate names for cosmic horrors, eldritch abominations, and otherworldly entities inspired by H.P. Lovecraft's universe.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Lovecraftian Monster Names</CardTitle>
            <CardDescription>Create names for indescribable horrors from beyond time and space</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate Lovecraftian monster names"
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What Makes a Good Lovecraftian Monster Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Lovecraftian Monster Naming Traditions</a>
              </li>
              <li>
                <a href="#famous-monsters" className="text-primary hover:underline">Famous Lovecraftian Monsters</a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Introduction */}
        <section id="introduction" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Introduction</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              In the realm of cosmic horror, monsters are not simply dangerous beasts or malevolent spirits, but entities whose very existence
              challenges our understanding of reality. These beings often defy description, with forms that shift between states of matter,
              geometries that shouldn't be possible, or aspects that the human mind simply cannot process without risking sanity.
            </p>
            <p className="mb-4">
              H.P. Lovecraft pioneered a unique approach to naming these entities, creating designations that are both alien and evocative.
              Names like "Shoggoth," "Mi-Go," and "Yith" suggest something fundamentally non-human while remaining pronounceable. These names
              often incorporate unusual consonant combinations, archaic phonetic elements, or syllables that create a sense of unease.
            </p>
            <p>
              This generator creates names suitable for cosmic horrors and eldritch abominations in Lovecraftian settings, perfect for use in
              fiction, role-playing games, or other creative projects where you need to name the unnameable.
            </p>
          </div>
          
          {/* Featured Image */}
          <GeneratorImage 
            src="/images/categories/lovecraftian/lovecraftian-monster/lovecraftian-monster-main.jpg"
            alt="Lovecraftian Monster"
            caption="A writhing mass of tentacles and eyes emerges from a dimensional rift, its form constantly shifting in ways that defy natural law."
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Lovecraftian Monster Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Effective Lovecraftian monster names typically share certain qualities that evoke the cosmic horror genre:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Alien Phonetics:</span> 
                <span>Combinations of sounds that feel non-human or from an unknown language, yet remain pronounceable.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Unsettling Rhythm:</span> 
                <span>Names with syllabic patterns that create a sense of wrongness or discomfort when spoken aloud.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ancient Suggestion:</span> 
                <span>Elements that hint at primordial origins or existence long before human civilization.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Cosmic Connection:</span> 
                <span>References to stars, space, or other dimensions that suggest the entity's otherworldly nature.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Descriptive Undertones:</span> 
                <span>Subtle phonetic connections to words that describe the entity's nature or appearance, without being too obvious.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* How to Use */}
        <section id="how-to-use" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">How to Use the Generator</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">Using our Lovecraftian Monster Name Generator is straightforward:</p>
            <ol className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">1.</span> 
                <span>Click the "Generate Names" button to create a list of 10 unique Lovecraftian monster names.</span>
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
                <span>Use the generated names for cosmic entities in stories, role-playing games, or other creative projects.</span>
              </li>
            </ol>
            <p>
              Each generated name comes with a description that provides insight into the monster's possible nature, appearance, or abilities,
              helping you develop your cosmic horror further.
            </p>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Lovecraftian Monster Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Lovecraft established several patterns in naming the monstrous entities in his stories:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Apostrophes and Hyphens:</span> 
                <span>Using punctuation to create unusual breaks in pronunciation, as in "Cthulhu" or "Yog-Sothoth."</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Repeated Syllables:</span> 
                <span>Patterns like "Azathoth" where similar sounds are echoed, creating an unsettling rhythm.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Guttural Sounds:</span> 
                <span>Harsh consonants and throaty phonetics that suggest something inhuman or difficult for human vocal cords.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ancient Language Echoes:</span> 
                <span>Names that subtly evoke ancient languages like Sumerian, Akkadian, or Arabic without directly copying them.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Collective Designations:</span> 
                <span>Names for entire species or types of entities, often with a scientific-sounding quality despite their alien nature.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Famous Monsters */}
        <section id="famous-monsters" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Famous Lovecraftian Monsters</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Lovecraft created numerous iconic monsters that have become central to the mythos of cosmic horror:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 mb-6">
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Cthulhu:</span> 
                <span>A colossal being with an octopoid head, rubbery body, and enormous wings who lies dreaming in the sunken city of R'lyeh.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Shoggoth:</span> 
                <span>An amorphous, shape-shifting mass of protoplasmic bubbles created by the Elder Things as a slave race.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Mi-Go:</span> 
                <span>Fungoid creatures with bat-like wings capable of space travel, who mine Earth for minerals and can preserve human brains in cylinders.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Deep Ones:</span> 
                <span>Amphibious humanoids with fish-like features who worship Dagon and can interbreed with humans.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Nightgaunts:</span> 
                <span>Faceless, rubbery flying creatures with barbed tails that tickle their victims as they carry them away.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Elder Things:</span> 
                <span>Barrel-shaped beings with starfish-like heads and wings who created the first life on Earth.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ghasts:</span> 
                <span>Pale, emaciated humanoids that hop on kangaroo-like legs and inhabit the Dreamlands.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ghouls:</span> 
                <span>Corpse-eating creatures with canine features that can transform humans who associate with them.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Gugs:</span> 
                <span>Giant, hairy humanoids with vertically-opening mouths that inhabit the lightless city of Guggoth.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Hounds of Tindalos:</span> 
                <span>Angular beings that exist outside of time and can enter our world through corners to hunt those who have traveled through time.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Byakhee:</span> 
                <span>Interstellar flying creatures that serve Hastur and can be summoned and controlled with the right incantations.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Colour Out of Space:</span> 
                <span>An indescribable color that fell from the sky in a meteorite and slowly consumed all life around it.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Dimensional Shambler:</span> 
                <span>A hunched, monstrous entity capable of traveling between dimensions and abducting victims.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Flying Polyps:</span> 
                <span>Semi-visible entities that can control air currents and were the enemies of the Great Race of Yith.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Great Race of Yith:</span> 
                <span>Cone-shaped beings with four appendages who can project their minds across time into other bodies.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Moon-Beasts:</span> 
                <span>Pallid, toad-like creatures that sail black galleys in the Dreamlands and worship the Other Gods.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Shantak:</span> 
                <span>Horse-like creatures with scales and bat wings that inhabit the higher reaches of the Dreamlands.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Star Vampires:</span> 
                <span>Invisible, flying creatures that become briefly visible when gorged with blood.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Hunting Horrors:</span> 
                <span>Enormous, serpentine entities that serve Nyarlathotep and can fly through the void of space.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Leng Spiders:</span> 
                <span>Enormous arachnids with human faces that inhabit the Plateau of Leng.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Formless Spawn:</span> 
                <span>Amorphous servants of Tsathoggua that dwell in N'kai and can assume any shape.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Rat-Things:</span> 
                <span>Creatures with the bodies of rats but human-like faces, created through sorcerous transformation.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Chthonians:</span> 
                <span>Massive, tentacled worm-like beings that burrow through the earth and can cause earthquakes.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Dark Young of Shub-Niggurath:</span> 
                <span>Tree-like monstrosities with hooves and tentacles that serve as avatars of the Black Goat of the Woods.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Servitors of the Outer Gods:</span> 
                <span>Amorphous, piping entities that dance mindlessly around Azathoth at the center of the universe.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Tcho-Tcho:</span> 
                <span>Degenerate human tribes from the Plateau of Sung who worship ancient and terrible gods.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Lloigor:</span> 
                <span>Invisible entities that can control minds and matter through force of will.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Zhar:</span> 
                <span>Twin entity to Lloigor, often worshipped together as "The Twin Obscenities."</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Gla'aki:</span> 
                <span>A spiny, metallic entity that dwells in a lake and creates undead servants by impaling victims on its spines.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Y'golonac:</span> 
                <span>A headless, obese humanoid with mouths in its palms that embodies depravity and forbidden knowledge.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Chaugnar Faugn:</span> 
                <span>An elephant-headed idol that drinks blood through its trunk and can animate to feed.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Abhoth:</span> 
                <span>A pool of gray matter that constantly spawns diverse and malformed creatures from its mass.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Daoloth:</span> 
                <span>The "Render of the Veils," a being whose true form cannot be perceived without driving viewers mad.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Eihort:</span> 
                <span>A pale, bloated entity known as the "God of the Labyrinth" that implants its brood in human hosts.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Yibb-Tstll:</span> 
                <span>The "Patient One," a shrouded entity surrounded by bat-like vampiric beings called the Denizens.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Bugg-Shash:</span> 
                <span>A formless mass of darkness with glowing eyes that absorbs victims into its substance.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Cyäegha:</span> 
                <span>A great, tentacled eye surrounded by vaporous darkness that dwells beneath the earth.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ithaqua:</span> 
                <span>The "Wind-Walker," a giant humanoid that stalks the frozen north and carries victims away on the wind.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Mordiggian:</span> 
                <span>The "Charnel God," a great black shadow that consumes the dead in the city of Zul-Bha-Sair.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Rhan-Tegoth:</span> 
                <span>An ancient entity with a tentacled face and three legs that requires blood sacrifices to remain active.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ubbo-Sathla:</span> 
                <span>The source of all earthly life, a formless mass that dwells in a gray realm beneath the world.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Yog-Sothoth's Spawn:</span> 
                <span>Hybrid offspring of humans and Yog-Sothoth, possessing reality-warping powers and inhuman features.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Dhole:</span> 
                <span>Enormous worm-like entities that burrow through solid matter and inhabit the Vale of Pnath.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Gnophkeh:</span> 
                <span>Humanoids with crustacean-like features who once inhabited Hyperborea and worshipped Rhan-Tegoth.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Voormis:</span> 
                <span>Hairy, pre-human creatures that once inhabited Hyperborea and worshipped Tsathoggua.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Yuggs:</span> 
                <span>Conical beings with multiple tentacles that can possess human bodies and were imprisoned beneath Mount Voormithadreth.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Insects from Shaggai:</span> 
                <span>Intelligent, winged insects that fled their destroyed homeworld and can possess human hosts.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Servants of Glaaki:</span> 
                <span>Undead beings with metal spines protruding from their bodies, created by the entity Glaaki.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Xiclotl:</span> 
                <span>Amorphous, multi-limbed entities from another dimension that can be summoned through specific rituals.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Yekubians:</span> 
                <span>Intelligent, worm-like aliens with mechanical technology who once invaded Earth.</span>
              </div>
            </div>
            
            <p>
              These entities effectively utilize naming conventions to create monsters that feel alien and unsettling, serving as excellent examples for your own creative endeavors.
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

export default LovecraftianMonsterNameGenerator; 