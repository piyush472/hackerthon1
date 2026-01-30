// Pose Detection Module using MediaPipe Holistic
const videoElement = document.getElementById('video');
const canvasElement = document.getElementById('canvas');
const canvasCtx = canvasElement.getContext('2d');

let holistic;
let camera;
let isRunning = false;

// Initialize MediaPipe Holistic
async function initializeHolistic() {
    holistic = new Holistic({
        locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
        }
    });

    holistic.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        smoothSegmentation: true,
        refineFaceLandmarks: false,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    });

    holistic.onResults(onResults);

    // Initialize camera
    camera = new Camera(videoElement, {
        onFrame: async () => {
            if (isRunning) {
                await holistic.send({ image: videoElement });
            }
        },
        width: 1280,
        height: 720
    });
}

// Callback when MediaPipe processes results
function onResults(results) {
    // Clear canvas
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
        results.image, 0, 0, canvasElement.width, canvasElement.height
    );

    // Draw pose landmarks
    if (results.poseLandmarks && results.poseLandmarks.length > 0) {
        drawLandmarks(results.poseLandmarks, 'pose');
        drawConnectors(results.poseLandmarks, POSE_CONNECTIONS);
        
        // Dispatch event with pose data for other components
        window.dispatchEvent(new CustomEvent('poseDetected', {
            detail: {
                landmarks: results.poseLandmarks,
                leftHand: results.leftHandLandmarks,
                rightHand: results.rightHandLandmarks,
                faceLandmarks: results.faceLandmarks
            }
        }));
    }

    // Draw hand landmarks
    if (results.leftHandLandmarks && results.leftHandLandmarks.length > 0) {
        drawLandmarks(results.leftHandLandmarks, 'hand');
        drawConnectors(results.leftHandLandmarks, HAND_CONNECTIONS);
    }

    if (results.rightHandLandmarks && results.rightHandLandmarks.length > 0) {
        drawLandmarks(results.rightHandLandmarks, 'hand');
        drawConnectors(results.rightHandLandmarks, HAND_CONNECTIONS);
    }

    canvasCtx.restore();
}

// Draw landmarks on canvas
function drawLandmarks(landmarks, type) {
    for (const landmark of landmarks) {
        const x = landmark.x * canvasElement.width;
        const y = landmark.y * canvasElement.height;
        const z = landmark.z || 0;

        canvasCtx.fillStyle = type === 'pose' ? '#FF6B6B' : '#4ECDC4';
        canvasCtx.beginPath();
        canvasCtx.arc(x, y, 5, 0, 2 * Math.PI);
        canvasCtx.fill();

        // Visual depth indicator
        if (z < -0.1) {
            canvasCtx.strokeStyle = '#FFD700';
            canvasCtx.lineWidth = 2;
        } else if (z > 0.1) {
            canvasCtx.strokeStyle = '#87CEEB';
            canvasCtx.lineWidth = 2;
        }
    }
}

// Draw connections between landmarks
function drawConnectors(landmarks, connections) {
    canvasCtx.strokeStyle = '#95959570';
    canvasCtx.lineWidth = 2;

    for (const connection of connections) {
        const startLandmark = landmarks[connection.start];
        const endLandmark = landmarks[connection.end];

        const startX = startLandmark.x * canvasElement.width;
        const startY = startLandmark.y * canvasElement.height;
        const endX = endLandmark.x * canvasElement.width;
        const endY = endLandmark.y * canvasElement.height;

        canvasCtx.beginPath();
        canvasCtx.moveTo(startX, startY);
        canvasCtx.lineTo(endX, endY);
        canvasCtx.stroke();
    }
}

// Define pose connections
const POSE_CONNECTIONS = [
    { start: 11, end: 13 }, // Left shoulder to left elbow
    { start: 13, end: 15 }, // Left elbow to left wrist
    { start: 12, end: 14 }, // Right shoulder to right elbow
    { start: 14, end: 16 }, // Right elbow to right wrist
    { start: 11, end: 23 }, // Left shoulder to left hip
    { start: 23, end: 25 }, // Left hip to left knee
    { start: 25, end: 27 }, // Left knee to left ankle
    { start: 12, end: 24 }, // Right shoulder to right hip
    { start: 24, end: 26 }, // Right hip to right knee
    { start: 26, end: 28 }, // Right knee to right ankle
    { start: 11, end: 12 }, // Left shoulder to right shoulder
    { start: 23, end: 24 } // Left hip to right hip
];

const HAND_CONNECTIONS = [
    { start: 0, end: 1 }, { start: 1, end: 2 }, { start: 2, end: 3 }, { start: 3, end: 4 },
    { start: 0, end: 5 }, { start: 5, end: 6 }, { start: 6, end: 7 }, { start: 7, end: 8 },
    { start: 0, end: 9 }, { start: 9, end: 10 }, { start: 10, end: 11 }, { start: 11, end: 12 },
    { start: 0, end: 13 }, { start: 13, end: 14 }, { start: 14, end: 15 }, { start: 15, end: 16 },
    { start: 0, end: 17 }, { start: 17, end: 18 }, { start: 18, end: 19 }, { start: 19, end: 20 }
];

// Start webcam
export async function startWebcam() {
    if (!holistic) {
        await initializeHolistic();
    }
    
    isRunning = true;
    camera.start();
    
    // Adjust canvas size to match video
    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;
}

// Stop webcam
export function stopWebcam() {
    isRunning = false;
    camera.stop();
    const canvasCtx = canvasElement.getContext('2d');
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
}

// Get current pose landmarks
export function getCurrentPose() {
    return currentPoseData;
}

let currentPoseData = null;
window.addEventListener('poseDetected', (event) => {
    currentPoseData = event.detail;
});

// Calculate angle between three points
export function calculateAngle(pointA, pointB, pointC) {
    const radians = Math.atan2(pointC.y - pointB.y, pointC.x - pointB.x) -
                    Math.atan2(pointA.y - pointB.y, pointA.x - pointB.x);
    let angle = Math.abs(radians * 180.0 / Math.PI);

    if (angle > 180.0) {
        angle = 360 - angle;
    }

    return angle;
}

// Compare current pose with target pose
export function comparePose(currentLandmarks, targetLandmarks, threshold = 0.15) {
    if (!currentLandmarks || !targetLandmarks) return 0;

    let totalDifference = 0;
    const keyLandmarks = [11, 12, 13, 14, 15, 16, 23, 24, 25, 26, 27, 28]; // Key pose points

    for (const landmarkIndex of keyLandmarks) {
        if (currentLandmarks[landmarkIndex] && targetLandmarks[landmarkIndex]) {
            const current = currentLandmarks[landmarkIndex];
            const target = targetLandmarks[landmarkIndex];

            const distance = Math.sqrt(
                Math.pow(current.x - target.x, 2) +
                Math.pow(current.y - target.y, 2) +
                Math.pow((current.z || 0) - (target.z || 0), 2)
            );

            totalDifference += distance;
        }
    }

    const accuracy = Math.max(0, 100 - (totalDifference / keyLandmarks.length * 100));
    return accuracy;
}

export default {
    startWebcam,
    stopWebcam,
    getCurrentPose,
    calculateAngle,
    comparePose
};
