import Logo from "../components/Logo/Logo";

export default function Home() {
  return (
    <main data-theme="lightX" className="min-h-screen bg-base-100">
      <div className="flex flex-row items-center justify-center gap-12 h-screen">
        <div>
          <Logo />
          <h1 className="text-4xl font-bold text-base-content">
            Rejoins la conversation
          </h1>
          <h2 className="text-2xl font-light text-primary mt-4">
            Partage tes idées et connecte-toi au monde
          </h2>
        </div>
        <div>
          <div className="card bg-base-100 shadow-2xl w-150">
            <div className="card-body p-15">
              <div className="card-title text-3xl text-primary font-bold">
                Connexion
              </div>
              <div className="text-sm text-base-content mb-4">
                {" "}
                Connecte-toi à ton compte{" "}
              </div>
              <form className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="input w-full border-2 border-base-300 focus:border-2 focus:border-primary focus:outline-none focus:ring-0"
                />
                <input
                  type="password"
                  placeholder="Mot de passe"
                  className="input w-full border-2 border-base-300 focus:border-2 focus:border-primary focus:outline-none focus:ring-0"
                />
                <button className="btn btn-primary btn-lg">Se connecter</button>
              </form>
              <div className="text-sm text-center text-base-content mt-4">
                Pas de compte ?{" "}
                <a href="#" className="text-primary font-bold">
                  Inscris-toi
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
