import { useEffect, useState } from 'react'

const EMPTY = {
  name: '',
  enrollmentNo: '',
  email: '',
  course: '',
  semester: 5,
  gender: 'Female',
  attendance: 75,
}

export default function StudentForm({ initial, courses, onSubmit, onCancel }) {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setForm(initial ? { ...EMPTY, ...initial } : EMPTY)
    setErrors({})
  }, [initial])

  const setField = (field) => (event) => {
    const value =
      field === 'semester' || field === 'attendance'
        ? Number(event.target.value)
        : event.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Name is required'
    if (!form.enrollmentNo.trim()) next.enrollmentNo = 'Enrollment number is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Valid email is required'
    if (!form.course) next.course = 'Select a course'
    if (form.attendance < 0 || form.attendance > 100) next.attendance = '0-100 only'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!validate()) return
    onSubmit({
      ...form,
      name: form.name.trim(),
      enrollmentNo: form.enrollmentNo.trim(),
      email: form.email.trim(),
    })
    if (!initial) setForm(EMPTY)
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <h3 className="form__title">
        {initial ? `Edit student · ${initial.name}` : 'Add a student'}
      </h3>

      <div className="form__grid">
        <label className="field">
          <span>Student Name</span>
          <input value={form.name} onChange={setField('name')} placeholder="e.g. Shaily Patel" />
          {errors.name && <small className="field__error">{errors.name}</small>}
        </label>

        <label className="field">
          <span>Enrollment Number</span>
          <input value={form.enrollmentNo} onChange={setField('enrollmentNo')} placeholder="e.g. 101" />
          {errors.enrollmentNo && <small className="field__error">{errors.enrollmentNo}</small>}
        </label>

        <label className="field">
          <span>Email</span>
          <input value={form.email} onChange={setField('email')} placeholder="name@gsfc.edu" />
          {errors.email && <small className="field__error">{errors.email}</small>}
        </label>

        <label className="field">
          <span>Course</span>
          <select value={form.course} onChange={setField('course')}>
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.name}>
                {course.name}
              </option>
            ))}
          </select>
          {errors.course && <small className="field__error">{errors.course}</small>}
        </label>

        <label className="field">
          <span>Semester</span>
          <select value={form.semester} onChange={setField('semester')}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
              <option key={sem} value={sem}>
                {sem}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Gender</span>
          <select value={form.gender} onChange={setField('gender')}>
            <option>Female</option>
            <option>Male</option>
            <option>Other</option>
          </select>
        </label>

        <label className="field">
          <span>Attendance (%)</span>
          <input
            type="number"
            min="0"
            max="100"
            value={form.attendance}
            onChange={setField('attendance')}
          />
          {errors.attendance && <small className="field__error">{errors.attendance}</small>}
        </label>
      </div>

      <div className="form__actions">
        <button type="submit" className="btn btn--primary">
          {initial ? 'Update student' : 'Add student'}
        </button>
        {initial && (
          <button type="button" className="btn btn--ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
