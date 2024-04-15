import usePDFDownloader from '@app_hooks/usePDFDownloader';
import { Button } from '@mui/material';
import ReactDOMServer from 'react-dom/server';
import DownloadIcon from '@mui/icons-material/Download';

const PDFDownloadButton = ({ content }) => {
    const downloadPDF = usePDFDownloader();

    const handleDownload = () => {
        const htmlContent = ReactDOMServer.renderToString(content);
        downloadPDF(htmlContent);
    };

    // return <button onClick={handleDownload}>Download PDF</button>;
    return (
        <>
            <Button
                variant="contained"
                component="label"
                color="primary"
                onClick={handleDownload}
                startIcon={<DownloadIcon />}
            >
                Export PDF
            </Button>
        </>
    );
};

export default PDFDownloadButton;