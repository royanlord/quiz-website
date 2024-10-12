import { useEffect, useState } from "react";
import { IoMdStopwatch } from "react-icons/io"
import { useNavigate } from "react-router-dom";
import useData from "../stores/DataUserStore";

interface TimerProps {
    selectedAnswer: string | null
    correctAnswer: string
    question: string
    total_questions: number
}

const Timer = ({ selectedAnswer, correctAnswer, question, total_questions }: TimerProps) => {
    const [timeLeft, setTimeLeft] = useState<number>(() => {
        const savedTimeLeft = localStorage.getItem('timeLeft');
        return savedTimeLeft ? JSON.parse(savedTimeLeft) : 300;
    });
    const [ correctScore ] = useState<number>(20)
    const navigate = useNavigate()
    const userId = useData((state) => state.userData?.id);
    const [timerEnded, setTimerEnded] = useState<boolean>(false);

    const saveQuizAnswer = useData((state) => state.saveQuizAnswer)

    useEffect(() => {
        const timerInterval = setInterval(() => {
            setTimeLeft(prevTime => {
                const newTime = prevTime > 0 ? prevTime - 1 : 0;
                localStorage.setItem('timeLeft', JSON.stringify(newTime));
                return newTime;
            });
        }, 1000);

        return () => clearInterval(timerInterval);
    }, []);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    useEffect(() => {
        if (timeLeft === 0 && !timerEnded) {
            setTimerEnded(true);
            let score = 0;
            if (selectedAnswer === null) {
                score = 0;
            } else if (selectedAnswer === correctAnswer) {
                score = correctScore;
            } else {
                score = 10;
            }

            const dataAnswer = {
                total_questions: total_questions,
                questions: [question],
                correct_answers: [correctAnswer],
                answers: selectedAnswer ? [selectedAnswer] : [null],
                scores: [score],
                quiz_completed: true
            };

            saveQuizAnswer(dataAnswer);
            alert("Time has run out!");
            navigate(`/quizresult/${userId}`);
        }
    }, [timeLeft, timerEnded, selectedAnswer, correctAnswer, correctScore, saveQuizAnswer, navigate, userId]);

    return (
        <div className="text-lg flex gap-1 items-center">
            <IoMdStopwatch className="text-2xl text-green-400" /> 
            <span>
                {formatTime(timeLeft)}
            </span>
        </div>
    )
}

export default Timer