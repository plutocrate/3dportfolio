import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { Separator } from '@/components/ui/separator'
import { useClickSound } from '@/hooks/useClickSound'
import { AvailabilitySection } from './AvailabilitySection'

// Credentials loaded from .env — never exposed in git
const EJ_SERVICE_ID  = 'service_06d6y58'
const EJ_TEMPLATE_ID = 'template_kfcibfh'
const EJ_PUBLIC_KEY  = 'HgsszHkvHyhtMtI--'

export function TalkSection() {
  const formRef = useRef()
  const [status, setStatus] = useState('idle')
  const [fields, setFields] = useState({ from_name: '', from_email: '', message: '' })
  const playClick = useClickSound()

  const handleChange = (e) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!fields.from_name || !fields.from_email || !fields.message) return
    setStatus('sending')
    try {
      await emailjs.sendForm(EJ_SERVICE_ID, EJ_TEMPLATE_ID, formRef.current, EJ_PUBLIC_KEY)
      setStatus('sent')
      setFields({ from_name: '', from_email: '', message: '' })
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="font-mono text-[clamp(11px,calc(10.4px+0.2vw),13px)] uppercase tracking-[0.25em] text-white/30 mb-1">
          Get In Touch
        </div>
        <h2 className="font-display text-[clamp(19px,calc(17.2px+0.9vw),23px)] text-white leading-none tracking-wide mb-3">TALK</h2>

        <AvailabilitySection />
      </div>

      <Separator />

      <p className="font-body text-[clamp(14px,calc(13.3px+0.28vw),16px)] text-white/55 leading-relaxed">
        Have a project in mind, a role to fill, or just want to say hi?
        Drop a message and I'll get back to you.
      </p>

      <Separator />

      {status === 'sent' ? (
        <div className="flex flex-col gap-3 py-4">
          <div className="w-6 h-6 border border-white/30 flex items-center justify-center">
            <span className="text-white/70 text-xs">✓</span>
          </div>
          <p className="font-mono text-[clamp(12px,calc(11.4px+0.2vw),14px)] text-white/60 uppercase tracking-widest">Message sent.</p>
          <p className="font-body text-[clamp(13px,calc(12.4px+0.24vw),15px)] text-white/35">I'll reply to your email soon.</p>
          <button
            onClick={() => { playClick(); setStatus('idle') }}
            className="mt-2 font-mono text-[clamp(10px,calc(9.6px+0.16vw),12px)] uppercase tracking-[0.2em] text-white/30 hover:text-white/60 transition-colors text-left"
          >
            ← Send another
          </button>
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="font-mono text-[clamp(10px,calc(9.6px+0.16vw),12px)] uppercase tracking-[0.22em] text-white/30">Name</label>
            <input
              type="text" name="from_name" value={fields.from_name}
              onChange={handleChange} required placeholder="Your name"
              className="w-full bg-transparent border border-white/12 px-3 py-2 font-mono text-[clamp(12px,calc(11.4px+0.2vw),14px)] text-white/80 placeholder:text-white/18 focus:outline-none focus:border-white/40 transition-colors"
            />
          </div>
          <div className="space-y-1.5">
            <label className="font-mono text-[clamp(10px,calc(9.6px+0.16vw),12px)] uppercase tracking-[0.22em] text-white/30">Email</label>
            <input
              type="email" name="from_email" value={fields.from_email}
              onChange={handleChange} required placeholder="you@email.com"
              className="w-full bg-transparent border border-white/12 px-3 py-2 font-mono text-[clamp(12px,calc(11.4px+0.2vw),14px)] text-white/80 placeholder:text-white/18 focus:outline-none focus:border-white/40 transition-colors"
            />
          </div>
          <div className="space-y-1.5">
            <label className="font-mono text-[clamp(10px,calc(9.6px+0.16vw),12px)] uppercase tracking-[0.22em] text-white/30">Message</label>
            <textarea
              name="message" value={fields.message}
              onChange={handleChange} required rows={5} placeholder="What's on your mind?"
              className="w-full bg-transparent border border-white/12 px-3 py-2 font-mono text-[clamp(12px,calc(11.4px+0.2vw),14px)] text-white/80 placeholder:text-white/18 focus:outline-none focus:border-white/40 transition-colors resize-none"
            />
          </div>
          {status === 'error' && (
            <p className="font-mono text-[clamp(10px,calc(9.6px+0.16vw),12px)] text-red-400/70 uppercase tracking-wider">Failed to send. Try again.</p>
          )}
          <button
            type="submit" disabled={status === 'sending'}
            className="w-full border border-white/20 hover:border-white/50 py-2.5 font-mono text-[clamp(11px,calc(10.4px+0.2vw),13px)] uppercase tracking-[0.25em] text-white/50 hover:text-white transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none"
          >
            {status === 'sending' ? 'Sending...' : '[ Send Message ]'}
          </button>
        </form>
      )}

      <Separator />

      <div className="space-y-2">
        <div className="font-mono text-[clamp(10px,calc(9.6px+0.16vw),12px)] uppercase tracking-[0.22em] text-white/25 mb-2">Or reach directly</div>
        {[
          { label: 'Email',    value: 'prathampurohitonline@outlook.com' },
          { label: 'GitHub',   value: 'github.com/plutocrate' },
          { label: 'LinkedIn', value: 'linkedin.com/in/prathammpurohit' },
        ].map(({ label, value }) => (
          <div key={label} className="flex items-baseline gap-3">
            <span className="font-mono text-[clamp(10px,calc(9.39px+0.16vw),12px)] text-white/20 w-14 uppercase tracking-wider">{label}</span>
            <span className="font-mono text-[clamp(11px,calc(10.4px+0.2vw),13px)] text-white/50">{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
