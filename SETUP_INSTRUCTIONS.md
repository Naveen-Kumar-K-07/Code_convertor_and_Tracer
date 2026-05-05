# Complete Installation & Setup Instructions

## 📋 Prerequisites

- **Node.js** (v14 or higher) - Download from [nodejs.org](https://nodejs.org/)
- **npm** (comes with Node.js)
- **OpenAI API Key** - Get from [platform.openai.com](https://platform.openai.com/account/api-keys)
- **Git** (optional, for version control)

## ✅ Installation Steps

### Windows Users

**Step 1: Run the Setup Script**
```bash
setup.bat
```

This will:
- Check Node.js installation
- Install backend dependencies
- Install frontend dependencies
- Fix security vulnerabilities
- Guide you through next steps

**Step 2: Configure OpenAI API Key**
```
1. Open: server\.env.example
2. Copy to: server\.env
3. Edit server\.env and add your API key:
   OPENAI_API_KEY=sk-your-actual-api-key-here
```

**Step 3: Start the Application**

**Option A: Use Start Script (Automatic)**
```bash
start.bat
```
This opens two windows and starts both servers automatically.

**Option B: Manual Start**

Terminal 1 - Backend:
```bash
cd server
npm start
```

Terminal 2 - Frontend:
```bash
cd client
npm start
```

### macOS/Linux Users

**Step 1: Make Scripts Executable**
```bash
chmod +x setup.sh
chmod +x start.sh
```

**Step 2: Run the Setup Script**
```bash
./setup.sh
```

**Step 3: Configure OpenAI API Key**
```bash
1. Open: server/.env.example
2. Copy to: server/.env
3. Edit and add your API key:
   OPENAI_API_KEY=sk-your-actual-api-key-here
```

**Step 4: Start the Application**

**Option A: Use Start Script (Automatic)**
```bash
./start.sh
```

**Option B: Manual Start**

Terminal 1 - Backend:
```bash
cd server
npm start
```

Terminal 2 - Frontend:
```bash
cd client
npm start
```

## 🚀 Verify Installation

Once both servers are running:

1. **Backend Health Check:**
   - Visit: http://localhost:5000/health
   - Should see: `{"status": "Server is running"}`

2. **Frontend:**
   - Should automatically open http://localhost:3000
   - You'll see the Code Language Translator UI

3. **API Test:**
   - Languages should load in dropdown menus
   - Try translating simple code

## 📦 Directory Structure After Installation

```
CBP/
├── server/
│   ├── node_modules/          ← Backend dependencies
│   ├── controllers/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   ├── package.json
│   ├── .env                   ← Your API key (create from .env.example)
│   └── .env.example
│
├── client/
│   ├── node_modules/          ← Frontend dependencies
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── package-lock.json
│
├── setup.bat / setup.sh       ← Setup scripts
├── start.bat / start.sh       ← Start scripts
├── README.md
├── GETTING_STARTED.md
├── API_DOCUMENTATION.md
└── SETUP_INSTRUCTIONS.md      ← This file
```

## 🔧 Troubleshooting

### "Node.js is not installed"
```
Solution: Download and install from https://nodejs.org/
Verify: Open terminal and run: node --version
```

### "npm install fails"
```
Solution 1: Clear npm cache
npm cache clean --force

Solution 2: Delete node_modules and package-lock.json
rm -r node_modules package-lock.json
npm install

Solution 3: Use npm ci instead
npm ci
```

### ".env file not found"
```
Solution:
1. cd server
2. cp .env.example .env  (Mac/Linux) or copy .env.example .env (Windows)
3. Add your OpenAI API key to .env
```

### "API Key Error"
```
Solution:
1. Verify your API key is valid at https://platform.openai.com/account/api-keys
2. Check .env file has correct format: OPENAI_API_KEY=sk-xxx
3. Restart backend server: npm start
4. Check API usage/billing at https://platform.openai.com/account/billing
```

### "Connection refused" / "Cannot connect to server"
```
Solution:
1. Verify backend is running: http://localhost:5000/health
2. Check port 5000 is not blocked by firewall
3. Ensure proxy in client/package.json matches: "proxy": "http://localhost:5000"
4. Restart both servers
```

### "Slow npm install"
```
Solution:
npm install --legacy-peer-deps

Or for faster installation:
npm install --no-optional
```

### "Out of memory during build"
```
Solution:
Set environment variable first, then build:
Windows: set NODE_OPTIONS=--max_old_space_size=4096
Mac/Linux: export NODE_OPTIONS=--max_old_space_size=4096
Then: npm install
```

## 🔐 Security Notes

### Environment Variables
- **NEVER** commit `.env` file to git
- It's already in `.gitignore`, keep it that way
- Rotate API keys regularly
- Use different keys for development/production

### API Security
- Current setup has no authentication (development only)
- For production, add:
  - JWT tokens
  - Rate limiting
  - API key validation
  - HTTPS/SSL

### Dependency Security
- Run `npm audit` regularly to check for vulnerabilities
- Keep Node.js and npm updated
- Review advisories for new packages

## 📈 Performance Tips

1. **First Translation Slow?**
   - First request to OpenAI takes longer (cold start)
   - Subsequent requests are faster

2. **Better Translations?**
   - Use `gpt-4` instead of `gpt-3.5-turbo` (if available)
   - Edit in: server/controllers/translationController.js
   - Note: gpt-4 is slower but more accurate

3. **Faster Loading?**
   - Close other applications to free RAM
   - Check internet speed
   - Reduce code size (translate in sections)

## 🔗 Useful Links

- [Node.js Documentation](https://nodejs.org/docs/)
- [npm Documentation](https://docs.npmjs.com/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [OpenAI Pricing](https://openai.com/pricing/)

## 📞 Getting Help

1. Check [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for API details
2. Review [GETTING_STARTED.md](GETTING_STARTED.md) for quick start
3. Check error messages in both terminal windows
4. Verify .env configuration
5. Test API directly with curl or Postman

## 🎯 Next Steps After Installation

1. **Test with Simple Code:**
   ```python
   # Try translating simple functions first
   def hello():
       print("Hello, World!")
   ```

2. **Explore Features:**
   - Use language swap button
   - Click on transformation lines to expand details
   - Copy translated code

3. **Learn the UI:**
   - Left panel: Source code editor
   - Right panel: Translated code
   - Bottom section: Line-by-line transformations

4. **Customize:**
   - Edit supported languages in translationController.js
   - Modify UI colors in CSS files
   - Change model to gpt-4 for better results

## ⚠️ Common Issues Solved

| Issue | Solution |
|-------|----------|
| `npm ERR! code EACCES` | Run with sudo or fix npm permissions |
| `Port 3000/5000 already in use` | Kill process: `lsof -ti:3000` or `netstat -ano` |
| `Cannot find module 'express'` | Run `npm install` in correct directory |
| `Translation timeout` | Check internet, reduce code size |
| `CORS error` | Verify backend is running, proxy configured |

## 📚 Advanced Configuration

### Use Production Environment
```bash
NODE_ENV=production npm start
```

### Enable Debug Logging
```bash
DEBUG=* npm start
```

### Custom Port for Backend
```bash
PORT=8000 npm start
```

### Custom Port for Frontend
```bash
PORT=3001 npm start
```

---

**Happy Translating! 🎉**

For detailed API information, see [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
For quick start, see [GETTING_STARTED.md](GETTING_STARTED.md)
