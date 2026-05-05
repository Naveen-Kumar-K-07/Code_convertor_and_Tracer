# Code Language Translator 🔄

A sophisticated web application that translates code from one programming language to another while maintaining functionality. The app provides line-by-line transformation tracing to help understand how the code was converted.

## Features

✨ **Multi-Language Support**: Translate between 15+ programming languages
- Python, JavaScript, TypeScript, Java, C++, C#, Go, Rust, PHP, Ruby, Swift, Kotlin, R, MATLAB, SQL

🤖 **AI-Powered Translation**: Uses OpenAI's GPT models for intelligent code translation

📊 **Line-by-Line Tracing**: View detailed transformation explanations for each line of code

🔄 **Language Swapping**: Quickly swap source and target languages with one click

🎨 **Beautiful UI**: Modern, responsive interface with syntax-highlighted code editors

## Project Structure

```
CBP/
├── server/                          # Express.js backend
│   ├── controllers/
│   │   └── translationController.js # Translation logic
│   ├── routes/
│   │   └── translation.js           # API routes
│   ├── utils/
│   │   └── parser.js                # Utility functions
│   ├── server.js                    # Express app entry point
│   ├── package.json
│   └── .env.example
│
├── client/                          # React.js frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── CodeEditor.js        # Code input/output editor
│   │   │   ├── LanguageSelector.js  # Language selection UI
│   │   │   └── TransformationDisplay.js # Transformation details
│   │   ├── styles/
│   │   │   ├── LanguageSelector.css
│   │   │   └── TransformationDisplay.css
│   │   ├── App.js                   # Main app component
│   │   ├── App.css                  # Global styles
│   │   └── index.js                 # React entry point
│   ├── public/
│   │   └── index.html
│   └── package.json
│
└── README.md                        # This file
```

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Add your OpenAI API key to `.env`:
```
OPENAI_API_KEY=sk-your-api-key-here
PORT=5000
NODE_ENV=development
```

5. Start the server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. In a new terminal, navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will open at `http://localhost:3000`

## API Endpoints

### POST `/api/translate`

Translates code from one language to another.

**Request Body:**
```json
{
  "code": "function hello() { console.log('Hello'); }",
  "sourceLanguage": "JavaScript",
  "targetLanguage": "Python"
}
```

**Response:**
```json
{
  "success": true,
  "sourceLanguage": "JavaScript",
  "targetLanguage": "Python",
  "translatedCode": "def hello():\n    print('Hello')",
  "lineByLineTransformation": [
    {
      "originalLine": "function hello() {",
      "translatedLine": "def hello():",
      "explanation": "JavaScript function declaration converted to Python def syntax"
    },
    {
      "originalLine": "  console.log('Hello');",
      "translatedLine": "    print('Hello')",
      "explanation": "console.log() method converted to Python's print() function"
    }
  ],
  "summary": "Successfully translated JavaScript to Python. The function structure remains identical..."
}
```

### GET `/api/languages`

Returns list of supported programming languages.

**Response:**
```json
{
  "success": true,
  "languages": ["Python", "JavaScript", "TypeScript", "Java", ...]
}
```

## Usage Guide

1. **Enter Source Code**: Paste or type code in the left editor
2. **Select Languages**: Choose source language (From) and target language (To)
3. **Click Translate**: Press the "Translate Code" button
4. **Review Results**: 
   - Right panel shows translated code
   - Scroll down to see line-by-line transformations
   - Click on each transformation line to expand and see explanations

## How It Works

### Translation Process

1. User enters code and selects source/target languages
2. Request sent to Express backend with code and language preferences
3. Backend creates a detailed prompt for OpenAI GPT
4. GPT translates the code and provides transformation details
5. Response is parsed and sent back to frontend
6. Frontend displays results with interactive transformation visualization

### Line-by-Line Tracing

Each transformed line includes:
- **Original Line**: Source code line from the original language
- **Translated Line**: Equivalent code in target language
- **Explanation**: Detailed explanation of the transformation

## Key Features Explained

### 🔄 Language Swapping
Click the swap button (⇄) to instantly reverse source and target languages.

### 💡 Transformation Details
Click any line in the transformation list to see:
- Side-by-side code comparison
- Detailed explanation of changes
- Syntax differences between languages

### ⚡ Real-Time Processing
Once code is entered, just click translate for immediate results.

## Technologies Used

### Backend
- **Express.js**: REST API framework
- **OpenAI API**: AI-powered code translation
- **Node.js**: JavaScript runtime
- **CORS**: Cross-Origin Resource Sharing

### Frontend
- **React**: UI library
- **Axios**: HTTP client for API calls
- **CSS3**: Styling and responsive design
- **JavaScript ES6+**: Core language

## Configuration

### Environment Variables (.env)

```env
OPENAI_API_KEY=sk-your-api-key-here
PORT=5000
NODE_ENV=development
```

### Customization

**Supported Languages** - Edit in [server/controllers/translationController.js](server/controllers/translationController.js):
```javascript
const SUPPORTED_LANGUAGES = [
  'Python', 'JavaScript', 'TypeScript', ...
];
```

**API Model** - Change in [server/controllers/translationController.js](server/controllers/translationController.js):
```javascript
model: 'gpt-3.5-turbo', // or 'gpt-4' for better results
```

## Troubleshooting

### "API Key Error"
- Ensure `.env` file has valid `OPENAI_API_KEY`
- Restart the backend server

### "Connection Refused"
- Backend not running? Start with `npm start` in server directory
- Check that port 5000 is available

### "Translation Failed"
- Code might be too complex for GPT
- Try simpler code first
- Check API usage limits on OpenAI

### CORS Issues
- Ensure frontend runs on port 3000 and backend on port 5000
- Check proxy configuration in [client/package.json](client/package.json)

## Performance Tips

1. **Start with simple code** - Small functions translate faster
2. **Use clear variable names** - Helps the AI understand context
3. **Add comments** - Improves translation accuracy
4. **Test translations** - Verify functionality after translation

## Limitations

- Complex algorithms may not translate perfectly
- Language-specific idioms might need manual adjustment
- Very large codebases should be translated in sections
- Some language features may not have direct equivalents

## Future Enhancements

- [ ] Add code syntax highlighting with Highlight.js
- [ ] Support for uploading entire project files
- [ ] Side-by-side diff viewer with colored changes
- [ ] Code quality analysis and optimization suggestions
- [ ] Translation history and bookmarking
- [ ] Batch translation for multiple files
- [ ] Integration with popular code repositories
- [ ] Real-time collaborative translation

## Security

- API keys stored locally in `.env`
- No code stored on server permanently
- Use HTTPS in production
- Rotate API keys regularly

## License

MIT License - Feel free to use and modify

## Support

For issues, feature requests, or questions:
1. Check the Troubleshooting section
2. Review the API documentation
3. Create an issue in the repository

---

**Made with ❤️ for developers**
