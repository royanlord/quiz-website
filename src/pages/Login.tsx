import ContainerBox from "../components/ContainerBox"
import Form from "../components/Form"


const Login = () => {
    return (
        <>
            <ContainerBox>
                <div className="my-3">
                    <h1 className="text-lg text-center text-[#dc213e] font-semibold">Welcome To</h1>
                    <h2 className="text-5xl text-center text-[#dc213e] font-bold">
                        TriviaNesia
                    </h2>
                </div>
            </ContainerBox>
            <ContainerBox>
                <h1 className="text-4xl text-center text-[#dc213e] font-semibold">LOGIN</h1>
                <div className="mt-10">
                    <Form />
                </div>
            </ContainerBox>
        </>
    )
}

export default Login