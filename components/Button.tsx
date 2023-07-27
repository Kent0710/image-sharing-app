import { twMerge } from "tailwind-merge";

interface ButtonProps {
    text : string;
    onClick? : any;
    className? : string;
    type? : any;
};

const Button : React.FC<ButtonProps> = ({
    text,
    onClick,
    className,
    type
}) => {
    return (
        <button
            onClick={onClick}
            type={type}
            className={twMerge(`
                bg-blue-400 text-white text-sm font-bold py-1 px-5 rounded-lg tracking-tighter
            `, className)}
        >
            {text}
        </button>
    )
};  

export default Button;