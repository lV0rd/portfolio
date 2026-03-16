# Portfolio Website

A configurable portfolio website for Roblox developers. Easy to customize and maintain through a single JSON configuration file.

## Features

- **Fully Configurable**: All content managed through `config.json`
- **Responsive Design**: Works on desktop and mobile
- **Smooth Animations**: Fade-in effects and smooth scrolling
- **Modular Structure**: Clean separation of HTML, CSS, and JavaScript
- **Theme Support**: Easy color customization through CSS variables

## File Structure

```
portfolio/
├── index.html          # Main HTML template
├── style.css           # All styles
├── script.js           # JavaScript logic
├── config.json         # Configuration file
├── README.md           # This file
├── assets/
│   ├── images/
│   │   ├── icons/      # Social media icons
│   │   └── reviews/    # Review images
│   └── videos/
│       └── demos/      # Video demo files
└── videos.json         # Legacy file (can be removed)
```

## Configuration

All website content is configured through `config.json`. The file is divided into sections:

### Personal Information
```json
"personal": {
  "name": "Your Name",
  "title": "Your Title",
  "description": "Short description about yourself",
  "eyebrow": "Tagline",
  "bio": ["Paragraph 1", "Paragraph 2", "Paragraph 3"],
  "skills": "Your skills",
  "social": {
    "platform": {
      "url": "https://...",
      "icon": "icons/platform.png"
    }
  }
}
```

### Projects
```json
"projects": {
  "description": "Description of projects section",
  "featured": {
    "title": "Featured Project",
    "role": "Your Role",
    "description": "Project description",
    "media": "path/to/image.jpg", // optional
    "cta": "Call to Action"
  },
  "list": [
    {
      "title": "Project Title",
      "role": "Your Role",
      "description": "Description",
      "image": "path/to/thumbnail.jpg",
      "playUrl": "https://...",
      "contactUrl": "#contact"
    }
  ]
}
```

### Technical Showcase
```json
"showcase": {
  "description": "Description of showcase section",
  "videos": [
    {
      "title": "Video Title",
      "description": "Video description",
      "src": "demos/video.mp4"
    }
  ]
}
```

### Terms of Service
```json
"terms": {
  "description": "Description",
  "items": [
    "Term 1",
    "Term 2"
  ]
}
```

### Reviews
```json
"reviews": {
  "description": "Description",
  "images": [
    "reviews/review1.png",
    "reviews/review2.png"
  ]
}
```

### Theme
```json
"theme": {
  "colors": {
    "bg1": "#0e0e10",
    "bg2": "#141416",
    "card": "#19191b",
    "muted": "#a7a7a7",
    "accent": "#ff4c4c",
    "accent2": "#ff0000",
    "glass": "rgba(20,20,22,0.6)"
  },
  "maxWidth": "1100px",
  "radius": "10px",
  "gap": "1.25rem",
  "navHeight": "64px"
}
```

## Adding Content

### Projects
1. Add project images to an `images/` folder (create if needed)
2. Update `config.json` projects section
3. For featured project, add media file path or leave as `null`

### Videos
1. Add video files to `assets/videos/demos/` folder
2. Update `config.json` showcase.videos array

### Reviews
1. Add review images to `assets/images/reviews/` folder
2. Update `config.json` reviews.images array

### Social Links
1. Add icon files to `assets/images/icons/` folder
2. Update `config.json` personal.social object

## Customization

### Colors
Edit the `theme.colors` section in `config.json` to change the color scheme.

### Layout
Modify `style.css` for layout changes. CSS variables are used for consistent theming.

### Content Structure
The HTML template in `index.html` uses IDs that correspond to JavaScript functions. Add new sections by:
1. Adding HTML structure with appropriate IDs
2. Creating population functions in `script.js`
3. Adding data to `config.json`
4. Calling the function in the `init()` function

## Development

To run locally:
1. Open `index.html` in a web browser
2. Make changes to `config.json` and refresh

No build process required - it's pure HTML/CSS/JS.

## Deployment

Upload all files to your web server. Ensure the folder structure is maintained.

## Legacy Files

- `videos.json` - Can be removed, data moved to `config.json`
- Old embedded styles/scripts in `index.html` - Replaced with external files