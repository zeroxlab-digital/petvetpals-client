import { healthyWeightRangesByBreed, dogBreedSizeCategory } from "./healthyWeightRangesByBreed";

// Some common aliases & shorthand names
const breedAliases = {
  "doberman": "doberman pinscher",
  "gsd": "german shepherd",
  "german shep": "german shepherd",
  "lab": "labrador retriever",
  "goldie": "golden retriever",
  "aussie": "australian shepherd",
  "newfie": "newfoundland",
  "bernese": "bernese mountain dog",
  "cavalier": "cavalier king charles spaniel"
};

// Levenshtein distance (for fuzzy matching)
function levenshtein(a, b) {
  const matrix = Array.from({ length: a.length + 1 }, () => []);

  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,     // deletion
        matrix[i][j - 1] + 1,     // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }
  return matrix[a.length][b.length];
}

// breed matcher
function findClosestBreedMatch(speciesKey, breedKey) {
  if (!breedKey) return null;

  const breeds = Object.keys(healthyWeightRangesByBreed[speciesKey] || {});
  const input = breedKey.toLowerCase().trim();

  // 1️⃣ Direct alias
  if (breedAliases[input]) return breedAliases[input];

  // 2️⃣ Exact match
  if (breeds.includes(input)) return input;

  // 3️⃣ Partial / substring match
  const match = breeds.find(b => b.includes(input) || input.includes(b));
  if (match) return match;

  // 4️⃣ Fuzzy match (Levenshtein)
  let closest = null;
  let minDistance = Infinity;
  for (const b of breeds) {
    const dist = levenshtein(input, b);
    if (dist < minDistance) {
      minDistance = dist;
      closest = b;
    }
  }

  // This accept if reasonably close (≤ 3 edits difference)
  return minDistance <= 3 ? closest : null;
}

export function getWeightBadge(pet) {
  if (!pet.weight?.length) {
    return { label: 'No Data', color: 'gray', idealRange: null };
  }

  // Using reduce find the most recent weight
  const recentWeight = pet.weight.reduce((latest, current) =>
    new Date(current.date) > new Date(latest.date) ? current : latest
  );

  const speciesKey = pet.type?.toLowerCase();
  const breedKey = pet.breed?.toLowerCase();

  // Robust breed resolution
  let breedMatch = findClosestBreedMatch(speciesKey, breedKey);

  // 1️⃣ Try breed-specific range
  let range = breedMatch ? healthyWeightRangesByBreed[speciesKey]?.[breedMatch] : null;

  // 2️⃣ If dog & no direct match, try size category fallback
  if (!range && speciesKey === "dog") {
    const sizeCat = dogBreedSizeCategory[breedMatch || breedKey];
    if (sizeCat) {
      range = healthyWeightRangesByBreed.fallback.dog[sizeCat];
    }
  }

  // 3️⃣ If cat & no match, use generic cat range
  if (!range && speciesKey === "cat") {
    range = healthyWeightRangesByBreed.fallback.cat;
  }

  if (!range) {
    return { label: 'Unknown', color: 'gray', idealRange: null };
  }

  const idealRangeText = `${range.min}–${range.max} lbs`;

  // 4️⃣ Compare weight and assign badge
  if (recentWeight.value < range.min)
    return { label: 'Underweight', color: 'yellow', idealRange: idealRangeText };
  if (recentWeight.value > range.max)
    return { label: 'Overweight', color: 'red', idealRange: idealRangeText };

  return { label: 'Healthy', color: 'green', idealRange: idealRangeText };
}

// To be expanded with more species in the future
// For now, focusing on dogs and cats as they are the most common pets