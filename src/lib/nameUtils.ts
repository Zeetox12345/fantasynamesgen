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
  try {
    return await import(`../data/${category}/${generator}.json`);
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
  const names: string[] = [];
  const firstNames = gender === 'male' ? nameData.male : nameData.female;
  
  // Return empty array if no names available
  if (firstNames.length === 0 || nameData.lastNames.length === 0) {
    return names;
  }

  for (let i = 0; i < count; i++) {
    const randomFirstNameIndex = Math.floor(Math.random() * firstNames.length);
    const randomLastNameIndex = Math.floor(Math.random() * nameData.lastNames.length);
    
    const firstName = firstNames[randomFirstNameIndex].name;
    const lastName = nameData.lastNames[randomLastNameIndex].name;
    
    names.push(`${firstName} ${lastName}`);
  }
  
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
  const names: string[] = [];
  const nameList = nameData[nameType] as NameEntry[] | undefined;
  
  if (!nameList || nameList.length === 0) {
    return names;
  }
  
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * nameList.length);
    names.push(nameList[randomIndex].name);
  }
  
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
  if (isCharacterNameData(nameData) && options.gender) {
    return generateCharacterNames(nameData, options.gender, count);
  } else if (isLocationNameData(nameData) && options.nameType) {
    return generateLocationNames(nameData, options.nameType as keyof LocationNameData, count);
  }
  return [];
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