import { useEffect, useState } from 'react'

const EMPTY = {
  code: '',
  name: '',
  credits: 3,
  instructor: '',
  semester: 5,
}

export default function CourseForm({ onSubmit }) {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setErrors({})
  }, [form])

  const setField = (field) => (event) => {
    const value =
      field === 'credits' || field === 'semester'
        ? Number(event.target.value)
        : event.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const next = {}
    if (!form.code.trim()) next.code = 'Course code is required'
    if (!form.name.trim()) next.name = 'Course name is required'
    if (!form.instructor.trim()) next.instructor = 'Instructor is required'
    setErrors(next)
    if (Object.keys(next).length) return

    onSubmit({
      ...form,
      code: form.code.trim(),
      name: form.name.trim(),
      instructor: form.instructor.trim(),
    })
    setForm(EMPTY)
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <h3 className="form__title">Add a course</h3>
      <div className="form__grid">
        <label className="field">
          <span>Course Code</span>
          <input value={form.code} onChange={setField('code')} placeholder="e.g. CSE-505" />
          {errors.code && <small className="field__error">{errors.code}</small>}
        </label>

        <label className="field">
          <span>Course Name</span>
          <input value={form.name} onChange={setField('name')} placeholder="e.g. Machine Learning" />
          {errors.name && <small className="field__error">{errors.name}</small>}
        </label>

        <label className="field">
          <span>Instructor</span>
          <input
            value={form.instructor}
            onChange={setField('instructor')}
            placeholder="e.g. Dr. Meera Shah"
          />
          {errors.instructor && <small className="field__error">{errors.instructor}</small>}
        </label>

        <label className="field">
          <span>Credits</span>
          <input type="number" min="1" max="6" value={form.credits} onChange={setField('credits')} />
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
      </div>

      <div className="form__actions">
        <button type="submit" className="btn btn--primary">
          Add course
        </button>
      </div>
    </form>
  )
}
