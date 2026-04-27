
export function getDifficultyBadgeClass(difficulty) {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "badge-success";
    case "medium":
      return "badge-warning";
    case "hard":
      return "badge-error";
    default:
      return "badge-neutral";
  }
}

export const normalizeOutput = (output) => {
  // normalize output for comparison (trim whitespace, handle different spacing)
  return output
    .trim()
    .split("\n")
    .map((line) =>
      line
        .trim()
        // remove spaces after [ and before ]
        .replace(/\[\s+/g, "[")
        .replace(/\s+\]/g, "]")
        // normalize spaces around commas to single space after comma
        .replace(/\s*,\s*/g, ","),
    )
    .filter((line) => line.length > 0)
    .join("\n");
};

export const checkCodeOutput = (expected, actual) => {
  return normalizeOutput(expected) === normalizeOutput(actual);
};

export const isUserInSession = (user, session) => {
  if (
    user &&
    user.id &&
    session &&
    (session?.host?.clerkId === user.id ||
      session?.participant?.clerkId === user.id)
  )
    return true;
  return false;
};
