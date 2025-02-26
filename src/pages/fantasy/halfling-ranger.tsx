import { useState } from "react";
import { Helmet } from "react-helmet";
import { Wand2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Halfling Ranger name data
const maleFirstNames = [
  { name: "Bilbo", description: "Meaning 'short sword', perfect for a nimble ranger" },
  { name: "Frodo", description: "Meaning 'wise by experience', a seasoned wilderness guide" },
  { name: "Samwise", description: "Meaning 'half-wise' or 'simple', but surprisingly resourceful" },
  { name: "Peregrin", description: "Meaning 'traveler' or 'pilgrim', a natural wanderer" },
  { name: "Meriadoc", description: "Meaning 'magnificent', a surprisingly capable scout" },
  { name: "Bandobras", description: "Meaning 'bold brass', known for courage despite small stature" },
  { name: "Drogo", description: "Meaning 'ghost', stealthy and quiet in the wilderness" },
  { name: "Otho", description: "Meaning 'wealth', finder of valuable resources in the wild" },
  { name: "Paladin", description: "Meaning 'defender', protector of halfling lands" },
  { name: "Adelard", description: "Meaning 'noble strength', surprisingly strong for his size" },
  { name: "Bodo", description: "Meaning 'command', natural leader of ranger bands" },
  { name: "Doderic", description: "Meaning 'people ruler', respected by all races" },
  { name: "Falco", description: "Meaning 'falcon', sharp-eyed scout" },
  { name: "Griffo", description: "Meaning 'fierce grip', tenacious tracker" },
  { name: "Hamfast", description: "Meaning 'stay-at-home', ironically a great traveler" },
  { name: "Isembold", description: "Meaning 'iron bold', courageous despite small size" },
  { name: "Longo", description: "Meaning 'long', unusually tall for a halfling" },
  { name: "Marmadoc", description: "Meaning 'sea leader', expert in riverside tracking" },
  { name: "Olo", description: "Meaning 'dream', visionary pathfinder" },
  { name: "Ponto", description: "Meaning 'bridge', connects different worlds and peoples" },
  { name: "Rorimac", description: "Meaning 'horse lord', surprisingly good with animals" },
  { name: "Saradoc", description: "Meaning 'wise counselor', knowledgeable about wilderness lore" },
  { name: "Tobold", description: "Meaning 'bold people', courageous explorer" },
  { name: "Wilcome", description: "Meaning 'welcome guest', diplomat among different races" },
  { name: "Andwise", description: "Meaning 'wise spirit', connected to nature spirits" },
  { name: "Balbo", description: "Meaning 'brave friend', loyal companion in the wild" },
  { name: "Cotman", description: "Meaning 'cottage dweller', expert at creating wilderness shelters" },
  { name: "Dinodas", description: "Meaning 'given to the gods', spiritually attuned" },
  { name: "Fastolph", description: "Meaning 'fast wolf', swift runner and tracker" },
  { name: "Gorbadoc", description: "Meaning 'prominent leader', natural commander" },
  { name: "Holman", description: "Meaning 'hollow man', able to hide in the smallest spaces" },
  { name: "Isembard", description: "Meaning 'iron axe', skilled with small axes" },
  { name: "Largo", description: "Meaning 'generous', shares knowledge of the wild" },
  { name: "Mungo", description: "Meaning 'dear friend', beloved by animals and people alike" },
  { name: "Nob", description: "Meaning 'noble', dignified despite small stature" },
  { name: "Orgulas", description: "Meaning 'golden ears', exceptional hearing" },
  { name: "Posco", description: "Meaning 'clean', leaves no trace in the wilderness" },
  { name: "Reginard", description: "Meaning 'strong counsel', wise advisor to other rangers" },
  { name: "Seredic", description: "Meaning 'victory ruler', successful in all endeavors" },
  { name: "Tolman", description: "Meaning 'tax collector', gathers resources efficiently" },
  { name: "Wiseman", description: "Meaning 'wise one', knowledgeable about survival" },
  { name: "Blanco", description: "Meaning 'white', expert in winter tracking" },
  { name: "Bucca", description: "Meaning 'he-goat', sure-footed in rough terrain" },
  { name: "Cottar", description: "Meaning 'cottager', creates comfortable camps anywhere" },
  { name: "Dodinas", description: "Meaning 'mountain gift', skilled in highland tracking" },
  { name: "Everard", description: "Meaning 'brave boar', fearless despite size" },
  { name: "Ferumbras", description: "Meaning 'ready sword', quick to defend others" },
  { name: "Gerontius", description: "Meaning 'old warrior', experienced ranger" },
  { name: "Hildibrand", description: "Meaning 'battle sword', skilled fighter despite size" },
  { name: "Isengrim", description: "Meaning 'iron mask', mysterious forest guardian" }
];

const femaleFirstNames = [
  { name: "Belladonna", description: "Named after a beautiful but dangerous plant, both lovely and deadly" },
  { name: "Primula", description: "Named after the primrose flower, finding beauty in wild places" },
  { name: "Elanor", description: "Named after a golden star-shaped flower, bright and hopeful" },
  { name: "Esmeralda", description: "Meaning 'emerald', with eyes as green as the forest" },
  { name: "Pearl", description: "Precious and rare, finding valuable things in the wilderness" },
  { name: "Ruby", description: "Fiery and resilient, with the courage of much larger folk" },
  { name: "Daisy", description: "Simple but hardy, thriving in difficult conditions" },
  { name: "Marigold", description: "Bright and cheerful, bringing light to dark places" },
  { name: "Poppy", description: "Vibrant and striking, standing out despite small stature" },
  { name: "Rosie", description: "Beautiful but thorny, not to be underestimated" },
  { name: "Lily", description: "Elegant and pure, moving gracefully through the wild" },
  { name: "Myrtle", description: "Evergreen and resilient, surviving in all conditions" },
  { name: "Camellia", description: "Beautiful and complex, with hidden depths" },
  { name: "Amaranth", description: "Never-fading, with enduring strength and stamina" },
  { name: "Berylla", description: "Bright as a jewel, shining in the darkest forest" },
  { name: "Donnamira", description: "Lady of peace, bringing harmony to wild places" },
  { name: "Mirabella", description: "Wonderful beauty, charming even the wildest creatures" },
  { name: "Adamanta", description: "Unbreakable, with surprising toughness" },
  { name: "Chica", description: "Small but significant, making a big impact" },
  { name: "Dora", description: "Gift, bringing valuable skills to any ranger band" },
  { name: "Gilly", description: "Youthful joy, finding delight in the wilderness" },
  { name: "Hilda", description: "Battle maiden, fierce despite her size" },
  { name: "Jessamine", description: "Flower that blooms at night, expert in darkness" },
  { name: "Lavender", description: "Fragrant and healing, skilled with medicinal plants" },
  { name: "Malva", description: "Mallow flower, soothing and helpful" },
  { name: "Nina", description: "Little girl, underestimated but capable" },
  { name: "Orchid", description: "Rare and exotic, with unusual skills" },
  { name: "Pansy", description: "Thoughtful and considerate, planning carefully" },
  { name: "Queenie", description: "Regal and commanding, natural leader" },
  { name: "Rowan", description: "Named after the protective tree, a guardian" },
  { name: "Salvia", description: "Sage plant, wise and knowledgeable" },
  { name: "Tansy", description: "Bitter herb, realistic and practical" },
  { name: "Viola", description: "Like the flower, modest but resilient" },
  { name: "Willow", description: "Flexible and enduring, bending but not breaking" },
  { name: "Zinnia", description: "Lasting affection, loyal to friends and family" },
  { name: "Asphodel", description: "Flower associated with the afterlife, mysterious" },
  { name: "Bryony", description: "Climbing plant, adaptable and resourceful" },
  { name: "Celandine", description: "Yellow flower, bringing joy to dark places" },
  { name: "Dahlia", description: "Elegant flower, graceful in movement" },
  { name: "Foxglove", description: "Beautiful but potentially dangerous, not to be trifled with" },
  { name: "Gentian", description: "Blue flower, calm and collected" },
  { name: "Heather", description: "Hardy plant of the moors, thriving in harsh conditions" },
  { name: "Iris", description: "Rainbow flower, seeing beauty in all things" },
  { name: "Jasmine", description: "Sweet-scented flower, leaving a lasting impression" },
  { name: "Kalmia", description: "Mountain laurel, at home in high places" },
  { name: "Linnea", description: "Twin flower, working well with partners" },
  { name: "Meadowsweet", description: "Fragrant meadow flower, finding the pleasant path" },
  { name: "Nasturtium", description: "Spicy flower, with unexpected fire" },
  { name: "Oleander", description: "Beautiful but toxic flower, dangerous when provoked" },
  { name: "Petunia", description: "Colorful flower, bringing cheer to any group" }
];

const lastNames = [
  { name: "Lightfoot", description: "Moving silently through any terrain, leaving no trace" },
  { name: "Proudfoot", description: "Sure-footed in the most difficult terrain" },
  { name: "Took", description: "Bold and adventurous, willing to explore unknown lands" },
  { name: "Brandybuck", description: "At home near water, expert in riverside tracking" },
  { name: "Gamgee", description: "Practical and resourceful, making do with what's available" },
  { name: "Burrows", description: "Expert at creating and finding shelter" },
  { name: "Smallburrow", description: "Able to squeeze into tiny spaces, finding hidden paths" },
  { name: "Goodbody", description: "Surprisingly tough and resilient despite small frame" },
  { name: "Greenhand", description: "Skilled with plants and herbs of the wild" },
  { name: "Fairbairn", description: "Beautiful and graceful, moving elegantly through the wild" },
  { name: "Hornblower", description: "Able to signal over long distances" },
  { name: "Boffin", description: "Clever and innovative, finding new solutions" },
  { name: "Bolger", description: "Well-prepared, never without supplies" },
  { name: "Bracegirdle", description: "Always ready for action, prepared for anything" },
  { name: "Brockhouse", description: "Connected to badgers, sharing their tenacity" },
  { name: "Brownlock", description: "With earth-colored hair, blending into surroundings" },
  { name: "Bunce", description: "Sudden and surprising, appearing when least expected" },
  { name: "Chubb", description: "Well-fed but surprisingly agile" },
  { name: "Cotton", description: "Soft-spoken but tough as fibers" },
  { name: "Diggle", description: "Expert at digging and finding underground paths" },
  { name: "Fallohide", description: "Fair-skinned and often taller, with elven friendships" },
  { name: "Goldworthy", description: "Valuable member of any group, worth their weight in gold" },
  { name: "Goodchild", description: "Innocent-seeming but surprisingly capable" },
  { name: "Greenholm", description: "From green hills, at home in rolling countryside" },
  { name: "Grubb", description: "Not afraid to get dirty, practical and hands-on" },
  { name: "Hayward", description: "Protector of fields, knowledgeable about farming lands" },
  { name: "Headstrong", description: "Determined and persistent, never giving up" },
  { name: "Hogg", description: "Stubborn and immovable when needed" },
  { name: "Longhole", description: "From deep burrows, comfortable in enclosed spaces" },
  { name: "Maggot", description: "Unassuming but vital, understanding the smallest creatures" },
  { name: "Mugwort", description: "Named after the herb, knowledgeable about plant lore" },
  { name: "Noakes", description: "From the oak trees, strong and enduring" },
  { name: "Oldbuck", description: "From an ancient lineage, carrying traditional knowledge" },
  { name: "Puddifoot", description: "With feet particularly well-suited to silent movement" },
  { name: "Roper", description: "Skilled with ropes and climbing" },
  { name: "Rumble", description: "With a surprisingly loud voice when needed" },
  { name: "Sandheaver", description: "Strong despite size, able to move heavy objects" },
  { name: "Sandyman", description: "Connected to the earth, reading the ground for tracks" },
  { name: "Stoor", description: "Sturdy and strong, with unusual endurance" },
  { name: "Tunnelly", description: "Expert at finding and navigating underground passages" },
  { name: "Twofoot", description: "Particularly nimble, dancing through difficult terrain" },
  { name: "Underhill", description: "Moving unseen, hidden from dangerous eyes" },
  { name: "Wanderfoot", description: "Natural explorer, always seeking new paths" },
  { name: "Whitfoot", description: "Swift and pale, moving like a ghost" },
  { name: "Woodruff", description: "Named after the sweet herb, finding pleasant paths" },
  { name: "Yarrow", description: "Named after the healing plant, knowledgeable about medicine" },
  { name: "Zaragamba", description: "Exotic and unusual, with foreign techniques" },
  { name: "Appledore", description: "Keeper of apple knowledge, finding food in the wild" },
  { name: "Birdwhistle", description: "Able to mimic bird calls for signals" },
  { name: "Clearwater", description: "Finding and purifying water sources" }
];

const HalflingRangerNameGenerator = () => {
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
        <title>Halfling Ranger Name Generator - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate the perfect name for your halfling ranger character. Over 10,000 unique name combinations available." />
        <meta name="keywords" content="halfling ranger, fantasy names, name generator, halfling, ranger, character names, RPG names" />
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
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Halfling Ranger Name Generator - 10,000+ Names</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate the perfect name for your halfling ranger character.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Halfling Ranger Names</CardTitle>
            <CardDescription>Select gender and generate unique halfling ranger names</CardDescription>
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
                aria-label="Generate halfling ranger names"
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What is a Good Halfling Ranger Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Halfling Ranger Naming Traditions</a>
              </li>
              <li>
                <a href="#popular-names" className="text-primary hover:underline">Most Popular Halfling Ranger Names</a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Introduction */}
        <section id="introduction" className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Introduction</h2>
          <div className="prose max-w-none prose-sm sm:prose-base">
            <p>
              Halfling Rangers are among the most underestimated scouts and wilderness experts in any 
              fantasy world. Their small stature, natural stealth, and connection to the land make them 
              exceptional trackers and guides, able to move through terrain undetected where larger folk 
              would be easily spotted.
            </p>
            <p>
              Despite their preference for comfort, many halflings develop a wanderlust that leads them 
              to explore beyond their peaceful shires. Those who embrace the ranger's path combine their 
              natural halfling talents—keen senses, nimble movements, and uncanny luck—with specialized 
              training in wilderness survival, tracking, and combat.
            </p>
            <p>
              The name of a halfling ranger typically reflects both their homely halfling heritage and 
              their connection to the natural world. This generator helps you create authentic and 
              evocative names for your halfling ranger characters in role-playing games, fantasy stories, 
              or any creative project.
            </p>
          </div>
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">What is a Good Halfling Ranger Name?</h2>
          <div className="prose max-w-none prose-sm sm:prose-base">
            <p>
              A good halfling ranger name should evoke both the comfortable, homely nature of halfling 
              culture and the ranger's connection to the wilderness. Here are some characteristics of 
              effective halfling ranger names:
            </p>
            <ul>
              <li><strong>Earthy Quality:</strong> Halfling names often have a grounded, practical sound to them.</li>
              <li><strong>Nature References:</strong> Surnames often include references to natural elements, particularly plants, animals, or terrain features.</li>
              <li><strong>Descriptive Elements:</strong> Many halfling surnames describe a physical trait or skill that might be particularly useful for a ranger.</li>
              <li><strong>Comfortable Sound:</strong> Even for rangers, halfling names tend to have a friendly, approachable quality.</li>
              <li><strong>Subtle Humor:</strong> Halfling names sometimes contain gentle humor or irony, such as a surname that contrasts with their actual abilities.</li>
            </ul>
            <p>
              The best halfling ranger names combine a traditional halfling first name with a surname 
              that hints at their ranger abilities or their connection to nature. This creates a name 
              that is both authentically halfling and reflective of their ranger profession.
            </p>
          </div>
        </section>

        {/* How to Use */}
        <section id="how-to-use" className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">How to Use the Generator</h2>
          <div className="prose max-w-none prose-sm sm:prose-base">
            <p>Using our Halfling Ranger Name Generator is straightforward and simple:</p>
            <ol>
              <li><strong>Select Gender:</strong> Choose between male and female options to get gender-appropriate first names.</li>
              <li><strong>Generate Names:</strong> Click the "Generate Names" button to create a list of 10 unique halfling ranger names.</li>
              <li><strong>Browse Results:</strong> Look through the generated names to find one that suits your character concept.</li>
              <li><strong>Regenerate if Needed:</strong> If none of the names appeal to you, simply click the button again for a new set.</li>
              <li><strong>Mix and Match:</strong> Feel free to mix first names and last names from different generated results to create your perfect combination.</li>
            </ol>
            <p>
              The generator combines traditional halfling first names with surnames that reflect the 
              ranger's connection to nature, their skills, or notable physical traits. This creates 
              balanced names that sound authentically halfling while highlighting their ranger profession.
            </p>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Halfling Ranger Naming Traditions</h2>
          <div className="prose max-w-none prose-sm sm:prose-base">
            <p>
              Halfling rangers follow several naming traditions that blend standard halfling customs 
              with elements unique to their wilderness profession:
            </p>
            <h3>Family Names and Nicknames</h3>
            <p>
              Like all halflings, rangers have a family name passed down through generations. However, 
              many halfling rangers earn nicknames based on their exploits or skills in the wild. These 
              nicknames often become more widely used than their family names among non-halflings. For 
              example, Bilbo Lightfoot might become known simply as "Whisper" among human rangers due to 
              his silent movement.
            </p>
            <h3>Descriptive Surnames</h3>
            <p>
              Many halfling families have surnames that describe a physical characteristic or skill. 
              Rangers often come from families whose surnames coincidentally match their wilderness 
              talents, such as Lightfoot, Quickstep, or Keeneye. Some halfling rangers even change their 
              surnames to better reflect their abilities.
            </p>
            <h3>Plant and Animal Names</h3>
            <p>
              Female halfling rangers often have first names derived from plants or flowers, reflecting 
              their connection to nature. Some male halfling rangers adopt animal-inspired nicknames that 
              reflect their tracking style or preferred terrain.
            </p>
            <h3>Compound Names</h3>
            <p>
              Some halfling rangers, particularly those who travel widely, adopt compound surnames that 
              combine elements of their family name with a descriptor of their ranger specialty. For 
              example, a halfling from the Brandybuck family who specializes in forest tracking might 
              call themselves "Brandyleaf."
            </p>
          </div>
        </section>

        {/* Popular Names */}
        <section id="popular-names" className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Most Popular Halfling Ranger Names</h2>
          <p className="mb-4 sm:mb-6">Below is a collection of the most popular halfling ranger names, each with its own unique significance:</p>
          
          <div className="mb-6 sm:mb-8 overflow-x-auto">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Male Halfling Ranger Names</h3>
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
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Female Halfling Ranger Names</h3>
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
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Halfling Ranger Surnames</h3>
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
            <Link to="/fantasy/dwarf-ranger" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
              <h3 className="font-bold mb-2">Dwarf Ranger Names</h3>
              <p className="text-sm text-muted-foreground">Create strong and rugged names for dwarven rangers and scouts</p>
            </Link>
            <Link to="/fantasy/elven-ranger" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
              <h3 className="font-bold mb-2">Elven Ranger Names</h3>
              <p className="text-sm text-muted-foreground">Generate mystical and nature-attuned names for elven rangers</p>
            </Link>
            <Link to="/fantasy/chaos-dwarf-city" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
              <h3 className="font-bold mb-2">Chaos Dwarf City Names</h3>
              <p className="text-sm text-muted-foreground">Generate dark and imposing names for chaos dwarf settlements</p>
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

export default HalflingRangerNameGenerator; 