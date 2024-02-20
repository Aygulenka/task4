import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "./firebase";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Вход пользователя по имени и паролю
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      console.log("Logged in successfully!");
      navigate('/Home'); // Переход на главную страницу после успешного входа
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="text" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
