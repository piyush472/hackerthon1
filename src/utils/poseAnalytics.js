// Analytics and Advanced Pose Comparison Module

export class PoseAnalyzer {
    constructor() {
        this.poseHistory = [];
        this.recordedPoses = {};
    }

    // Analyze pose keypoints
    analyzePose(landmarks) {
        if (!landmarks) return null;

        const analysis = {
            timestamp: new Date(),
            landmarks: landmarks,
            keyAngles: this.calculateKeyAngles(landmarks),
            bodyAlignment: this.checkBodyAlignment(landmarks),
            symmetry: this.calculateSymmetry(landmarks),
            stability: this.assessStability(landmarks)
        };

        this.poseHistory.push(analysis);
        return analysis;
    }

    // Calculate key angles in the body
    calculateKeyAngles(landmarks) {
        return {
            leftElbow: this.getAngle(landmarks[11], landmarks[13], landmarks[15]),
            rightElbow: this.getAngle(landmarks[12], landmarks[14], landmarks[16]),
            leftHip: this.getAngle(landmarks[13], landmarks[23], landmarks[25]),
            rightHip: this.getAngle(landmarks[14], landmarks[24], landmarks[26]),
            leftKnee: this.getAngle(landmarks[23], landmarks[25], landmarks[27]),
            rightKnee: this.getAngle(landmarks[24], landmarks[26], landmarks[28])
        };
    }

    // Calculate angle between three points
    getAngle(point1, point2, point3) {
        const angle = Math.atan2(point3.y - point2.y, point3.x - point2.x) -
                     Math.atan2(point1.y - point2.y, point1.x - point2.x);
        
        let degrees = angle * 180 / Math.PI;
        if (degrees < 0) degrees += 360;
        return Math.round(degrees);
    }

    // Check if body is properly aligned
    checkBodyAlignment(landmarks) {
        const leftShoulder = landmarks[11];
        const rightShoulder = landmarks[12];
        const leftHip = landmarks[23];
        const rightHip = landmarks[24];

        const shoulderDiff = Math.abs(leftShoulder.y - rightShoulder.y);
        const hipDiff = Math.abs(leftHip.y - rightHip.y);

        return {
            shouldersLevel: shoulderDiff < 0.1,
            hipsLevel: hipDiff < 0.1,
            shoulderHipAlignment: Math.abs((leftShoulder.x + rightShoulder.x) / 2 - 
                                          (leftHip.x + rightHip.x) / 2) < 0.15
        };
    }

    // Calculate body symmetry
    calculateSymmetry(landmarks) {
        const centerX = (landmarks[11].x + landmarks[12].x) / 2;

        // Compare left and right side distances from center
        let leftDistance = 0, rightDistance = 0;
        const keyPairs = [
            { left: 11, right: 12 }, // Shoulders
            { left: 13, right: 14 }, // Elbows
            { left: 15, right: 16 }, // Wrists
            { left: 23, right: 24 }, // Hips
            { left: 25, right: 26 }, // Knees
            { left: 27, right: 28 }  // Ankles
        ];

        keyPairs.forEach(pair => {
            leftDistance += Math.abs(centerX - landmarks[pair.left].x);
            rightDistance += Math.abs(centerX - landmarks[pair.right].x);
        });

        const symmetryScore = (100 - Math.abs(leftDistance - rightDistance) / keyPairs.length * 100);
        return Math.max(0, Math.min(100, symmetryScore));
    }

    // Assess posture stability
    assessStability(landmarks) {
        // Check visibility confidence of key landmarks
        const keyLandmarks = [11, 12, 13, 14, 15, 16, 23, 24, 25, 26, 27, 28];
        let visibilityScore = 0;

        keyLandmarks.forEach(idx => {
            if (landmarks[idx].z) {
                visibilityScore += landmarks[idx].z;
            }
        });

        const averageVisibility = visibilityScore / keyLandmarks.length;
        return {
            visibility: averageVisibility * 100,
            stable: averageVisibility > 0.5
        };
    }

    // Compare two poses with detailed feedback
    comparePosesDetailed(currentPose, targetPose) {
        if (!currentPose || !targetPose) return null;

        const comparison = {
            overallAccuracy: 0,
            jointAccuracies: {},
            recommendations: [],
            score: 0
        };

        // Compare each joint
        const joints = [11, 12, 13, 14, 15, 16, 23, 24, 25, 26, 27, 28];
        const jointNames = {
            11: 'Left Shoulder', 12: 'Right Shoulder',
            13: 'Left Elbow', 14: 'Right Elbow',
            15: 'Left Wrist', 16: 'Right Wrist',
            23: 'Left Hip', 24: 'Right Hip',
            25: 'Left Knee', 26: 'Right Knee',
            27: 'Left Ankle', 28: 'Right Ankle'
        };

        let totalAccuracy = 0;

        joints.forEach(jointIdx => {
            const current = currentPose[jointIdx];
            const target = targetPose[jointIdx];

            if (current && target) {
                const distance = Math.sqrt(
                    Math.pow(current.x - target.x, 2) +
                    Math.pow(current.y - target.y, 2) +
                    Math.pow((current.z || 0) - (target.z || 0), 2)
                );

                // Distance threshold for accuracy calculation
                const accuracy = Math.max(0, 100 - (distance * 200));
                comparison.jointAccuracies[jointNames[jointIdx]] = Math.round(accuracy);
                totalAccuracy += accuracy;

                // Generate recommendations
                if (accuracy < 70) {
                    comparison.recommendations.push(
                        `Adjust your ${jointNames[jointIdx].toLowerCase()} position`
                    );
                }
            }
        });

        comparison.overallAccuracy = Math.round(totalAccuracy / joints.length);
        comparison.score = comparison.overallAccuracy;

        return comparison;
    }

    // Save a pose for later reference
    savePose(name, landmarks, danceForm) {
        const poseKey = `${danceForm}_${name}`;
        this.recordedPoses[poseKey] = {
            name: name,
            danceForm: danceForm,
            landmarks: landmarks,
            savedAt: new Date(),
            createdAt: new Date()
        };
        return poseKey;
    }

    // Get saved pose
    getSavedPose(poseKey) {
        return this.recordedPoses[poseKey] || null;
    }

    // Get learning statistics
    getStatistics() {
        if (this.poseHistory.length === 0) {
            return null;
        }

        const accuracies = this.poseHistory.map(p => p.accuracy || 0);
        const average = accuracies.reduce((a, b) => a + b, 0) / accuracies.length;
        const max = Math.max(...accuracies);
        const min = Math.min(...accuracies);

        return {
            totalPracticeSessions: this.poseHistory.length,
            averageAccuracy: Math.round(average),
            bestAccuracy: Math.round(max),
            worstAccuracy: Math.round(min),
            improvementTrend: this.calculateTrend(),
            lastPracticed: this.poseHistory[this.poseHistory.length - 1].timestamp
        };
    }

    // Calculate improvement trend
    calculateTrend() {
        if (this.poseHistory.length < 2) return 0;

        const recent = this.poseHistory.slice(-5);
        const firstHalf = recent.slice(0, Math.floor(recent.length / 2));
        const secondHalf = recent.slice(Math.floor(recent.length / 2));

        const firstAvg = firstHalf.reduce((a, p) => a + (p.accuracy || 0), 0) / firstHalf.length;
        const secondAvg = secondHalf.reduce((a, p) => a + (p.accuracy || 0), 0) / secondHalf.length;

        return Math.round((secondAvg - firstAvg) * 10) / 10;
    }

    // Export session data
    exportSessionData() {
        return {
            sessionDate: new Date(),
            totalPoses: this.poseHistory.length,
            statistics: this.getStatistics(),
            poseHistory: this.poseHistory,
            savedPoses: Object.keys(this.recordedPoses).length
        };
    }

    // Clear history
    clearHistory() {
        this.poseHistory = [];
    }
}

// Create singleton instance
export const poseAnalyzer = new PoseAnalyzer();

export default PoseAnalyzer;
