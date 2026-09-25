import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Timeline } from '@/components/ui/Timeline'
import { TagList } from '@/components/ui/Tag'
import { experience } from '@/data/site'

const roles = [...experience].reverse().map((role, index) => ({
  ...role,
  id: ['career-access', 'career-asglobal', 'career-cannyfore'][index],
  year: ['2022', 'Mar 2024', 'Sep 2024'][index],
  endYear: ['Jan 2024', 'Jun 2024', 'Present'][index],
  railLabel: ['Access Healthcare', 'ASGlobalSoftTech', 'Cannyfore'][index],
}))

export function Experience() {
  return <Section id="work" data-section="experience">
    <SectionHeader title="Professional Experience" kicker="The journey so far"
      note="From client partnerships to full-stack development. Explore the roles that shaped my work." />
    <Timeline stickyDates label="Experience" items={roles} renderItem={role => <>
      <div className="journey-card-top"><span className="journey-badge">{role.type}</span>
        {role.current && <span className="journey-status">Current role</span>}</div>
      <h3 id={`${role.id}-title`} className="journey-title">{role.title}</h3>
      <p className="journey-organization">{role.company}</p>
      <p className="meta">{role.period} · {role.duration}</p><p className="copy text-sm">{role.place}</p>
      <p className="copy">{role.summary}</p>
      <ul className="journey-details">{role.points.map(point => <li key={point}>{point}</li>)}</ul>
      <TagList items={role.tags} />
    </>} />
  </Section>
}
