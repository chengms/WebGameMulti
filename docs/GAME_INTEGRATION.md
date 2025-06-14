# WebGameMulti Game Integration Guide

This document details how to integrate new games into the WebGameMulti platform.

## Overview

The WebGameMulti platform uses a folder-based game integration approach, with each game having its own folder in the `games/` directory. The platform automatically detects and loads these games, displaying them on the homepage.

## Game Integration Steps

### 1. Create Game Directory

Create a new folder in the `games/` directory. The folder name should be the English name of the game, using lowercase letters and hyphens, for example: `snake-game`.

```
games/
└── snake-game/
```

### 2. Create Required Files

Each game directory must include the following files:

- `index.html`: Main game entry file
- `meta.json`: Game metadata file
- `image/`: Image resources directory
  - `cover.png`: Game cover image (recommended size: 300x200px)

Other files can be added as needed, such as:

- `game.js`: Main game script
- `style.css`: Game styles
- Other resource files

### 3. Write Game Metadata

The `meta.json` file is used to describe basic game information, in the following format:

```json
{
  "name": "Snake",
  "description": "Classic snake game where you control a snake with keyboard, eat food to grow longer, and lose if you hit walls or yourself.",
  "author": "Developer Name",
  "version": "1.0.0",
  "tags": ["Puzzle", "Casual", "Classic"],
  "thumbnail": "image/cover.png",
  "controls": "Use arrow keys to control snake movement",
  "minWidth": 800,
  "minHeight": 600,
  "createdAt": "2023-06-10",
  "updatedAt": "2023-06-15"
}
```

| Field | Type | Required | Description |
|------|------|------|------|
| name | String | Yes | Game name |
| description | String | Yes | Game description |
| author | String | No | Game author |
| version | String | No | Game version |
| tags | String Array | Yes | Game tags |
| thumbnail | String | Yes | Game cover image path |
| controls | String | No | Game controls description |
| minWidth | Number | No | Minimum game width |
| minHeight | Number | No | Minimum game height |
| createdAt | String | No | Creation date |
| updatedAt | String | No | Update date |

### 4. Write Game Entry File

`index.html` is the main entry file for the game and should contain a complete HTML structure. For example:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Snake</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div id="game-container">
    <canvas id="game-canvas"></canvas>
    <div id="score">Score: 0</div>
  </div>
  
  <script src="game.js"></script>
</body>
</html>
```

### 5. Game Implementation Considerations

#### Resource Paths

Game internal resource references should use relative paths, for example:

```html
<!-- Correct -->
<img src="image/sprite.png">
<script src="game.js"></script>

<!-- Incorrect -->
<img src="/games/snake-game/image/sprite.png">
```

#### Game Dimensions

Games should be able to adapt to containers of different sizes. It's best to use responsive design or provide `minWidth` and `minHeight` parameters to specify minimum dimensions.

#### Game State

Games should provide pause and resume functionality so users can continue playing when they return after leaving the page.

#### Global Variables

Avoid using global variables to prevent conflicts with the platform or other games. It's recommended to encapsulate game logic in self-executing functions or modules.

```javascript
// Recommended
(function() {
  // Game code
})();

// Or use ES modules
export default class Game {
  // Game code
}
```

### 6. Test the Game

After integration, start the platform and test that the game functions properly:

1. Can the game load normally
2. Are game functions working properly
3. How the game performs at different sizes
4. Game error handling

## Advanced Integration Options

### Game Communication

If the game needs to communicate with the platform (e.g., save scores, get user information), it can do so through `window.parent.postMessage`:

```javascript
// Send message from game to platform
window.parent.postMessage({
  type: 'SCORE_UPDATE',
  score: 100
}, '*');

// Listen for platform messages
window.addEventListener('message', function(event) {
  if (event.data.type === 'PAUSE_GAME') {
    // Pause game
  }
});
```

### Game Bundling

For complex games, it's recommended to use bundling tools (such as webpack, rollup, etc.) to package the game into a single file or a few files, then integrate it into the platform.

## Common Issues

### 1. Game Not Showing on Homepage

- Check if the `meta.json` file format is correct
- Ensure the game directory structure follows the guidelines
- Check the console for error messages

### 2. Game Loading Errors

- Check if resource paths are correct
- Ensure all resources can load normally
- Check console error messages

### 3. Game Style Conflicts with Platform

- Use game-specific CSS class names to avoid conflicts with platform styles
- Consider using CSS reset or isolating styles in the game

## Example Game

Refer to the `games/example-game/` directory, which contains a complete example game that can be used as a reference for developing new games. 