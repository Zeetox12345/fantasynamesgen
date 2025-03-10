import { useState, useEffect } from "react";
import { Sword, Info } from "lucide-react";
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

const GladiatorNameGenerator = () => {
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
        const data = await import('@/data/dnd/gladiator.json');
        setNameData(data.default || data);
      } catch (error) {
        console.error("Error loading D&D gladiator name data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.gladiatorNames || !nameData.gladiatorNames.length) {
      console.error("No D&D gladiator name data available");
      return;
    }
    
    // Randomly select 10 names from the data
    const shuffled = [...nameData.gladiatorNames].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setGeneratedNames(selected.map(entry => entry.name));
  };

  const handleNameClick = (name: string) => {
    if (!nameData || !nameData.gladiatorNames) return;
    
    setSelectedName(name);
    
    // Find the description for the selected name
    const nameEntry = nameData.gladiatorNames.find(entry => entry.name === name);
    if (nameEntry) {
      setNameDescription(nameEntry.description);
    } else {
      setNameDescription(null);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>DnD Gladiator Name Generator - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ powerful and memorable names for gladiator characters in Dungeons & Dragons. Create the perfect name for your next D&D campaign!" />
        <meta name="keywords" content="D&D, DnD, Dungeons and Dragons, gladiator names, fantasy names, RPG character names, D&D 5e, arena fighter" />
      </Helmet>
      <div className="max-w-7xl mx-auto">
        {/* Header with back button */}
        <div className="mb-6 sm:mb-8">
          <Link 
            to="/dungeonsanddragons" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4 sm:mb-6"
            onClick={() => window.scrollTo(0, 0)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            Back to Dungeons and Dragons
          </Link>
          
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 rounded-lg bg-primary/10 text-primary">
              <Sword className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">DnD Gladiator Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate powerful and memorable names for gladiator characters in Dungeons & Dragons.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Gladiator Names</CardTitle>
            <CardDescription>Create powerful and memorable names for gladiator characters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate gladiator names"
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What Makes a Good Gladiator Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Gladiator Naming Traditions</a>
              </li>
              <li>
                <a href="#popular-names" className="text-primary hover:underline">Popular Gladiator Names</a>
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
              Gladiators represent some of the most iconic warrior figures in fantasy and historical settings alike. 
              These arena fighters, whether slaves forced to battle for entertainment or free warriors seeking glory and fortune, 
              have captured the imagination of audiences for centuries.
            </p>
            <p className="mb-4">
              In Dungeons & Dragons, gladiator characters often have names that evoke strength, ferocity, and spectacle. 
              Their names frequently incorporate elements that highlight their fighting prowess, physical attributes, or 
              the dramatic persona they adopt in the arena to entertain the crowds.
            </p>
            <p>
              Whether you're creating a character with a gladiatorial background, developing an NPC arena champion, or 
              building an entire fighting pit for your campaign, this generator provides powerful and memorable names 
              that would make any arena announcer's job a pleasure.
            </p>
          </div>
          
          {/* Hero Image */}
          <GeneratorImage 
            src="/images/categories/dungeonsanddragons/gladiator/gladiator-main.jpg" 
            alt="Gladiator Names" 
            caption="Create powerful and memorable names for gladiator characters in Dungeons & Dragons"
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Gladiator Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A compelling gladiator name should capture the character's fighting spirit and arena persona:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Intimidating Quality:</span> 
                <span>The best gladiator names often evoke fear, power, or unstoppable force to intimidate opponents before the fight even begins.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Memorable Sound:</span> 
                <span>Arena names should be easy to chant and remember, making them perfect for crowds to call out during matches.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Descriptive Elements:</span> 
                <span>References to fighting style, signature weapons, physical attributes, or homeland can create a vivid image of the gladiator.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Mythic Allusions:</span> 
                <span>Names that reference legendary warriors, monsters, or deities can lend an air of destiny or supernatural power to a gladiator.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Cultural Flavor:</span> 
                <span>Incorporating elements from the gladiator's cultural background can add depth and authenticity to their arena persona.</span>
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
                <span>Click the "Generate Names" button to create a list of gladiator names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">2.</span> 
                <span>Click on any name to see more details about its meaning, origin, or fighting style it might represent.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">3.</span> 
                <span>Generate as many times as you like until you find the perfect name for your character.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">4.</span> 
                <span>Consider how your gladiator's name might reflect their fighting style, background, or the persona they adopt in the arena.</span>
              </li>
            </ol>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Gladiator Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Gladiators have distinctive naming traditions that reflect their unique role as both warriors and entertainers:
            </p>
            <ul className="space-y-4 mb-6">
              <li>
                <h3 className="font-semibold text-primary text-lg">Arena Names</h3>
                <p>Many gladiators adopt or are given special "stage names" for the arena that are distinct from their birth names. These names are designed to be memorable and to create a specific persona for the crowds.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Weapon-Based Names</h3>
                <p>Gladiators are often named after their signature weapons or fighting styles, such as "The Trident," "Hammer," or "Twin Blades," creating an immediate association with their combat approach.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Animal Epithets</h3>
                <p>Many gladiators take on animal names or epithets that reflect qualities they embody in combat, such as "The Lion," "Wolf," or "Viper," emphasizing ferocity, pack tactics, or deadly precision.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Geographic Identifiers</h3>
                <p>Gladiators from distant or exotic lands are often identified by their place of origin, such as "The Northman" or "Desert Fury," adding an element of the exotic to their persona.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Victory Titles</h3>
                <p>Successful gladiators might incorporate their achievements into their names, such as "Hundred Victories" or "Undefeated," broadcasting their prowess to both fans and future opponents.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* Popular Names */}
        <section id="popular-names" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Popular DnD Gladiator Names</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Here are 30 popular gladiator names from D&D lore and fantasy worlds, each with unique characteristics and battle reputations:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Maximus Bloodfist:</span> 
                    <span>A champion pit fighter known for ending matches with devastating punches, never defeated in unarmed combat.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Titus Ironheart:</span> 
                    <span>A resilient warrior who survived 100 consecutive matches, known for his incredible endurance.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Valeria Swiftblade:</span> 
                    <span>A female gladiator renowned for her speed, capable of striking five times before opponents can react.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Brutus Skullcrusher:</span> 
                    <span>A half-orc gladiator who wields a massive maul, known for his terrifying battle cries.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Cassius Dreadchain:</span> 
                    <span>A chain fighter who entangles opponents in his spiked flail before delivering the final blow.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Aurelia Goldspear:</span> 
                    <span>A noble-born gladiator who fights with a golden-tipped spear, known for precise killing strikes.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Drax Flamefist:</span> 
                    <span>A tiefling gladiator who channels hellfire through his gauntlets, leaving burning brands on his victims.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Lyra Shadowstep:</span> 
                    <span>A drow gladiator who seems to disappear in shadows during combat, striking from unexpected angles.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Magnus Thundershield:</span> 
                    <span>A dwarf shield-master whose defensive techniques have frustrated countless opponents.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Octavia Serpentwhip:</span> 
                    <span>A gladiator who fights with a magical whip that transforms into a venomous snake when it strikes.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Thraxx Bonecrusher:</span> 
                    <span>A dragonborn gladiator whose powerful tail is as deadly as his axe, known for breaking limbs.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Selena Moonshadow:</span> 
                    <span>An elven gladiator who draws power from moonlight, becoming stronger as night falls in the arena.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Grom Steelhammer:</span> 
                    <span>A goliath gladiator whose signature weapon is a massive hammer that few others can even lift.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Lucilla Quicksilver:</span> 
                    <span>A halfling gladiator who compensates for her size with incredible speed and acrobatic fighting.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Vargus Bloodaxe:</span> 
                    <span>A barbarian gladiator who enters a battle rage, fighting harder when wounded and near death.</span>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Zephyra Stormblade:</span> 
                    <span>An air genasi gladiator who summons gusts of wind to unbalance opponents before striking.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Tiberius Lionheart:</span> 
                    <span>A human gladiator who wears a lion's mane headdress, known for his courage against monstrous opponents.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Nyx Shadowdancer:</span> 
                    <span>A shadar-kai gladiator who phases between the material plane and Shadowfell during combat.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Korg Stonefist:</span> 
                    <span>An earth genasi gladiator whose skin hardens to stone when struck, absorbing devastating blows.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Athena Owlhelm:</span> 
                    <span>A tactical fighter who studies opponents' weaknesses, wearing a distinctive owl-shaped helmet.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Fenris Wolfborn:</span> 
                    <span>A lycanthrope gladiator who partially transforms during combat, growing claws and fangs.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Saphira Blueflame:</span> 
                    <span>A sorcerer gladiator who enhances her weapons with azure fire, leaving frost burns on her victims.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Grimlock Ironfist:</span> 
                    <span>A warforged gladiator with built-in weapons, capable of transforming his arms into various tools of war.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Diana Twinblade:</span> 
                    <span>A dual-wielding fighter whose synchronized blade work has been compared to an elegant dance.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Kratos Godslayer:</span> 
                    <span>A gladiator who earned his name after defeating a minor avatar of a deity in ceremonial combat.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Ember Ashborn:</span> 
                    <span>A fire genasi gladiator whose skin glows with inner heat, igniting her weapons during combat.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Thaddeus Crowcaller:</span> 
                    <span>A kenku gladiator who mimics the fighting styles of defeated opponents, constantly evolving his technique.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Morgana Venomblade:</span> 
                    <span>A yuan-ti gladiator whose weapons are coated with her own toxic blood, causing paralysis with each cut.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Ajax Titangrip:</span> 
                    <span>A gladiator known for disarming opponents with his bare hands, then using their weapons against them.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-primary min-w-[120px]">Seraphina Angelwing:</span> 
                    <span>An aasimar gladiator who manifests spectral wings during combat, gaining aerial advantage in the arena.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Generators */}
        <section id="latest-generators" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Latest Generators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Group Name Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Generate unique and catchy names for adventuring parties and groups</p>
                <Link to="/dungeonsanddragons/group" onClick={() => window.scrollTo(0, 0)}>
                  <Button variant="outline" size="sm" className="w-full">Explore</Button>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Sorcerer Name Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Create mystical and powerful names for sorcerer characters</p>
                <Link to="/dungeonsanddragons/sorcerer" onClick={() => window.scrollTo(0, 0)}>
                  <Button variant="outline" size="sm" className="w-full">Explore</Button>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Dwarf Clan Name Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Generate traditional and robust names for dwarf clans and families</p>
                <Link to="/dungeonsanddragons/dwarf-clan" onClick={() => window.scrollTo(0, 0)}>
                  <Button variant="outline" size="sm" className="w-full">Explore</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GladiatorNameGenerator; 