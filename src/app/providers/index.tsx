'use client'
import { FC, ReactNode } from "react";
import { AuthContextProvider } from "../context/auth-context";
import Navbar from "@/components/navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient()

const Providers: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <AuthContextProvider>
                    <Navbar />
                    <ToastContainer />
                    {children}
                </AuthContextProvider>
            <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
            </QueryClientProvider>
        </>
    );
};

export default Providers;