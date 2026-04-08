const hitMessages = [
    "Direct hit! The enemy is smoking.",
    "Excellent shot! Target neutralized.",
    "Boom! That's a massive hit!",
    "Armor pierced. They felt that one.",
    "Target acquired and struck!",
    "Bullseye! Keep the pressure on.",
    "Enemy hull breached! Good job.",
    "Vessel damaged! Coordinates confirmed."
];

const missMessages = [
    "Splash! Just water.",
    "You missed! Recalibrate the radar.",
    "Nothing but waves there.",
    "Shot went wide. Adjust your aim.",
    "Missed by a mile, Commander.",
    "Target evaded. Keep searching.",
    "Negative impact. Sector is clear of ships.",
    "Just scaring the fish with that one."
];

const cpuHitMessages = [
    "WARNING: Our hull has been breached!",
    "MAYDAY: We took a direct hit!",
    "Alert! The enemy found us.",
    "Brace for impact! We've been struck."
];

const cpuMissMessages = [
    "Enemy missed. We are still hidden.",
    "Dodged that one. Keep firing!",
    "Enemy shell landed in the water.",
    "Their radar is failing. We are safe for now."
];

// helper func to pull a random message from an arr

const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

export const getRandomHitMessage = () => getRandomItem(hitMessages);
export const getRandomMissMessage = () => getRandomItem(missMessages);
export const getCpuHitMessage = () => getRandomItem(cpuHitMessages);
export const getCpuMissMessage = () => getRandomItem(cpuMissMessages);