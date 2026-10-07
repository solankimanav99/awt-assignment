import { memo } from 'react'
import { Link } from 'react-router-dom'

// React.memo so the course grid does not re-render while the user types
// in the (unrelated) student search box elsewhere in the app.
function CourseList({ courses, studentCounts, onDelete }) {
  if (!courses.length) {
    return <p className="empty">No courses match the current search / filter.</p>
  }

  return (
    <div className="course-grid">
      {courses.map((course) => (
        <article className="course-card" key={course.id}>
          <header className="course-card__head">
            <span className="course-card__code">{course.code}</span>
            <span className="course-card__credits">{course.credits} cr</span>
          </header>
          <Link className="course-card__name" to={`/courses/${course.id}`}>
            {course.name}
          </Link>
          <p className="course-card__meta">
            {course.instructor} · Semester {course.semester}
          </p>
          <p className="course-card__count">
            {studentCounts?.[course.name] ?? 0} enrolled
          </p>
          <div className="course-card__actions">
            <Link className="btn btn--small btn--ghost" to={`/courses/${course.id}`}>
              Details
            </Link>
            <button
              type="button"
              className="btn btn--small btn--danger"
              onClick={() => onDelete(course.id)}
            >
              Delete
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}

export default memo(CourseList)
