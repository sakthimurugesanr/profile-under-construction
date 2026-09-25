import { useState } from 'react'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Panel } from '@/components/ui/Panel'
import { contactFacts, profile } from '@/data/site'

const empty = { name: '', email: '', message: '' }

/**
 * There is no backend here, so the form hands the message to the visitor's
 * mail client rather than pretending to send it. Swap `handleSubmit` for a
 * fetch() when an endpoint exists.
 */
export function Contact() {
  const [values, setValues] = useState(empty)
  const [error, setError] = useState(null)
  const [sent, setSent] = useState(false)

  const update = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    setError(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!values.name.trim() || !values.email.trim() || !values.message.trim()) {
      setError('Fill in your name, email and a message first.')
      return
    }

    const subject = encodeURIComponent(`Portfolio enquiry from ${values.name}`)
    const body = encodeURIComponent(`${values.message}\n\n— ${values.name}\n${values.email}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setSent(true)
    setValues(empty)
  }

  return (
    <Section id="contact" tone="alt" data-section="contact">
      <SectionHeader
        title="Contact Sakthi Murugesan"
        note="Open to React and fullstack roles, and to freelance work I can fit around them."
        data-reveal="fade-up"
      />

      <div className="grid gap-6 lg:grid-cols-12" data-reveal="fade-up">
        <Panel data-reveal className="will-reveal flex flex-col gap-4 lg:col-span-5">
          <dl className="flex flex-col divide-y divide-white/10">
            {contactFacts.map((fact) => (
              <div key={fact.label} className="flex flex-wrap items-baseline justify-between gap-2 py-3 first:pt-0">
                <dt className="meta">{fact.label}</dt>
                <dd className="meta-strong break-all">
                  {fact.href ? (
                    <a className="link-underline" href={fact.href}>
                      {fact.value}
                    </a>
                  ) : (
                    fact.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <div className="flex gap-3">
            <a className="btn btn--ghost flex-1" href={profile.links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="btn btn--ghost flex-1" href={profile.links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </Panel>

        <Panel data-reveal className="will-reveal lg:col-span-7">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="field-label" htmlFor="contact-name">
                  Your name
                </label>
                <input
                  id="contact-name"
                  className="field"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={update('name')}
                  required
                />
              </div>
              <div>
                <label className="field-label" htmlFor="contact-email">
                  Email
                </label>
                <input
                  id="contact-email"
                  className="field"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={update('email')}
                  required
                />
              </div>
            </div>

            <div>
              <label className="field-label" htmlFor="contact-message">
                What do you need built, or which role is it?
              </label>
              <textarea
                id="contact-message"
                className="field field--area"
                rows={5}
                value={values.message}
                onChange={update('message')}
                required
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="meta max-w-xs" role={error ? 'alert' : undefined} aria-live="polite">
                {error
                  ? error
                  : sent
                    ? 'Your mail app should be open with the message ready to send.'
                    : 'This opens your own mail app with the message filled in.'}
              </p>
              <button type="submit" className="btn btn--solid">
                Open in mail app
              </button>
            </div>
          </form>
        </Panel>
      </div>
    </Section>
  )
}
