#!/bin/bash

# Code Language Translator - Setup Script for Linux/Mac
# This script installs all dependencies for both backend and frontend

echo ""
echo "================================"
echo "Code Language Translator Setup"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please download and install Node.js from https://nodejs.org/"
    exit 1
fi

echo "Node.js version:"
node --version

echo ""
echo "[1/5] Installing backend dependencies..."
cd server
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install backend dependencies"
    exit 1
fi

echo ""
echo "[2/5] Fixing backend security vulnerabilities..."
npm audit fix --force
if [ $? -ne 0 ]; then
    echo "WARNING: Some vulnerabilities could not be fixed"
fi

echo ""
echo "[3/5] Installing frontend dependencies..."
cd ../client
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install frontend dependencies"
    exit 1
fi

echo ""
echo "[4/5] Fixing frontend security vulnerabilities..."
npm audit fix --force
if [ $? -ne 0 ]; then
    echo "WARNING: Some vulnerabilities could not be fixed"
fi

cd ..

echo ""
echo "[5/5] Setup complete!"
echo ""
echo "================================"
echo "Next Steps:"
echo "================================"
echo ""
echo "1. Create a .env file in the 'server' directory:"
echo "   - Copy from server/.env.example"
echo "   - Add your OpenAI API key: OPENAI_API_KEY=sk-your-key-here"
echo ""
echo "2. Start the backend (in terminal 1):"
echo "   cd server"
echo "   npm start"
echo ""
echo "3. Start the frontend (in terminal 2):"
echo "   cd client"
echo "   npm start"
echo ""
echo "4. Open http://localhost:3000 in your browser"
echo ""
echo "================================"
echo ""
