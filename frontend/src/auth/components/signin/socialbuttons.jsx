const SocialButtons = () => {
  const handleSocialLogin = (provider) => {
    console.log(`${provider} login clicked`);

    alert(`${provider} login selected`);
  };

  return (
    <div className="social-buttons">

      <button
        type="button"
        onClick={() => handleSocialLogin("Google")}
      >
        <span className="google-icon">G</span>
        <span>Google</span>
      </button>

      <button
        type="button"
        onClick={() => handleSocialLogin("Microsoft")}
      >
        <span className="microsoft-icon">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>

        <span>Microsoft</span>
      </button>

      <button
        type="button"
        onClick={() => handleSocialLogin("Apple")}
      >
        <span className="apple-icon">●</span>
        <span>Apple ID</span>
      </button>

    </div>
  );
};

export default SocialButtons;