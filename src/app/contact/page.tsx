"use client";

import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log({ name, email, subject, message });
    alert(
      "Message Sent: We've received your message and will get back to you soon."
    );
    // Reset form fields
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Contact Us</h1>
      <p className="mb-6 dark:text-white">
        Have questions about uploading jobs or using our platform? We&apos;re
        here to help!
      </p>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium mb-1 dark:text-white"
          >
            Name
          </label>
          <input
            id="name"
            className="w-full border border-gray-300 rounded-md p-2 dark:text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-1 dark:text-white"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full border border-gray-300 rounded-md p-2 dark:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium mb-1 dark:text-white"
          >
            Subject
          </label>
          <input
            id="subject"
            className="w-full border border-gray-300 rounded-md p-2 dark:text-white"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium mb-1 dark:text-white"
          >
            Message
          </label>
          <textarea
            id="message"
            className="w-full border border-gray-300 rounded-md p-2 dark:text-white"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={4}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors "
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
