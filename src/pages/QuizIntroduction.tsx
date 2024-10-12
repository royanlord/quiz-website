import { IoBookOutline } from "react-icons/io5"
import CardBox from "../components/CardBox"
import { IoMdStopwatch } from "react-icons/io"
import { MdOutlineSignalCellularAlt } from "react-icons/md"
import { PiMedal } from "react-icons/pi"
import { useNavigate } from "react-router-dom"

const QuizIntroduction = () => {
    const navigate = useNavigate()
    const startQuiz = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const confirm = window.confirm('Are you sure you want to start the quiz?')
        if (confirm) {
            navigate('/quiz')
        }
    }

    return (
        <CardBox>
            <h1 className="text-3xl text-center text-[#dc213e] font-semibold">Science Computers Quiz</h1>
            <div className="mx-8 mt-6">
                <div className="flex gap-2 items-center mb-4">
                    <IoBookOutline className="text-2xl text-blue-400" />
                    <p className="text-lg">5 Multiple Choice Questions</p>
                </div>
                <div className="flex gap-2 items-center mb-4">
                    <IoMdStopwatch className="text-2xl text-green-400" />
                    <p className="text-lg">Time: 5 minutes</p>
                </div>
                <div className="flex gap-2 items-center mb-4">
                    <MdOutlineSignalCellularAlt className="text-2xl text-yellow-400" />
                    <p className="text-lg">Difficulty: Easy</p>
                </div>
                <div className="flex gap-2 items-center mb-4">
                    <PiMedal className="text-2xl text-red-400" />
                    <p className="text-lg">Topic: Science Computers</p>
                </div>
                <p className="text-base mb-5 text-justify">
                    This quiz is designed to test your understanding of basic computer science knowledge. Suitable for beginning students or individuals who are just starting to learn computer science.
                </p>
                <div className="flex justify-center">
                    <button 
                        type="button" 
                        className="bg-[#dc213e] text-white py-2 rounded font-medium hover:bg-[#b90b0b] w-2/5"
                        onClick={startQuiz}
                    >
                        Start Quiz
                    </button>
                </div>
            </div>
        </CardBox>
    )
}

export default QuizIntroduction