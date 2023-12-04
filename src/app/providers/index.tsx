import { FC, ReactNode } from "react";
import { AuthContextProvider } from "../context/auth-context";
import Navbar from "@/components/navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Providers: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <AuthContextProvider>
            <Navbar />
            <ToastContainer />
            {children}
        </AuthContextProvider>
    );
};

export default Providers;