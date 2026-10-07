import { memo } from 'react'
import { Link } from 'react-router-dom'
import AttendanceBadge from './AttendanceBadge'

// Wrapped in React.memo: the list re-renders on every keystroke of the
// search box, but each card only re-renders when its own `student` changes.
function StudentCard({ student, onDelete, onEdit }) {
  return (
    <article className="student-card">
      <div className="student-card__main">
        <Link className="student-card__name" to={`/students/${student.id}`}>
          {student.name}
        </Link>
        <p className="student-card__meta">
          #{student.enrollmentNo} · {student.course} · Sem {student.semester}
        </p>
        <AttendanceBadge value={student.attendance} />
      </div>
      <div className="student-card__actions">
        <Link className="btn btn--small btn--ghost" to={`/students/${student.id}`}>
          View
        </Link>
        <button
          type="button"
          className="btn btn--small btn--ghost"
          onClick={() => onEdit(student)}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn--small btn--danger"
          onClick={() => onDelete(student.id)}
        >
          Delete
        </button>
      </div>
    </article>
  )
}

export default memo(StudentCard)
