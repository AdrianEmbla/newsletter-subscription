import { useState, useRef } from "react";

const EMAILS_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function UnsubscribeForm() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState({ message: "", type: "" });
  const feedbackRef = useRef(null);

  function validate() {
    const errs = {};
    if (!EMAILS_REGEX.test(email)) errs.email = "Ugyldig e-postadresse";
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length > 0) return;

    try {
      const res = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setFeedback({ message: data.message, type: "success" });
        setEmail("");
        setErrors({});
      } else {
        const msg = data.error || data.errors?.join(" ");
        setFeedback({ message: msg, type: "error" });
      }
    } catch {
      setFeedback({ message: "Kunne ikke koble til serveren", type: "error" });
    }
    feedbackRef.current?.focus();
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {feedback.message && (
        <div ref={feedbackRef} role="alert" tabIndex={-1}>
          {feedback.message}
        </div>
      )}

      <div>
        <label htmlFor="unsub-epost">E-post *</label>
        <input
          id="unsub-epost"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby="unsub-epost-error"
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <span id="unsub-epost-error" role="alert">
            {errors.email}
          </span>
        )}
      </div>
      <button type="submit">Avslutt abonnement</button>
    </form>
  );
}

export default UnsubscribeForm;
