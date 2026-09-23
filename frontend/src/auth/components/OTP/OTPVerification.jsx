import { useEffect, useState } from "react";

import OTPHeader from "./OTPHeader";
import OTPInput from "./OTPInput";
import OTPActions from "./OTPActionButtons.jsx";

function OTPVerification({ email, onVerified, onResend }) {
    const [otp, setOtp] = useState(["", "", "", ""]);

    const [timer, setTimer] = useState(24);

    const [message, setMessage] = useState("");

    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (timer <= 0) {
            return;
        }

        const interval = setInterval(() => {
            setTimer((previousTimer) => previousTimer - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    const handleResend = () => {
        setOtp(["", "", "", ""]);
        setTimer(24);
        onResend();

        setMessage("New OTP sent successfully. Check the console.");
        setIsError(false);
    };

    const handleVerify = async () => {
        const enteredOtp = otp.join("");

        if (enteredOtp.length !== 4) {
            setMessage("Please enter the 4-digit OTP.");
            setIsError(true);
            return;
        }

        try {
            await onVerified({ otp: enteredOtp });
        } catch (error) {
            setMessage(error.message);
            setIsError(true);
        }
    };

    return (
        <main className="otp-page">

            <section className="otp-background">

                <div className="otp-card">

                    <OTPHeader email={email} />

                    <OTPInput
                        otp={otp}
                        setOtp={setOtp} />

                    <OTPActions
                        timer={timer}
                        onResend={handleResend}
                        onVerify={handleVerify}
                        message={message}
                        isError={isError} />

                </div>

            </section>

        </main>
    );
}

export default OTPVerification;