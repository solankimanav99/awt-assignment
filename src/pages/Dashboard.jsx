import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../store/AppContext'
import StatCard from '../components/StatCard'
import AttendanceBadge from '../components/AttendanceBadge'
import { averageAttendance, attendanceStatus } from '../utils/attendance'

export default function Dashboard() {
  const { students, courses } = useApp()

  // Statistics generated from the arrays with useMemo so they are only
  // recomputed when the underlying data changes.
  const stats = useMemo(() => {
    const eligible = students.filter((s) => attendanceStatus(s.attendance).tone === 'success').length
    const warning = students.filter((s) => attendanceStatus(s.attendance).tone === 'warning').length
    const detained = students.filter((s) => attendanceStatus(s.attendance).tone === 'danger').length
    return {
      students: students.length,
      courses: courses.length,
      average: averageAttendance(students),
      eligible,
      warning,
      detained,
    }
  }, [students, courses])

  return (
    <section className="page">
      <header className="page__head">
        <h2>Dashboard</h2>
        <p className="page__sub">An overview of students, courses and attendance.</p>
      </header>

      <div className="stat-grid">
        <StatCard label="Total students" value={stats.students} hint="across all courses" />
        <StatCard label="Total courses" value={stats.courses} hint="offered this semester" />
        <StatCard label="Average attendance" value={`${stats.average}%`} hint="all students" />
        <StatCard
          label="Eligible / Warning / Detained"
          value={`${stats.eligible} / ${stats.warning} / ${stats.detained}`}
          hint="attendance split"
        />
      </div>

      <h3 className="section-title">Student attendance overview</h3>
      {students.length === 0 ? (
        <p className="empty">No students yet. Add one from the Students page.</p>
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Enrollment</th>
                <th>Name</th>
                <th>Course</th>
                <th>Semester</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.enrollmentNo}</td>
                  <td>
                    <Link to={`/students/${student.id}`}>{student.name}</Link>
                  </td>
                  <td>{student.course}</td>
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
