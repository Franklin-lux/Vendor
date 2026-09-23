import { useEffect, useRef } from "react";

const OTPInput = ({ otp, setOtp }) => {
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (
      event.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();

    const pastedData = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);

    if (!pastedData) {
      return;
    }

    const newOtp = ["", "", "", ""];

    pastedData.split("").forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);

    const nextIndex = Math.min(pastedData.length, 3);

    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="otp-section">

      <h3>Enter 4-digit OTP</h3>

      <div className="otp-input-container">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(element) => {
              inputRefs.current[index] = element;
            }}
            type="text"
            inputMode="numeric"
            maxLength="1"
            value={digit}
            onChange={(event) =>
              handleChange(event.target.value, index)
            }
            onKeyDown={(event) =>
              handleKeyDown(event, index)
            }
            onPaste={handlePaste}
            aria-label={`OTP digit ${index + 1}`}
          />
        ))}
      </div>

    </div>
  );
};

export default OTPInput;