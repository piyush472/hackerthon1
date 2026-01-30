# Setup Instructions

## Prerequisites

Before running the application, ensure you have:

- ✅ A modern web browser (Chrome, Firefox, Edge, Safari)
- ✅ Python 3.x installed (for running local server)
- ✅ A working webcam
- ✅ Stable internet connection (for loading MediaPipe models)

## Installation & Setup

### Option 1: Using Python (Recommended - No Installation Needed)

#### On Windows:
1. Open PowerShell or Command Prompt
2. Navigate to the project folder:
   ```powershell
   cd "C:\Users\vaibh\OneDrive\Desktop\hackshastar"
   ```
3. Start the server:
   ```powershell
   python -m http.server 8000
   ```
4. Open your browser and go to: `http://localhost:8000`

#### On macOS/Linux:
1. Open Terminal
2. Navigate to the project folder:
   ```bash
   cd ~/Desktop/hackshastar
   ```
3. Start the server:
   ```bash
   python3 -m http.server 8000
   ```
4. Open your browser and go to: `http://localhost:8000`

### Option 2: Using Node.js & npm

If you have Node.js installed:

```bash
cd hackshastar
npm install
npm start
```

### Option 3: Using a Simple HTTP Server

**For Python 2 users:**
```bash
python -m SimpleHTTPServer 8000
```

**Using node-http-server (if Node.js is installed):**
```bash
npx http-server
```

**Using Ruby (if installed):**
```bash
ruby -run -ehttpd . -p8000
```

## First Time Setup

### 1. Check Browser Compatibility
- Open your browser's Developer Tools (F12)
- Check Console for any errors
- Ensure WebGL support is available

### 2. Test Camera Access
- The app will request camera permission on first use
- Click "Allow" when prompted
- You should see your webcam feed in the video area

### 3. Test Pose Detection
1. Click on any dance form
2. Select a pose
3. Click "Start Webcam"
4. You should see skeleton overlay on your body

## Project File Structure

```
hackshastar/
├── index.html                  # Main entry point
├── package.json               # Project metadata
├── README.md                  # Full documentation
├── QUICKSTART.md              # Quick start guide
├── SETUP.md                   # This file
│
├── public/                    # Static assets (future)
│
├── src/
│   ├── app.js                # Main application logic
│   ├── components/           # UI components (future expansion)
│   │
│   ├── utils/
│   │   ├── poseDetection.js  # MediaPipe integration
│   │   └── poseAnalytics.js  # Advanced analysis
│   │
│   ├── data/
│   │   └── danceData.js      # Dance forms & poses
│   │
│   └── styles/
│       └── style.css         # Main stylesheet
│
└── .gitignore               # Git ignore rules
```

## Configuration

### Changing Server Port

To use a different port (instead of 8000):

**Python:**
```bash
python -m http.server 8080
```

Then access: `http://localhost:8080`

### Adjusting Video Resolution

Edit `src/utils/poseDetection.js`, find the Camera initialization:

```javascript
camera = new Camera(videoElement, {
    onFrame: async () => { ... },
    width: 1280,   // Change this
    height: 720    // Or this
});
```

Common resolutions:
- `1280x720` - Full HD (Default, best for accuracy)
- `640x480` - Standard (Good balance)
- `320x240` - Low (Fast but less accurate)

### Adjusting Pose Detection Sensitivity

Edit `src/utils/poseDetection.js`, find the setOptions call:

```javascript
holistic.setOptions({
    modelComplexity: 1,              // 0 = light, 1 = full
    smoothLandmarks: true,           // Smooth detection
    minDetectionConfidence: 0.5,     // 0-1, higher = stricter
    minTrackingConfidence: 0.5       // 0-1, higher = stricter
});
```

## Troubleshooting

### Issue: "Cannot access localhost:8000"

**Solution:**
1. Make sure the server is running
2. Try `http://127.0.0.1:8000`
3. Check if port 8000 is already in use:
   - **Windows:** `netstat -ano | findstr :8000`
   - **macOS/Linux:** `lsof -i :8000`
4. Use a different port if needed

### Issue: Camera Permission Denied

**Solution:**
1. Check browser settings for camera permissions
2. **Chrome:** Settings → Privacy → Site settings → Camera
3. **Firefox:** Preferences → Privacy → Permissions → Camera
4. Allow the localhost origin
5. Refresh the page

### Issue: Pose Detection Not Working

**Solution:**
1. Check lighting conditions
2. Position yourself fully in frame
3. Wear contrasting colors
4. Ensure webcam has proper focus
5. Check browser console (F12) for errors
6. Refresh the page

### Issue: MediaPipe Models Not Loading

**Solution:**
1. Check internet connection
2. Clear browser cache (Ctrl+Shift+Del)
3. Disable browser extensions (temporarily)
4. Try a different browser
5. Check if CDN is accessible

### Issue: Slow Performance / Lag

**Solution:**
1. Close other applications
2. Reduce video resolution (see Configuration)
3. Reduce model complexity (change modelComplexity to 0)
4. Close unused browser tabs
5. Update browser to latest version

### Issue: Pose Accuracy Always Low

**Solution:**
1. Ensure good lighting (natural light preferred)
2. Stand 1-2 meters from camera
3. Keep full body in frame
4. Move to a less cluttered background
5. Record poses more slowly and deliberately

## Browser-Specific Setup

### Google Chrome
- Best performance
- Full support for all features
- Recommended for this application

### Firefox
- Good performance
- May need to enable camera access in Preferences
- Works well on Windows, macOS, Linux

### Safari (macOS/iOS)
- Supported (iOS 14+)
- May have slight performance differences
- Camera access through app permissions

### Microsoft Edge
- Full support
- Good performance
- Permission settings similar to Chrome

## Performance Tips

1. **Use Latest Browser Version** - MediaPipe updates frequently
2. **Reduce Background Apps** - Free up system resources
3. **Good Internet** - For loading MediaPipe models (first time only)
4. **Proper Lighting** - Improves pose detection accuracy
5. **Clear Space** - Allows full body tracking

## System Requirements

### Minimum
- CPU: Dual-core processor
- RAM: 2GB
- Browser: Chrome 90+, Firefox 88+, Safari 14+
- Network: 5 Mbps (for model download)

### Recommended
- CPU: Quad-core processor
- RAM: 4GB+
- Browser: Latest version
- Network: 10+ Mbps
- Webcam: 1080p or better

## Offline Mode

The app requires internet connection once to download MediaPipe models. After that:
1. Clear your browser cache
2. Close and reopen browser
3. The models should be cached
4. You can work offline (but camera still needed)

## Development Mode

If you want to modify the code:

1. Edit files in `src/` folder
2. Refresh browser after saving
3. Check console (F12) for errors
4. Use browser DevTools for debugging

### Debugging Tips
- Use `console.log()` for logging
- Check Network tab for failed requests
- Monitor Performance tab for lag
- Use Chrome DevTools for pose visualization

## Advanced Configuration

### Using Different Models

To use different MediaPipe models or configurations, edit `src/utils/poseDetection.js`:

```javascript
// Currently using Holistic (pose + hands + face)
// Can switch to:
// - Pose only
// - Hands only
// - Face only
// - Custom combinations
```

### Custom Dance Forms

To add new dance forms:

1. Edit `src/data/danceData.js`
2. Add new form to `danceData` object
3. Include poses and instructions
4. Refresh browser

Example:
```javascript
newDanceForm: {
    name: 'Dance Form Name',
    region: 'Region',
    description: 'Description',
    poses: [ /* ... */ ]
}
```

## Deployment

### Deploy to GitHub Pages
1. Push code to GitHub
2. Enable GitHub Pages in settings
3. Access via `https://username.github.io/hackshastar`

### Deploy to Netlify
1. Connect GitHub repo
2. Deploy automatically on push
3. Custom domain support

### Deploy to Vercel
1. Connect GitHub repo
2. Auto-deploy on push
3. Global CDN included

## Support & Help

- Check **README.md** for overview
- Check **QUICKSTART.md** for usage
- Review code comments in `src/` files
- Check browser console for error messages
- Ensure all prerequisites are installed

## Next Steps

1. Start the server
2. Open in browser
3. Read QUICKSTART.md
4. Select a dance form
5. Follow instructions for first pose
6. Have fun learning!

---

**Happy Learning!** 🎭

For issues or questions, please refer to the README.md or check the browser console for detailed error messages.
