import SubscribeForm from "./components/SubscribeForm";
import UnsubscribeForm from "./components/UnsubscribeForm";

function App() {
  return (
    <main>
      <h1>Nyhetsbrev</h1>
      <section>
        <h2>
          <img
            src="https://github.com/Adrian-kodehode/test-project/blob/main/public/To%20Love%20Ru/Site-logo%20(2).png?raw=true"
            alt=""
            />
            Abonner på nyhetsbrev
        </h2>
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
