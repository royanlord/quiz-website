import { ReactNode } from "react";

interface ContainerBoxProps {
    children: ReactNode;
}

const ContainerBox: React.FC<ContainerBoxProps> = ({ children }) => {
  return (
    <div className="lg:w-9/12 w-10/12 bg-white mx-auto rounded-md mt-12 p-4">
        { children }
    </div>
  )
}

export default ContainerBox