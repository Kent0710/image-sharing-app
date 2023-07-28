import ayano from '@/public/images/ayano.jpg'
import Image from 'next/image';

import Button from '@/components/Button';
import SignInButton from '@/components/SignInButton';

const Login = () => {
    return (
        <div className="flex items-center justify-center w-full h-full bg-slate-100 text-neutral-700">
            
            <div className="bg-white w-[30rem] h-[40rem] rounded-2xl flex flex-col items-center shadow-2xl p-10 justify-around">

                <Header />
                <Main />
                <Footer />

            </div>

        </div>
    )
};

const Header = () => {
    return (
        <header className='flex flex-col items-center gap-2'>
            <Image src={ayano} alt='devProf' width={50} height={50} className='rounded-full'/>
            <h1 className='font-bold tracking-wide text-xl'>IMAGENX</h1>
            <h2> Create. Share. Explore. </h2>
        </header>
    )
};

const Main = () => {
    interface BoxProps {
        text : string;
        buttonText : string;
    }

    const Box : React.FC<BoxProps> = ({
        text,
        buttonText
    }) => {
        return (
            <div className='flex flex-col items-center p-10 shadow-2xl bg-white w-80 h-32 gap-3
                transition ease-in-out delay-50 hover:-translate-y-1 hover:bg-gradient-to-b hover:scale-110 duration-300
            '>
                <h3 className='text-center font-semibold'> {text}? </h3>
                <SignInButton buttonText={buttonText}/>
            </div>
        )
    }

    return (
        <main className='flex flex-col items-center gap-7'>
            <Box text='Old User' buttonText='Login' />
            <Box text='New User' buttonText='Sign up'  />
        </main>
    )
}

const Footer = () => {
    return (
        <div className='flex flex-col items-center'>
            <p> Developed by : </p>
            <p className='font-bold tracking-tighter'> nami </p>
        </div>
    )
}

export default Login;