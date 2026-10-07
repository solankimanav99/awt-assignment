// Attendance rules from the assignment:
//   >= 75%  -> Eligible
//   < 75%   -> Warning
//   < 60%   -> Detained
// (60-74 falls in the "Warning" band.)

export function attendanceStatus(value) {
  const attendance = Number(value) || 0
  if (attendance >= 75) return { label: 'Eligible', tone: 'success' }
  if (attendance >= 60) return { label: 'Warning', tone: 'warning' }
  return { label: 'Detained', tone: 'danger' }
}

export function averageAttendance(students) {
  if (!students.length) return 0
  const total = students.reduce((sum, s) => sum + (Number(s.attendance) || 0), 0)
  return Math.round((total / students.length) * 10) / 10
}
