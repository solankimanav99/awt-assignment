import { Link, useParams } from 'react-router-dom'
import { useApp } from '../store/AppContext'
import AttendanceBadge from '../components/AttendanceBadge'
import { attendanceStatus } from '../utils/attendance'

export default function StudentDetails() {
  const { id } = useParams()
  const { students } = useApp()
  const student = students.find((s) => s.id === id)

  if (!student) {
    return (
      <section className="page">
        <p className="empty">Student not found.</p>
        <Link className="btn btn--ghost" to="/students">
          Back to students
        </Link>
      </section>
    )
  }

  const status = attendanceStatus(student.attendance)

  return (
    <section className="page">
      <Link className="back-link" to="/students">
        &larr; Back to students
      </Link>

      <header className="page__head">
        <h2>{student.name}</h2>
        <p className="page__sub">Enrollment #{student.enrollmentNo}</p>
      </header>

      <div className="detail-grid">
        <div className="detail-card">
          <h3>Profile</h3>
          <dl className="detail-list">
            <div><dt>Email</dt><dd>{student.email}</dd></div>
            <div><dt>Course</dt><dd>{student.course}</dd></div>
            <div><dt>Semester</dt><dd>{student.semester}</dd></div>
            <div><dt>Gender</dt><dd>{student.gender}</dd></div>
            <div><dt>Attendance</dt><dd>{student.attendance}%</dd></div>
          </dl>
        </div>

        <div className="detail-card">
          <h3>Attendance status</h3>
          <AttendanceBadge value={student.attendance} />
          <p className="detail-note">
            {status.tone === 'success' &&
              'Attendance is 75% or above — the student is eligible.'}
            {status.tone === 'warning' &&
              'Attendance is below 75% but at least 60% — a warning applies.'}
            {status.tone === 'danger' &&
              'Attendance is below 60% — the student is detained.'}
          </p>
        </div>
      </div>
    </section>
  )
}
