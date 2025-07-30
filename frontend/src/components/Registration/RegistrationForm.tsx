import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FormEvent } from 'react';
import { toast } from 'react-toastify';
import "./RegistrationForm.css";
import GoogleButton from '../Google/GoogleButton';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const handleRegistration = async (e: FormEvent) => {
    e.preventDefault();
    
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!passwordRegex.test(password)) {
      toast.error('Password must be at least 8 characters long and contain at least one letter and one number.',
        { autoClose: 5000 }
      );
      return;
    }
    const requestBody = {
      first_name: firstName,
      last_name: lastName,
      role: "Customer",
      provider: "self",
      email: email,
      password: password,
    };
    try {
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
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Internal Server Error');
    }
  };

    return (
        <div className="Register-container">
            <h2 id="h2Register">Account Registration</h2>

            <form onSubmit={handleRegistration}>
              <GoogleButton />
              <div className="login-separator">
                <hr className="line"></hr>
                <span>OR</span>
                <hr className="line"></hr>
              </div>
              <div className="Register-element">
                  <label>First Name</label>
                  <input
                      required
                      type="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                  />
              </div>
              <div className="Register-element">
                  <label>Last Name</label>
                  <input
                      required
                      type="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                  />
              </div>
              <div className="Register-element">
                  <label>Email</label>
                  <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
              </div>

              <div className="Register-element">
                  <label>Password</label>
                  <input
                      required
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
              </div>

              <button type="submit" className="RegisterButton">Register</button>
            </form>
        </div>
    );
}

export default Register;
