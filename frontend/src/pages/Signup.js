import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../api/auth";
import ErrorBar from "../components/ErrorBar";

export default function Signup() {
    const [form, setForm] = useState({ username: "", email: "", password: "", role: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        console.log(form);
        e.preventDefault();
        try {
            await signup(form);
            navigate("/login");
        } catch (err) {
            setError(err.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
            <ErrorBar message={error} onClose={() => setError("")} />
            <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-white text-center mb-6">Create Account</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                        type="text"
                        name="username"
                        placeholder="Full Name"
                        value={form.username}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                    <div className="space-y-2">
                        <label className="block font-medium">Role</label>
                        {["owner", "editor", "read-only"].map((r) => (
                            <label key={r} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="role"
                                    value={r}
                                    checked={form.role === r}
                                    onChange={handleChange}
                                />
                                {r}
                            </label>
                        ))}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-pink-500 text-white font-semibold hover:bg-pink-600 transition"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-center text-gray-200 mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-pink-300 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
