import { useGoogleLogin, TokenResponse } from '@react-oauth/google';
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const GoogleButton = () => {
  const [token, setToken] = useState<Omit<TokenResponse, "error" | "error_description" | "error_uri"> | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  useEffect(() => {
    if (token) {
      fetchGoogleUser();
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  const Login = useGoogleLogin({
    onSuccess: tokenResponse => {
      setToken(tokenResponse);
    }
  });

  const fetchGoogleUser = async () => {
    try {
      const response = await fetch('/api/auth/getCredentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( token ),
      });

      const data = await response.json();
      googleSignIn(data.result.given_name, data.result.family_name, data.result.email, data.result.id);
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Internal Server Error');
    }
  }

  const googleSignIn = async (first_name: string, last_name: string, email: string, password: string) => {
    const requestBody = {
      first_name: first_name,
      last_name: last_name,
      role: "Customer",
      provider: "google",
      email: email,
      password: password,
    };

    try {
      const response = await fetch('/api/auth/checkEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      });

      const data = await response.json();

      if ( data.result === false ) {
        // Register if there is no email
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
        const data = await response.json();
        if (data.success) {
          localStorage.setItem('jwt_token', data.result);
          toast.success('Register Successful');
          navigate(callbackUrl);
        } else {
          toast.error(data.message);
        }
      } else if ( data.result === true ) {
        // Login if there is an email
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email, password: password }),
        });
        const data = await response.json();
        if (data.success) {
          localStorage.setItem('jwt_token', data.result);
          toast.success('Login Successful');
          navigate(callbackUrl);
        } else {
          toast.error(data.message);
        }
      } else {
        toast.error('Internal Server Error');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Internal Server Error');
    }
  };

  return (
    <button className="google-button" onClick={() => Login()}> 
      <img src="/images/google.svg" alt="google logo" />
      <span>Sign In with Google</span>
    </button>
  )
}

export default GoogleButton;
