import { useState } from "react";
import SignInCard from "./signincard";
import "./signin.css";

const SignIn = ({ onContinue }) => {
  const [accountType, setAccountType] = useState("vendor");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");

    console.log({
      accountType,
      email,
    });

    onContinue({ email, accountType });
  };

  return (
    <main className="signin-page">
      <section className="signin-container">

        <div className="signin-heading">
          <h1>Sign in to continue</h1>
          <p>We’ll save this booking to your account.</p>
        </div>

        <SignInCard
          accountType={accountType}
          setAccountType={setAccountType}
          email={email}
          setEmail={setEmail}
          error={error}
          handleSubmit={handleSubmit}
        />

      </section>
    </main>
  );
};

export default SignIn;