import { useState, useEffect } from "react";
import { Wand2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Helmet } from "react-helmet";
import { loadNameData, generateNames, CharacterNameData } from "@/lib/nameUtils";

const ElvenRangerNameGenerator = () => {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [nameData, setNameData] = useState<CharacterNameData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Load name data when component mounts
  useEffect(() => {
    async function fetchNameData() {
      setLoading(true);
      const data = await loadNameData("fantasy", "elven-ranger");
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

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>Elven Ranger Name Generator - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate the perfect name for your elven ranger character. Over 10,000 unique name combinations available." />
        <meta name="keywords" content="elven ranger, fantasy names, name generator, elf, ranger, character names, RPG names" />
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
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Elven Ranger Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate the perfect name for your elven ranger character.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Elven Ranger Names</CardTitle>
            <CardDescription>
              Choose gender and click generate to create elven ranger names
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center mb-4">
              <div className="flex items-center gap-2">
                <Toggle 
                  pressed={gender === "male"} 
                  onPressedChange={() => setGender("male")}
                  className="data-[state=on]:bg-blue-500"
                >
                  Male
                </Toggle>
                <Toggle 
                  pressed={gender === "female"} 
                  onPressedChange={() => setGender("female")}
                  className="data-[state=on]:bg-pink-500"
                >
                  Female
                </Toggle>
              </div>
              
              <Button onClick={generateNamesHandler} disabled={loading} className="sm:ml-auto">
                <Wand2 className="h-4 w-4 mr-2" />
                Generate Names
              </Button>
            </div>
            
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
                    // Find description for each part of the name
                    const [firstName, lastName] = name.split(' ');
                    const firstNameEntry = nameData?.[gender].find(e => e.name === firstName);
                    const lastNameEntry = nameData?.lastNames.find(e => e.name === lastName);
                    
                    return (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{name}</TableCell>
                        <TableCell>
                          {firstNameEntry && <span>{firstNameEntry.description}</span>}
                          {firstNameEntry && lastNameEntry && <span>. </span>}
                          {lastNameEntry && <span>{lastNameEntry.description}</span>}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
            
            {!loading && generatedNames.length === 0 && (
              <div className="text-center p-6 text-muted-foreground">
                Click "Generate Names" to create elven ranger names
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Information Section */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">About Elven Ranger Names</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              Elven rangers embody grace, agility, and a deep connection to nature. Their names reflect their woodland heritage and skills as protectors of the wild.
            </p>
            <p>
              Male elven ranger names often convey strength tempered with wisdom, while female elven ranger names frequently embody grace and deadly precision. 
              Their surnames often describe their skills, appearance, or connection to nature.
            </p>
            <p>
              Use these names for your fantasy characters in roleplaying games like Dungeons & Dragons, Pathfinder, or for creative writing projects.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ElvenRangerNameGenerator; 