import Header from "@/components/Header";
import SettingsMain from "@/components/SettingsMain";

const Settings = () => {
    return (
        <div className="bg-slate-100 text-neutral-700 h-full w-full flex-col flex gap-2">
            
            <Header />
            <SettingsMain/>

        </div>
    )
};  

export default Settings;