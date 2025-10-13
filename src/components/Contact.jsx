import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";

export default function Contact() {
  const formRef = useRef();
  const [status, setStatus] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSending) return; // ⛔ prevent multiple clicks
    setIsSending(true);

    // Basic validation
    const formData = new FormData(formRef.current);
    const name = formData.get("from_name")?.trim();
    const email = formData.get("reply_to")?.trim();
    const contact = formData.get("contact_no")?.trim();
    const message = formData.get("message")?.trim();

    if (!name || !email || !message) {
      setStatus({ ok: false, msg: "Please fill out all required fields." });
      setIsSending(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ ok: false, msg: "Please enter a valid email address." });
      setIsSending(false);
      return;
    }

    const serviceID = "service_jtnl4cb";
    const templateID = "template_kai3txw";
    const publicKey = "obr34WQvOSqDEeqWa";

    emailjs.sendForm(serviceID, templateID, formRef.current, publicKey)
      .then(() => {
        setStatus({ ok: true, msg: "✅ Message sent successfully!" });
        formRef.current.reset();
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        setStatus({ ok: false, msg: "❌ Failed to send message. Please try again later." });
      })
      .finally(() => {
        // Cooldown for 10 seconds before allowing another send
        setTimeout(() => setIsSending(false), 10000);
      });
  };

  return (
    <section id="contact" className="py-20" data-aos="fade-up">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl text-orange font-semibold mb-4">Contact Us</h2>
        <p className="text-gray-300 mb-6">Let’s create something beautiful together.</p>

        <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <input
            name="from_name"
            required
            className="p-3 rounded bg-gray-900"
            placeholder="Your Name"
          />
          <input
            name="reply_to"
            type="email"
            required
            className="p-3 rounded bg-gray-900"
            placeholder="Your Email"
          />
          <input
            name="contact_no"
            type="tel"
            pattern="[0-9+ ]*"
            required
            className="p-3 rounded bg-gray-900"
            placeholder="Contact Number"
          />
          <textarea
            name="message"
            required
            className="p-3 rounded bg-gray-900 min-h-[120px]"
            placeholder="Your Message"
          ></textarea>
          <input type="hidden" name="time" value={new Date().toLocaleString()} />

          <button
            type="submit"
            disabled={isSending}
            className={`mx-auto bg-orange px-6 py-3 rounded-full transition ${
              isSending ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSending ? "Sending..." : "Send Message"}
          </button>
        </form>

        {status && (
          <p
            className={`mt-4 ${
              status.ok ? "text-green-400" : "text-red-400"
            }`}
          >
            {status.msg}
          </p>
        )}

        {/* 🔒 You can add Google reCAPTCHA here later for stronger protection */}
      </div>
    </section>
  );
}
