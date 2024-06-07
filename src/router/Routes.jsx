import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import CvForm from "../cv-form/CvForm";

import AllPdf from "../AllPdf/AllPdf";
import PdfDetails from "../AllPdf/PdfDetails";
import UpdatePdf from "../AllPdf/UpdatePdf";
import CensoredCV from "../AllPdf/CensoredCV";
import Login from "../Login/Login";
import PrivateRoute from "./PrivateRoute";
import Archive from "../Archive/Archive";
import ArchiveCVdetails from "../Archive/ArchiveCVdetails";
import ArchiveCensored from "../Archive/ArchiveCensored";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <PrivateRoute><CvForm /></PrivateRoute>
            },

            {
                path: 'allpdf',
                element: <PrivateRoute> <AllPdf></AllPdf></PrivateRoute>

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
            {
                path: 'archiveCVDetails/:id',
                element: <ArchiveCVdetails></ArchiveCVdetails>,
                loader: ({ params }) => fetch(`https://cv-server-iota.vercel.app/archive/${params.id}`)
            },
            {
                path: 'archiveCensoredCv/:id',
                element: <ArchiveCensored></ArchiveCensored>,
                loader: ({ params }) => fetch(`https://cv-server-iota.vercel.app/archive/${params.id}`)
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'archive',
                element: <Archive></Archive>
            }


        ]
    },
]);
