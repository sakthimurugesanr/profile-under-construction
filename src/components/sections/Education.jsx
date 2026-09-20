import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Panel } from '@/components/ui/Panel'
import { education } from '@/data/site'

export function Education() {
  return (
    <Section id="background">
      <SectionHeader title="How I got here" data-reveal="fade-up" />
      <div className="grid gap-6 lg:grid-cols-12" data-reveal="fade-up">
        <Panel data-reveal className="will-reveal flex flex-col gap-6 lg:col-span-7">
          <div>
            <h3 className="heading text-2xl sm:text-3xl">{education.degree}</h3>
            <p className="meta-strong mt-2">{education.school}</p>
            <p className="meta mt-1">
              {education.field} · {education.years}
            </p>
          </div>
          <p className="copy">{education.note}</p>
        </Panel>

        <Panel data-reveal className="will-reveal flex flex-col gap-5 lg:col-span-5">
          <h3 className="subheading">What that background gives me</h3>
          <ul className="flex flex-col divide-y divide-white/10">
            {education.strengths.map((item) => (
              <li key={item} className="py-3 text-sm text-chalk-muted first:pt-0 last:pb-0">
                {item}
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </Section>
  )
}
