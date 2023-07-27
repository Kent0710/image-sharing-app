'use client';

import { createContext, useState, useContext } from "react";

interface IsSidebarHiddenContextValue {
    isSidebarHidden : boolean;
    updateIsSidebarHidden : (isSidebarHiddenNewValue : boolean) => void;
};

const IsSidebarHiddenContext = createContext<IsSidebarHiddenContextValue | null>(null);

export function useIsSidebarHiddenContext() {
    const context = useContext(IsSidebarHiddenContext);
    if(!context) {
        throw new Error (`useIsSidebarHiddenContext must be used within an IsSidebarHiddenProvider`);
    };
    return context;
};

interface IsSidebarHiddenProviderProps {
    children : React.ReactNode
};

const IsSidebarHiddenProvider : React.FC<IsSidebarHiddenProviderProps> = ({
    children
}) => {
    const [isSidebarHidden, setIsSidebarHidden] = useState(false);

    const updateIsSidebarHidden = (isSidebarHiddenNewValue : boolean) => {
        setIsSidebarHidden(isSidebarHiddenNewValue);
    };

    const isSidebarHiddenProviderValues : IsSidebarHiddenContextValue = {
        isSidebarHidden,
        updateIsSidebarHidden
    };

    return (
        <IsSidebarHiddenContext.Provider value={isSidebarHiddenProviderValues}>
            {children}
        </IsSidebarHiddenContext.Provider>
    )
};

export default IsSidebarHiddenProvider;