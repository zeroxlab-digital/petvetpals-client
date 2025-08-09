import { healthyWeightRangesByBreed, dogBreedSizeCategory } from "./healthyWeightRangesByBreed";

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

  // 1️⃣ Try breed-specific range
  let range = healthyWeightRangesByBreed[speciesKey]?.[breedKey];

  // 2️⃣ If dog & no direct match, try size category fallback
  if (!range && speciesKey === "dog") {
    const sizeCat = dogBreedSizeCategory[breedKey];
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
