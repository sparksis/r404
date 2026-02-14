# Technical Specifications

This project is a static single-page application that displays a full-page background image from a Reddit feed.

## Architecture

- **Language**: Vanilla JavaScript (ES6+)
- **Styling**: CSS3
- **Data Source**: Reddit JSON API

## Key Features

- **Dynamic Backgrounds**: Fetches the latest images from a specified subreddit.
- **Auto-Refresh**: Rotates the background image every 60 seconds.
- **Deep Linking**: Supports using different subreddits by changing the URL path.
- **Fallback Mechanism**: Defaults to `/r/itookapicture/hot.json` if no specific subreddit is requested or if a 404 occurs.

## API Integration

The application parses the current window location to determine the subreddit to fetch. It then makes a request to `https://api.reddit.com` with the corresponding path and `.json` extension.

### Implementation Details

The core logic resides in `main.js`, which handles:
1. URL parsing and API endpoint construction.
2. Fetching and filtering posts for image content.
3. Randomizing the image stack.
4. Updating the DOM to set the background image.
5. Managing the 60-second refresh timer.
