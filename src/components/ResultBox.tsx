import { ReactNode } from "react";

interface ResultBoxProps {
    children: ReactNode;
}

const ResultBox: React.FC<ResultBoxProps> = ({ children }) => {
    return (
        <div className="lg:w-5/12 w-10/12 bg-white mx-auto rounded-md mt-12 mb-12 p-4">
            { children }
        </div>
    )
}

export default ResultBox