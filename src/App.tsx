import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import QuizIntroduction from './pages/QuizIntroduction'
import Quiz from './pages/Quiz'
import QuizResult from './pages/QuizResult'
import ProtectedRoute from './route/ProtectedRoute'
import NotFound from './pages/NotFound'
import ProtectedResultRoute from './route/ProtectedResultRoute'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/quizintro" element={<QuizIntroduction />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route element={<ProtectedResultRoute />}>
          <Route path="/quizresult/:id" element={<QuizResult />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
