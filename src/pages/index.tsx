import { useRouter } from "next/router";

export default function SetupPage() {
  const router = useRouter();

  function handleSetupComplete() {
    router.push("/home");
  }

  return (
    <div>
      <h1 className="display-1">Dein Ziel:</h1>
      <button onClick={handleSetupComplete}>Plan erstellen!</button>
    </div>
  );
}
