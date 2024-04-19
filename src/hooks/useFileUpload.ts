import api from '@app_utils/apiUtils';
import { useState } from 'react';

const useFileUpload = (url, initialFolderPath, itemID , documentType) => {
    const [file, setFile] = useState(null);
    const [folderPath, setFolderPath] = useState(initialFolderPath);

    const handleFileChange = async (event) => {
        const newFile = event.target.files[0];
        setFile(newFile);
        if (newFile) {
            await handleFileUpload(newFile);
        }
    };

    const handleFileUpload = async (uploadFile) => {
        const timestamp = new Date().toISOString().replace(/[-:.T]/g, '').slice(0, 14);  // Create a timestamp
        const filenameWithTimestamp = `${uploadFile.name.split('.').slice(0, -1).join('.')}_${timestamp}.${uploadFile.name.split('.').pop()}`;

        const formData = new FormData();
        formData.append("folderPath", folderPath);
        formData.append("itemID", itemID);
        formData.append("documentType", documentType);
        formData.append("file", uploadFile, filenameWithTimestamp);

        const response = await api.post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    };

    return {
        file,
        handleFileChange,
        handleFileUpload,
        setFolderPath,
        folderPath
    };
};

export default useFileUpload;