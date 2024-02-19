import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import CvForm from "../cv-form/CvForm";
import PdfDownload from "../PDF/PdfDownload";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <CvForm />
            },
            {
                path: 'pdf',
                element: <PdfDownload />
            }
        ]
    },
]);
