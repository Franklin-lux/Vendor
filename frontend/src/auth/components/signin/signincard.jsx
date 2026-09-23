import AccountType from "./accounttype";
import SocialButtons from "./socialbuttons";

const SignInCard = ({
  accountType,
  setAccountType,
  email,
  setEmail,
  error,
  handleSubmit,
}) => {
  return (
    <div className="signin-card">

      <h2>Welcome to cityspace</h2>

      <AccountType
        accountType={accountType}
        setAccountType={setAccountType}
      />

      <form onSubmit={handleSubmit}>

        <div className="input-group">
          <label htmlFor="email">Email Address</label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=""
          />

          {error && <span className="error-message">{error}</span>}
        </div>

        <SocialButtons />

        <button type="submit" className="verify-btn">
          Verify & Continue
        </button>

      </form>

      <p className="terms">
        By continuing, you agree to our
        <br />
        <span>Terms & Privacy Policy.</span>
      </p>

    </div>
  );
};

export default SignInCard;