import { ReactNode } from "react";

interface CardBoxProps {
    children: ReactNode;
}

const CardBox: React.FC<CardBoxProps> = ({ children }) => {
    return (
        <div className="lg:w-4/12 w-10/12 bg-white mx-auto rounded-md mt-12 px-5 py-10">
            { children }
        </div>
    )
}

export default CardBox