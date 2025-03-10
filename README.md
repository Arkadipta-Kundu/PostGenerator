# PostGenerator

## Overview

PostGenerator is a web application that allows users to generate posts based on their learning experiences. Users can input details about what they have learned, the resources they used, and any articles or code they have written. The application then generates a formatted post that can be copied and shared on various platforms. Additionally, the application saves the generated posts to a history page for future reference.

## Features

- **Form Data Persistence**: The form data is saved to `localStorage` to prevent data loss on page reloads.
- **Dynamic Form Fields**: Users can add multiple topics and resources dynamically.
- **Post Generation**: Generates a formatted post based on the user's input.
- **Editable Output**: The generated post can be made editable for further customization.
- **Copy to Clipboard**: Users can copy the generated post to the clipboard with a single click.
- **Dark Mode**: Toggle between light and dark modes.
- **Post History**: View all previously generated posts on a separate history page.

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, etc.)

### Installation

1. Clone the repository to your local machine:
   ```sh
   git clone https://github.com/yourusername/PostGenerator.git
   ```
2. Navigate to the project directory:
   ```sh
   cd PostGenerator
   ```
3. Open `index.html` in your web browser to start using the application.

### Usage

1. **Fill out the form**: Enter the details of what you have learned, including the topic name, date, resources, GitHub link, and any articles you have written.
2. **Add more topics**: Click the "Add Another Topic" button to add more topics.
3. **Generate the post**: Click the "Generate Post" button to create a formatted post.
4. **Edit the post**: Click the "Make Editable" button to edit the generated post.
5. **Copy the post**: Click the "Copy to Clipboard" button to copy the post.
6. **View post history**: Click the "View Post History" link to see all previously generated posts.

### Files

- `index.html`: The main page of the application.
- `history.html`: The history page that displays all generated posts.
- `script.js`: The JavaScript file that contains the logic for form handling, post generation, and data persistence.
- `styles.css`: The CSS file for styling the application.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework.
- [Font Awesome](https://fontawesome.com/) for the icons used in the application.
