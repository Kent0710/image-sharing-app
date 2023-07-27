import Header from "@/components/Header";
import Main from "@/components/Main";

import IsSidebarHiddenProvider from '@/providers/IsSidebarHidden';

const Home = () => {
    return (
        <div className="bg-slate-100 text-neutral-700 h-full w-full flex-col flex gap-2">
            
            <Header />

            <IsSidebarHiddenProvider>
                <Main />
            </IsSidebarHiddenProvider>

        </div>
    )
};

export default Home;