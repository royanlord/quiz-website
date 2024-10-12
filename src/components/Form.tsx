import { useState } from "react"
import useData from "../stores/DataUserStore"
import { useNavigate } from "react-router-dom"

interface DataUser {
    id: number
    name: string
    email: string
    university: string
    course: string
}

const Form = () => {
    const [dataUser, setDataUser] = useState<DataUser>({
        id: Math.floor(Math.random() * 1000000) + Date.now(),
        name: '',
        email: '',
        university: '',
        course: '',
    })

    const navigate = useNavigate()

    const saveData = useData((state) => state.saveData)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (dataUser.name === '' || dataUser.email === '' || dataUser.university === '' || dataUser.course === '') {
            alert('There must be no empty data!')
            return
        }

        saveData(dataUser)
        navigate('/quizintro')
    }

    return (
        <form className="lg:mx-36 mx-3" onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-2 grid-cols-1 mb-5 gap-5">
                <div className="col-span-1">
                    <label htmlFor="name" className="text-[#dc213e] font-medium text-lg label">
                        Name
                    </label>
                    <input 
                        type="text" 
                        placeholder="Enter name here" 
                        className="text-black py-2 mt-2 ps-3 rounded border border-slate-300 focus:outline-none focus:border-[#dc213e] focus:ring-1 focus:ring-[#dc213e] bg-white w-full" 
                        name="name" 
                        id="name"
                        onChange={(e) => setDataUser({ ...dataUser, name: e.target.value })}
                    />
                </div>
                <div className="col-span-1">
                    <label htmlFor="email" className="text-[#dc213e] font-medium text-lg label">
                        Email
                    </label>
                    <input 
                        type="email" 
                        placeholder="Enter email here with @" 
                        className="py-2 mt-2 ps-3 rounded border border-slate-300 focus:outline-none focus:border-[#dc213e] focus:ring-1 focus:ring-[#dc213e] bg-white w-full" 
                        name="email" 
                        id="email"
                        onChange={(e) => setDataUser({ ...dataUser, email: e.target.value })}
                    />
                </div>
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 mb-5 gap-5">
                <div className="col-span-1">
                    <label htmlFor="university" className="text-[#dc213e] font-medium text-lg label">
                        University
                    </label>
                    <input 
                        type="text" 
                        placeholder="Enter university here" 
                        className="py-2 mt-2 ps-3 rounded border border-slate-300 focus:outline-none focus:border-[#dc213e] focus:ring-1 focus:ring-[#dc213e] bg-white w-full" 
                        name="university" 
                        id="university"
                        onChange={(e) => setDataUser({ ...dataUser, university: e.target.value })}
                    />
                </div>
                <div className="col-span-1">
                    <label htmlFor="course" className="text-[#dc213e] font-medium text-lg label">
                        Major
                    </label>
                    <input 
                        type="text" 
                        placeholder="Enter major here" 
                        className="py-2 mt-2 ps-3 rounded border border-slate-300 focus:outline-none focus:border-[#dc213e] focus:ring-1 focus:ring-[#dc213e] bg-white w-full" 
                        name="course" 
                        id="course"
                        onChange={(e) => setDataUser({ ...dataUser, course: e.target.value })}
                    />
                </div>
            </div>
            <div className="mx-36 flex justify-center">
                <button type="submit" className="bg-[#dc213e] text-white py-2 px-7 rounded font-medium hover:bg-[#b90b0b]">
                    Login
                </button>
            </div>
        </form>
    )
}

export default Form