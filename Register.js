import React, { useState } from 'react';
import { auth } from './firebase';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await auth.createUserWithEmailAndPassword(email, password);
            // Redirige al dashboard después del registro exitoso
            window.location.href = '/dashboard';
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
