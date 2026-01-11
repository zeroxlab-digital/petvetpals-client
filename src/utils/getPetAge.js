export const getPetAge = (dob) => {
  if (!dob) return null;

  const birthDate = new Date(dob);
  const today = new Date();

  // Calculate total months difference
  let months =
    (today.getFullYear() - birthDate.getFullYear()) * 12 +
    (today.getMonth() - birthDate.getMonth());

  // Adjust if current day is before birth day
  if (today.getDate() < birthDate.getDate()) {
    months--;
  }

  if (months < 0) return null;

  // Less than 1 year > show months
  if (months < 12) {
    return `${months} month${months === 1 ? "" : "s"} old`;
  }

  // 1 year or more > show years
  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? "" : "s"} old`;
};
