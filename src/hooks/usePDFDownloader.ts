import api from "@app_utils/apiUtils";

const usePDFDownloader = () => {
    const downloadPDF = async (htmlContent) => {
        try {
            // Notice that we do not set the headers here because 
            // the api instance already sets the content type to 'application/json'
            const response = await api.post("/generate-pdf", { html: htmlContent }, {
                responseType: 'blob', // important to set the response type to 'blob' for PDF download
            });
            // Axios response does not have an 'ok' property. It will throw an error if the status code is not in the 2xx range.
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = "custom-report.pdf";
            document.body.appendChild(link); // This line is required in some browsers
            link.click();
            link.remove(); // Remove the link when done
        } catch (error) {
            // The error handling logic depends on how you want to communicate errors to the user
            console.error("Could not download the PDF", error);
        }
    };

    return downloadPDF;
};

export default usePDFDownloader;
