# Fantasy Names Generator Data Structure

This directory contains the name data used by the various name generators in the application. The data is organized by category and generator.

## Directory Structure

```
src/data/
├── fantasy/
│   ├── elven-ranger.json
│   ├── dwarf-ranger.json
│   ├── halfling-ranger.json
│   ├── space-ranger.json
│   └── chaos-dwarf-city.json
├── [other-category]/
│   └── [generator-name].json
└── README.md
```

## JSON File Formats

### Character Names Format (Male/Female)

For generators that create character names with gender distinctions (like elven-ranger, dwarf-ranger, etc.):

```json
{
  "male": [
    { "name": "FirstName1", "description": "Description of this name" },
    { "name": "FirstName2", "description": "Description of this name" }
    // Add 5000 male names total
  ],
  "female": [
    { "name": "FirstName1", "description": "Description of this name" },
    { "name": "FirstName2", "description": "Description of this name" }
    // Add 5000 female names total
  ],
  "lastNames": [
    { "name": "LastName1", "description": "Description of this surname" },
    { "name": "LastName2", "description": "Description of this surname" }
    // Add enough last names for variety
  ]
}
```

### Location Names Format

For generators that create location names (like chaos-dwarf-city) where gender is not applicable:

```json
{
  "cityNames": [
    { "name": "CityName1", "description": "Description of this city" },
    { "name": "CityName2", "description": "Description of this city" }
  ],
  "districtNames": [
    { "name": "DistrictName1", "description": "Description of this district" },
    { "name": "DistrictName2", "description": "Description of this district" }
  ],
  "landmarkNames": [
    { "name": "LandmarkName1", "description": "Description of this landmark" },
    { "name": "LandmarkName2", "description": "Description of this landmark" }
  ]
  // Add other name categories as needed
}
```

## How to Expand

1. **Add more names to existing generators:**
   - Simply add more entries to the respective arrays in the JSON files.
   - Each name should have a meaningful description.

2. **Add a new character name generator:**
   - Create a new JSON file in the appropriate category folder.
   - Follow the character names format with male names, female names, and last names.
   - Use the `nameUtils.ts` utility functions to load and use this data.

3. **Add a new location name generator:**
   - Create a new JSON file in the appropriate category folder.
   - Follow the location names format with appropriate name categories.
   - Use the `nameUtils.ts` utility functions to load and use this data.

4. **Add a new category:**
   - Create a new folder in the `src/data/` directory.
   - Add generator JSON files following the appropriate format.

## Using the Name Data

The application provides utility functions in `src/lib/nameUtils.ts` to work with these name files:

### For Character Names

```typescript
// Import the utility functions
import { loadNameData, generateNames } from "@/lib/nameUtils";

// Load name data for a specific generator
const nameData = await loadNameData("fantasy", "elven-ranger");

// Generate 10 male names
const maleNames = generateNames(nameData, { gender: "male" }, 10);

// Generate 10 female names
const femaleNames = generateNames(nameData, { gender: "female" }, 10);
```

### For Location Names

```typescript
// Import the utility functions
import { loadNameData, generateNames } from "@/lib/nameUtils";

// Load name data for a specific generator
const nameData = await loadNameData("fantasy", "chaos-dwarf-city");

// Generate 10 city names
const cityNames = generateNames(nameData, { nameType: "cityNames" }, 10);

// Generate 10 district names
const districtNames = generateNames(nameData, { nameType: "districtNames" }, 10);
```

See `src/pages/fantasy/elven-ranger-example.tsx` and `src/pages/fantasy/chaos-dwarf-city-example.tsx` for complete implementation examples.

## Name Format Guidelines

### Character Names

1. **First Names:**
   - Should be appropriate for the specific culture/race/theme.
   - Include a meaningful description that explains the origin, meaning, or characteristics.
   - Avoid duplicates within the same file.

2. **Last Names:**
   - Should complement the first names and fit the theme.
   - Include descriptions that add depth to the character.
   - Can be titles, clan names, place of origin, or descriptive surnames depending on the setting.

### Location Names

1. **Name Categories:**
   - Choose appropriate categories for your generator (cities, districts, landmarks, etc.).
   - Each category should contain related names that fit together thematically.

2. **Descriptions:**
   - Keep descriptions concise but informative.
   - Focus on meaning, appearance, history, or notable characteristics.
   - Add flavor that helps users understand the world you're building. 