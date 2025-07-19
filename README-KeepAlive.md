# Keep Your Expo App Running 24/7

## Problem
When you close your laptop, the Expo development server stops and your mobile app becomes inaccessible.

## Solutions

### Option 1: Background Process (Recommended)
```bash
# Make scripts executable
chmod +x keep-alive.sh stop-server.sh

# Start persistent server
./keep-alive.sh

# Stop server when needed
./stop-server.sh
```

### Option 2: Using npm scripts
```bash
# Start in persistent mode
npm run start-persistent

# Or with cloud tunneling
npm run start-cloud
```

### Option 3: Cloud Development Environment
Use GitHub Codespaces, Replit, or similar cloud IDEs that stay online 24/7.

### Option 4: Deploy to Expo (Production)
```bash
# Build and publish to Expo
npx expo publish

# Or build for web
npm run deploy-preview
```

## Checking Status
```bash
# View server logs
tail -f expo-server.log

# Check if server is running
ps aux | grep "rork start"
```

## Tips
1. **Keep laptop plugged in** if using background process
2. **Prevent sleep mode** in your system settings
3. **Use cloud IDE** for true 24/7 availability
4. **Monitor logs** to ensure tunnel stays active

## Troubleshooting
- If tunnel breaks, restart with `./keep-alive.sh`
- Check `expo-server.log` for error messages
- Ensure your firewall allows Expo connections