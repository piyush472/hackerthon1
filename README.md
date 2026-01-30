# Indian Classical Dance Learning - MediaPipe

A web-based application that uses **MediaPipe** to teach classical Indian dance forms with real-time pose detection and visual feedback.

## Features

✨ **Real-time Pose Detection** - Using MediaPipe Holistic for accurate skeleton tracking
🎭 **Multiple Dance Forms** - Bharatanatyam, Kathak, Kathakali, and Odissi
📚 **Interactive Lessons** - Learn fundamental poses and mudras (hand gestures)
📊 **Pose Accuracy Feedback** - Get real-time feedback on how well you're matching the pose
🎥 **Video Webcam Integration** - See yourself with pose landmarks overlaid
📱 **Responsive Design** - Works on desktop and tablet devices

## Dance Forms Included

### Bharatanatyam (South India)
- **Aramandi** - Fundamental bent-knee stance
- **Tribhanga** - Three-bend graceful pose
- **Mudras** - Complex hand gestures representing meanings
- **Samapada** - Standing position with feet together

### Kathak (North India)
- **Standing Position** - Basic upright posture
- **Ghungroo Movements** - Rapid ankle bell rhythms
- **Hand Gestures** - Expressive storytelling movements
- **Pirouettes** - Fast spinning techniques

### Kathakali (Kerala)
- **Aramandi Position** - Wide stance with deep knee bends
- **Single Hand Mudras** - Individual meaningful hand movements
- **Eye Movements** - Expressive netras (eye movements)
- **Lateral Movements** - Side-to-side motions

### Odissi (Odisha)
- **Basic Odissi Stance** - Characteristic curved posture
- **Hand Positions** - Graceful hand movements
- **Hip Movements** - Distinctive figure-eight patterns
- **Footwork** - Rhythmic padasanchara patterns

## How to Use

### 1. Start the Application

```bash
# Using Python's built-in server (recommended)
python -m http.server 8000

# Or use any other local server
# The app will be available at http://localhost:8000
```

### 2. Access the Web App
Open your browser and navigate to `http://localhost:8000`

### 3. Learning Process

1. **Select a Dance Form** - Click on one of the four dance options
2. **Choose a Pose** - Select a pose or mudra you want to learn
3. **Read Instructions** - Follow the step-by-step instructions
4. **Start Webcam** - Click "Start Webcam" to begin
5. **Record Pose** - Stand in the taught pose and click "Record Pose"
6. **Practice** - Try to match the recorded pose, watch the accuracy percentage
7. **Refine** - Follow the feedback to improve your form

## System Requirements

- Modern web browser (Chrome, Firefox, Edge, Safari)
- Webcam/camera access
- JavaScript enabled
- Stable internet connection (for loading MediaPipe models)

## Browser Compatibility

| Browser | Status | Notes |
|---------|--------|-------|
| Chrome | ✅ Supported | Best performance |
| Firefox | ✅ Supported | Good compatibility |
| Safari | ✅ Supported | iOS 14+ |
| Edge | ✅ Supported | Full support |
| Opera | ✅ Supported | Full support |

## Project Structure

```
hackshastar/
├── index.html              # Main HTML file
├── package.json           # Project metadata
├── src/
│   ├── app.js            # Main application logic
│   ├── components/       # React components (future)
│   ├── utils/
│   │   └── poseDetection.js    # MediaPipe integration
│   ├── data/
│   │   └── danceData.js        # Dance forms and poses
│   └── styles/
│       └── style.css     # Styling
└── public/               # Static assets
```

## Key Technologies

- **MediaPipe Holistic** - Pose, hand, and face detection
- **Canvas API** - Rendering pose landmarks
- **Vanilla JavaScript** - Core application logic
- **CSS3** - Responsive design and animations
- **HTML5** - Semantic markup

## How MediaPipe Works

The application uses MediaPipe's **Holistic solution** which provides:

1. **Pose Landmarks** - 33 key points on the body
2. **Hand Landmarks** - 21 points on each hand
3. **Face Landmarks** - 468 points on the face (optional)

These landmarks are used to:
- Detect the user's current pose
- Draw skeleton overlays
- Compare with target poses
- Calculate accuracy percentages

## Pose Detection Algorithm

1. **Capture** - Get pose landmarks from webcam in real-time
2. **Compare** - Calculate distance between current and target pose
3. **Calculate Accuracy** - Based on key landmark positions (shoulders, elbows, knees, hips)
4. **Feedback** - Provide percentage accuracy and tips

## Future Enhancements

- 🎵 Add background music for different dance forms
- 📹 Video tutorials of professional dancers
- 🏆 Scoring system and progress tracking
- 🌍 Multi-language support
- 👥 Multiplayer mode for group learning
- 📊 Detailed analytics and performance history
- 🎓 Certification upon completion

## Installation (if using Node.js)

```bash
# Install MediaPipe packages (optional, for local development)
npm install

# Start development server
npm start
```

## Troubleshooting

### Webcam Not Working
- Check browser permissions for camera access
- Ensure no other application is using the webcam
- Try refreshing the page
- Check browser console for errors

### Poor Pose Detection
- Ensure adequate lighting
- Position yourself clearly in front of the webcam
- Wear contrasting colors against the background
- Keep a distance of 1-2 meters from the camera

### Slow Performance
- Close unnecessary browser tabs
- Clear browser cache
- Use a modern browser (Chrome/Firefox recommended)
- Reduce video resolution if needed

## Camera Permissions

When you first start the webcam, your browser will ask for camera access. Click **"Allow"** to proceed. This permission is needed for pose detection.

## Privacy

- No data is sent to any server
- All processing happens locally in your browser
- No images or videos are stored
- Webcam feed is only used for pose detection

## License

MIT License - Feel free to use and modify for educational purposes

## Contributing

Contributions are welcome! Areas for improvement:
- Additional Indian dance forms
- Better pose comparison algorithms
- Mobile app version
- VR/AR integration

## Credits

- MediaPipe by Google
- Classical dance knowledge from Natya Shastra tradition
- Dance form descriptions based on traditional arts documentation

## Contact & Support

For issues, suggestions, or feature requests, please feel free to create an issue or contact the development team.

---

**Happy Learning!** 🎭 Enjoy exploring the beautiful world of Indian classical dance!
