import { createContext, useState } from "react";

export const context = createContext({} as { elements: any[], setElements: (e: any) => void });
export const ContextProvider = ({ children }: any) => {
    const [elements, setElements] = useState<any[]>([]);

    return (
        <context.Provider value={{ elements, setElements }}>
            { children }
        </context.Provider>
    );
}