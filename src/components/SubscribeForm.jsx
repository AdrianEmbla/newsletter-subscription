import { useState, useRef } from "react";

const ALLOWED_NEWSLETTERS = [
  "ToLOVE-Ru",
  "ToLOVE-Ru - Darkness",
  "ToLOVE-Ru - Motto",
  "Anime",
  "Manga",
];
const EMAILS_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function SubscribeForm() {
  const [navn, setNavn] = useState("");
  const [email, setEmail] = useState("");
  const [nyhetsbrev, setNyhetsbrev] = useState(ALLOWED_NEWSLETTERS[0]);
  const [samtykke, setSamtykke] = useState(false);
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState({ message: "", type: "" });
  const feedbackRef = useRef(null);

  function validate() {
    const errs = {};
    if (!navn.trim()) errs.navn = "Navn er påkrevd";
    if (!EMAILS_REGEX.test(email)) errs.email = "Ugyldig e-postadresse";
    if (!ALLOWED_NEWSLETTERS.includes(nyhetsbrev))
      errs.nyhetsbrev = "Velg et nyhetsbrev";
    if (!samtykke) errs.samtykke = "Du må samtykke for å fortsette";
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length > 0) return;

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          navn,
          email,
          nyhetsbrev,
          samtykke,
          samtykke_tidspunkt: new Date().toLocaleString(),
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setFeedback({ message: data.message, type: "success" });
        setNavn("");
        setEmail("");
        setNyhetsbrev(ALLOWED_NEWSLETTERS[0]);
        setSamtykke(false);
        setErrors({});
      } else {
        const msg = data.error || data.errors?.join(", ") || "Noe gikk galt";
        setFeedback({ message: msg, type: "error" });
      }
    } catch {
      setFeedback({ message: "Kunne ikke koble til serveren", type: "error" });

      feedbackRef.current?.focus();
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {feedback.message && (
        <div ref={feedbackRef} role="alert" tabIndex={-1}>
          {feedback.message}
        </div>
      )}

      <div>
        <label htmlFor="sub-navn">Navn *</label>
        <input
          id="sub-navn"
          type="text"
          value={navn}
          onChange={(e) => setNavn(e.target.value)}
          aria-describedby="sub-navn-error"
          aria-invalid={!!errors.navn}
        />
        {errors.navn && (
          <span id="sub-navn-error" role="alert">
            {errors.navn}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="sub-email">
          E-post *
          <input
            id="sub-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="sub-email-error"
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <span id="sub-email-error" role="alert">
              {errors.email}
            </span>
          )}
        </label>
      </div>

      <div>
        <label htmlFor="sub-nyhetsbrev">Nyhetsbrev *</label>
        <select
          id="sub-nyhetsbrev"
          value={nyhetsbrev}
          onChange={(e) => setNyhetsbrev(e.target.value)}
          aria-describedby="sub-nyhetsbrev-error"
          aria-invalid={!!errors.nyhetsbrev}>
          {ALLOWED_NEWSLETTERS.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        {errors.nyhetsbrev && (
          <span id="sub-nyhetsbrev-error" role="alert">
            {errors.nyhetsbrev}
          </span>
        )}
      </div>

      <div>
        <input
          id="sub-samtykke"
          type="checkbox"
          checked={samtykke}
          onChange={(e) => setSamtykke(e.target.checked)}
          aria-describedby="sub-samtykke-error"
          aria-invalid={!!errors.samtykke}
        />
        <label htmlFor="sub-samtykke">
          Jeg samtykker til at mine data lagres for å administrere
          nyhetsbrev-abonnementet. Les vår{" "}
          <a href="/personvern.html" target="_blank" rel="noopener noreferrer">
            personvernerklæring
          </a>
          .
        </label>
        {errors.samtykke && (
          <span id="sub-samtykke-error" role="alert">
            {errors.samtykke}
          </span>
        )}
      </div>
      <button type="submit">Abonner</button>
    </form>
  );
}

export default SubscribeForm;
