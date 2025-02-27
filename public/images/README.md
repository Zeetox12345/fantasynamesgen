# Images Directory Structure

This directory contains images for the Fantasy Names Generator application.

## Structure

```
images/
├── categories/
│   ├── fantasy/
│   │   ├── fantasy-main.jpg (Main image for the Fantasy category)
│   │   ├── space-ranger/
│   │   │   ├── space-ranger-main.jpg (Main image for Space Ranger generator)
│   │   │   └── ... (Additional images for Space Ranger generator)
│   │   ├── dwarf-ranger/
│   │   │   ├── dwarf-ranger-main.jpg (Main image for Dwarf Ranger generator)
│   │   │   └── ... (Additional images for Dwarf Ranger generator)
│   │   ├── elven-ranger/
│   │   │   ├── elven-ranger-main.jpg (Main image for Elven Ranger generator)
│   │   │   └── ... (Additional images for Elven Ranger generator)
│   │   ├── halfling-ranger/
│   │   │   ├── halfling-ranger-main.jpg (Main image for Halfling Ranger generator)
│   │   │   └── ... (Additional images for Halfling Ranger generator)
│   │   └── chaos-dwarf-city/
│   │       ├── chaos-dwarf-city-main.jpg (Main image for Chaos Dwarf City generator)
│   │       └── ... (Additional images for Chaos Dwarf City generator)
│   └── ... (Other categories)
└── ... (Other image types)
```

## Image Guidelines

- Main category images should be 16:9 ratio, recommended size: 1200x675px
- Generator images should be 16:9 ratio, recommended size: 800x450px
- Use JPG format for photographs and PNG for illustrations with transparency
- Keep file sizes under 200KB for optimal performance
- Use descriptive filenames in kebab-case (e.g., `elven-archer-bow.jpg`)

## Adding New Images

1. Place the main category image in the category folder (e.g., `fantasy/fantasy-main.jpg`)
2. Place generator images in their respective subfolders (e.g., `fantasy/elven-ranger/elven-ranger-main.jpg`)
3. Update the corresponding component to reference the image path 