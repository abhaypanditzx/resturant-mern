import React, { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', phone: '', date: '', guests: '', message: '' })
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Unable to send message. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-200 font-light">

      {/* ── HERO ── */}
      <div className="relative h-[55vh] min-h-[360px] flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&auto=format&fit=crop&q=80"
          alt="Restaurant ambiance"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/10" />
        <div className="relative z-10 px-8 md:px-16 pb-12">
          <p className="text-amber-500 text-xs tracking-[0.3em] uppercase font-medium mb-3">
            Reserve Your Evening
          </p>
          <h1 className="text-5xl md:text-7xl font-light text-stone-100 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
            Get in <span className="italic text-amber-400">Touch</span>
            <br />With Us
          </h1>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-5 gap-16">

        {/* ── INFO PANEL ── */}
        <div className="lg:col-span-2 space-y-10">
          <div>
            <h2 className="text-3xl font-light text-stone-100 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
              Visit <span className="italic text-amber-400">Us</span>
            </h2>
            <div className="w-10 h-px bg-amber-500 opacity-60 mb-6" />
            <p className="text-stone-400 text-sm leading-relaxed">
              We'd love to welcome you to our table. Whether it's an intimate dinner or a grand celebration, we're here to make every moment memorable.
            </p>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <p className="text-amber-500 text-xs tracking-[0.25em] uppercase font-medium">Address</p>
            <p className="text-stone-400 text-sm leading-relaxed">
              24 Rue de la Paix<br />New York, NY 10001
            </p>
          </div>

          {/* Phone & Email */}
          <div className="space-y-2">
            <p className="text-amber-500 text-xs tracking-[0.25em] uppercase font-medium">Reservations</p>
            <a href="tel:+12125550123" className="block text-stone-400 text-sm hover:text-amber-400 transition-colors duration-200">
              +1 (212) 555-0123
            </a>
            <a href="mailto:hello@maison.com" className="block text-stone-400 text-sm hover:text-amber-400 transition-colors duration-200">
              hello@maison.com
            </a>
          </div>

          {/* Hours */}
          <div className="space-y-3">
            <p className="text-amber-500 text-xs tracking-[0.25em] uppercase font-medium">Hours</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {[
                ['Mon – Thu', '5:00 – 10:00 pm'],
                ['Fri – Sat', '5:00 – 11:30 pm'],
                ['Sunday',   '4:00 – 9:00 pm'],
                ['Lunch',    'Fri & Sat, 12–2:30 pm'],
              ].map(([day, time]) => (
                <React.Fragment key={day}>
                  <span className="text-stone-500">{day}</span>
                  <span className="text-stone-400">{time}</span>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Map thumbnail */}
          <div className="relative rounded overflow-hidden group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800&auto=format&fit=crop&q=80"
              alt="Location"
              className="w-full h-44 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute inset-0 border border-amber-500/20 pointer-events-none" />
            <div className="absolute inset-0 bg-stone-950/30 group-hover:bg-transparent transition-colors duration-500" />
            <span className="absolute bottom-3 left-3 text-xs text-amber-400 tracking-widest uppercase font-medium">
              View on Maps ↗
            </span>
          </div>
        </div>

        {/* ── FORM PANEL ── */}
        <div className="lg:col-span-3 lg:border-l lg:border-stone-800 lg:pl-14">
          <h2 className="text-3xl font-light text-stone-100 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
            Connect <span className="italic text-amber-400">with us</span>
          </h2>
          <div className="w-10 h-px bg-amber-500 opacity-60 mb-8" />

          {submitted ? (
            <div className="border border-amber-500/30 bg-amber-500/5 p-8 space-y-4">
              <div className="w-10 h-10 rounded-full border border-amber-500 flex items-center justify-center text-amber-400">
                ✓
              </div>
              <p className="text-2xl font-light text-stone-100" style={{ fontFamily: 'Georgia, serif' }}>
                Thank you for reaching out.
              </p>
              <p className="text-stone-400 text-sm leading-relaxed">
                We've received your reservation request and will confirm your table within 24 hours. We look forward to welcoming you.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-amber-500 text-xs tracking-widest uppercase hover:text-amber-300 transition-colors duration-200"
              >
                Submit Another →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-[0.25em] uppercase text-stone-500">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                    className="bg-transparent border-b border-stone-700 focus:border-amber-500 py-2 text-sm text-stone-200 placeholder-stone-600 outline-none transition-colors duration-200"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-[0.25em] uppercase text-stone-500">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    className="bg-transparent border-b border-stone-700 focus:border-amber-500 py-2 text-sm text-stone-200 placeholder-stone-600 outline-none transition-colors duration-200"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-[0.25em] uppercase text-stone-500">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (212) 000-0000"
                    className="bg-transparent border-b border-stone-700 focus:border-amber-500 py-2 text-sm text-stone-200 placeholder-stone-600 outline-none transition-colors duration-200"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label className="text-xs tracking-[0.25em] uppercase text-stone-500">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="write your message here..."
                    className="bg-transparent border-b border-stone-700 focus:border-amber-500 py-2 text-sm text-stone-200 placeholder-stone-600 outline-none transition-colors duration-200 resize-none"
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-400 text-xs tracking-wide">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group relative inline-flex items-center gap-3 border border-amber-500 text-amber-400 text-xs tracking-[0.25em] uppercase font-medium px-8 py-4 overflow-hidden transition-colors duration-300 hover:text-stone-950 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="absolute inset-0 bg-amber-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />
                <span className="relative z-10">
                  {loading ? 'Sending…' : 'Send Message'}
                </span>
                {!loading && (
                  <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-200">→</span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* ── PHOTO STRIP ── */}
      <div className="grid grid-cols-3 h-40 overflow-hidden">
        {[
          'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&auto=format&fit=crop&q=80',
        ].map((src, i) => (
          <img
            key={i}
            src={src}
            alt="Restaurant"
            className="w-full h-full object-cover opacity-40 hover:opacity-70 transition-opacity duration-500"
          />
        ))}
      </div>

      {/* ── FOOTER ── */}
      <div className="border-t border-stone-800/60 px-8 md:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-stone-600 text-xs">© 2026 Maison Restaurant. All rights reserved.</p>
        <div className="flex gap-8">
          {['Instagram', 'Facebook', 'Twitter'].map(s => (
            <a key={s} href="#" className="text-stone-600 text-xs tracking-widest uppercase hover:text-amber-400 transition-colors duration-200">
              {s}
            </a>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Contact