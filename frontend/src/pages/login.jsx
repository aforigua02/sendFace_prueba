import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth'; 

export default function Login() { 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth(); 

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3001/api/auth/login', { 
                username: email, 
                password: password 
            });

            login(res.data.token); 
            
        } catch (err) {
            console.error(err.response?.data); 
            alert("Error al iniciar sesión. Revisa tus credenciales o el estado de los servicios.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-100">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Entrar a SendFace</h2>
                <div className="space-y-4">
                    <input 
                        type="text" 
                        placeholder="Usuario (felipe_dev)" 
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Contraseña" 
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md">
                        Iniciar Sesión
                    </button>
                </div>
            </form>
        </div>
    );
}