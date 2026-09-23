const OTPHeader = ({ email }) => {
  return (
    <div className="otp-header">
      <h1>Verify your E-mail</h1>

      <p>
        Enter the code sent to <span>{email}</span>
      </p>
    </div>
  );
};

export default OTPHeader;