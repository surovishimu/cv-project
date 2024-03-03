import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import CvForm from "../cv-form/CvForm";
import PdfDownload from "../PDF/PdfDownload";
import AllPdf from "../AllPdf/AllPdf";
import PdfDetails from "../AllPdf/PdfDetails";
import UpdatePdf from "../AllPdf/UpdatePdf";
import CensoredCV from "../AllPdf/CensoredCV";

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
            },
            {
                path: 'allpdf',
                element: <AllPdf></AllPdf>,
                loader: () => fetch('https://cv-server-iota.vercel.app/userInfo')
            },
            {
                path: 'pdfDetails/:id',
                element: <PdfDetails></PdfDetails>,
                loader: ({ params }) => fetch(`https://cv-server-iota.vercel.app/userInfo/${params.id}`)
            },
            {
                path: '/updatePdf/:id',
                element: <UpdatePdf></UpdatePdf>,
                loader: ({ params }) => fetch(`https://cv-server-iota.vercel.app/userInfo/${params.id}`)


            },
            {
                path: 'censoredCv/:id',
                element: <CensoredCV></CensoredCV>,
                loader: ({ params }) => fetch(`https://cv-server-iota.vercel.app/userInfo/${params.id}`)
            },

        ]
    },
]);
