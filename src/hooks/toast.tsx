import React, {createContext, useCallback, useContext} from "react";

import ToastContainer from "../components/ToastContainer";

interface ToastContextData {
    addToast(): void;
    removeToast(): void;
}

const Toast = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC = ({children}) => {
    const addToast = useCallback(() => {
        console.log("Add Toast");
    }, []);
    const removeToast = useCallback(() => {
        console.log("Remove Toast");
    }, []);

    return (
        <Toast.Provider value={{addToast, removeToast}} >
            {children}
            <ToastContainer />
        </Toast.Provider>
    );
};

export function useToast(): ToastContextData {
    const context = useContext(Toast);

    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }

    return context;
}
