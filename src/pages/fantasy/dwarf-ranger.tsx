import { useState } from "react";
import { Helmet } from "react-helmet";
import { Wand2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Dwarf Ranger name data
const maleFirstNames = [
  { name: "Thrain", description: "Derived from Old Norse, meaning 'yearner' or 'one who longs for adventure'" },
  { name: "Durin", description: "Named after the first of the Seven Fathers of the Dwarves" },
  { name: "Balin", description: "Meaning 'strong one' in dwarvish tongues" },
  { name: "Dwalin", description: "Meaning 'stalwart defender' in ancient dwarf language" },
  { name: "Thorin", description: "From Norse mythology, meaning 'brave one'" },
  { name: "Gimli", description: "Meaning 'fire pit' or 'place of fire' in Old Norse" },
  { name: "Gloin", description: "Meaning 'glowing one' in dwarvish" },
  { name: "Oin", description: "Derived from Norse mythology, associated with ancient runes" },
  { name: "Bombur", description: "Meaning 'the swollen one' or 'stout warrior'" },
  { name: "Bofur", description: "Meaning 'brave in battle' in dwarvish" },
  { name: "Bifur", description: "Meaning 'trembling mountain' in ancient dwarf dialect" },
  { name: "Nori", description: "Meaning 'little carved figure' in dwarvish" },
  { name: "Dori", description: "Meaning 'borer' or 'one who digs deep'" },
  { name: "Ori", description: "Meaning 'violent' or 'eager warrior'" },
  { name: "Fili", description: "Meaning 'file' or 'one who shapes metal'" },
  { name: "Kili", description: "Meaning 'wedge' or 'one who splits stone'" },
  { name: "Dain", description: "Meaning 'dead' or 'one who faces death without fear'" },
  { name: "Thror", description: "Meaning 'thriving' or 'prosperous leader'" },
  { name: "Fundin", description: "Meaning 'found one' or 'discoverer of hidden paths'" },
  { name: "Gror", description: "Meaning 'growing' or 'one who grows in strength'" },
  { name: "Borin", description: "Meaning 'born of the mountain'" },
  { name: "Farin", description: "Meaning 'traveler' or 'wanderer'" },
  { name: "Gromm", description: "Meaning 'thunder in the mountains'" },
  { name: "Dargin", description: "Meaning 'axe wielder' or 'skilled with the axe'" },
  { name: "Tharkun", description: "Meaning 'staff-man' or 'ranger of the deep woods'" },
  { name: "Bardin", description: "Meaning 'battle singer' or 'one who sings in battle'" },
  { name: "Gotrek", description: "Meaning 'oath seeker' or 'one bound by honor'" },
  { name: "Ungrim", description: "Meaning 'unmasked' or 'one who shows his true face'" },
  { name: "Kazador", description: "Meaning 'gold keeper' or 'guardian of treasures'" },
  { name: "Belegar", description: "Meaning 'iron hammer' or 'one who strikes like iron'" },
  { name: "Alrik", description: "Meaning 'ruler of all' or 'king of the wild'" },
  { name: "Grimmir", description: "Meaning 'grim determination' or 'resolute hunter'" },
  { name: "Durgan", description: "Meaning 'dark iron' or 'forged in darkness'" },
  { name: "Rorek", description: "Meaning 'mountain ruler' or 'king of peaks'" },
  { name: "Thorgrim", description: "Meaning 'Thor's mask' or 'thunder face'" },
  { name: "Kragg", description: "Meaning 'crag dweller' or 'one who lives on cliffs'" },
  { name: "Baruk", description: "Meaning 'axe' in ancient dwarvish" },
  { name: "Drong", description: "Meaning 'strong drink' or 'one who enjoys ale'" },
  { name: "Kurgan", description: "Meaning 'stone maker' or 'sculptor'" },
  { name: "Morgrim", description: "Meaning 'dark beard' or 'shadow hunter'" },
  { name: "Snorri", description: "Meaning 'wise one' or 'knowledgeable tracker'" },
  { name: "Thrund", description: "Meaning 'mighty thrower' or 'one who hurls stones'" },
  { name: "Burrnoth", description: "Meaning 'beard of fire' or 'flame-bearded one'" },
  { name: "Durgath", description: "Meaning 'stone path finder' or 'one who finds paths through mountains'" },
  { name: "Grunni", description: "Meaning 'ground walker' or 'one who reads the earth'" },
  { name: "Hargin", description: "Meaning 'hard fist' or 'strong puncher'" },
  { name: "Jorgun", description: "Meaning 'earth friend' or 'one who communes with stone'" },
  { name: "Lokri", description: "Meaning 'lock breaker' or 'one who opens secrets'" },
  { name: "Morek", description: "Meaning 'dark eye' or 'one who sees in darkness'" },
  { name: "Nurgan", description: "Meaning 'new axe' or 'young warrior'" }
];

const femaleFirstNames = [
  { name: "Dis", description: "Meaning 'lady' or 'goddess' in dwarvish" },
  { name: "Thyra", description: "Meaning 'thunder' or 'storm hunter'" },
  { name: "Hilda", description: "Meaning 'battle maiden' or 'warrior woman'" },
  { name: "Dagmar", description: "Meaning 'day maiden' or 'she who hunts by day'" },
  { name: "Brunhild", description: "Meaning 'armored battle maiden' or 'protected warrior'" },
  { name: "Gudrun", description: "Meaning 'god's secret lore' or 'keeper of divine knowledge'" },
  { name: "Freya", description: "Meaning 'lady' or 'noble huntress'" },
  { name: "Ingrid", description: "Meaning 'beautiful' or 'beloved ranger'" },
  { name: "Sigrid", description: "Meaning 'victory' or 'triumphant tracker'" },
  { name: "Astrid", description: "Meaning 'divinely beautiful' or 'star of the mountains'" },
  { name: "Helga", description: "Meaning 'holy' or 'blessed by the mountain gods'" },
  { name: "Gerda", description: "Meaning 'protected' or 'guardian of the enclosure'" },
  { name: "Frida", description: "Meaning 'peace' or 'peaceful protector'" },
  { name: "Thora", description: "Meaning 'thunder goddess' or 'she who brings the storm'" },
  { name: "Brynja", description: "Meaning 'armor' or 'protected scout'" },
  { name: "Dalla", description: "Meaning 'valley maiden' or 'she who knows the lowlands'" },
  { name: "Embla", description: "Meaning 'elm tree' or 'forest friend'" },
  { name: "Geira", description: "Meaning 'spear' or 'one who hunts with a spear'" },
  { name: "Hrefna", description: "Meaning 'raven' or 'she who watches from above'" },
  { name: "Jora", description: "Meaning 'autumn' or 'harvest hunter'" },
  { name: "Kara", description: "Meaning 'wild' or 'untamed tracker'" },
  { name: "Lofn", description: "Meaning 'loving' or 'compassionate guardian'" },
  { name: "Mist", description: "Meaning 'cloud' or 'she who moves unseen'" },
  { name: "Nanna", description: "Meaning 'brave' or 'courageous scout'" },
  { name: "Olrun", description: "Meaning 'ale rune' or 'keeper of brewing secrets'" },
  { name: "Runa", description: "Meaning 'secret lore' or 'keeper of hidden knowledge'" },
  { name: "Signy", description: "Meaning 'new victory' or 'successful hunter'" },
  { name: "Thrud", description: "Meaning 'power' or 'mighty protector'" },
  { name: "Ulfrun", description: "Meaning 'wolf secret' or 'she who runs with wolves'" },
  { name: "Vigdis", description: "Meaning 'war goddess' or 'battle maiden'" },
  { name: "Yrsa", description: "Meaning 'wild' or 'she who is untamed'" },
  { name: "Zisa", description: "Meaning 'goddess' or 'divine protector'" },
  { name: "Aud", description: "Meaning 'wealth' or 'finder of treasures'" },
  { name: "Bergdis", description: "Meaning 'mountain lady' or 'she who knows the peaks'" },
  { name: "Dotta", description: "Meaning 'daughter' or 'heir to the ranger's path'" },
  { name: "Eir", description: "Meaning 'mercy' or 'healer of the wilds'" },
  { name: "Fenja", description: "Meaning 'marsh dweller' or 'she who knows the wetlands'" },
  { name: "Groa", description: "Meaning 'growing' or 'one with nature'" },
  { name: "Hildr", description: "Meaning 'battle' or 'warrior of the wilds'" },
  { name: "Inga", description: "Meaning 'protected by Ing' or 'blessed ranger'" },
  { name: "Jord", description: "Meaning 'earth' or 'one with the ground'" },
  { name: "Katla", description: "Meaning 'kettle' or 'brewer of potions'" },
  { name: "Lind", description: "Meaning 'lime tree' or 'forest guardian'" },
  { name: "Mardoll", description: "Meaning 'sea bright' or 'she who shines on water'" },
  { name: "Nott", description: "Meaning 'night' or 'she who hunts in darkness'" },
  { name: "Odindisa", description: "Meaning 'goddess of Odin' or 'divine tracker'" },
  { name: "Ran", description: "Meaning 'robbery' or 'she who takes back what was stolen'" },
  { name: "Sif", description: "Meaning 'bride' or 'connected to the earth'" },
  { name: "Tova", description: "Meaning 'beautiful Thor' or 'thunder beauty'" }
];

const lastNames = [
  { name: "Ironfoot", description: "One with feet as sturdy as iron, able to traverse any terrain" },
  { name: "Stoneheart", description: "Possessing a heart as solid as stone, unwavering in duty" },
  { name: "Oakenshield", description: "Protected by a shield of oak, defender of the forest" },
  { name: "Hammerfist", description: "With fists as powerful as hammers, a formidable fighter" },
  { name: "Anvilbreaker", description: "Strong enough to break an anvil, a symbol of immense strength" },
  { name: "Cragwalker", description: "One who traverses rocky crags with ease" },
  { name: "Deepdelver", description: "Explorer of the deepest caves and tunnels" },
  { name: "Firebeard", description: "With a beard as fiery as flame, passionate and bold" },
  { name: "Goldseeker", description: "One who has a talent for finding gold and treasure" },
  { name: "Mountainborn", description: "Born in the mountains, at home in high places" },
  { name: "Stoutaxe", description: "Wielder of a sturdy, reliable axe" },
  { name: "Thunderbrew", description: "Brewer of powerful drinks that rumble like thunder" },
  { name: "Wildtracker", description: "Skilled at tracking in the wilderness" },
  { name: "Boulderbreaker", description: "Strong enough to shatter boulders" },
  { name: "Cavefinder", description: "Adept at discovering hidden caves and passages" },
  { name: "Dragonslayer", description: "One who has faced and defeated dragons" },
  { name: "Earthshaker", description: "Whose steps shake the very earth" },
  { name: "Forgemaster", description: "Master of the forge and metalworking" },
  { name: "Gemcutter", description: "Skilled at cutting and polishing precious gems" },
  { name: "Hillstrider", description: "One who traverses hills and highlands with ease" },
  { name: "Ironbender", description: "Able to bend iron with bare hands" },
  { name: "Jewelcrafter", description: "Crafter of fine jewelry and ornaments" },
  { name: "Keenshot", description: "Accurate with ranged weapons, never missing a target" },
  { name: "Longbeard", description: "With a notably long beard, a sign of wisdom and experience" },
  { name: "Mithrilhand", description: "With hands as valuable and skilled as mithril" },
  { name: "Nightwatcher", description: "One who keeps watch during the night, with excellent night vision" },
  { name: "Oreseeker", description: "Skilled at finding valuable ore deposits" },
  { name: "Pathfinder", description: "Discoverer of new paths and routes" },
  { name: "Quarryminer", description: "Expert at extracting stone from quarries" },
  { name: "Rockfist", description: "With fists as hard as rock" },
  { name: "Silverbeard", description: "With a beard that shines like silver, respected elder" },
  { name: "Tunneldigger", description: "Expert at digging tunnels and underground passages" },
  { name: "Underhill", description: "One who dwells beneath the hills" },
  { name: "Valleyguard", description: "Protector of mountain valleys" },
  { name: "Warhammer", description: "Wielder of a mighty war hammer" },
  { name: "Axebearer", description: "Carrier of a ceremonial or battle axe" },
  { name: "Bronzehelm", description: "Wearer of a distinctive bronze helmet" },
  { name: "Coppermail", description: "Clad in armor of copper links" },
  { name: "Diamondeye", description: "With eyes that sparkle like diamonds, missing nothing" },
  { name: "Emberforge", description: "Keeper of a forge that never goes cold" },
  { name: "Flintfinder", description: "Skilled at finding flint for fire-starting" },
  { name: "Graniteheart", description: "With a heart as solid as granite, unyielding" },
  { name: "Heavyboot", description: "With sturdy boots for traversing difficult terrain" },
  { name: "Irongrip", description: "Possessing a grip as strong as iron" },
  { name: "Jadehand", description: "With hands skilled at working with jade" },
  { name: "Kettlehelm", description: "Wearer of a helmet shaped like a kettle" },
  { name: "Leadfist", description: "With a punch as heavy as lead" },
  { name: "Marblecarver", description: "Skilled at carving marble into beautiful shapes" },
  { name: "Nickelbeard", description: "With a beard that has a distinctive metallic sheen" },
  { name: "Obsidianedge", description: "Maker of weapons with edges as sharp as obsidian" }
];

const DwarfRangerNameGenerator = () => {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);

  const generateNames = () => {
    const newNames: string[] = [];
    const firstNames = gender === "male" ? maleFirstNames : femaleFirstNames;
    
    for (let i = 0; i < 10; i++) {
      const randomFirstNameIndex = Math.floor(Math.random() * firstNames.length);
      const randomLastNameIndex = Math.floor(Math.random() * lastNames.length);
      
      const firstName = firstNames[randomFirstNameIndex].name;
      const lastName = lastNames[randomLastNameIndex].name;
      
      newNames.push(`${firstName} ${lastName}`);
    }
    
    setGeneratedNames(newNames);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>Dwarf Ranger Name Generator - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate the perfect name for your dwarf ranger character. Over 10,000 unique name combinations available." />
        <meta name="keywords" content="dwarf ranger, fantasy names, name generator, dwarf, ranger, character names, RPG names" />
      </Helmet>
      <div className="max-w-7xl mx-auto">
        {/* Header with back button */}
        <div className="mb-6 sm:mb-8">
          <Link 
            to="/fantasy" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4 sm:mb-6"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            Back to Fantasy
          </Link>
          
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 rounded-lg bg-primary/10 text-primary">
              <Wand2 className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Dwarf Ranger Name Generator - 10,000+ Names</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate the perfect name for your dwarf ranger character.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Dwarf Ranger Names</CardTitle>
            <CardDescription>Select gender and generate unique dwarf ranger names</CardDescription>
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
                onClick={generateNames} 
                className="w-full sm:w-auto"
                aria-label="Generate dwarf ranger names"
              >
                Generate Names
              </Button>
              
              {generatedNames.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
                  {generatedNames.map((name, index) => (
                    <div key={index} className="p-3 sm:p-4 rounded-md bg-secondary/20 border border-border">
                      {name}
                    </div>
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What is a Good Dwarf Ranger Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Dwarf Ranger Naming Traditions</a>
              </li>
              <li>
                <a href="#popular-names" className="text-primary hover:underline">Most Popular Dwarf Ranger Names</a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Introduction */}
        <section id="introduction" className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Introduction</h2>
          <div className="prose max-w-none prose-sm sm:prose-base">
            <p>
              Dwarf Rangers are elite scouts and wilderness experts who patrol the mountainous regions, 
              forests, and borderlands of dwarven kingdoms. Unlike their kin who prefer the comfort of 
              underground halls, these hardy individuals venture into the wilderness, serving as the first 
              line of defense against threats to their people.
            </p>
            <p>
              Known for their exceptional tracking abilities, survival skills, and combat prowess, dwarf 
              rangers combine the natural toughness and craftsmanship of their race with an intimate 
              knowledge of the wild. They are often solitary figures, though some form small bands that 
              patrol specific territories.
            </p>
            <p>
              The name of a dwarf ranger often reflects both their dwarven heritage and their connection 
              to the wilderness. This generator helps you create authentic and meaningful names for your 
              dwarf ranger characters in role-playing games, fantasy stories, or any creative project.
            </p>
          </div>
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">What is a Good Dwarf Ranger Name?</h2>
          <div className="prose max-w-none prose-sm sm:prose-base">
            <p>
              A good dwarf ranger name should evoke both the sturdy, traditional nature of dwarven culture 
              and the wilderness expertise of a ranger. Here are some characteristics of effective dwarf 
              ranger names:
            </p>
            <ul>
              <li><strong>Strong Consonants:</strong> Dwarven names typically feature strong consonants that convey resilience and strength.</li>
              <li><strong>Nature References:</strong> Surnames often include references to natural elements like stone, mountains, or forests.</li>
              <li><strong>Practical Meaning:</strong> Names that reflect practical skills or traits valued in dwarven society.</li>
              <li><strong>Ancestral Connections:</strong> Names that honor ancestors or dwarven traditions.</li>
              <li><strong>Descriptive Elements:</strong> Surnames that describe a notable physical feature or skill.</li>
            </ul>
            <p>
              The best dwarf ranger names combine a traditional dwarven first name with a surname that 
              hints at their ranger abilities or experiences in the wild. This creates a name that is 
              both authentic to dwarven culture and reflective of their ranger profession.
            </p>
          </div>
        </section>

        {/* How to Use */}
        <section id="how-to-use" className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">How to Use the Generator</h2>
          <div className="prose max-w-none prose-sm sm:prose-base">
            <p>Using our Dwarf Ranger Name Generator is straightforward:</p>
            <ol>
              <li><strong>Select Gender:</strong> Choose between male and female options to get gender-appropriate first names.</li>
              <li><strong>Generate Names:</strong> Click the "Generate Names" button to create a list of 10 unique dwarf ranger names.</li>
              <li><strong>Browse Results:</strong> Look through the generated names to find one that suits your character.</li>
              <li><strong>Regenerate if Needed:</strong> If none of the names appeal to you, simply click the button again for a new set.</li>
              <li><strong>Mix and Match:</strong> Feel free to mix first names and last names from different generated results to create your perfect combination.</li>
            </ol>
            <p>
              The generator combines traditional dwarven first names with surnames that reflect the 
              ranger's connection to nature, their skills, or notable achievements. This creates balanced 
              names that sound authentically dwarven while highlighting their ranger profession.
            </p>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Dwarf Ranger Naming Traditions</h2>
          <div className="prose max-w-none prose-sm sm:prose-base">
            <p>
              Dwarf rangers follow several naming traditions that blend standard dwarven customs with 
              elements unique to their wilderness profession:
            </p>
            <h3>Clan Names and Personal Names</h3>
            <p>
              Like all dwarves, rangers have a personal name given at birth and a clan name. However, 
              many rangers adopt a third name or title that reflects their life in the wilderness. 
              For example, Thorin Oakenshield might be known among rangers as "Thorin Oakenshield the 
              Wolftracker."
            </p>
            <h3>Deed Names</h3>
            <p>
              Many dwarf rangers earn names based on notable deeds or skills. These "deed names" often 
              replace their clan names when operating in the wild. A ranger who saved their patrol from 
              a rock slide might become known as "Borin Rockwatcher."
            </p>
            <h3>Nature Bonds</h3>
            <p>
              Some rangers take names that reflect a special connection to a particular aspect of nature. 
              These might reference animals they have an affinity with, terrains they specialize in 
              navigating, or natural phenomena they've mastered predicting.
            </p>
            <h3>Secret Names</h3>
            <p>
              Many dwarf rangers have secret names known only to their closest companions. These names 
              often reflect their deepest connection to the wilderness and are used in private ceremonies 
              or when communicating with nature spirits.
            </p>
          </div>
        </section>

        {/* Popular Names */}
        <section id="popular-names" className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Most Popular Dwarf Ranger Names</h2>
          <p className="mb-4 sm:mb-6">Below is a collection of the most popular dwarf ranger names, each with its own unique significance:</p>
          
          <div className="mb-6 sm:mb-8 overflow-x-auto">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Male Dwarf Ranger Names</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {maleFirstNames.slice(0, 20).map((name, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{name.name}</TableCell>
                    <TableCell>{name.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="mb-6 sm:mb-8 overflow-x-auto">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Female Dwarf Ranger Names</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {femaleFirstNames.slice(0, 20).map((name, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{name.name}</TableCell>
                    <TableCell>{name.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="overflow-x-auto">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Dwarf Ranger Surnames</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lastNames.slice(0, 20).map((name, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{name.name}</TableCell>
                    <TableCell>{name.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Latest Generators */}
        <section className="mb-8 sm:mb-12 border-t border-border pt-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Latest Fantasy Generators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/fantasy/space-ranger" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
              <h3 className="font-bold mb-2">Space Ranger Names</h3>
              <p className="text-sm text-muted-foreground">Generate futuristic names for space rangers and cosmic defenders</p>
            </Link>
            <Link to="/fantasy/chaos-dwarf-city" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
              <h3 className="font-bold mb-2">Chaos Dwarf City Names</h3>
              <p className="text-sm text-muted-foreground">Generate dark and imposing names for chaos dwarf settlements</p>
            </Link>
            <Link to="/fantasy/elven-ranger" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
              <h3 className="font-bold mb-2">Elven Ranger Names</h3>
              <p className="text-sm text-muted-foreground">Generate mystical and nature-attuned names for elven rangers</p>
            </Link>
            <Link to="/fantasy/halfling-ranger" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
              <h3 className="font-bold mb-2">Halfling Ranger Names</h3>
              <p className="text-sm text-muted-foreground">Create nimble and clever names for halfling scouts and rangers</p>
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

export default DwarfRangerNameGenerator; 