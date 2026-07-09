import OfficeSession from '@/components/prayer/OfficeSession'
import type { OfficeType } from '@/liturgy/office'

interface Props {
  office?: Extract<OfficeType, 'evening' | 'compline'>
}

export default function EveningPrayer({ office = 'evening' }: Props) {
  const title = office === 'compline' ? 'Compline' : 'Evening Prayer'
  return <OfficeSession office={office} title={title} />
}
