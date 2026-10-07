# College Course & Student Management System

A React application built for the **AWT (Advanced Web Technology)** practical assignment — *Fast Learner* tier. It brings together routing, reusable components, forms, events, arrays, conditional rendering, memoization and responsive styling in one app.

## Tech stack

- **React 18** (functional components + hooks)
- **Vite** (dev server + build)
- **React Router v6** (client-side routing)
- **Plain CSS** (responsive layout, no UI library)

## Getting started

```bash
npm install
npm run dev
```

Open the printed URL (default `http://localhost:5173`).

## Modules

1. **Dashboard** — statistics (total students, total courses, average attendance, eligibility split) computed from arrays.
2. **Student Management** — add, edit, delete, search and filter students by course.
3. **Course Management** — add, delete, search, filter and view course details.
4. **Routing** — `/dashboard`, `/students`, `/students/:id`, `/courses`, `/courses/:id`.
5. **Attendance warning** — conditional rendering: `>= 75%` Eligible, `60–74%` Warning, `< 60%` Detained.
6. **Performance** — `React.memo()` on `StudentCard`, `StudentList` and `CourseList`, plus `useMemo()` for filtering and dashboard stats.
7. **Styling** — responsive layout, navbar, cards, tables, forms, buttons and alerts.

## Routes

| Path | Page |
| --- | --- |
| `/dashboard` | Dashboard |
| `/students` | Student list + form |
| `/students/:id` | Student details |
| `/courses` | Course list + form |
| `/courses/:id` | Course details |

## Project structure

```
src/
├── main.jsx
├── App.jsx
├── components/
│   ├── Navbar.jsx
│   ├── Alert.jsx
│   ├── StatCard.jsx
│   ├── AttendanceBadge.jsx
│   ├── StudentForm.jsx
│   ├── StudentList.jsx
│   ├── StudentCard.jsx
│   ├── CourseForm.jsx
│   └── CourseList.jsx
├── pages/
│   ├── Dashboard.jsx
│   ├── Students.jsx
│   ├── StudentDetails.jsx
│   ├── Courses.jsx
│   └── CourseDetails.jsx
├── data/seed.js
├── utils/attendance.js
├── store/AppContext.jsx
└── styles/main.css
```

## Why memoization?

`StudentCard` and `CourseCard`/`CourseList` re-render on every keystroke of the search box because the parent re-renders. Wrapping them in `React.memo()` means they only re-render when their own props change. `useMemo()` keeps the filtered lists and dashboard statistics from being recomputed on unrelated state updates. This keeps typing in the search field smooth even with a long list.

## Notes

- State is persisted to `localStorage`, so added/edited data survives a refresh.
- If you host the static build somewhere without a rewrite rule, switch `BrowserRouter` to `HashRouter` in `src/main.jsx` so deep links keep working.

## License

MIT
