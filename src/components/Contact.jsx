import React from "react"
import { useRef, useState } from 'react'
import emailjs from 'emailjs-com'

export default function Contact() {
  const formRef = useRef()
  const [status, setStatus] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const serviceID = 'YOUR_SERVICE_ID' // replace
    const templateID = 'YOUR_TEMPLATE_ID' // replace
    const publicKey = 'YOUR_PUBLIC_KEY' // replace

    if (serviceID.includes('YOUR')) {
      setStatus({ ok: false, msg: 'EmailJS not configured. Replace placeholders in Contact.jsx.' })
      return
    }

    emailjs.sendForm(serviceID, templateID, formRef.current, publicKey)
      .then(() => setStatus({ ok: true, msg: 'Message sent!' }))
      .catch(() => setStatus({ ok: false, msg: 'Failed to send. Check console.' }))
  }

  return (
    <section id="contact" className="py-20" data-aos="fade-up">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl text-orange font-semibold mb-4">Contact Us</h2>
        <p className="text-gray-300 mb-6">Let’s create something beautiful together.</p>

        <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <input name="from_name" required className="p-3 rounded bg-gray-900" placeholder="Your Name" />
          <input name="reply_to" type="email" required className="p-3 rounded bg-gray-900" placeholder="Your Email" />
          <textarea name="message" required className="p-3 rounded bg-gray-900 min-h-[120px]" placeholder="Your Message"></textarea>
          <button type="submit" className="mx-auto bg-orange px-6 py-3 rounded-full">Send Message</button>
        </form>

        {status && (
          <p className={`mt-4 ${status.ok ? 'text-green-400' : 'text-red-400'}`}>{status.msg}</p>
        )}

        <p className="mt-3 text-sm text-gray-500">(EmailJS placeholders are present — replace them with your IDs.)</p>
      </div>
    </section>
  )
}
