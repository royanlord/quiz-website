import { create } from 'zustand'

interface QuizAnswer {
    total_questions: number
    questions: string[]
    correct_answers: string[]
    answers: (string | null)[]
    scores: number[]
    quiz_completed: boolean
}

interface DataUser {
    id: number
    name: string
    email: string
    university: string
    course: string
    quiz_answer?: QuizAnswer | null
}

interface DataUserStore {
    userData: DataUser | null
    saveData: (data: DataUser) => void
    deleteData: () => void
    saveQuizAnswer: (data: QuizAnswer) => void
}
  
const useData = create<DataUserStore>((set) => ({
    userData: JSON.parse(localStorage.getItem('userData') || 'null'),
    saveData: (data) => {
        localStorage.setItem('userData', JSON.stringify(data));
        set({ userData: data });
    },
    deleteData: () => {
        localStorage.removeItem('userData');
        set({ userData: null });
    },
    // saveQuizAnswer: (data) => set((state) => {
    //     return {
    //         userData: state.userData ? { ...state.userData, quiz_answer: data } : null
    //     };
    // }),
    saveQuizAnswer: (data) => set((state) => {
        const updatedUserData = state.userData ? { 
            ...state.userData, 
            quiz_answer: state.userData.quiz_answer 
            ? { 
                total_questions: state.userData.quiz_answer.total_questions,
                questions: [...state.userData.quiz_answer.questions, ...data.questions],
                correct_answers: [...state.userData.quiz_answer.correct_answers, ...data.correct_answers],
                answers: [...state.userData.quiz_answer.answers, ...data.answers],
                scores: [...state.userData.quiz_answer.scores, ...data.scores],
                quiz_completed: false
            } : data
        } : null;

        if (updatedUserData) {
            localStorage.setItem('userData', JSON.stringify(updatedUserData));
        }

        return { userData: updatedUserData };
    }),
}))

export default useData