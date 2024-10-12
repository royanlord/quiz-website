import { useState } from "react"
import useData from "../stores/DataUserStore"
import { useNavigate } from "react-router-dom"
import { useShallow } from "zustand/shallow"

interface NextButtonProps {
    currentQuiz: number
    setCurrentQuiz: (value: number) => void
    dataQuiz: DataQuiz[]
    selectedAnswer: string | null
    setSelectedAnswer: (value: string | null) => void
    correctAnswer: string
    question: string
}

interface DataQuiz {
    category: string
    correct_answer: string
    difficulty: string
    incorrect_answers: string[]
    question: string
    type: string
}

const NextButton: React.FC<NextButtonProps> = ({ currentQuiz, setCurrentQuiz, dataQuiz, selectedAnswer, setSelectedAnswer, correctAnswer, question }) => {
    const { saveQuizAnswer, userData } = useData(useShallow((state) => ({
        userData: state.userData,
        saveQuizAnswer: state.saveQuizAnswer
    })))

    const [ correctScore ] = useState<number>(20)
    const navigate = useNavigate()

    const handleNextQuiz = (): void => {
        let score = 0;
        if (selectedAnswer === null) {
            score = 0;
        } else if (selectedAnswer === correctAnswer) {
            score = correctScore;
        } else {
            score = 10;
        }

        setSelectedAnswer(null)

        if (currentQuiz < dataQuiz.length - 1) {
            const dataAnswer = {
                total_questions: dataQuiz.length,
                questions: [question],
                correct_answers: [correctAnswer],
                answers: selectedAnswer ? [selectedAnswer] : [null],
                scores: [score],
                quiz_completed: false
            };
    
            saveQuizAnswer(dataAnswer);
            setCurrentQuiz(currentQuiz + 1);
        } else if (currentQuiz === dataQuiz.length - 1) {
            const dataAnswer = {
                total_questions: dataQuiz.length,
                questions: [question],
                correct_answers: [correctAnswer],
                answers: selectedAnswer ? [selectedAnswer] : [null],
                scores: [score],
                quiz_completed: true
            };
    
            saveQuizAnswer(dataAnswer);

            if (userData && userData.quiz_answer) {
                userData.quiz_answer.quiz_completed = true;
                localStorage.setItem('userData', JSON.stringify(userData));
            }
            
            navigate(`/quizresult/${userData?.id}`)
        }
    };

    return (
        <button 
            type="button" 
            className="bg-[#dc213e] text-white py-2 px-4 rounded font-medium hover:bg-[#b90b0b]"
            onClick={handleNextQuiz}
        >
            {currentQuiz === dataQuiz.length - 1 ? 'Submit' : 'Next'}
        </button>
    )
}

export default NextButton