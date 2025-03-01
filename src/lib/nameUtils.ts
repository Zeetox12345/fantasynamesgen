// Type definitions for name entries
export interface NameEntry {
  name: string;
  description: string;
}

// For character generators (with male/female names)
export interface CharacterNameData {
  male: NameEntry[];
  female: NameEntry[];
  lastNames: NameEntry[];
}

// For location generators (like cities, regions, etc.)
export interface LocationNameData {
  cityNames?: NameEntry[];
  districtNames?: NameEntry[];
  landmarkNames?: NameEntry[];
  regionNames?: NameEntry[];
  // Adding male and female properties to support the merfolk city generator
  male?: NameEntry[];
  female?: NameEntry[];
  // Adding reindeerNames to support the reindeer generator
  reindeerNames?: NameEntry[];
  // Other possible categories can be added as needed
}

// Union type that can be either character or location data
export type NameData = CharacterNameData | LocationNameData;

/**
 * Checks if the data is a character name data structure
 */
export function isCharacterNameData(data: NameData): data is CharacterNameData {
  return 'male' in data && 'female' in data && 'lastNames' in data;
}

/**
 * Checks if the data is a location name data structure
 */
export function isLocationNameData(data: NameData): data is LocationNameData {
  return !isCharacterNameData(data);
}

/**
 * Loads name data from a specific category and generator
 * 
 * @param category The category folder name (e.g., 'fantasy')
 * @param generator The specific generator name (e.g., 'elven-ranger')
 * @returns Promise with the loaded name data
 */
export async function loadNameData(category: string, generator: string): Promise<NameData> {
  console.log(`Attempting to load name data for ${category}/${generator}`);
  try {
    // Use a more reliable approach for importing data files
    let data;
    
    // Handle fantasy category data files
    if (category === 'fantasy') {
      try {
        switch (generator) {
          case 'space-ranger':
            data = await import('@/data/fantasy/space-ranger.json');
            break;
          case 'dwarf-ranger':
            data = await import('@/data/fantasy/dwarf-ranger.json');
            break;
          case 'elven-ranger':
            data = await import('@/data/fantasy/elven-ranger.json');
            break;
          case 'halfling-ranger':
            data = await import('@/data/fantasy/halfling-ranger.json');
            break;
          case 'chaos-dwarf-city':
            data = await import('@/data/fantasy/chaos-dwarf-city.json');
            break;
          case 'merfolk-city':
            data = await import('@/data/fantasy/merfolk-city.json');
            break;
          case 'sea-god':
            data = await import('@/data/fantasy/sea-god.json');
            break;
          case 'reindeer':
            data = await import('@/data/fantasy/reindeer.json');
            break;
          case 'female-demon':
            data = await import('@/data/fantasy/female-demon.json');
            break;
          case 'male-demon':
            data = await import('@/data/fantasy/male-demon.json');
            break;
          case 'ranger':
            data = await import('@/data/fantasy/ranger.json');
            break;
          case 'dark-ranger':
            data = await import('@/data/fantasy/dark-ranger.json');
            break;
          case 'acotar':
            data = await import('@/data/fantasy/acotar.json');
            break;
          case 'femalealien':
            data = await import('@/data/fantasy/female-alien.json');
            break;
          default:
            throw new Error(`Unknown generator: ${generator}`);
        }
        
        // Handle the default export if it exists
        data = data.default || data;
        
        console.log(`Successfully loaded data for ${category}/${generator}`);
        return data;
      } catch (importError) {
        console.error(`Error importing data for ${category}/${generator}:`, importError);
        
        // Try an alternative approach with a relative path
        try {
          const relativePath = `../data/${category}/${generator}.json`;
          console.log(`Trying alternative import path: ${relativePath}`);
          const alternativeData = await import(relativePath);
          return alternativeData.default || alternativeData;
        } catch (alternativeError) {
          console.error(`Alternative import also failed:`, alternativeError);
          throw new Error(`Failed to load data for ${category}/${generator}`);
        }
      }
    } else {
      throw new Error(`Unknown category: ${category}`);
    }
  } catch (error) {
    console.error(`Failed to load name data for ${category}/${generator}:`, error);
    // Return empty data structure in case of error
    return {
      male: [],
      female: [],
      lastNames: []
    };
  }
}

/**
 * Generates a specified number of character names using the provided name data
 * 
 * @param nameData The character name data to use
 * @param gender 'male' or 'female'
 * @param count Number of names to generate
 * @returns Array of generated full names
 */
export function generateCharacterNames(
  nameData: CharacterNameData, 
  gender: 'male' | 'female', 
  count: number
): string[] {
  console.log(`generateCharacterNames for gender: ${gender}, count: ${count}`);
  const names: string[] = [];
  const firstNames = gender === 'male' ? nameData.male : nameData.female;
  
  console.log(`First names available: ${firstNames?.length || 0}`);
  console.log(`Last names available: ${nameData.lastNames?.length || 0}`);
  
  // Return empty array if no names available
  if (!firstNames?.length || !nameData.lastNames?.length) {
    console.log("Missing first names or last names, returning empty array");
    return names;
  }

  try {
    for (let i = 0; i < count; i++) {
      const randomFirstNameIndex = Math.floor(Math.random() * firstNames.length);
      const randomLastNameIndex = Math.floor(Math.random() * nameData.lastNames.length);
      
      const firstName = firstNames[randomFirstNameIndex].name;
      const lastName = nameData.lastNames[randomLastNameIndex].name;
      
      names.push(`${firstName} ${lastName}`);
    }
  } catch (error) {
    console.error(`Error generating character names for ${gender}:`, error);
  }
  
  console.log(`Generated ${names.length} character names`);
  return names;
}

/**
 * Generates a specified number of location names using the provided name data
 * 
 * @param nameData The location name data to use
 * @param nameType The type of names to generate (e.g., 'cityNames')
 * @param count Number of names to generate
 * @returns Array of generated names
 */
export function generateLocationNames(
  nameData: LocationNameData,
  nameType: keyof LocationNameData,
  count: number
): string[] {
  console.log(`generateLocationNames for type: ${nameType}, count: ${count}`);
  const names: string[] = [];
  const nameList = nameData[nameType] as NameEntry[] | undefined;
  
  console.log(`Names available for ${nameType}: ${nameList?.length || 0}`);
  
  if (!nameList || nameList.length === 0) {
    console.log(`No names available for type ${nameType}, returning empty array`);
    return names;
  }
  
  try {
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * nameList.length);
      names.push(nameList[randomIndex].name);
    }
  } catch (error) {
    console.error(`Error generating location names for ${nameType}:`, error);
  }
  
  console.log(`Generated ${names.length} location names`);
  return names;
}

/**
 * Generates names based on the type of name data
 * 
 * @param nameData The name data to use
 * @param options Options for generation (gender for character names, nameType for location names)
 * @param count Number of names to generate
 * @returns Array of generated names
 */
export function generateNames(
  nameData: NameData, 
  options: { gender?: 'male' | 'female', nameType?: string },
  count: number
): string[] {
  console.log("generateNames called with:", { nameData, options, count });
  
  try {
    if (isCharacterNameData(nameData) && options.gender) {
      console.log(`Generating character names for gender: ${options.gender}`);
      return generateCharacterNames(nameData, options.gender, count);
    } else if (isLocationNameData(nameData) && options.nameType) {
      console.log(`Generating location names for type: ${options.nameType}`);
      // For merfolk city, we're using male/female as the nameType
      // This is a special case to handle the merfolk city data structure
      // We need to cast the nameType to keyof LocationNameData to satisfy TypeScript
      return generateLocationNames(nameData, options.nameType as keyof LocationNameData, count);
    }
    
    console.log("Couldn't determine what type of names to generate");
    return [];
  } catch (error) {
    console.error("Error generating names:", error);
    return [];
  }
}

/**
 * Gets the description for a given name
 * 
 * @param nameData The name data to search in
 * @param name The name to find the description for
 * @returns The description or undefined if not found
 */
export function getNameDescription(nameData: NameData, name: string): string | undefined {
  if (isCharacterNameData(nameData)) {
    // Split the full name into first and last name
    const [firstName, lastName] = name.split(' ');
    
    // Look for first name in both male and female arrays
    const firstNameEntry = [...nameData.male, ...nameData.female].find(entry => entry.name === firstName);
    const lastNameEntry = nameData.lastNames.find(entry => entry.name === lastName);
    
    if (firstNameEntry && lastNameEntry) {
      return `${firstNameEntry.description}. ${lastNameEntry.description}.`;
    } else if (firstNameEntry) {
      return firstNameEntry.description;
    } else if (lastNameEntry) {
      return lastNameEntry.description;
    }
  } else {
    // For location names, search in all available name arrays
    for (const key in nameData) {
      const nameList = nameData[key as keyof LocationNameData] as NameEntry[] | undefined;
      if (nameList) {
        const entry = nameList.find(e => e.name === name);
        if (entry) {
          return entry.description;
        }
      }
    }
  }
  
  return undefined;
} 