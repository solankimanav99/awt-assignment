import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import StudentDetails from './pages/StudentDetails'
import Courses from './pages/Courses'
import CourseDetails from './pages/CourseDetails'

export default function App() {
  return (
    <div className="layout">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students/:id" element={<StudentDetails />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route
            path="*"
            element={
              <section className="page">
                <p className="empty">Page not found.</p>
              </section>
            }
          />
        </Routes>
      </main>
    </div>
  )
}
