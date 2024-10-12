import { Navigate, Outlet } from "react-router-dom";

const ProtectedResultRoute = () => {
    const dataUser = JSON.parse(localStorage.getItem('userData') || 'null');

    if (dataUser && dataUser.id) {
        if (dataUser.quiz_answer && dataUser.quiz_answer.quiz_completed) {
            return <Outlet />
        } else {
            return <Navigate to="/quiz" />;
        }
    } else {
        return <Navigate to="/" />;
    }
}

export default ProtectedResultRoute