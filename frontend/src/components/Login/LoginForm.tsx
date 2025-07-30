import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FormEvent } from 'react';
import GoogleButton from '../Google/GoogleButton';
import { toast } from 'react-toastify';
import "./LoginForm.css";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        console.log(data.message);
        localStorage.setItem('jwt_token', data.result);
        toast.success('Login Successful');
        navigate(callbackUrl);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Internal Server Error');
    }
  };

    return (
        <div className="login-container">
            <h2 id="h2login">Account Login</h2>

            <form onSubmit={handleLogin}>
              <GoogleButton />
              <div className="login-separator">
                <hr className="line"></hr>
                <span>OR</span>
                <hr className="line"></hr>
              </div>
              <div className="login-element">
                  <label>Email</label>
                  <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
              </div>

              <div className="login-element">
                  <label>Password</label>
                  <input
                      required
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
              </div>

              <div className="login-flex-container">
                  <span>Don't have an account?</span>
                  <a href={`/register?callbackUrl=${callbackUrl}`}>Register</a>
              </div>

              <button type="submit" className="loginButton">LOGIN</button>
            </form>
        </div>
    );
}

export default Login;
