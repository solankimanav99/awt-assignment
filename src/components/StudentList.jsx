import { memo } from 'react'
import StudentCard from './StudentCard'

function StudentList({ students, onDelete, onEdit }) {
  if (!students.length) {
    return <p className="empty">No students match the current search / filter.</p>
  }

  return (
    <div className="student-list">
      {students.map((student) => (
        <StudentCard
          key={student.id}
          student={student}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}

export default memo(StudentList)
