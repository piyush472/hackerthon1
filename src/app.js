// Main Application Module
import { startWebcam, stopWebcam, getCurrentPose, comparePose } from './utils/poseDetection.js';
import { getDanceInfo, getPoses, getPoseDetails } from './data/danceData.js';

let currentDanceForm = null;
let currentPose = null;
let recordedPose = null;
let isWebcamActive = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
});

function initializeEventListeners() {
    // Dance form selection
    const danceBtns = document.querySelectorAll('.dance-btn-new');
    danceBtns.forEach(btn => {
        btn.addEventListener('click', selectDanceForm);
    });

    // Webcam controls
    document.getElementById('startBtn').addEventListener('click', handleStartWebcam);
    document.getElementById('stopBtn').addEventListener('click', handleStopWebcam);
    document.getElementById('recordBtn').addEventListener('click', handleRecordPose);
    document.getElementById('resetBtn').addEventListener('click', handleReset);
    document.getElementById('cameraToggle').addEventListener('click', handleCameraToggle);

    // Listen for pose detection events
    window.addEventListener('poseDetected', handlePoseDetected);
}

// Select a dance form
function selectDanceForm(e) {
    const danceForm = e.currentTarget.dataset.dance;
    
    // Hide dance selection and show practice view
    document.getElementById('danceSelection').classList.add('hidden');
    document.getElementById('practiceView').classList.remove('hidden');
    document.getElementById('posesContainer').style.display = 'flex';

    // Update navigation
    document.getElementById('navTitle').textContent = danceForm.charAt(0).toUpperCase() + danceForm.slice(1);
    document.getElementById('currentDanceName').textContent = danceForm;

    // Load dance information
    currentDanceForm = danceForm;
    const danceInfo = getDanceInfo(danceForm);
    
    if (danceInfo) {
        displayPoses(danceInfo);
    }
}

// Display poses in bottom bar
function displayPoses(danceInfo) {
    const posesContainer = document.getElementById('posesContainer');
    posesContainer.innerHTML = '';

    danceInfo.poses.forEach((pose, index) => {
        const poseBtn = document.createElement('button');
        poseBtn.className = 'px-4 py-2 rounded-lg bg-white/10 hover:bg-primary/30 border border-primary/40 hover:border-primary text-white text-xs font-bold uppercase transition-all whitespace-nowrap';
        poseBtn.textContent = `${index + 1}. ${pose.name}`;
        
        poseBtn.addEventListener('click', () => {
            document.querySelectorAll('#posesContainer button').forEach(b => {
                b.classList.remove('bg-primary/50', 'border-primary');
                b.classList.add('bg-white/10', 'border-primary/40');
            });
            poseBtn.classList.remove('bg-white/10', 'border-primary/40');
            poseBtn.classList.add('bg-primary/50', 'border-primary');
            
            selectPose(pose);
        });
        
        posesContainer.appendChild(poseBtn);
    });
}

// Select a specific pose
function selectPose(pose) {
    currentPose = pose;
    document.getElementById('currentPoseName').textContent = pose.name;
    
    // Show feedback toast with instructions
    showFeedback(`📍 ${pose.name}: ${pose.description}`);
}

// Handle webcam start
async function handleStartWebcam() {
    try {
        if (!currentPose) {
            showFeedback('⚠️ Please select a pose first');
            return;
        }

        await startWebcam();
        isWebcamActive = true;
        
        document.getElementById('startBtn').classList.add('hidden');
        document.getElementById('stopBtn').classList.remove('hidden');
        document.getElementById('recordBtn').disabled = false;
        
        showFeedback('✅ Webcam started. Stand in the pose and click Record.');
    } catch (error) {
        console.error('Error starting webcam:', error);
        showFeedback('❌ Could not access webcam. Check permissions.');
    }
}

// Handle webcam stop
function handleStopWebcam() {
    stopWebcam();
    isWebcamActive = false;
    
    document.getElementById('startBtn').classList.remove('hidden');
    document.getElementById('stopBtn').classList.add('hidden');
    document.getElementById('recordBtn').disabled = true;
    
    showFeedback('⏹️ Webcam stopped');
}

// Handle recording pose
function handleRecordPose() {
    const pose = getCurrentPose();
    if (pose && pose.landmarks) {
        recordedPose = pose;
        showFeedback('✅ Pose recorded! Try to match this position.');
    } else {
        showFeedback('⚠️ No pose detected. Ensure good lighting and full body visibility.');
    }
}

// Handle reset
function handleReset() {
    recordedPose = null;
    document.getElementById('accuracyPercent').textContent = '0%';
    updateAccuracyRing(0);
    showFeedback('🔄 Reset. Select a new pose to continue.');
}

// Handle camera toggle
function handleCameraToggle() {
    if (isWebcamActive) {
        handleStopWebcam();
    } else {
        handleStartWebcam();
    }
}

// Handle pose detection
function handlePoseDetected(event) {
    if (!currentPose || !recordedPose) {
        return;
    }

    const { landmarks } = event.detail;
    
    // Compare with recorded pose
    const accuracy = comparePose(landmarks, recordedPose.landmarks);
    
    // Update UI
    updateAccuracyDisplay(accuracy);
    updateSyncMeter(accuracy);
    
    // Update feedback
    if (accuracy > 80) {
        showFeedback(`🌟 Excellent! ${accuracy.toFixed(0)}%`);
    } else if (accuracy > 60) {
        showFeedback(`✨ Good! ${accuracy.toFixed(0)}% - Keep adjusting`);
    } else if (accuracy > 40) {
        showFeedback(`📍 Getting closer: ${accuracy.toFixed(0)}%`);
    } else {
        showFeedback(`🎯 Keep trying: ${accuracy.toFixed(0)}%`);
    }
}

// Show feedback toast
function showFeedback(message) {
    const toast = document.getElementById('feedbackToast');
    const text = document.getElementById('feedbackText');
    
    text.textContent = message;
    toast.classList.remove('opacity-0');
    toast.classList.add('opacity-100');
    
    setTimeout(() => {
        toast.classList.remove('opacity-100');
        toast.classList.add('opacity-0');
    }, 3000);
}

// Update accuracy display
function updateAccuracyDisplay(accuracy) {
    const accuracyPercent = document.getElementById('accuracyPercent');
    accuracyPercent.textContent = `${Math.round(accuracy)}%`;
    
    updateAccuracyRing(accuracy);
}

// Update accuracy ring animation
function updateAccuracyRing(accuracy) {
    const ring = document.getElementById('accuracyRing');
    const circumference = 2 * Math.PI * 24; // radius is 24
    const offset = circumference - (accuracy / 100) * circumference;
    
    ring.style.strokeDashoffset = offset;
}

// Update sync meter
function updateSyncMeter(accuracy) {
    const syncBar = document.getElementById('syncBar');
    const syncDot = document.getElementById('syncDot');
    const syncStatus = document.getElementById('syncStatus');
    
    syncBar.style.height = `${accuracy}%`;
    
    if (accuracy > 80) {
        syncStatus.textContent = 'Perfect';
        syncDot.classList.remove('opacity-0');
    } else if (accuracy > 60) {
        syncStatus.textContent = 'Good';
        syncDot.classList.remove('opacity-0');
    } else {
        syncStatus.textContent = '-';
        syncDot.classList.add('opacity-0');
    }
}

// Set canvas size when video starts
document.getElementById('video')?.addEventListener('loadedmetadata', () => {
    const canvas = document.getElementById('canvas');
    canvas.width = document.getElementById('video').videoWidth;
    canvas.height = document.getElementById('video').videoHeight;
});

export default {
    selectDanceForm,
    selectPose,
    handleStartWebcam,
    handleStopWebcam,
    handleRecordPose,
    showFeedback
};
