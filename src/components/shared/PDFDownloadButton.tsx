import usePDFDownloader from '@app_hooks/usePDFDownloader';
import { Button } from '@mui/material';
import ReactDOMServer from 'react-dom/server';
import DownloadIcon from '@mui/icons-material/Download';
import PDFLayout from '@app_components/pdf/PDFLayout';
import { useState } from 'react';
import ButtonSpinner from '@app_styles/shared/buttonSpinner.styles';
import { formatFileName } from '@app_components/pdf/formatFileName';

const PDFDownloadButton = ({ content, typeName, id }) => {
    const [isLoading, setIsLoading] = useState(false);
    const downloadPDF = usePDFDownloader();

    const handleDownload = async () => {
        setIsLoading(true); // Start loading
        // const htmlContent = ReactDOMServer.renderToString(content);
        try {
            const htmlContent = ReactDOMServer.renderToString(
                <PDFLayout content={content} />
            );
            const filename = formatFileName(typeName, id);
            await downloadPDF(htmlContent, filename);
        } catch (error) {
            console.error("Failed to download PDF: ", error);
        }
        setIsLoading(false);
    };

    // return <button onClick={handleDownload}>Download PDF</button>;
    return (
        <>
            <Button
                variant="contained"
                component="label"
                color="primary"
                onClick={handleDownload}
                disabled={isLoading}
                startIcon={!isLoading ? <DownloadIcon /> : ''}
            >
                {isLoading ? (
                    <>
                        <ButtonSpinner /> {/* Using the Spinner styled component */}
                        <span style={{ paddingLeft: '5px' }}>Generating PDF...</span>
                    </>
                ) : (
                    'Export PDF'
                )}
            </Button>
        </>
    );
};

export default PDFDownloadButton;