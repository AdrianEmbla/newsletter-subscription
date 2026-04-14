import SubscribeForm from "./components/SubscribeForm";
import UnsubscribeForm from "./components/Unsubscribe";

function App() {
  return (
    <main>
      <h1>Nyhetsbrev</h1>
      <section>
        <h2>Abonner på nyhetsbrev</h2>
        <SubscribeForm />
      </section>

      <section>
        <h2>Avslutt abonnement</h2>
        <UnsubscribeForm />
      </section>
    </main>
  );
}

export default App;
