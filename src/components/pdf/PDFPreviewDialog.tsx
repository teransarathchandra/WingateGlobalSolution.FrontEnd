import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
// import api from '@app_utils/apiUtils';
import usePDFDownloader from '@app_hooks/usePDFDownloader';

const PDFExportDialog = ({ open, onClose, htmlContent, filename }) => {
    const [isLoading, setIsLoading] = useState(false);
    const downloadPDF = usePDFDownloader();

    const handleExportPDF = async () => {
        setIsLoading(true);
        try {
            await downloadPDF(htmlContent, filename);
            // const { data } = response;
            // window.open(data.pdfUrl, '_blank');
        } catch (error) {
            console.error('Error exporting PDF:', error);
        }
        setIsLoading(false);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogContent>
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleExportPDF} color="primary" disabled={isLoading}>
                    {isLoading ? 'Exporting...' : 'Export PDF'}
                </Button>
                <Button onClick={onClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default PDFExportDialog;