import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SignIn from './components/signin/signin'
import OTPVerification from './components/OTP/OTPVerification'
import EmptyPage from './pages/EmptyPage'
import './components/OTP/OTPVerification.css'
import './Auth.css'

export default function AuthApp() {
  const [page, setPage] = useState('signin')
  const [email, setEmail] = useState('')
  const [accountType, setAccountType] = useState('vendor')
  const [generatedOtp, setGeneratedOtp] = useState('')
  const navigate = useNavigate()

  const createOtp = () => String(Math.floor(Math.random() * 9000) + 1000)

  const handleEmailSubmit = ({ email: submittedEmail, accountType: submittedAccountType }) => {
    const newOtp = createOtp()

    setEmail(submittedEmail)
    setAccountType(submittedAccountType)
    setGeneratedOtp(newOtp)
    setPage('otp')
    console.log(`Generated OTP for ${submittedEmail}: ${newOtp}`)
  }

  const handleOtpVerified = async ({ otp }) => {
    if (otp !== generatedOtp) {
      throw new Error('OTP is invalid. Please try again.')
    }

    try {
      const response = await fetch('http://localhost:5000/verifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          otp,
          accountType,
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Unable to save verification details.')
      }
    } catch (e) {
      console.error(e);
    }

    navigate('/vendor-onboarding/create-profile')
  }

  return (
    page === 'signin' ? (
      <SignIn onContinue={handleEmailSubmit} />
    ) : page === 'otp' ? (
      <OTPVerification
        email={email}
        onVerified={handleOtpVerified}
        onResend={() => {
          const newOtp = createOtp()
          setGeneratedOtp(newOtp)
          console.log(`Generated OTP for ${email}: ${newOtp}`)
        }}
      />
    ) : (
      <EmptyPage />
    )
  )
}
