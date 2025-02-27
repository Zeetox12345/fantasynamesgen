import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Wand2, Building2, Map, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { loadNameData, generateNames, LocationNameData } from "@/lib/nameUtils";
import { GeneratorImage } from "@/components/GeneratorImage";

// REMOVE hardcoded arrays
// const prefixes = [ ... ];
// const suffixes = [ ... ];
// const modifiers = [ ... ];

const ChaosDwarfCityNameGenerator = () => {
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [nameData, setNameData] = useState<LocationNameData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"cityNames" | "districtNames" | "landmarkNames">("cityNames");

  // Load name data when component mounts
  useEffect(() => {
    async function fetchNameData() {
      setLoading(true);
      const data = await loadNameData("fantasy", "chaos-dwarf-city");
      setNameData(data as LocationNameData);
      setLoading(false);
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData) return;
    
    const newNames = generateNames(nameData, { nameType: activeTab }, 10);
    setGeneratedNames(newNames);
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case "cityNames": return <Building2 className="h-4 w-4 mr-2" />;
      case "districtNames": return <Map className="h-4 w-4 mr-2" />;
      case "landmarkNames": return <Wand2 className="h-4 w-4 mr-2" />;
      default: return <Building2 className="h-4 w-4 mr-2" />;
    }
  };

  const getTabTitle = (tab: string) => {
    switch (tab) {
      case "cityNames": return "Chaos Dwarf Cities";
      case "districtNames": return "Districts";
      case "landmarkNames": return "Landmarks";
      default: return "Names";
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>Chaos Dwarf City Name Generator - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate the perfect name for your chaos dwarf city. Over 10,000 unique name combinations available." />
        <meta name="keywords" content="chaos dwarf city, fantasy names, name generator, chaos dwarf, city names, settlement names, RPG names" />
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
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Chaos Dwarf City Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate the perfect name for your chaos dwarf city.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Chaos Dwarf Location Names</CardTitle>
            <CardDescription>
              Select what to generate and click the button
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs 
              defaultValue="cityNames" 
              value={activeTab} 
              onValueChange={(v) => setActiveTab(v as any)}
              className="mb-4"
            >
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="cityNames">
                  <Building2 className="h-4 w-4 mr-2" />
                  Cities
                </TabsTrigger>
                <TabsTrigger value="districtNames">
                  <Map className="h-4 w-4 mr-2" />
                  Districts
                </TabsTrigger>
                <TabsTrigger value="landmarkNames">
                  <Wand2 className="h-4 w-4 mr-2" />
                  Landmarks
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Button onClick={generateNamesHandler} disabled={loading} className="w-full mb-4">
              {getTabIcon(activeTab)}
              Generate {getTabTitle(activeTab)}
            </Button>
            
            {loading && <p>Loading name data...</p>}
            
            {!loading && generatedNames.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {generatedNames.map((name, index) => {
                    // Find description of the name
                    const nameList = nameData?.[activeTab as keyof LocationNameData] as any[];
                    const entry = nameList?.find(e => e.name === name);
                    
                    return (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{name}</TableCell>
                        <TableCell>{entry?.description}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
            
            {!loading && generatedNames.length === 0 && (
              <div className="text-center p-6 text-muted-foreground">
                Click "Generate" to create {getTabTitle(activeTab).toLowerCase()}
              </div>
            )}
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
        <section id="introduction" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Introduction</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Chaos Dwarf cities are dark and imposing metropolises built by the corrupted dwarves who have fallen to the 
              influence of Chaos. These cities stand as monuments to industry, slavery, and dark magic, combining dwarven 
              craftsmanship with chaotic influences to create some of the most formidable urban centers in fantasy worlds.
            </p>
            <p className="mb-4">
              Unlike their uncorrupted kin who build their homes in mountains, Chaos Dwarfs often construct their cities in 
              volcanic regions, harsh deserts, or blighted plains. Their settlements are characterized by massive ziggurats, 
              smoke-belching factories, and sprawling slave pens, all surrounded by imposing walls of black iron and obsidian.
            </p>
            <p>
              This generator creates names for these dark dwarven metropolises, providing you with suitably ominous and 
              powerful-sounding names for your fantasy world's Chaos Dwarf settlements.
            </p>
          </div>
          
          {/* Featured Chaos Dwarf City Image */}
          <GeneratorImage 
            src="/images/categories/fantasy/chaos-dwarf-city/chaos-dwarf-city-main.jpg"
            alt="Chaos Dwarf City"
            caption="A Chaos Dwarf city rises from the volcanic plains, its ziggurats and smoke stacks dominating the blighted landscape."
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Chaos Dwarf City Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A good Chaos Dwarf city name should evoke feelings of dread, power, and industrial might. Here are some 
              characteristics that make for effective Chaos Dwarf city names:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Harsh Sounds:</span> 
                <span>Names with hard consonants and guttural sounds that reflect the harsh nature of these cities.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Dark Elements:</span> 
                <span>References to fire, smoke, iron, blood, or darkness that symbolize the city's nature.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Chaotic Influence:</span> 
                <span>Elements that suggest corruption, chaos, or dark magic.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Industrial Themes:</span> 
                <span>References to forges, industry, or craftsmanship twisted by chaos.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Imposing Quality:</span> 
                <span>Names that sound grand and intimidating, befitting the monumental architecture of these cities.</span>
              </li>
            </ul>
            <p>
              The best Chaos Dwarf city names often combine these elements to create a name that sounds both dwarven in origin 
              but twisted by chaotic influence, reflecting the dual nature of these corrupted beings.
            </p>
          </div>
        </section>

        {/* How to Use */}
        <section id="how-to-use" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">How to Use the Generator</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">Using our Chaos Dwarf City Name Generator is straightforward:</p>
            <ol className="space-y-3 mb-6 pl-5">
              <li className="pl-2">
                <span className="font-semibold text-primary">Generate Names:</span> Click the "Generate Names" button to create a list of 10 unique Chaos Dwarf city names.
              </li>
              <li className="pl-2">
                <span className="font-semibold text-primary">Browse Results:</span> Look through the generated names to find one that suits your fictional setting.
              </li>
              <li className="pl-2">
                <span className="font-semibold text-primary">Regenerate if Needed:</span> If none of the names appeal to you, simply click the button again for a new set.
              </li>
              <li className="pl-2">
                <span className="font-semibold text-primary">Customize:</span> Feel free to modify any generated name to better fit your specific needs or to add your own creative touch.
              </li>
            </ol>
            <p>
              Each generated name comes with a brief description that suggests the city's primary function or notable feature, 
              helping to inspire your worldbuilding and storytelling.
            </p>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Chaos Dwarf City Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-5">
              Chaos Dwarf cities follow distinct naming patterns that reflect their dark culture and twisted values:
            </p>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">Dark Honorifics</h3>
                <p>
                  Many Chaos Dwarf cities include honorifics like "Zharr" (meaning fire or burning in their tongue) or "Drazh" 
                  (meaning blood or pain). These prefixes or suffixes denote the city's importance or dedication to a particular 
                  aspect of their dark culture.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">Founder Commemoration</h3>
                <p>
                  Some cities are named after powerful Chaos Dwarf lords or sorcerer-prophets who founded them or rule over them. 
                  These names often incorporate the founder's name with words meaning "domain," "forge," or "throne."
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">Industrial Function</h3>
                <p>
                  Cities may be named according to their primary industrial function, such as mining, forging, or slave-trading. 
                  These functional names are often combined with dark or imposing qualifiers.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">Geographical Features</h3>
                <p>
                  Some Chaos Dwarf cities are named after corrupted or twisted versions of the geographical features they're built upon, 
                  such as volcanic mountains, ash plains, or sulfurous lakes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Names */}
        <section id="popular-names" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Most Famous Chaos Dwarf Cities</h2>
          <p className="text-lg mb-6 text-muted-foreground/90">Below are some of the most renowned Chaos Dwarf cities from fantasy lore:</p>
          
          <div className="mb-6 sm:mb-8 overflow-x-auto">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Common Name Elements</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!loading && nameData && nameData.cityNames.slice(0, 20).map((element, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{element.name}</TableCell>
                    <TableCell>{element.description}</TableCell>
                  </TableRow>
                ))}
                {loading && (
                  <TableRow>
                    <TableCell colSpan={2}>Loading name data...</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="mb-6 sm:mb-8 overflow-x-auto">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">District Names</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!loading && nameData && nameData.districtNames.slice(0, 20).map((element, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{element.name}</TableCell>
                    <TableCell>{element.description}</TableCell>
                  </TableRow>
                ))}
                {loading && (
                  <TableRow>
                    <TableCell colSpan={2}>Loading name data...</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="overflow-x-auto">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Landmark Names</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!loading && nameData && nameData.landmarkNames.slice(0, 20).map((element, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{element.name}</TableCell>
                    <TableCell>{element.description}</TableCell>
                  </TableRow>
                ))}
                {loading && (
                  <TableRow>
                    <TableCell colSpan={2}>Loading name data...</TableCell>
                  </TableRow>
                )}
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