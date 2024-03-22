import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import CvForm from "../cv-form/CvForm";

import AllPdf from "../AllPdf/AllPdf";
import PdfDetails from "../AllPdf/PdfDetails";
import UpdatePdf from "../AllPdf/UpdatePdf";
import CensoredCV from "../AllPdf/CensoredCV";
import Login from "../Login/Login";
import PrivateRoute from "./PrivateRoute";



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
                loader: ({ params }) => fetch(`http://localhost:5000/userInfo/${params.id}`)
            },
            {
                path: '/updatePdf/:id',
                element: <UpdatePdf></UpdatePdf>,
                loader: ({ params }) => fetch(`http://localhost:5000/userInfo/${params.id}`)


            },
            {
                path: 'censoredCv/:id',
                element: <CensoredCV></CensoredCV>,
                loader: ({ params }) => fetch(`http://localhost:5000/userInfo/${params.id}`)
            },
            {
                path: 'login',
                element: <Login></Login>
            }


        ]
    },
]);
