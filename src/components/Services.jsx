import React from "react"
export default function Services() {
  const services = [
    { title: 'Portrait Sessions', desc: 'Professional portrait photography for individuals, couples, and families.' },
    { title: 'Event Coverage', desc: 'Capturing life’s most memorable moments with artistic storytelling.' },
    { title: 'Product Shoots', desc: 'Highlighting your brand and products with clean, creative visuals.' }
  ]

  return (
    <section id="services" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl text-orange font-semibold mb-8 text-center" data-aos="fade-up">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className="bg-gray-900 p-6 rounded-lg hover:translate-y-[-6px] transition-transform" data-aos="fade-up" data-aos-delay={i*100}>
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-gray-300">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
