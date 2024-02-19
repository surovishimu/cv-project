import React from 'react';
import { Document, Page, Text, View, PDFDownloadLink } from '@react-pdf/renderer';
import { useLocation } from 'react-router-dom';

const PdfDocument = ({ formData, withBrand, range }) => (
    <Document>
        <Page size="A4">
            <View>
                <Text>Name: {formData.name}</Text>
                {withBrand && <Text>Brand: {formData.brandName}</Text>}
                <Text>Type: {formData.type}</Text>
                <Text>Price: ${formData.price}</Text>
                <Text>Description: {formData.description}</Text>
                <Text>Rating: {formData.rating}</Text>
                <Text>Range: {range}</Text> {/* Display range value */}
            </View>
        </Page>
    </Document>
);

const PdfDownload = () => {
    const location = useLocation();
    const { search } = location;
    const formData = Object.fromEntries(new URLSearchParams(search));
    const range = formData.range || ''; // Get range value from formData

    return (
        <div className='w-4/5'>
            <div className="flex flex-col items-center h-screen">
                <div className="w-80 p-4 border border-gray-300 rounded shadow">
                    <h2 className="text-xl font-bold mb-4">Form Data</h2>
                    <p><strong>Name:</strong> {formData.name}</p>
                    <p><strong>Brand:</strong> {formData.brandName}</p>
                    <p><strong>Type:</strong> {formData.type}</p>
                    <p><strong>Price:</strong> ${formData.price}</p>
                    <p><strong>Description:</strong> {formData.description}</p>
                    <p><strong>Rating:</strong> {formData.rating}</p>
                    <p><strong>Range:</strong> {range}</p>
                </div>
                <div className="text-center mt-4">
                    <PDFDownloadLink document={<PdfDocument formData={formData} withBrand={false} />} fileName="form_data_without_brand.pdf">
                        {({ loading }) =>
                            loading ? 'Loading document...' : 'Download PDF without Brand'
                        }
                    </PDFDownloadLink>
                    <PDFDownloadLink document={<PdfDocument formData={formData} withBrand={true} />} fileName="form_data_with_brand.pdf">
                        {({ loading }) =>
                            loading ? 'Loading document...' : 'Download PDF with Brand'
                        }
                    </PDFDownloadLink>
                </div>
            </div>

        </div>
    );
};

export default PdfDownload;
