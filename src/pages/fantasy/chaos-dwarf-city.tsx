import { useState } from "react";
import { Helmet } from "react-helmet";
import { Wand2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Chaos Dwarf City name data
const prefixes = [
  { name: "Zharr", description: "Meaning 'fire' or 'burning', representing the chaos dwarfs' affinity for fire" },
  { name: "Gorgoth", description: "Meaning 'iron fortress', symbolizing their impenetrable strongholds" },
  { name: "Uzkulak", description: "Meaning 'place of skulls', reflecting their dark practices" },
  { name: "Drazh", description: "Meaning 'forge' or 'anvil', central to their industry" },
  { name: "Ghorth", description: "Meaning 'molten', referring to their volcanic territories" },
  { name: "Karak", description: "Meaning 'fortress' or 'citadel', a term corrupted from their ancestors" },
  { name: "Mingol", description: "Meaning 'dark tower', representing their imposing architecture" },
  { name: "Azgorh", description: "Meaning 'fire mountain', referring to their volcanic homes" },
  { name: "Dûm", description: "Meaning 'doom' or 'fate', reflecting their fatalistic outlook" },
  { name: "Vrag", description: "Meaning 'enemy' or 'foe', showing their hostile nature" },
  { name: "Hashut", description: "Named after their dark god, the Father of Darkness" },
  { name: "Barak", description: "Meaning 'black' or 'darkness', reflecting their corrupted nature" },
  { name: "Grim", description: "Meaning 'fierce' or 'cruel', describing their temperament" },
  { name: "Drazhoath", description: "Meaning 'forge of oaths', where dark pacts are made" },
  { name: "Uzkul", description: "Meaning 'skull place', where trophies are displayed" },
  { name: "Mordak", description: "Meaning 'death hold', a place of execution and torment" },
  { name: "Zhufbar", description: "Meaning 'fire gate', entrance to their realm" },
  { name: "Ghaz", description: "Meaning 'smoke' or 'ash', from their industrial furnaces" },
  { name: "Naggrund", description: "Meaning 'black hammer', symbol of their craftsmanship" },
  { name: "Vorag", description: "Meaning 'blood' or 'gore', reflecting their violent nature" },
  { name: "Thrangrim", description: "Meaning 'iron beard', a title of respect among chaos dwarfs" },
  { name: "Kazad", description: "Meaning 'hold' or 'fortress', corrupted from ancestral dwarf language" },
  { name: "Borg", description: "Meaning 'citadel' or 'stronghold', their defensive structures" },
  { name: "Dorn", description: "Meaning 'thorn' or 'spike', reflecting their aggressive architecture" },
  { name: "Gron", description: "Meaning 'grind' or 'crush', their industrial might" }
];

const suffixes = [
  { name: "Naggrund", description: "Meaning 'black hammer', symbol of their craftsmanship" },
  { name: "Kadrin", description: "Meaning 'pass' or 'gateway', often controlling mountain passages" },
  { name: "Drazh", description: "Meaning 'forge', where their dark creations are made" },
  { name: "Varr", description: "Meaning 'river of fire', referring to lava flows near their cities" },
  { name: "Ghaz", description: "Meaning 'smoke' or 'ash', from their industrial furnaces" },
  { name: "Kul", description: "Meaning 'pit' or 'mine', where slaves toil endlessly" },
  { name: "Baraz", description: "Meaning 'fire' or 'flame', central to their worship" },
  { name: "Tharin", description: "Meaning 'hall' or 'chamber', their grand meeting places" },
  { name: "Dum", description: "Meaning 'doom' or 'fate', their fatalistic philosophy" },
  { name: "Uzkul", description: "Meaning 'skull place', decorated with the remains of enemies" },
  { name: "Grim", description: "Meaning 'fierce' or 'cruel', describing their nature" },
  { name: "Vrag", description: "Meaning 'enemy' or 'foe', their hostile stance toward others" },
  { name: "Kazad", description: "Meaning 'hold' or 'fortress', their defensive structures" },
  { name: "Norn", description: "Meaning 'vengeance' or 'grudge', their long memory for slights" },
  { name: "Thar", description: "Meaning 'dark' or 'shadow', their preference for darkness" },
  { name: "Gorl", description: "Meaning 'gore' or 'blood', their violent practices" },
  { name: "Zorn", description: "Meaning 'wrath' or 'anger', their temperament" },
  { name: "Barak", description: "Meaning 'black' or 'darkness', their corrupted nature" },
  { name: "Morr", description: "Meaning 'death' or 'end', their association with mortality" },
  { name: "Zhul", description: "Meaning 'slave' or 'servant', their reliance on slave labor" },
  { name: "Krag", description: "Meaning 'crag' or 'cliff', their mountainous homes" },
  { name: "Dor", description: "Meaning 'gate' or 'door', entrances to their underground realms" },
  { name: "Ghor", description: "Meaning 'molten' or 'burning', their volcanic territories" },
  { name: "Ungol", description: "Meaning 'spider' or 'web', their tangled politics" },
  { name: "Rakath", description: "Meaning 'ruin' or 'destruction', what they bring to enemies" }
];

const modifiers = [
  { name: "The Black", description: "Referring to the soot and ash that covers their cities" },
  { name: "The Burning", description: "Referring to the constant fires of their forges" },
  { name: "The Damned", description: "Referring to their corrupted state" },
  { name: "The Infernal", description: "Referring to their hellish environment" },
  { name: "The Ashen", description: "Referring to the volcanic ash that covers their realm" },
  { name: "The Molten", description: "Referring to the lava flows near their cities" },
  { name: "The Cruel", description: "Referring to their treatment of slaves" },
  { name: "The Dark", description: "Referring to their evil nature" },
  { name: "The Smoking", description: "Referring to the constant industrial smoke" },
  { name: "The Fiery", description: "Referring to their worship of fire" },
  { name: "The Obsidian", description: "Referring to the black volcanic glass used in construction" },
  { name: "The Iron", description: "Referring to their metalworking skills" },
  { name: "The Brass", description: "Referring to their use of this metal in dark rituals" },
  { name: "The Shadowed", description: "Referring to the perpetual darkness of their realm" },
  { name: "The Blighted", description: "Referring to the corrupted landscape around them" },
  { name: "The Cursed", description: "Referring to their fall from grace" },
  { name: "The Endless", description: "Referring to their seemingly endless caverns and mines" },
  { name: "The Forsaken", description: "Referring to their abandonment of ancestral ways" },
  { name: "The Smoldering", description: "Referring to the ever-burning embers of their forges" },
  { name: "The Ruinous", description: "Referring to their allegiance to chaos" }
];

const ChaosDwarfCityNameGenerator = () => {
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);

  const generateNames = () => {
    const newNames: string[] = [];
    
    // Generate 10 unique city names
    for (let i = 0; i < 10; i++) {
      // Decide on name structure (50% chance for prefix+suffix, 50% chance for prefix+suffix with modifier)
      const useModifier = Math.random() > 0.5;
      
      const randomPrefixIndex = Math.floor(Math.random() * prefixes.length);
      const randomSuffixIndex = Math.floor(Math.random() * suffixes.length);
      const randomModifierIndex = Math.floor(Math.random() * modifiers.length);
      
      const prefix = prefixes[randomPrefixIndex].name;
      const suffix = suffixes[randomSuffixIndex].name;
      
      let cityName = `${prefix}-${suffix}`;
      
      if (useModifier) {
        const modifier = modifiers[randomModifierIndex].name;
        cityName = `${cityName}, ${modifier}`;
      }
      
      newNames.push(cityName);
    }
    
    setGeneratedNames(newNames);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>Chaos Dwarf City Name Generator - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate dark and imposing names for chaos dwarf cities and strongholds. Over 10,000 unique name combinations available." />
        <meta name="keywords" content="chaos dwarf, city names, fantasy names, name generator, warhammer, fantasy, stronghold names" />
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
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Chaos Dwarf City Name Generator - 10,000+ Names</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate dark and imposing names for chaos dwarf cities and strongholds.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Chaos Dwarf City Names</CardTitle>
            <CardDescription>Create unique names for chaos dwarf cities, fortresses, and strongholds</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNames} 
                className="w-full sm:w-auto"
                aria-label="Generate chaos dwarf city names"
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What is a Good Chaos Dwarf City Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Chaos Dwarf City Naming Traditions</a>
              </li>
              <li>
                <a href="#popular-names" className="text-primary hover:underline">Most Popular Chaos Dwarf City Names</a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Introduction */}
        <section id="introduction" className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Introduction</h2>
          <div className="prose max-w-none prose-sm sm:prose-base">
            <p>
              The Chaos Dwarfs, also known as the Dawi-Zharr in their own twisted tongue, are a 
              corrupted offshoot of the proud dwarf race. Centuries ago, these dwarfs ventured 
              too far into the eastern lands, where the influence of Chaos warped their bodies 
              and souls. Now they dwell in the blighted lands of the Dark Lands, building 
              massive industrial cities around volcanic pits and enslaving other races to fuel 
              their endless ambition.
            </p>
            <p>
              Unlike their uncorrupted kin who carve their holds into mountains, Chaos Dwarfs 
              construct imposing ziggurats, towering fortresses, and sprawling industrial 
              complexes on the surface. Their cities are hellish places of smoke, fire, and 
              suffering, where the clanging of hammers and the screams of slaves never cease.
            </p>
            <p>
              The names of Chaos Dwarf cities reflect their dark nature, often incorporating 
              elements related to fire, iron, darkness, and cruelty. This generator helps you 
              create authentic and evocative names for Chaos Dwarf settlements in your fantasy 
              worlds, role-playing games, or creative writing.
            </p>
          </div>
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">What is a Good Chaos Dwarf City Name?</h2>
          <div className="prose max-w-none prose-sm sm:prose-base">
            <p>
              A good Chaos Dwarf city name should evoke images of dark industry, volcanic 
              landscapes, and tyrannical rule. Here are some characteristics of effective 
              Chaos Dwarf city names:
            </p>
            <ul>
              <li><strong>Harsh Consonants:</strong> Names often feature hard sounds like 'z', 'k', 'g', and 'r', creating a guttural, aggressive feel.</li>
              <li><strong>Fire and Forge References:</strong> Many names incorporate elements related to fire, forges, and metalworking, reflecting their industrial nature.</li>
              <li><strong>Hyphenated Structure:</strong> Chaos Dwarf cities often have compound names with two parts connected by a hyphen, such as "Zharr-Naggrund."</li>
              <li><strong>Dark Modifiers:</strong> Names may include descriptive modifiers like "The Black," "The Burning," or "The Damned."</li>
              <li><strong>Corrupted Dwarf Words:</strong> They often use twisted versions of traditional dwarf terms, reflecting their corrupted heritage.</li>
            </ul>
            <p>
              The most effective Chaos Dwarf city names combine these elements to create a name 
              that sounds both distinctly dwarfish and unmistakably evil. The name should 
              convey the city's function, location, or notable feature while maintaining an 
              atmosphere of dread and oppression.
            </p>
          </div>
        </section>

        {/* How to Use */}
        <section id="how-to-use" className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">How to Use the Generator</h2>
          <div className="prose max-w-none prose-sm sm:prose-base">
            <p>Using our Chaos Dwarf City Name Generator is straightforward:</p>
            <ol>
              <li><strong>Generate Names:</strong> Click the "Generate Names" button to create a list of 10 unique Chaos Dwarf city names.</li>
              <li><strong>Browse Results:</strong> Look through the generated names to find one that suits your needs.</li>
              <li><strong>Regenerate if Needed:</strong> If none of the names appeal to you, simply click the button again for a new set.</li>
              <li><strong>Customize:</strong> Feel free to modify the generated names by changing prefixes, suffixes, or modifiers to better fit your specific vision.</li>
              <li><strong>Add Context:</strong> Consider the location and purpose of the city when selecting a name. A major industrial center might have a more imposing name than a minor outpost.</li>
            </ol>
            <p>
              The generator creates names by combining prefixes, suffixes, and sometimes modifiers 
              that are authentic to Chaos Dwarf naming conventions. Some names will be simple 
              compound names (like "Zharr-Naggrund"), while others will include descriptive 
              modifiers (like "Gorgoth-Drazh, The Burning").
            </p>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Chaos Dwarf City Naming Traditions</h2>
          <div className="prose max-w-none prose-sm sm:prose-base">
            <p>
              Chaos Dwarf cities follow several naming traditions that reflect their dark culture 
              and twisted history:
            </p>
            <h3>Function-Based Names</h3>
            <p>
              Many Chaos Dwarf cities are named according to their primary function. Industrial 
              centers often include terms related to forges or fire, while slave markets might 
              reference chains or bondage. Military strongholds typically incorporate terms 
              suggesting strength or defense.
            </p>
            <h3>Geographical References</h3>
            <p>
              Cities are sometimes named after prominent geographical features in their vicinity, 
              particularly volcanic features. Terms referring to mountains, fire pits, ash plains, 
              or lava rivers are common in these names.
            </p>
            <h3>Hashut Worship</h3>
            <p>
              As devoted worshippers of Hashut, the Father of Darkness, Chaos Dwarfs often name 
              important religious centers after aspects of their dark god. These names might 
              reference bulls (Hashut's symbol), fire, darkness, or sacrifice.
            </p>
            <h3>Corrupted Ancestral Names</h3>
            <p>
              Some Chaos Dwarf cities bear twisted versions of traditional dwarf naming elements, 
              deliberately corrupting their ancestral heritage. These names serve as a mockery of 
              their uncorrupted kin and a reminder of their own transformed nature.
            </p>
            <h3>Conquest Commemorations</h3>
            <p>
              Occasionally, Chaos Dwarfs name cities to commemorate great victories or conquests. 
              These names might incorporate elements referring to defeated enemies or significant 
              battles, serving as permanent monuments to their military achievements.
            </p>
          </div>
        </section>

        {/* Popular Names */}
        <section id="popular-names" className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Most Popular Chaos Dwarf City Names</h2>
          <p className="mb-4 sm:mb-6">Below is a collection of the most iconic chaos dwarf city names, each with its own dark significance:</p>
          
          <div className="mb-6 sm:mb-8 overflow-x-auto">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Prefixes</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prefixes.slice(0, 20).map((prefix, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{prefix.name}</TableCell>
                    <TableCell>{prefix.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="mb-6 sm:mb-8 overflow-x-auto">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Suffixes</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {suffixes.slice(0, 20).map((suffix, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{suffix.name}</TableCell>
                    <TableCell>{suffix.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="overflow-x-auto">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Modifiers</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {modifiers.slice(0, 20).map((modifier, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{modifier.name}</TableCell>
                    <TableCell>{modifier.description}</TableCell>
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
            <Link to="/fantasy/dwarf-ranger" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
              <h3 className="font-bold mb-2">Dwarf Ranger Names</h3>
              <p className="text-sm text-muted-foreground">Create strong and rugged names for dwarven rangers and scouts</p>
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

export default ChaosDwarfCityNameGenerator; 