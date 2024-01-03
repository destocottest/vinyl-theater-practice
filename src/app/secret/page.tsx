import { ReturnHomeButton } from "@/components/ReturnHomeButton";

const SecretPage = () => {
  return (
    <div className="grid place-items-center min-h-screen bg-green-200">
      <div className="max-w-xs">
        <h1>welcome to the secret page</h1>
        <ReturnHomeButton />
      </div>
    </div>
  );
};

export default SecretPage;
