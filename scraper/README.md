# Game Scraper for GameTime Bar

This directory contains a Node.js script to scrape game information from various websites and format it for use in the `games-config.txt` file of the GameTime Bar project.

## Features

-   Fetches game data from pre-configured websites.
-   Extracts game titles, URLs, and thumbnail images.
-   Formats the extracted data into the `|`-delimited format required by the game loader.
-   Outputs the formatted strings to the console for easy copy-pasting.

## Prerequisites

-   [Node.js](https://nodejs.org/) (version 14.x or newer recommended)
-   npm (comes with Node.js)

## Setup

1.  Navigate to this directory in your terminal:
    ```bash
    cd scraper
    ```

2.  Install the required dependencies:
    ```bash
    npm install
    ```

## How to Run

1.  Make sure you are in the `scraper` directory.

2.  Run the script using npm:
    ```bash
    npm start
    ```
    Alternatively, you can run it directly with node:
    ```bash
    node scrape.js
    ```

3.  The script will connect to the target websites, scrape the data, and print the formatted output to your console.

## Output

The output will look something like this, ready to be copied into the main `games/games-config.txt` file:

```
# === Games from HTML5Games.com ===
om-nom-run|Om Nom Run|Play Om Nom Run online...|online|...
# === Games from CrazyCattle-3D.info ===
crazy-cattle-3d|Crazy Cattle 3D|The official page for...|online|...
```

## How to Add a New Scraper

1.  **Open `scrape.js`**.
2.  **Create a new scraper function** that accepts `html` and `baseUrl` as arguments and returns an array of formatted config lines. Follow the examples of `scrapeHtml5Games` and `scrapeCrazyCattle3D`.
3.  **Add your new site** to the `TARGET_SITES` array at the top of the file, providing its name, URL, and the scraper function you just created.

**Note:** Web scraping can be fragile. If a target website changes its HTML structure, the corresponding scraper function will need to be updated. 