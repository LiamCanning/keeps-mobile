#!/bin/bash

# Stop the persistent Expo server

if [ -f expo-server.pid ]; then
    PID=$(cat expo-server.pid)
    echo "🛑 Stopping Expo server (PID: $PID)..."
    kill $PID
    rm expo-server.pid
    echo "✅ Server stopped!"
else
    echo "⚠️  No running server found"
    echo "🔍 Killing any remaining Expo processes..."
    pkill -f "rork start"
    pkill -f "expo start"
fi