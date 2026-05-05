#!/bin/bash

# Start both backend and frontend servers for Linux/Mac

echo ""
echo "Starting Code Language Translator..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    exit 1
fi

# Check if dependencies are installed
if [ ! -d "server/node_modules" ]; then
    echo "ERROR: Backend dependencies not installed!"
    echo "Please run ./setup.sh first"
    exit 1
fi

if [ ! -d "client/node_modules" ]; then
    echo "ERROR: Frontend dependencies not installed!"
    echo "Please run ./setup.sh first"
    exit 1
fi

# Check if .env file exists
if [ ! -f "server/.env" ]; then
    echo "ERROR: .env file not found in server directory!"
    echo "Please create it from .env.example and add your OpenAI API key"
    exit 1
fi

echo ""
echo "================================"
echo "Starting Backend Server..."
echo "================================"
echo "Server will run on: http://localhost:5000"
echo ""

cd server
npm start &
BACKEND_PID=$!

# Wait a bit for server to start
sleep 3

echo ""
echo "================================"
echo "Starting Frontend Server..."
echo "================================"
echo "Frontend will open at: http://localhost:3000"
echo ""

cd ../client
npm start &
FRONTEND_PID=$!

echo ""
echo "================================"
echo "Both servers are starting..."
echo "================================"
echo ""
echo "Backend:  http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
