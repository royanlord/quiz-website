import ContainerBox from "../components/ContainerBox"
import Form from "../components/Form"


const Login = () => {
    return (
        <ContainerBox>
            <h1 className="text-4xl text-center text-[#dc213e] font-semibold">LOGIN</h1>
            <div className="mt-10">
                <Form />
            </div>
        </ContainerBox>
    )
}

export default Login