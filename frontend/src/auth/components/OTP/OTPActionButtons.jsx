const OTPActions = ({
  timer,
  onResend,
  onVerify,
  message,
  isError
}) => {
  return (     
    <div className="otp-actions">

      {timer > 0 ? (
        <p className="resend-text">
          Resend code in 00:{String(timer).padStart(2, "0")}
        </p>
      ) : (
        <button
          className="resend-button"
          onClick={onResend}
        >
          Resend code
        </button>
      )}

      <button
        className="verify-button"
        onClick={onVerify}
      >
        Verify & continue
      </button>

      {message && (
        <p
          className={
            isError
              ? "otp-message error"
              : "otp-message success"
          }
        >
          {message}
        </p>
      )}

    </div>
  );
};

export default OTPActions;