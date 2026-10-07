import { useMemo, useState } from 'react'
import { useApp } from '../store/AppContext'
import StudentForm from '../components/StudentForm'
import StudentList from '../components/StudentList'
import Alert from '../components/Alert'

export default function Students() {
  const { students, courses, addStudent, updateStudent, deleteStudent } = useApp()
  const [query, setQuery] = useState('')
  const [courseFilter, setCourseFilter] = useState('all')
  const [editing, setEditing] = useState(null)
  const [notice, setNotice] = useState('')

  // useMemo: only re-filter when the data or the search/filter changes,
  // not on every unrelated re-render.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return students.filter((student) => {
      const matchesQuery =
        !q ||
        student.name.toLowerCase().includes(q) ||
        student.enrollmentNo.toLowerCase().includes(q) ||
        student.email.toLowerCase().includes(q)
      const matchesCourse = courseFilter === 'all' || student.course === courseFilter
      return matchesQuery && matchesCourse
    })
  }, [students, query, courseFilter])

  const handleSubmit = (data) => {
    if (editing) {
      updateStudent(editing.id, data)
      setNotice(`${data.name} updated.`)
      setEditing(null)
    } else {
      addStudent(data)
      setNotice(`${data.name} added.`)
    }
  }

  const handleDelete = (id) => {
    const student = students.find((s) => s.id === id)
    deleteStudent(id)
    if (editing?.id === id) setEditing(null)
    setNotice(student ? `${student.name} deleted.` : 'Student deleted.')
  }

  return (
    <section className="page">
      <header className="page__head">
        <h2>Student Management</h2>
        <p className="page__sub">
          Add, edit, delete, search and filter students by course.
        </p>
      </header>

      <Alert type="success" onClose={() => setNotice('')}>
        {notice}
      </Alert>

      <StudentForm
        initial={editing}
        courses={courses}
        onSubmit={handleSubmit}
        onCancel={() => setEditing(null)}
      />

      <div className="toolbar">
        <input
          className="toolbar__search"
          type="search"
          placeholder="Search by name, enrollment no. or email"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Search students"
        />
        <select
          className="toolbar__select"
          value={courseFilter}
          onChange={(event) => setCourseFilter(event.target.value)}
          aria-label="Filter by course"
        >
          <option value="all">All courses</option>
          {courses.map((course) => (
            <option key={course.id} value={course.name}>
              {course.name}
            </option>
          ))}
        </select>
        <span className="toolbar__count">{filtered.length} shown</span>
      </div>

      <StudentList
        students={filtered}
        onDelete={handleDelete}
        onEdit={setEditing}
      />
    </section>
  )
}
