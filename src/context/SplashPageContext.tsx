'use client'
// SplashPageContext.tsx
import React, {createContext, useState, ReactNode, FC} from 'react';

interface SplashPageContextProps {
    splashPage: boolean;
    setSplashPage: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with a default value
const SplashPageContext = createContext<SplashPageContextProps | undefined>(undefined);

interface SplashPageProviderProps {
    children: ReactNode;
}

const SplashPageProvider: FC<SplashPageProviderProps> = ({children}) => {
    const [splashPage, setSplashPage] = useState<boolean>(true);

    return (
        <SplashPageContext.Provider value={{splashPage, setSplashPage}}>
            {children}
        </SplashPageContext.Provider>
    );
};

export {SplashPageContext, SplashPageProvider};
