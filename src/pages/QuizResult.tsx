import { useShallow } from "zustand/shallow"
import ResultBox from "../components/ResultBox"
import useData from "../stores/DataUserStore"
import { useNavigate } from "react-router-dom"

const QuizResult = () => {
    const { userData, deleteData } = useData(useShallow((state) => ({
        userData: state.userData,
        deleteData: state.deleteData
    })))

    const navigate = useNavigate()

    console.log(userData);

    const calculateTotalScore = (scores: number[]): number => {
        return scores.reduce((total, score) => total + score, 0);
    };

    const countCorrectAnswers = (scores: number[]): number => {
        return scores.filter(score => score === 20).length;
    };

    const countIncorrectAnswers = (scores: number[]): number => {
        return scores.filter(score => score === 10 || score === 0 || (userData?.quiz_answer?.total_questions ?? 0) - (userData?.quiz_answer?.answers?.length ?? 0)).length;
    };

    const countQuestionsAnswered = (scores: number[]): number => {
        return scores.filter(score => score === 20 || score === 10).length;
    };

    const totalScore = userData?.quiz_answer ? calculateTotalScore(userData.quiz_answer.scores) : 0;
    const correctAnswers = userData?.quiz_answer ? countCorrectAnswers(userData.quiz_answer.scores) : 0;
    const incorrectAnswers = userData?.quiz_answer ? countIncorrectAnswers(userData.quiz_answer.scores) : 0;
    const questionsAnswered = userData?.quiz_answer ? countQuestionsAnswered(userData.quiz_answer.scores) : 0;

    const handleFinish = () => {
        deleteData();
        localStorage.removeItem('quizState');
        localStorage.removeItem('timeLeft');
        navigate('/');
    }

    return (
        <ResultBox>
            <h1 className="text-3xl font-semibold text-center">
                Result
            </h1>
            <div className="mx-12 mt-5">
                <p className="text-lg text-slate-600 mb-2">
                    Great job completing the Computer Science Quiz, <span className="capitalize">{userData?.name}</span>!
                </p>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                        <span className="text-xl font-medium">Name : </span>
                        <span className="text-xl capitalize">{userData?.name}</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-xl font-medium">University : </span>
                        <span className="text-xl capitalize">{userData?.university}</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-xl font-medium">Major : </span>
                        <span className="text-xl capitalize">{userData?.course}</span>
                    </div>

                    <hr className="bg-[#dc213e] h-[3px] my-3 rounded-lg" />

                    <div className="flex gap-2">
                        <span className="text-xl font-medium">Correct Answers : </span>
                        <span className="text-xl capitalize">{correctAnswers}</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-xl font-medium">Incorrect Answers : </span>
                        <span className="text-xl capitalize">{incorrectAnswers}</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-xl font-medium">Questions Answered : </span>
                        <span className="text-xl">{questionsAnswered} out of {userData?.quiz_answer?.total_questions}</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-xl font-medium">Score : </span>
                        <span className="text-xl capitalize">{totalScore}/100</span>
                    </div>
                </div>
                <div className="mt-7 flex flex-col gap-3">
                    <p className="text-lg italic text-slate-400">
                        Well done on completing this challenging quiz! Keep up the great work and continue exploring the fascinating world of technology!
                    </p>
                    <p className="text-lg italic text-slate-400">
                        Remember, learning is a journey. Whether you aced it or found some questions tricky, each quiz is an opportunity to grow. Keep pushing your boundaries and expanding your knowledge!
                    </p>
                </div>
                <div className="flex justify-center mt-5">
                    <button 
                        type="button" 
                        className="bg-[#dc213e] text-white py-2 px-7 rounded font-medium hover:bg-[#b90b0b]"
                        onClick={handleFinish}
                    >
                        Finish
                    </button>
                </div>
            </div>
        </ResultBox>
    )
}

export default QuizResult