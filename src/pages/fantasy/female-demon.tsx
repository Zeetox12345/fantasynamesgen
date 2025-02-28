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

const FemaleDemonGenerator = () => {
  const [gender, setGender] = useState<"female" | "female">("female"); // Always female for this generator
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [nameData, setNameData] = useState<CharacterNameData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [nameDescription, setNameDescription] = useState<string | null>(null);

  // Load name data when component mounts
  useEffect(() => {
    async function fetchNameData() {
      setLoading(true);
      const data = await loadNameData("fantasy", "female-demon");
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
        <title>Female Demon Name Generator - Dark Fantasy Names | FantasyNamesGen</title>
        <meta name="description" content="Generate dark and powerful names for female demons from fantasy realms. Create sinister characters for your stories and games." />
        <meta name="keywords" content="female demon names, demoness, dark fantasy, evil names, fantasy villain, name generator, occult names, fantasy character" />
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
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Female Demon Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate dark and powerful names for female demons from fantasy realms.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Female Demon Names</CardTitle>
            <CardDescription>Generate unique female demon names for your fantasy characters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate female demon names"
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What is a Good Female Demon Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Female Demon Naming Traditions</a>
              </li>
              <li>
                <a href="#popular-names" className="text-primary hover:underline">Most Popular Female Demon Names</a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Introduction */}
        <section id="introduction" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Introduction</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Female demons, often called demonesses, are powerful supernatural entities in mythology and fantasy literature. 
              These dark beings often possess formidable magical abilities, cunning intelligence, and deadly charisma. 
              Unlike their male counterparts who might rely on brute force, female demons are frequently depicted as 
              masters of manipulation, illusion, and subtle corruption.
            </p>
            <p className="mb-4">
              Throughout mythology and fiction, female demons have played significant roles as temptresses, 
              harbingers of destruction, or powerful rulers of infernal realms. Their characterization often 
              combines elements of beauty and terror, embodying both seduction and danger.
            </p>
            <p>
              This generator creates names for these formidable beings, providing you with authentic-sounding 
              demonic names that reflect their dark nature and supernatural power.
            </p>
          </div>
          
          {/* Featured Female Demon Image */}
          <GeneratorImage 
            src="/images/categories/fantasy/female-demon/female-demon-main.jpg"
            alt="Female Demon"
            caption="A powerful female demon with dark wings and flames, embodying supernatural beauty and terror."
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Female Demon Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A good female demon name should evoke their supernatural nature and dark power. 
              Here are some characteristics that make for effective female demon names:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Dark Elegance:</span> 
                <span>Names that sound beautiful yet sinister, often with smooth, flowing sounds.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ancient Origins:</span> 
                <span>Names that draw from ancient languages like Sumerian, Akkadian, or Biblical Hebrew.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Powerful Titles:</span> 
                <span>Surnames or titles that reflect their domain, power, or role in the infernal hierarchy.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Symbolic Elements:</span> 
                <span>Names that reference darkness, fire, night, sin, or other elements associated with the demonic.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Harsh Consonants:</span> 
                <span>Strategic use of harsh sounds to contrast with otherwise elegant names, creating an unsettling effect.</span>
              </li>
            </ul>
            <p>
              Famous female demons from mythology include <strong>Lilith</strong>, the first wife of Adam who refused subservience; 
              <strong>Lamashtu</strong>, the Mesopotamian demoness who brought nightmares and stole children; and 
              <strong>Ereshkigal</strong>, the fearsome queen of the underworld.
            </p>
          </div>
        </section>

        {/* How to Use */}
        <section id="how-to-use" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">How to Use the Generator</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Using the Female Demon Name Generator is simple and intuitive. Here's how to get the most out of it:
            </p>
            <ol className="space-y-3 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">1.</span> 
                <span>Click the "Generate Names" button to create a list of female demon names.</span>
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Female Demon Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Female demon naming traditions vary across different mythologies and fantasy worlds, but several 
              common patterns emerge across cultures:
            </p>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-primary">Ancient Mythological Influences</h3>
              <p>
                Many female demon names draw from ancient mythologies, particularly Mesopotamian, Hebrew, and Greco-Roman sources. 
                Names like Lilith, Naamah, and Eisheth reflect these ancient traditions and carry the weight of 
                centuries of folklore.
              </p>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-primary">Titles and Domains</h3>
              <p>
                Female demons often have names or titles that reflect their specific domain or power. 
                A demoness of nightmares might bear a name like "Nightshade" or "Dreamweaver," while one associated with 
                corruption might be called "Soultaker" or "Heartbinder."
              </p>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-primary">Infernal Hierarchy</h3>
              <p>
                In many fictional demonologies, names reflect the demon's position in the infernal hierarchy. 
                Titles like "Duchess," "Countess," or "Queen" might precede or follow their personal name, 
                indicating their rank within the demonic court.
              </p>
            </div>
          </div>
          
          {/* Featured Female Demon Image */}
          <GeneratorImage 
            src="/images/categories/fantasy/female-demon/female-demon-group.jpg"
            alt="Group of Female Demons"
            caption="A gathering of female demons in their infernal court, each with distinct appearances reflecting their domains of power."
          />
        </section>

        {/* Popular Names */}
        <section id="popular-names" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Most Popular Female Demon Names</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-6">
              Throughout mythology, literature, and popular culture, certain female demon names have gained prominence. 
              Below we've compiled extensive lists of these names, divided into categories.
            </p>
            
            {/* Female Demon First Names */}
            <h3 className="text-xl font-semibold mb-3 text-primary">Popular Female Demon Names</h3>
            <p className="mb-4">
              These primary names of female demons often reflect their ancient origins, sinister nature, or domains of power.
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
                    <TableCell className="font-medium">Lilith</TableCell>
                    <TableCell>Hebrew mythology</TableCell>
                    <TableCell>First wife of Adam, refused subservience, associated with night and storms</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Lamashtu</TableCell>
                    <TableCell>Mesopotamian mythology</TableCell>
                    <TableCell>Demoness who threatened pregnant women and infants</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Ereshkigal</TableCell>
                    <TableCell>Sumerian mythology</TableCell>
                    <TableCell>Queen of the underworld and goddess of death</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Hecate</TableCell>
                    <TableCell>Greek mythology</TableCell>
                    <TableCell>Goddess associated with witchcraft, crossroads, and necromancy</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Naamah</TableCell>
                    <TableCell>Hebrew mythology</TableCell>
                    <TableCell>Demoness of seduction and mother of divination</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Jezebeth</TableCell>
                    <TableCell>Demonic lore</TableCell>
                    <TableCell>Mistress of deception and false promises</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Morrigan</TableCell>
                    <TableCell>Celtic mythology</TableCell>
                    <TableCell>Goddess of war and fate, often portrayed with demonic aspects</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Agrat</TableCell>
                    <TableCell>Hebrew demonology</TableCell>
                    <TableCell>Queen of demons associated with prostitution and night terror</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Proserpina</TableCell>
                    <TableCell>Roman mythology</TableCell>
                    <TableCell>Queen of the underworld who rules over the dead</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Kali</TableCell>
                    <TableCell>Hindu mythology</TableCell>
                    <TableCell>Goddess of destruction and death, often depicted with demonic aspects</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Bathory</TableCell>
                    <TableCell>Historical reference</TableCell>
                    <TableCell>Named after Elizabeth Bathory, associated with blood and cruelty</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Mazikeen</TableCell>
                    <TableCell>Jewish mythology</TableCell>
                    <TableCell>Female demon known for causing harm and mischief</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Abaddon</TableCell>
                    <TableCell>Biblical</TableCell>
                    <TableCell>Angel of the abyss, destroyer, associated with locusts and plague</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Succorbenoth</TableCell>
                    <TableCell>Demonic lore</TableCell>
                    <TableCell>Demon of jealousy and gate guardian of infernal realms</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Nocturna</TableCell>
                    <TableCell>Latin, "night"</TableCell>
                    <TableCell>Controls shadows and darkness, most powerful at midnight</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            {/* Demonic Titles and Surnames */}
            <h3 className="text-xl font-semibold mb-3 text-primary">Demonic Titles and Surnames</h3>
            <p className="mb-4">
              Female demons often bear titles or surnames that denote their rank, domain of power, or specific abilities.
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
                    <TableCell className="font-medium">of the Abyss</TableCell>
                    <TableCell>Infernal depth</TableCell>
                    <TableCell>Demons who rule the deepest, darkest parts of the underworld</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Bloodmoon</TableCell>
                    <TableCell>Celestial omen</TableCell>
                    <TableCell>Associated with blood magic and ritual sacrifice</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Nightshade</TableCell>
                    <TableCell>Poisonous plant</TableCell>
                    <TableCell>Indicates mastery of poisons and toxic influence</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Soulthief</TableCell>
                    <TableCell>Soul collection</TableCell>
                    <TableCell>Ability to extract and collect mortal souls</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Shadowweaver</TableCell>
                    <TableCell>Shadow manipulation</TableCell>
                    <TableCell>Can control and shape shadows as weapons or tools</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Duchess of Pain</TableCell>
                    <TableCell>Infernal nobility</TableCell>
                    <TableCell>Noble rank denoting rulership over realms of suffering</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Hearteater</TableCell>
                    <TableCell>Emotional vampirism</TableCell>
                    <TableCell>Feeds on and manipulates emotions, especially love</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Veilripper</TableCell>
                    <TableCell>Dimensional power</TableCell>
                    <TableCell>Can tear the veil between worlds, allowing transit between realms</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Mother of Serpents</TableCell>
                    <TableCell>Demonic progeny</TableCell>
                    <TableCell>Progenitor of venomous or corrupting entities</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Hellfire</TableCell>
                    <TableCell>Infernal flames</TableCell>
                    <TableCell>Commands eternal, soul-burning flames</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Queen of Whispers</TableCell>
                    <TableCell>Secret knowledge</TableCell>
                    <TableCell>Collects and trades in dangerous secrets and forbidden knowledge</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Tormentor</TableCell>
                    <TableCell>Suffering</TableCell>
                    <TableCell>Specializes in creating elaborate and personalized suffering</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Ashbringer</TableCell>
                    <TableCell>Destruction</TableCell>
                    <TableCell>Reduces all in her path to ash and ruin</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            {/* Medieval Grimoire Names */}
            <h3 className="text-xl font-semibold mb-3 text-primary">Names from Medieval Grimoires</h3>
            <p className="mb-4">
              These rare names appear in ancient texts and medieval grimoires, often with specific summoning rituals attached.
            </p>
            <div className="overflow-x-auto mb-8">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Text Source</TableHead>
                    <TableHead>Associated Powers</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Astaroth</TableCell>
                    <TableCell>The Lesser Key of Solomon</TableCell>
                    <TableCell>Keeper of secrets, grants knowledge of liberal sciences and past/future events</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Vepar</TableCell>
                    <TableCell>Pseudomonarchia Daemonum</TableCell>
                    <TableCell>Controls waters and can create storms or cause death by infected wounds</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Gremory</TableCell>
                    <TableCell>Ars Goetia</TableCell>
                    <TableCell>Reveals hidden treasures and the secrets of love</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Marchosias</TableCell>
                    <TableCell>The Lesser Key of Solomon</TableCell>
                    <TableCell>Skilled in battle and can answer questions truthfully</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Seere</TableCell>
                    <TableCell>Dictionnaire Infernal</TableCell>
                    <TableCell>Can transport anywhere instantaneously and reveal thefts</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Furfur</TableCell>
                    <TableCell>The Lesser Key of Solomon</TableCell>
                    <TableCell>Creates storms, lightning, and thunder, speaks with a hoarse voice</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Valefor</TableCell>
                    <TableCell>Ars Goetia</TableCell>
                    <TableCell>Tempts people to steal and maintains good relationships among thieves</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            <h3 className="text-xl font-semibold mb-3 text-primary">Using Our Generator</h3>
            <p className="mb-3">
              Our generator creates unique female demon names by combining authentic first names drawn from mythology 
              and ancient texts with powerful titles and domains. Each generated name includes a description of 
              its meaning, origins, or the demonic powers it might represent.
            </p>
            <p>
              For endless possibilities beyond these common examples, use the generator at the top of the page to create
              distinctive female demon names for your fiction, games, or creative projects.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FemaleDemonGenerator; 