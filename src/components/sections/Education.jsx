import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Timeline } from '@/components/ui/Timeline'
import { education } from '@/data/site'

export function Education() {
  return <Section id="background" data-section="education">
    <SectionHeader title="Education & Background" kicker="Always learning"
      note="A foundation in commerce. A career in technology. A continuing focus on artificial intelligence." />
    <Timeline label="Education" items={education} renderItem={item => <>
      <div className="journey-card-top"><span className="journey-badge">{item.status}</span></div>
      <h3 id={`${item.id}-title`} className="journey-title">{item.degree}</h3>
      <p className="journey-organization">{item.school}</p>
      <p className="meta">{item.years}</p>
      <p className="copy">{item.field}</p><p className="copy">{item.note}</p>
    </>} />
  </Section>
}
