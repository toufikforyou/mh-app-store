#!/bin/bash
# Launch script for MH Store

echo "🚀 Starting MH Store..."
echo "📁 Project: Modern App Store Interface"
echo "🌐 Opening local server on port 8000"
echo ""

# Start the HTTP server
python3 -m http.server 8000

echo "✅ Server started successfully!"
echo "🌍 Visit: http://localhost:8000"
echo "❌ Press Ctrl+C to stop the server"