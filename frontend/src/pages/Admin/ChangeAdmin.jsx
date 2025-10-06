import React, { useState } from "react";
import axios from "axios";
import { serverPath } from "../../../serverPath";

const ChangeAdmin = () => {
  const [previousEmail, setPreviousEmail] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const res = await axios.get(`${serverPath}/api/admin/changeadmin`, {
        params: { previousemail: previousEmail, email, password },
        withCredentials: true,
      });

      setMessage(res.data.message);
      setPreviousEmail("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Try again!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-2xl shadow-lg p-8 border border-orange-200">
      <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">
        Change Admin Credentials
      </h2>

      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">{message}</div>
      )}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">Previous Email</label>
          <input
            type="email"
            value={previousEmail}
            onChange={(e) => setPreviousEmail(e.target.value)}
            className="p-3 rounded-lg border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
            placeholder="admin@example.com"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">New Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
            placeholder="newadmin@example.com"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
            placeholder="Enter new password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition"
        >
          {loading ? "Updating..." : "Change Admin"}
        </button>
      </form>
    </div>
  );
};

export default ChangeAdmin;
