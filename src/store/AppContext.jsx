import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { seedCourses, seedStudents } from '../data/seed'

const AppContext = createContext(null)

const STUDENTS_KEY = 'awt.students'
const COURSES_KEY = 'awt.courses'

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function newId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export function AppProvider({ children }) {
  const [students, setStudents] = useState(() => load(STUDENTS_KEY, seedStudents))
  const [courses, setCourses] = useState(() => load(COURSES_KEY, seedCourses))

  useEffect(() => {
    localStorage.setItem(STUDENTS_KEY, JSON.stringify(students))
  }, [students])

  useEffect(() => {
    localStorage.setItem(COURSES_KEY, JSON.stringify(courses))
  }, [courses])

  const value = useMemo(() => {
    const addStudent = (student) =>
      setStudents((prev) => [{ ...student, id: newId() }, ...prev])

    const updateStudent = (id, patch) =>
      setStudents((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...patch } : s)),
      )

    const deleteStudent = (id) =>
      setStudents((prev) => prev.filter((s) => s.id !== id))

    const addCourse = (course) =>
      setCourses((prev) => [{ ...course, id: newId() }, ...prev])

    const deleteCourse = (id) =>
      setCourses((prev) => prev.filter((c) => c.id !== id))

    return {
      students,
      courses,
      addStudent,
      updateStudent,
      deleteStudent,
      addCourse,
      deleteCourse,
    }
  }, [students, courses])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp() must be used inside <AppProvider>')
  return ctx
}
