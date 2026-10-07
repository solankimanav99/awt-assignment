import { Link, useParams } from 'react-router-dom'
import { useApp } from '../store/AppContext'
import AttendanceBadge from '../components/AttendanceBadge'

export default function CourseDetails() {
  const { id } = useParams()
  const { courses, students } = useApp()
  const course = courses.find((c) => c.id === id)

  if (!course) {
    return (
      <section className="page">
        <p className="empty">Course not found.</p>
        <Link className="btn btn--ghost" to="/courses">
          Back to courses
        </Link>
      </section>
    )
  }

  const enrolled = students.filter((student) => student.course === course.name)

  return (
    <section className="page">
      <Link className="back-link" to="/courses">
        &larr; Back to courses
      </Link>

      <header className="page__head">
        <h2>{course.name}</h2>
        <p className="page__sub">
          {course.code} · {course.credits} credits · Semester {course.semester}
        </p>
      </header>

      <div className="detail-card">
        <h3>Course information</h3>
        <dl className="detail-list">
          <div><dt>Code</dt><dd>{course.code}</dd></div>
          <div><dt>Instructor</dt><dd>{course.instructor}</dd></div>
          <div><dt>Credits</dt><dd>{course.credits}</dd></div>
          <div><dt>Enrolled</dt><dd>{enrolled.length}</dd></div>
        </dl>
      </div>

      <h3 className="section-title">Enrolled students</h3>
      {enrolled.length === 0 ? (
        <p className="empty">No students are enrolled in this course yet.</p>
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Enrollment</th>
                <th>Name</th>
                <th>Semester</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {enrolled.map((student) => (
                <tr key={student.id}>
                  <td>{student.enrollmentNo}</td>
                  <td>
                    <Link to={`/students/${student.id}`}>{student.name}</Link>
                  </td>
                  <td>{student.semester}</td>
                  <td>
                    <AttendanceBadge value={student.attendance} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
