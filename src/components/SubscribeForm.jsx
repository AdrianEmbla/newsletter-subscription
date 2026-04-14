import { useState, useRef } from "react";

const ALLOWED_NEWSLETTERS = ["Anime", "Manga", "ToLove-Ru"];
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
  }
}
