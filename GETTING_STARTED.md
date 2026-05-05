# Getting Started Guide

## Quick Start (5 minutes)

### Step 1: Set Up Backend

```bash
cd server
npm install
cp .env.example .env
# Edit .env and add your OpenAI API key
npm start
```

The server will start on **http://localhost:5000**

### Step 2: Set Up Frontend (New Terminal)

```bash
cd client
npm install
npm start
```

The app will open at **http://localhost:3000**

## Basic Usage

1. Enter or paste code in the left editor
2. Select source language (e.g., Python)
3. Select target language (e.g., JavaScript)
4. Click "Translate Code"
5. View results in the right editor
6. Expand any line in the transformation section to see details

## Example Code to Try

### Python to JavaScript:
```python
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)
```

### JavaScript to Python:
```javascript
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
}
```

## Getting OpenAI API Key

1. Go to https://platform.openai.com/account/api-keys
2. Sign up or log in to your OpenAI account
3. Click "Create new secret key"
4. Copy the key to your `.env` file

## Troubleshooting

**Backend won't start?**
- Check if port 5000 is available
- Verify Node.js is installed: `node --version`
- Check .env file has OPENAI_API_KEY

**Frontend won't connect?**
- Ensure backend is running
- Check proxy in client/package.json points to localhost:5000
- Clear browser cache

**Translation not working?**
- Check OpenAI API key is valid
- Ensure code is syntactically correct
- Try simpler code first

## Next Steps

- Customize supported languages in server/controllers/translationController.js
- Add more UI features like code copying, history, favorites
- Deploy to production with proper security
- Add database to save translations

Enjoy translating code! 🚀
