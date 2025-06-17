# WebGameMulti

## Project Overview

WebGameMulti is an open-source web game platform designed to provide users with a centralized place to discover and play various web games. The platform uses a unified English interface to provide players with an intuitive and user-friendly gaming experience.

## Key Features

- **Automatic Game Loading**: System automatically loads games from the `games` directory
- **Category Browsing**: Browse games by category
- **Responsive Design**: Adapts to various screen sizes
- **English Interface**: Unified English user interface for improved international experience
- **Game Details**: Each game has a detailed introduction page
- **Game Integration Standards**: Standardized game integration methods

## Technology Stack

- React 18
- React Router 6
- Vite
- CSS Modules
- ESLint & Prettier

## Project Structure

```
WebGameMulti/
├── docs/               # Documentation
├── games/              # Games directory
│   └── example-game/   # Example game
│       ├── image/      # Game image resources
│       └── index.html  # Game entry file
├── src/                # Source code
│   ├── components/     # Components
│   ├── pages/          # Pages
│   ├── styles/         # Global styles
│   └── utils/          # Utility functions
└── public/             # Static resources
```

## Development Guide

### Installing Dependencies

```bash
npm install
```

### Running Development Environment

```bash
npm run dev
```

### Building Production Version

```bash
npm run build
```

## Game Integration

To add a new game to the platform, follow these steps:

1. Create a new folder for your game in the `games` directory
2. Add the HTML entry file for the game (`index.html`)
3. Add game cover image and screenshots in the `image` subdirectory
4. The game must adapt to the platform's embedded environment

For detailed integration guidelines, please refer to the [Game Integration Documentation](docs/GAME_INTEGRATION.md).

## Interface Language

WebGameMulti uses a unified English user interface, which helps to:

- Improve the platform's internationalization
- Maintain interface consistency
- Expand the audience reach

For interface language specifications, see [Interface Language Specification](docs/INTERFACE_LANGUAGE.md).

## Contribution Guidelines

We welcome contributions of all kinds, including but not limited to:

- Bug reports
- Documentation improvements
- Feature requests
- Code contributions

Please ensure you follow our [Coding Standards](docs/CODING_STANDARDS.md).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact Information

- Email: chengms666@gmail.com 