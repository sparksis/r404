# r404 Technical Specifications

## Frontend

*   **HTML:** The application will consist of a single HTML page (`404.html`) with a minimal structure. It will include a container for the masonry grid and an input field for the Reddit RSS link.
*   **CSS:** The styling will be handled by a single CSS file (`main.css`). It will include styles for the masonry grid, the input field, and the overall layout. The layout will be responsive to ensure a good user experience on both desktop and mobile devices.
*   **JavaScript:** The application logic will be contained in a single JavaScript file (`main.js`). It will be responsible for:
    *   Handling user input (getting the RSS link from the input field).
    *   Fetching and parsing the RSS feed.
    *   Extracting the pseudo-API key from the RSS link.
    *   Dynamically creating and adding images to the masonry grid.
    *   Implementing a lightweight masonry layout library (e.g., Macy.js).
    *   Handling errors (e.g., invalid RSS link, failed API request).

## Masonry Layout

The masonry layout will be implemented using a lightweight, dependency-free JavaScript library such as Macy.js. This will ensure fast loading times and a smooth user experience. The library will be configured to arrange images in a responsive grid that adapts to different screen sizes.

## API Interaction

The application will interact with the Reddit API via RSS feeds. The user will provide an RSS link, from which the application will extract the necessary information to make API requests. The application will not require any server-side components and will be a purely client-side application.

## Workflow

1.  The user opens the `404.html` page in their browser.
2.  The user pastes a Reddit RSS link into the input field.
3.  The JavaScript code in `main.js` captures the input.
4.  The application extracts the pseudo-API key from the RSS link.
5.  The application makes a request to the Reddit API using the extracted key to fetch the image feed.
6.  The application parses the API response and extracts the image URLs.
7.  The application dynamically creates `<img>` elements for each image and adds them to the masonry container.
8.  The masonry library arranges the images in a responsive grid.
