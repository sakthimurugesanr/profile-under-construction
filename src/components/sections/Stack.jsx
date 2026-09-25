import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Panel } from '@/components/ui/Panel'
import { Tag } from '@/components/ui/Tag'
import { stack } from '@/data/site'
import { useHoverTilt } from '@/hooks/useHoverTilt'

function StackCard({ group, index }) {
  const tiltRef = useHoverTilt({ max: 8, scale: 1.02 })

  return (
    <Panel 
      ref={tiltRef}
      data-reveal 
      interactive 
      className="will-reveal flex h-full flex-col justify-between gap-6"
      style={{ 
        transitionDelay: `${index * 0.1}s`,
      }}
    >
      <div className="flex flex-col gap-4">
        <h3 className="subheading">{group.title}</h3>
        <p className="copy text-sm">{group.note}</p>
        <ul className="flex flex-wrap gap-2">
          {group.items.map((item, i) => (
            <Tag 
              key={item}
              style={{
                animation: `fadeInUp 0.5s ease-out ${0.3 + i * 0.05}s both`
              }}
            >
              {item}
            </Tag>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-between border-t border-line pt-4">
        <span className="meta">{group.footer.label}</span>
        <span className="meta-strong">{group.footer.value}</span>
      </div>
    </Panel>
  )
}

export function Stack() {
  return (
    <Section id="stack" tone="alt" className="!py-16 md:!py-20 lg:!py-24" data-section="stack">
      <SectionHeader
        title="AI & Full-Stack Development Skills"
        note="Tools I use regularly, grouped by where they sit in an application."
        data-reveal="fade-up"
      />
      <div className="grid gap-6 md:grid-cols-2" data-reveal="fade-up">
        {stack.map((group, index) => (
          <StackCard key={group.title} group={group} index={index} />
        ))}
      </div>
    </Section>
  )
}
