// Classical Indian Dance Data
export const danceData = {
    bharatanatyam: {
        name: 'Bharatanatyam',
        region: 'South India (Tamil Nadu)',
        description: 'An ancient Indian classical dance form that emphasizes intricate footwork, graceful hand gestures (mudras), and expressive facial movements.',
        poses: [
            {
                id: 'aramandi',
                name: 'Aramandi',
                description: 'The fundamental stance with bent knees and parallel feet, the foundation of Bharatanatyam movements.',
                instructions: [
                    'Stand with feet shoulder-width apart',
                    'Bend your knees to 45 degrees',
                    'Keep your chest upright and shoulders relaxed',
                    'Place weight equally on both feet',
                    'Keep the torso vertical and engaged'
                ]
            },
            {
                id: 'tribhanga',
                name: 'Tribhanga',
                description: 'A three-bend pose showing the curves of the body, used in many graceful movements.',
                instructions: [
                    'Stand in aramandi position',
                    'Shift weight to one leg',
                    'Bend at the hip on the weighted leg',
                    'Curve the upper body slightly',
                    'Create three curves: hip, torso, and shoulder'
                ]
            },
            {
                id: 'samapada',
                name: 'Samapada',
                description: 'Standing position with feet together, heels touching.',
                instructions: [
                    'Stand upright with feet together',
                    'Keep heels touching and toes apart',
                    'Maintain upright posture',
                    'Engage your core',
                    'Relax your shoulders'
                ]
            },
            {
                id: 'mudras',
                name: 'Hand Mudras (Hastas)',
                description: 'Complex hand gestures that convey meaning and emotion.',
                instructions: [
                    'Pataka: Fingers extended straight, palm flat',
                    'Tripataka: Thumb and fingers extended',
                    'Mushti: All fingers closed into fist',
                    'Shikara: Index and middle fingers extended upward',
                    'Practice each mudra slowly and deliberately'
                ]
            }
        ]
    },
    kathak: {
        name: 'Kathak',
        region: 'North India (Uttar Pradesh)',
        description: 'A North Indian classical dance known for rapid hand movements, intricate footwork (tatkaar), and storytelling through expressions.',
        poses: [
            {
                id: 'standing',
                name: 'Standing Position',
                description: 'The basic upright standing posture in Kathak.',
                instructions: [
                    'Stand upright with feet together or slightly apart',
                    'Keep arms relaxed at your sides',
                    'Maintain an elongated spine',
                    'Lift your chest',
                    'Keep your head level and eyes focused'
                ]
            },
            {
                id: 'ghungroo_movement',
                name: 'Ghungroo (Ankle Bell) Movements',
                description: 'Rapid ankle and foot movements to create rhythmic patterns.',
                instructions: [
                    'Wear ankle bells (ghungroos) or imagine them',
                    'Keep knees slightly bent',
                    'Create rapid tapping patterns with feet',
                    'Move heel and toe in alternating rhythm',
                    'Maintain sharp, precise movements'
                ]
            },
            {
                id: 'hand_gestures',
                name: 'Hand Gestures',
                description: 'Complex hand movements that tell stories.',
                instructions: [
                    'Keep wrists flexible and loose',
                    'Use fingers expressively',
                    'Move hands in curves and circles',
                    'Coordinate hand movements with footwork',
                    'Express emotions through hand positions'
                ]
            },
            {
                id: 'pirouettes',
                name: 'Pirouettes (Tathai)',
                description: 'Fast spinning movements that showcase technical skill.',
                instructions: [
                    'Start in a standing position',
                    'Plant one foot and rotate around it',
                    'Keep your body aligned vertically',
                    'Move arms gracefully during rotation',
                    'Maintain balance and control throughout'
                ]
            }
        ]
    },
    kathakali: {
        name: 'Kathakali',
        region: 'Kerala',
        description: 'A highly stylized form featuring elaborate costumes, makeup, hand gestures (mudras), and facial expressions (rasas) to tell stories from Hindu epics.',
        poses: [
            {
                id: 'aramandi_kathakali',
                name: 'Aramandi Position',
                description: 'The fundamental wide stance with bent knees.',
                instructions: [
                    'Spread feet wider than shoulder-width',
                    'Bend knees deeply (nearly 45 degrees)',
                    'Keep chest upright and proud',
                    'Weight distributed equally on both feet',
                    'This is maintained throughout the performance'
                ]
            },
            {
                id: 'mudra_hand',
                name: 'Single Hand Mudras',
                description: 'Individual hand movements representing specific meanings.',
                instructions: [
                    'Master basic mudras: pataka, tripataka, mushti',
                    'Combine mudras to tell stories',
                    'Move from one mudra to next smoothly',
                    'Maintain precise finger positions',
                    'Practice until movements become natural'
                ]
            },
            {
                id: 'eye_movements',
                name: 'Eye Movements (Netras)',
                description: 'Expressive eye movements that convey emotion.',
                instructions: [
                    'Move eyes side to side (viloma)',
                    'Move eyes up and down',
                    'Roll eyes in circular motions',
                    'Close and open eyes expressively',
                    'Coordinate with hand movements'
                ]
            },
            {
                id: 'lateral_movement',
                name: 'Lateral Movements',
                description: 'Side-to-side movements while maintaining the aramaind stance.',
                instructions: [
                    'Maintain bent knee position',
                    'Move one foot to the side',
                    'Shift weight smoothly',
                    'Keep upper body controlled',
                    'Return to center position'
                ]
            }
        ]
    },
    odissi: {
        name: 'Odissi',
        region: 'Odisha',
        description: 'A lyrical, sensual form featuring curved body movements (tribhanga), graceful hand gestures, and rhythmic footwork.',
        poses: [
            {
                id: 'basic_odissi',
                name: 'Basic Odissi Stance',
                description: 'The characteristic curved posture of Odissi.',
                instructions: [
                    'Stand with feet placed apart',
                    'Shift weight predominantly to one leg',
                    'Create curves in the body using hip, waist, and shoulder',
                    'Keep the head in profile or three-quarter view',
                    'Maintain graceful body alignment'
                ]
            },
            {
                id: 'hand_positions',
                name: 'Hand Positions',
                description: 'Graceful hand movements and positions.',
                instructions: [
                    'Learn alapadma (opening lotus) position',
                    'Master other hand gestures specific to Odissi',
                    'Move hands in flowing, curved motions',
                    'Coordinate hands with hip and waist movements',
                    'Maintain gracefulness in all positions'
                ]
            },
            {
                id: 'hip_movement',
                name: 'Hip Movements',
                description: 'Distinctive hip and waist movements.',
                instructions: [
                    'Move hips in circular motions',
                    'Create figure-eight patterns',
                    'Coordinate with foot tapping',
                    'Keep movements smooth and flowing',
                    'Maintain body curves throughout'
                ]
            },
            {
                id: 'footwork',
                name: 'Footwork (Padasanchara)',
                description: 'Rhythmic footwork patterns.',
                instructions: [
                    'Tap feet in rhythmic patterns',
                    'Use heel and ball of foot alternately',
                    'Follow the tala (rhythmic cycle)',
                    'Maintain coordination with hand movements',
                    'Keep movements sharp and precise'
                ]
            }
        ]
    }
};

export function getDanceInfo(danceForm) {
    return danceData[danceForm] || null;
}

export function getPoses(danceForm) {
    const dance = danceData[danceForm];
    return dance ? dance.poses : [];
}

export function getPoseDetails(danceForm, poseId) {
    const dance = danceData[danceForm];
    if (!dance) return null;
    return dance.poses.find(p => p.id === poseId) || null;
}

export default danceData;
