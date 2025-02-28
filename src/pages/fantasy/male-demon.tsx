import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Wand2, Flame, Skull, Info } from "lucide-react";
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
import { loadNameData, generateNames, CharacterNameData } from "@/lib/nameUtils";
import { GeneratorImage } from "@/components/GeneratorImage";

const MaleDemonGenerator = () => {
  const [gender, setGender] = useState<"male" | "male">("male"); // Always male for this generator
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [nameData, setNameData] = useState<CharacterNameData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [nameDescription, setNameDescription] = useState<string | null>(null);

  // Load name data when component mounts
  useEffect(() => {
    async function fetchNameData() {
      setLoading(true);
      const data = await loadNameData("fantasy", "male-demon");
      setNameData(data as CharacterNameData);
      setLoading(false);
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData) return;
    
    const newNames = generateNames(nameData, { gender }, 10);
    setGeneratedNames(newNames);
  };

  const handleNameClick = (name: string) => {
    if (!nameData) return;
    
    setSelectedName(name);
    
    // Find description for each part of the name
    const [firstName, lastName] = name.split(' ');
    const firstNameEntry = nameData[gender].find(e => e.name === firstName);
    const lastNameEntry = nameData.lastNames.find(e => e.name === lastName);
    
    let description = '';
    if (firstNameEntry) {
      description += firstNameEntry.description;
    }
    if (firstNameEntry && lastNameEntry) {
      description += '. ';
    }
    if (lastNameEntry) {
      description += lastNameEntry.description;
    }
    
    setNameDescription(description);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>Male Demon Name Generator - 10,000+ Dark Fantasy Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ intimidating and dark names for male demons from the abyss. Our name generator creates powerful antagonists for your fantasy stories, games, and worldbuilding projects." />
        <meta name="keywords" content="male demon names, demon lord, dark fantasy, evil names, fantasy villain, name generator, occult names, fantasy character" />
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
              <Flame className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Male Demon Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate intimidating and dark names for male demons from the abyss.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Male Demon Names</CardTitle>
            <CardDescription>Generate unique male demon names for your fantasy characters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate male demon names"
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What is a Good Male Demon Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Male Demon Naming Traditions</a>
              </li>
              <li>
                <a href="#popular-names" className="text-primary hover:underline">Most Popular Male Demon Names</a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Introduction */}
        <section id="introduction" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Introduction</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Male demons are powerful supernatural entities often portrayed as embodiments of chaos, destruction, and corruption. 
              These malevolent beings typically possess immense strength, dark magic, and a desire to torment or enslave mortal souls. 
              In fantasy literature and games, demons frequently serve as formidable antagonists or tempting sources of forbidden power.
            </p>
            <p className="mb-4">
              Throughout history and across various mythologies, male demons have been depicted as terrible warriors, 
              cunning manipulators, or rulers of hellish domains. Their appearance often combines bestial features with 
              human-like intelligence, emphasizing their supernatural and fearsome nature.
            </p>
            <p>
              This generator creates names for these powerful entities, providing you with authentic-sounding 
              demonic names that reflect their dark nature and formidable presence.
            </p>
          </div>
          
          {/* Featured Male Demon Image */}
          <GeneratorImage 
            src="/images/categories/fantasy/male-demon/male-demon-main.jpg"
            alt="Male Demon"
            caption="A fearsome male demon with horns and infernal fire, embodying destruction and supernatural power."
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Male Demon Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A good male demon name should evoke power, dread, and supernatural malevolence. 
              Here are some characteristics that make for effective male demon names:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Harsh Sounds:</span> 
                <span>Names with hard consonants and guttural sounds that suggest danger and power.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ancient Origins:</span> 
                <span>Names drawing from dead languages or ancient civilizations like Sumerian, Akkadian, or Biblical Hebrew.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Infernal Titles:</span> 
                <span>Surnames or titles that indicate their rank, domain, or specific evil power.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ominous Elements:</span> 
                <span>Names referencing fire, darkness, destruction, or primordial chaos.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Imposing Length:</span> 
                <span>Names that have a weighty presence, either through complexity or careful simplicity.</span>
              </li>
            </ul>
            <p>
              Famous male demons from mythology and religion include <strong>Asmodeus</strong>, the demon of wrath and pride; 
              <strong>Baphomet</strong>, the goat-headed demon; <strong>Mephistopheles</strong>, the deal-maker; 
              and <strong>Baal</strong>, the ancient demon of storms.
            </p>
          </div>
        </section>

        {/* How to Use */}
        <section id="how-to-use" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">How to Use the Generator</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Using the Male Demon Name Generator is simple and intuitive. Here's how to get the most out of it:
            </p>
            <ol className="space-y-3 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">1.</span> 
                <span>Click the "Generate Names" button to create a list of male demon names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">2.</span> 
                <span>Browse through the generated names for one that fits your character or story.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">3.</span> 
                <span>If you want to see the meaning or description of a name, click on it to view more details.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">4.</span> 
                <span>Generate new sets of names as many times as you wish until you find the perfect one.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">5.</span> 
                <span>Use the generated name as-is, or let it inspire you to create your own variation.</span>
              </li>
            </ol>
            <p>
              Our generator combines first names and titles based on mythology, folklore, and fantasy literature 
              to create authentic-sounding demonic names with dark and powerful connotations.
            </p>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Male Demon Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Male demon naming traditions vary across different mythologies and fantasy worlds, but several 
              common patterns emerge across cultures:
            </p>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-primary">Hierarchical Naming</h3>
              <p>
                In many demonologies, names often denote rank and position. Demons like Beelzebub ("Lord of the Flies") 
                and Asmodeus ("King of Demons") demonstrate how titles form an integral part of demonic identity, 
                reflecting their position in the infernal hierarchy.
              </p>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-primary">Corruption of Divine Names</h3>
              <p>
                Some demonic names are derived from or parody divine names, reflecting the fallen nature of these beings. 
                This tradition stems from the belief that demons are corrupted or fallen entities, their names twisted 
                reflections of their former glory.
              </p>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-primary">Domain-Based Names</h3>
              <p>
                Many male demons are named for their specific domain or function. A demon of wrath might have a name 
                incorporating elements suggesting anger or violence, while a demon of pestilence might have a name 
                suggesting disease or decay.
              </p>
            </div>
          </div>
          
          {/* Featured Male Demon Image */}
          <GeneratorImage 
            src="/images/categories/fantasy/male-demon/male-demon-group.jpg"
            alt="Group of Male Demons"
            caption="A council of powerful male demons, each bearing the marks and symbols of their particular domains of evil."
          />
        </section>

        {/* Popular Names */}
        <section id="popular-names" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Most Popular Male Demon Names</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-6">
              Throughout mythology, religious texts, and modern fantasy, certain male demon names have become iconic. 
              Below we've compiled extensive lists of these names, divided into categories.
            </p>
            
            {/* Male Demon First Names */}
            <h3 className="text-xl font-semibold mb-3 text-primary">Popular Male Demon Names</h3>
            <p className="mb-4">
              These primary names of male demons often reflect their impressive power, ancient origins, or domains of influence.
            </p>
            <div className="overflow-x-auto mb-8">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Origin</TableHead>
                    <TableHead>Notable Characteristics</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Lucifer</TableCell>
                    <TableCell>Biblical/Christian</TableCell>
                    <TableCell>The fallen angel, often referred to as the "morning star" or "light-bringer"</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Asmodeus</TableCell>
                    <TableCell>Jewish/Persian</TableCell>
                    <TableCell>Demon of wrath and pride, king of the demons in some traditions</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Baphomet</TableCell>
                    <TableCell>Medieval European</TableCell>
                    <TableCell>Goat-headed demon often associated with the occult and forbidden knowledge</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Mephistopheles</TableCell>
                    <TableCell>German folklore</TableCell>
                    <TableCell>Demon associated with Faust, known for making deals with mortals</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Baal</TableCell>
                    <TableCell>Canaanite/Phoenician</TableCell>
                    <TableCell>Ancient deity later demonized, associated with storms and fertility</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Mammon</TableCell>
                    <TableCell>Biblical/Christian</TableCell>
                    <TableCell>Personification of wealth and greed, tempter of avarice</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Belial</TableCell>
                    <TableCell>Hebrew</TableCell>
                    <TableCell>"Without worth," associated with lawlessness and rebellion</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Azazel</TableCell>
                    <TableCell>Jewish/Islamic</TableCell>
                    <TableCell>Taught humans to make weapons and jewelry, associated with desert wastelands</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Pazuzu</TableCell>
                    <TableCell>Mesopotamian</TableCell>
                    <TableCell>Demon of wind, bearer of storms and drought</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Samael</TableCell>
                    <TableCell>Talmudic/Jewish</TableCell>
                    <TableCell>"Venom of God," archangel of death and accuser</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Abaddon</TableCell>
                    <TableCell>Biblical</TableCell>
                    <TableCell>"The Destroyer," angel of the bottomless pit</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Beelzebub</TableCell>
                    <TableCell>Biblical/Christian</TableCell>
                    <TableCell>"Lord of the Flies," prince of demons and gluttony</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Dagon</TableCell>
                    <TableCell>Philistine/Mesopotamian</TableCell>
                    <TableCell>Fish-god associated with the deep sea and harvest</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Moloch</TableCell>
                    <TableCell>Canaanite</TableCell>
                    <TableCell>Associated with child sacrifice and fire</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Leviathan</TableCell>
                    <TableCell>Biblical/Hebrew</TableCell>
                    <TableCell>Enormous sea monster representing chaos, envy, and the depths</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            {/* Demonic Titles and Surnames */}
            <h3 className="text-xl font-semibold mb-3 text-primary">Demonic Titles and Surnames</h3>
            <p className="mb-4">
              Male demons often carry titles or surnames that denote their rank, domain of influence, or specific powers.
            </p>
            <div className="overflow-x-auto mb-8">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title/Surname</TableHead>
                    <TableHead>Association</TableHead>
                    <TableHead>Significance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">the Undying</TableCell>
                    <TableCell>Immortality</TableCell>
                    <TableCell>Cannot be truly killed, always returns from destruction</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Prince of Lies</TableCell>
                    <TableCell>Deception</TableCell>
                    <TableCell>Master of falsehoods and manipulation</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Soulflayer</TableCell>
                    <TableCell>Soul destruction</TableCell>
                    <TableCell>Capable of destroying souls, not merely claiming them</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Lord of Cinders</TableCell>
                    <TableCell>Fire/Destruction</TableCell>
                    <TableCell>Rules over realms of ash and flame</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">The Unforgiven</TableCell>
                    <TableCell>Eternal punishment</TableCell>
                    <TableCell>Cast out without hope of redemption</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Corruptor</TableCell>
                    <TableCell>Moral degradation</TableCell>
                    <TableCell>Specializes in turning virtue to vice</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Master of Chains</TableCell>
                    <TableCell>Bondage/Slavery</TableCell>
                    <TableCell>Binds souls and will to his service</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Voidbringer</TableCell>
                    <TableCell>Nihilism/Emptiness</TableCell>
                    <TableCell>Creates emptiness, despair, and existential dread</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Harbinger of Ruin</TableCell>
                    <TableCell>Disaster/Apocalypse</TableCell>
                    <TableCell>Portends and brings about catastrophic events</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Blooddrinker</TableCell>
                    <TableCell>Blood rituals</TableCell>
                    <TableCell>Gains power from violence and bloodshed</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Duke of Torment</TableCell>
                    <TableCell>Nobility/Pain</TableCell>
                    <TableCell>Noble rank among demons, specializing in inflicting suffering</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Shadowlord</TableCell>
                    <TableCell>Darkness/Shadow</TableCell>
                    <TableCell>Commands darkness and shadow magic</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            {/* Lesser-Known Demons */}
            <h3 className="text-xl font-semibold mb-3 text-primary">Lesser-Known Demons from Ancient Texts</h3>
            <p className="mb-4">
              These more obscure demonic entities appear in various religious texts, grimoires, and cultural mythologies.
            </p>
            <div className="overflow-x-auto mb-8">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Text Source</TableHead>
                    <TableHead>Domain or Power</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Andrealphus</TableCell>
                    <TableCell>Pseudomonarchia Daemonum</TableCell>
                    <TableCell>Teaches geometry and mathematics, can transform humans into birds</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Dantalion</TableCell>
                    <TableCell>The Lesser Key of Solomon</TableCell>
                    <TableCell>Knows all human thoughts, can influence decisions, teaches all arts and sciences</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Orobas</TableCell>
                    <TableCell>Ars Goetia</TableCell>
                    <TableCell>Answers truthfully about past, present and future, never lies, grants dignities</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Vine</TableCell>
                    <TableCell>The Lesser Key of Solomon</TableCell>
                    <TableCell>Discovers hidden things, reveals witches, builds towers and tears down walls</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Ronove</TableCell>
                    <TableCell>Pseudomonarchia Daemonum</TableCell>
                    <TableCell>Teaches rhetoric and languages, provides good servants</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Naberius</TableCell>
                    <TableCell>Ars Goetia</TableCell>
                    <TableCell>Restores lost dignities and honors, teaches arts and sciences</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Bifrons</TableCell>
                    <TableCell>The Lesser Key of Solomon</TableCell>
                    <TableCell>Teaches astrology, geometry, and other arts, moves bodies from their graves</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            <h3 className="text-xl font-semibold mb-3 text-primary">Using Our Generator</h3>
            <p className="mb-3">
              Our generator creates formidable male demon names by combining powerful first names drawn from mythology 
              and ancient texts with imposing titles and domains. Each generated name includes a description of 
              its meaning, origins, or the demonic powers it represents.
            </p>
            <p>
              For endless possibilities beyond these common examples, use the generator at the top of the page to create
              distinctive male demon names for your fiction, games, or creative projects.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MaleDemonGenerator; 