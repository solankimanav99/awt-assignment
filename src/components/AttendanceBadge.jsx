import { attendanceStatus } from '../utils/attendance'

// Conditional rendering: the tone (and therefore the colour + label)
// depends on the attendance value.
export default function AttendanceBadge({ value }) {
  const { label, tone } = attendanceStatus(value)
  return (
    <span className={`badge badge--${tone}`} title={`${value}% attendance`}>
      {label} · {value}%
    </span>
  )
}
