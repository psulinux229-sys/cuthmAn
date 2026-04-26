# Local Local Development Setup

This project has been refactored for a smooth local development experience in VS Code.

## Prerequisites
- Node.js (v18 or higher)
- VS Code

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   Setup your `.env` file at the root of the project:
   ```bash
   cp .env.example .env
   ```
   Open the `.env` file and fill in your variables:
   - `GEMINI_API_KEY`: Your Gemini API Key (if using AI features).

3. **Run the Development Server**
   To start the development server, run the following command in the VS Code terminal:
   ```bash
   npm run dev
   ```

5. **VS Code Debugging**
   This project is configured with a `.vscode/launch.json` file. You can simply press `F5` (or go to Run and Debug) in VS Code to launch a browser (Chrome/Edge) instance connected to your local server for a seamless debugging experience.

6. **Format and Clean Up**
   The `.vscode/settings.json` is configured to help you format code automatically on save if you have the Prettier extension installed.
