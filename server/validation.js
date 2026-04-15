const ALLOWED_NEWSLETTERS = ["Anime", "Manga", "ToLOVE-Ru"];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateSubscription(body) {
  const errors = [];

  if (typeof body.navn !== "string" || body.navn.trim() === "") {
    errors.push("Navn er påkrevd");
  }

  if (typeof body.email !== "string" || !EMAIL_REGEX.test(body.email)) {
    errors.push("Ugyldig e-postadresse");
  }

  if (
    typeof body.nyhetsbrev !== "string" ||
    !ALLOWED_NEWSLETTERS.includes(body.nyhetsbrev)
  ) {
    errors.push(`Nyhetsbrev må være en av: ${ALLOWED_NEWSLETTERS.join(", ")}`);
  }

  if (body.samtykke !== true) {
    errors.push("Samtykke er påkrevd");
  }

  return { valid: errors.length === 0, errors };
}

function validateEmail(body) {
  const errors = [];

  if (typeof body.email !== "string" || !EMAIL_REGEX.test(body.email)) {
    errors.push("Ugyldig e-postadresse");
  }

  return { valid: errors.length === 0, errors };
}

module.exports = { validateSubscription, validateEmail, ALLOWED_NEWSLETTERS };
