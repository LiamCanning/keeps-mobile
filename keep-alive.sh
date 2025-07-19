#!/bin/bash

# Keep Alive Script for Expo Development Server
# This script helps keep your Expo server running even when you close your laptop

echo "🚀 Starting Expo server in persistent mode..."

# Kill any existing Expo processes
pkill -f "rork start"
pkill -f "expo start"

# Start the server in background with logging
nohup bunx rork start -p edh9lqaux46p3grbw02fv --tunnel --host tunnel > expo-server.log 2>&1 &

# Get the process ID
PID=$!
echo "📱 Expo server started with PID: $PID"
echo "🔗 Check expo-server.log for tunnel URL"
echo "⏹️  To stop: kill $PID"

# Save PID for easy stopping
echo $PID > expo-server.pid

echo "✅ Server is now running in background!"
echo "💡 Your tunnel will stay active even if you close your laptop"
echo "📋 To view logs: tail -f expo-server.log"