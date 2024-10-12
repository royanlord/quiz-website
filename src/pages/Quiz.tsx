import ContainerBox from "../components/ContainerBox"
import { useEffect, useState } from "react"
import Timer from "../components/Timer"
import NextButton from "../components/NextButton"
import useData from "../stores/DataUserStore"

interface DataQuiz {
    category: string
    correct_answer: string
    difficulty: string
    incorrect_answers: string[]
    question: string
    type: string
}

interface Quiz {
    response_code: number
    results: DataQuiz[]
}

const Quiz = () => {
    const [dataQuiz, setDataQuiz] = useState<DataQuiz[]>([])
    const [currentQuiz, setCurrentQuiz] = useState<number>(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
    const [timer, setTimer] = useState<number>(0);

    const userData = useData((state) => state.userData)
    console.log(userData);

    const getQuiz = async () => {
        try {
            const response = await fetch('https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple', {
                method: 'GET'
            })

            const data: Quiz = await response.json()
            setDataQuiz(data?.results)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const savedQuizState = localStorage.getItem('quizState');
        if (savedQuizState) {
            const { dataQuiz, currentQuiz, selectedAnswer, timer } = JSON.parse(savedQuizState);
            setDataQuiz(dataQuiz);
            setCurrentQuiz(currentQuiz);
            setSelectedAnswer(selectedAnswer);
            setTimer(timer);
        } else {
            getQuiz();
        }
    }, []);

    console.log(dataQuiz);

    useEffect(() => {
        if (dataQuiz[currentQuiz]) {
            const combinedAnswers = [...dataQuiz[currentQuiz].incorrect_answers, dataQuiz[currentQuiz].correct_answer];
            setShuffledAnswers(shuffleArray(combinedAnswers));
        }
    }, [currentQuiz, dataQuiz]);

    useEffect(() => {
        const quizState = {
            dataQuiz,
            currentQuiz,
            selectedAnswer,
            timer
        };
        localStorage.setItem('quizState', JSON.stringify(quizState));
    }, [dataQuiz, currentQuiz, selectedAnswer, timer]);

    const shuffleArray = (array: string[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    // const combinedAnswers = dataQuiz[currentQuiz]
    //     ? shuffleArray([...dataQuiz[currentQuiz].incorrect_answers, dataQuiz[currentQuiz].correct_answer])
    //     : [];

    const handleChooseAnswer = (answer: string) => {
        // console.log(answer);
        setSelectedAnswer(answer);
    }
    
    return (
        <ContainerBox>
            <h1 className="text-center text-3xl font-semibold">
                Quiz              
            </h1>
            <hr className="bg-[#dc213e] h-[2px] mt-2 mb-4" />
            <div>
                <div className="flex justify-between">
                    <h3>
                        <span className="text-2xl font-medium block">
                            Question {currentQuiz + 1}
                        </span>
                        <span className="text-lg font-medium text-slate-400">
                            Of {dataQuiz.length}
                        </span>
                    </h3>
                    <Timer 
                        selectedAnswer={selectedAnswer} 
                        correctAnswer={dataQuiz[currentQuiz]?.correct_answer}
                        question={dataQuiz[currentQuiz]?.question} 
                        total_questions={dataQuiz.length}
                    />
                </div>
                <div className="mt-3 w-6/12">
                    <h4 className="text-lg">
                        {dataQuiz[currentQuiz]?.question}
                    </h4>
                    <div className="mt-2 flex flex-col gap-3">
                        {shuffledAnswers.map((answer, index) => (
                            <div 
                                key={index} 
                                className={`flex gap-2 text-lg border-2 border-[#dc213e] rounded-md py-2 px-4 cursor-pointer hover:bg-[#dc213e] hover:text-white ${selectedAnswer === answer ? 'bg-[#dc213e] text-white' : ''}`}
                                onClick={() => handleChooseAnswer(answer)}
                            >
                                <span>{String.fromCharCode(65 + index)}.</span>
                                <span>{answer}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end mt-5">
                        <NextButton 
                            currentQuiz={currentQuiz} 
                            setCurrentQuiz={setCurrentQuiz} 
                            dataQuiz={dataQuiz} 
                            selectedAnswer={selectedAnswer}
                            setSelectedAnswer={setSelectedAnswer}
                            correctAnswer={dataQuiz[currentQuiz]?.correct_answer}
                            question={dataQuiz[currentQuiz]?.question}
                        />
                    </div>
                </div>
            </div>
        </ContainerBox>
    )
}

export default Quiz