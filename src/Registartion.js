import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { firebaseAuth } from "./firebase";
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      // Регистрация пользователя
      const {user} = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      console.log("user.metadata", user.metadata)
      // Обновление профиля пользователя с именем
      await updateProfile(user, { displayName });
      const userId = user.uid;
      console.log(userId)
      const creationTime = new Date(user.metadata.creationTime).toLocaleString();
      const lastLoginAt = new Date(user.metadata.lastSignInTime).toLocaleString();
      const isBlocked = false
      const usersCollection = collection(db, 'users');
      await addDoc(usersCollection, { email, password,userId, displayName, creationTime,lastLoginAt, isBlocked  });
      console.log("User registered:", user); 
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Registration</h2>
      <input type="text" placeholder="Username" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Registration;
