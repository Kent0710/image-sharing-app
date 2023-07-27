import { twMerge } from "tailwind-merge";

import Profile from "./Profile";

const AccountMain = () => {
    return (
        <div className="flex gap-3 pt-3 p-10 h-full text-neutral-600">

            <Box>
                <Profile />
            </Box>

        </div>
    )
};

interface BoxProps {
    children : React.ReactNode;
    className? : string;
};
const Box : React.FC<BoxProps> = ({
    children,
    className
}) => {
    return (
        <div className={twMerge(`
            bg-slate-200 shadow-2xl h-full w-full rounded-lg p-5 flex flex-col gap-3
        `,
            className
        )}>
            {children}
        </div>
    )
};


export default AccountMain;
