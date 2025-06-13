'use client';

import React, { useState } from "react";
import { useColorMode } from "@/components/ui/color-mode";

export default function RegisterAnimalPage() {
  const { colorMode } = useColorMode();
  const bg = colorMode === "dark" ? "#F5DEB3" : "#EADDCA";
  const textColor = colorMode === "dark" ? "#C19A6B" : "#6B4F27";

  const [form, setForm] = useState({ name: "", age: "", description: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto", padding: 24, background: bg, borderRadius: 12, boxShadow: "0 2px 8px #0001", color: textColor, transition: "background 0.3s, color 0.3s" }}>
      <h1 style={{ marginBottom: 24 }}>Register a New Animal</h1>
      {submitted ? (
        <div>
          <h2>Animal Registered!</h2>
          <p><strong>Name:</strong> {form.name}</p>
          <p><strong>Age:</strong> {form.age}</p>
          <p><strong>Description:</strong> {form.description}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="name" style={{ display: "block", marginBottom: 4 }}>Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="age" style={{ display: "block", marginBottom: 4 }}>Age</label>
            <input
              id="age"
              name="age"
              type="number"
              min="0"
              value={form.age}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label htmlFor="description" style={{ display: "block", marginBottom: 4 }}>Description</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
            />
          </div>
          <button type="submit" style={{ padding: "10px 24px", borderRadius: 6, background: "#0070f3", color: "#fff", border: "none", fontWeight: 600, cursor: "pointer" }}>
            Register
          </button>
        </form>
      )}
    </div>
  );
}
