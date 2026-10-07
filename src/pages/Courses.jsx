import { useMemo, useState } from 'react'
import { useApp } from '../store/AppContext'
import CourseForm from '../components/CourseForm'
import CourseList from '../components/CourseList'
import Alert from '../components/Alert'

export default function Courses() {
  const { courses, students, addCourse, deleteCourse } = useApp()
  const [query, setQuery] = useState('')
  const [semesterFilter, setSemesterFilter] = useState('all')
  const [notice, setNotice] = useState('')

  const studentCounts = useMemo(() => {
    return students.reduce((acc, student) => {
      acc[student.course] = (acc[student.course] || 0) + 1
      return acc
    }, {})
  }, [students])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return courses.filter((course) => {
      const matchesQuery =
        !q ||
        course.name.toLowerCase().includes(q) ||
        course.code.toLowerCase().includes(q) ||
        course.instructor.toLowerCase().includes(q)
      const matchesSemester =
        semesterFilter === 'all' || String(course.semester) === semesterFilter
      return matchesQuery && matchesSemester
    })
  }, [courses, query, semesterFilter])

  const handleAdd = (data) => {
    addCourse(data)
    setNotice(`${data.name} added.`)
  }

  const handleDelete = (id) => {
    const course = courses.find((c) => c.id === id)
    deleteCourse(id)
    setNotice(course ? `${course.name} deleted.` : 'Course deleted.')
  }

  return (
    <section className="page">
      <header className="page__head">
        <h2>Course Management</h2>
        <p className="page__sub">
          Add, delete, search and filter courses, and open a course for details.
        </p>
      </header>

      <Alert type="success" onClose={() => setNotice('')}>
        {notice}
      </Alert>

      <CourseForm onSubmit={handleAdd} />

      <div className="toolbar">
        <input
          className="toolbar__search"
          type="search"
          placeholder="Search by name, code or instructor"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Search courses"
        />
        <select
          className="toolbar__select"
          value={semesterFilter}
          onChange={(event) => setSemesterFilter(event.target.value)}
          aria-label="Filter by semester"
        >
          <option value="all">All semesters</option>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
            <option key={sem} value={sem}>
              Semester {sem}
            </option>
          ))}
        </select>
        <span className="toolbar__count">{filtered.length} shown</span>
      </div>

      <CourseList
        courses={filtered}
        studentCounts={studentCounts}
        onDelete={handleDelete}
      />
    </section>
  )
}
