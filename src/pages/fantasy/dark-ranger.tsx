import { useState, useEffect } from "react";
import { Wand2, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Helmet } from "react-helmet";
import { loadNameData, generateNames, CharacterNameData } from "@/lib/nameUtils";
import { GeneratorImage } from "@/components/GeneratorImage";

const DarkRangerNameGenerator = () => {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [nameData, setNameData] = useState<CharacterNameData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [nameDescription, setNameDescription] = useState<string | null>(null);

  // Load name data when component mounts
  useEffect(() => {
    async function fetchNameData() {
      setLoading(true);
      const data = await loadNameData("fantasy", "dark-ranger");
      setNameData(data as CharacterNameData);
      setLoading(false);
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData) return;
    
    // Check if we have the expected data structure
    if (nameData[gender] && nameData[gender].length > 0) {
      // Randomly select 10 names from the data
      const shuffled = [...nameData[gender]].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 10);
      setGeneratedNames(selected.map(entry => entry.name));
    } else {
      console.error("Invalid name data structure or empty data");
      setGeneratedNames([]);
    }
  };

  const handleNameClick = (name: string) => {
    if (!nameData) return;
    
    setSelectedName(name);
    
    // Find the description for the selected name
    const nameEntry = nameData[gender].find(entry => entry.name === name);
    if (nameEntry) {
      setNameDescription(nameEntry.description);
    } else {
      setNameDescription(null);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>Dark Ranger Name Generator - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate the perfect name for your dark ranger character. Over 10,000 unique name combinations available." />
        <meta name="keywords" content="dark ranger, shadow ranger, fantasy names, name generator, undead, shadow, character names, RPG names" />
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
              <Wand2 className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Dark Ranger Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate the perfect name for your dark ranger character.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Dark Ranger Names</CardTitle>
            <CardDescription>Select gender and generate unique dark ranger names</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <span className="text-sm font-medium">Gender:</span>
                <div className="flex gap-2">
                  <Toggle 
                    pressed={gender === "male"} 
                    onPressedChange={() => setGender("male")}
                    variant="outline"
                    aria-label="Select male gender"
                  >
                    Male
                  </Toggle>
                  <Toggle 
                    pressed={gender === "female"} 
                    onPressedChange={() => setGender("female")}
                    variant="outline"
                    aria-label="Select female gender"
                  >
                    Female
                  </Toggle>
                </div>
              </div>
              
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate dark ranger names"
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What is a Good Dark Ranger Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Dark Ranger Naming Traditions</a>
              </li>
              <li>
                <a href="#popular-names" className="text-primary hover:underline">Most Popular Dark Ranger Names</a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Introduction */}
        <section id="introduction" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Introduction</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Dark Rangers are enigmatic warriors who have embraced the shadows, often after experiencing profound 
              tragedy or transformation. These spectral hunters combine exceptional archery skills with dark magic, 
              creating a formidable blend of ranger prowess and necromantic abilities.
            </p>
            <p className="mb-4">
              Whether they are undead beings seeking vengeance, living warriors who have made pacts with shadow entities, 
              or simply rangers who have chosen to harness the power of darkness, Dark Rangers inspire both fear and awe. 
              They excel at stealth, ambush tactics, and can often manipulate shadows or drain life essence from their foes.
            </p>
            <p>
              This generator creates names that evoke the mysterious and shadowy nature of these dark hunters, 
              providing you with names that reflect both their ranger skills and their connection to darkness.
            </p>
          </div>
          
          {/* Featured Dark Ranger Image */}
          <GeneratorImage 
            src="/images/categories/fantasy/dark-ranger/dark-ranger-main.jpg"
            alt="Dark Ranger"
            caption="A Dark Ranger emerges from the shadows, bow drawn and eyes glowing with an eerie light, ready to unleash vengeance upon the living."
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Dark Ranger Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A good Dark Ranger name should evoke their shadowy nature and hint at their tragic or sinister past. 
              Here are some characteristics that make for effective Dark Ranger names:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Shadow Elements:</span> 
                <span>References to darkness, shadows, night, or void that symbolize their connection to dark forces.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Harsh Sounds:</span> 
                <span>Names with harsh consonants and sibilants that convey a sense of danger and power.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Death Imagery:</span> 
                <span>References to death, undeath, or the afterlife for those who have returned from beyond.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ominous Quality:</span> 
                <span>Names that sound foreboding or threatening, reflecting their intimidating presence.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Tragic Hints:</span> 
                <span>Names that subtly suggest a tragic past or a fall from grace.</span>
              </li>
            </ul>
            <p>
              The most effective Dark Ranger names often combine a shadowy first name with a surname or epithet that 
              hints at their deadly skills, creating a name that feels both ominous and fitting for a hunter of the shadows.
            </p>
          </div>
        </section>

        {/* How to Use */}
        <section id="how-to-use" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">How to Use the Generator</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">Using our Dark Ranger Name Generator is straightforward:</p>
            <ol className="space-y-3 mb-6 pl-5">
              <li className="pl-2">
                <span className="font-semibold text-primary">Select Gender:</span> Choose whether you want male or female names.
              </li>
              <li className="pl-2">
                <span className="font-semibold text-primary">Generate Names:</span> Click the "Generate Names" button to create a list of 10 unique Dark Ranger names.
              </li>
              <li className="pl-2">
                <span className="font-semibold text-primary">Browse Results:</span> Look through the generated names to find one that suits your character.
              </li>
              <li className="pl-2">
                <span className="font-semibold text-primary">Regenerate if Needed:</span> If none of the names appeal to you, simply click the button again for a new set.
              </li>
              <li className="pl-2">
                <span className="font-semibold text-primary">Mix and Match:</span> Feel free to combine different first names and surnames from the generated results to create your perfect Dark Ranger name.
              </li>
            </ol>
            <p>
              Each generated name comes with a brief description that suggests the character's personality or notable skills, 
              helping to inspire your character creation.
            </p>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Dark Ranger Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-5">
              Dark Ranger naming traditions often reflect their transformation from ordinary rangers to beings of shadow:
            </p>
            <ul className="space-y-4 mb-6">
              <li>
                <span className="font-semibold text-primary">Abandoned Names:</span> Many Dark Rangers abandon their birth names upon their transformation, adopting new identities that reflect their new nature and severing ties with their past lives.
              </li>
              <li>
                <span className="font-semibold text-primary">Shadow Epithets:</span> Dark Rangers often adopt titles or epithets related to darkness, death, or vengeance, such as "Shadowwhisper," "Grimveil," or "Nightreaver."
              </li>
              <li>
                <span className="font-semibold text-primary">Corrupted Names:</span> Some Dark Rangers twist or corrupt their original names, creating darker versions that reflect their transformation. A ranger named "Brightarrow" might become "Darkshaft."
              </li>
              <li>
                <span className="font-semibold text-primary">Death Symbolism:</span> Names that incorporate symbols of death or undeath are common among those who have returned from beyond, with references to ravens, bones, ash, or spectral entities.
              </li>
              <li>
                <span className="font-semibold text-primary">Void References:</span> Some Dark Rangers, particularly those who draw power from cosmic darkness or void energies, adopt names that reference the void, oblivion, or cosmic emptiness.
              </li>
            </ul>
            <p>
              These naming traditions help Dark Rangers establish their new identities and inspire fear in their enemies, 
              while also serving as constant reminders of their transformation and purpose.
            </p>
          </div>
        </section>

        {/* Popular Names */}
        <section id="popular-names" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Most Popular Dark Ranger Names</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-5">
              While Dark Rangers are often solitary and unique in their identities, certain names have become iconic among these shadow hunters:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Popular Male Dark Ranger Names</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Meaning/Origin</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Shadowreaver</TableCell>
                      <TableCell>One who tears shadows from reality to use as weapons</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Duskwhisper</TableCell>
                      <TableCell>Silent hunter who strikes at twilight</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Voidwalker</TableCell>
                      <TableCell>One who has traversed the void between life and death</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Grimshade</TableCell>
                      <TableCell>Master of deadly shadow magic</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Nightveil</TableCell>
                      <TableCell>One who wears the night like a cloak</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Blackarrow</TableCell>
                      <TableCell>Archer whose arrows are imbued with dark energy</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Soulbinder</TableCell>
                      <TableCell>One who can capture and manipulate souls</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Umbramancer</TableCell>
                      <TableCell>Master of shadow magic and dark rituals</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Deathwhisper</TableCell>
                      <TableCell>One whose voice carries the chill of the grave</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Gloomstrider</TableCell>
                      <TableCell>Hunter who moves unseen through shadowy realms</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Netherblade</TableCell>
                      <TableCell>Wielder of weapons forged in the realm of shadows</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Dreadseeker</TableCell>
                      <TableCell>One who hunts for the darkest secrets and forbidden knowledge</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Abysswalker</TableCell>
                      <TableCell>Ranger who has ventured into the deepest darkness and returned</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Wraithbane</TableCell>
                      <TableCell>Hunter specialized in tracking and destroying spectral entities</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Darkhunter</TableCell>
                      <TableCell>One who stalks prey using the power of darkness itself</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Soulreaper</TableCell>
                      <TableCell>Collector of souls from those who have wronged him</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Nightstalker</TableCell>
                      <TableCell>Predator who becomes one with the darkness of night</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Shadowthorn</TableCell>
                      <TableCell>One whose arrows pierce both flesh and spirit</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Grimwalker</TableCell>
                      <TableCell>Ranger who treads the boundary between life and death</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Eclipsehunter</TableCell>
                      <TableCell>Most powerful during celestial events that darken the sky</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Ashbringer</TableCell>
                      <TableCell>One who reduces enemies to ash with dark fire</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Voidarcher</TableCell>
                      <TableCell>Archer whose arrows are pulled from the void itself</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Duskblade</TableCell>
                      <TableCell>Warrior whose weapons absorb light around them</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Nightshade</TableCell>
                      <TableCell>Master of poisons and toxic shadow energy</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Soulstrider</TableCell>
                      <TableCell>Can step between the realm of the living and dead</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Darkcaller</TableCell>
                      <TableCell>Summons creatures of shadow to aid in the hunt</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Gloomweaver</TableCell>
                      <TableCell>Creates tangible darkness that can be shaped into weapons</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Shadowbane</TableCell>
                      <TableCell>Once fought against darkness before embracing it</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Dreadbow</TableCell>
                      <TableCell>Archer whose every shot instills supernatural fear</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Popular Female Dark Ranger Names</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Meaning/Origin</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Ravensorrow</TableCell>
                      <TableCell>One who carries grief like a raven's wings</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Shadowmourne</TableCell>
                      <TableCell>Hunter who mourns her lost life through vengeance</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Nightwhisper</TableCell>
                      <TableCell>Silent assassin who speaks only in darkness</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Grimheart</TableCell>
                      <TableCell>One whose heart beats with dark purpose</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Voidarrow</TableCell>
                      <TableCell>Archer whose arrows are imbued with void energy</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Darkwhisper</TableCell>
                      <TableCell>One who communicates with shadows and spirits</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Eclipsehunter</TableCell>
                      <TableCell>Ranger who draws power from celestial darkness</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Umbrastalker</TableCell>
                      <TableCell>One who hunts from within the shadows themselves</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Nightshade</TableCell>
                      <TableCell>Deadly hunter named after the poisonous plant</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Soulweaver</TableCell>
                      <TableCell>One who can manipulate the essence of life and death</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Gloomveil</TableCell>
                      <TableCell>Shrouds herself in a mist of tangible darkness</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Shadowdancer</TableCell>
                      <TableCell>Moves with hypnotic grace between patches of darkness</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Nightreaper</TableCell>
                      <TableCell>Harvests souls under the cover of darkness</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Duskbringer</TableCell>
                      <TableCell>Can prematurely bring nightfall to aid her hunts</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Voidweaver</TableCell>
                      <TableCell>Creates weapons and armor from solidified darkness</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Grimwalker</TableCell>
                      <TableCell>Traverses paths of death that others cannot perceive</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Shadowheart</TableCell>
                      <TableCell>Her heart pulses with shadow energy instead of blood</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Darksister</TableCell>
                      <TableCell>Member of a sisterhood dedicated to shadow magic</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Abyssgaze</TableCell>
                      <TableCell>Her eyes reflect the infinite darkness of the void</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Wraithwalker</TableCell>
                      <TableCell>Moves between the physical world and spirit realm</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Moonshadow</TableCell>
                      <TableCell>Draws power from the dark side of the moon</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Blackrose</TableCell>
                      <TableCell>Beautiful and deadly, with thorns that drain life</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Dreadweaver</TableCell>
                      <TableCell>Creates illusions of terror from shadow magic</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Soulseeker</TableCell>
                      <TableCell>Hunts for specific souls to complete dark rituals</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Nightsorrow</TableCell>
                      <TableCell>Carries the grief of her past life in eternal darkness</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Ebonheart</TableCell>
                      <TableCell>Her heart has been replaced with dark crystal</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Shadowsong</TableCell>
                      <TableCell>Her voice carries enchantments that bend shadows</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Darkhunter</TableCell>
                      <TableCell>Specializes in hunting creatures of pure darkness</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Voidwatcher</TableCell>
                      <TableCell>Can perceive events happening in the darkest realms</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <p>
              These names have become iconic because they effectively convey the dark nature, tragic past, and deadly skills 
              that define Dark Rangers. They serve as inspiration for many who walk the path of shadow and vengeance.
            </p>
          </div>
        </section>

        {/* Latest Generators */}
        <section className="mb-8 sm:mb-12 border-t border-border pt-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Latest Fantasy Generators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/fantasy/ranger" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
              <h3 className="font-bold mb-2">Ranger Names</h3>
              <p className="text-sm text-muted-foreground">Generate classic names for wilderness scouts and hunters</p>
            </Link>
            <Link to="/fantasy/acotar" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
              <h3 className="font-bold mb-2">ACOTAR Names</h3>
              <p className="text-sm text-muted-foreground">Create names inspired by the Court of Thorns and Roses series</p>
            </Link>
            <Link to="/fantasy/female-alien" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
              <h3 className="font-bold mb-2">Female Alien Names</h3>
              <p className="text-sm text-muted-foreground">Generate unique and exotic names for female alien characters</p>
            </Link>
            <Link to="/fantasy/elven-ranger" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
              <h3 className="font-bold mb-2">Elven Ranger Names</h3>
              <p className="text-sm text-muted-foreground">Generate mystical and nature-attuned names for elven rangers</p>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 sm:mt-24 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>Copyright 2025 – FantasyNamesGen</p>
        </footer>
      </div>
    </div>
  );
};

export default DarkRangerNameGenerator; 