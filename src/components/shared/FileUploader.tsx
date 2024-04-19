import useFileUpload from "@app_hooks/useFileUpload";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const FileUploader = ({uploadUrl, folderPath, onUploadSuccess, onUploadError, itemID, documentType }) => {

    const { file, handleFileChange, handleFileUpload, setFolderPath } = useFileUpload(uploadUrl, folderPath,  itemID, documentType);
    const [uploadedFileName, setUploadedFileName] = useState(null);

    useEffect(() => {
        setFolderPath(folderPath);
    }, [folderPath, setFolderPath]);

    const uploadFile = async (file) => {
        try {
            const result = await handleFileUpload(file);
            setUploadedFileName(file.name);
            if (onUploadSuccess) {
                onUploadSuccess(result);
            }
        } catch (error) {
            setUploadedFileName(null);
            if (onUploadError) {
                onUploadError(error);
            }
        }
    };

    const onChange = async (event) => {
        handleFileChange(event); 
        if (file) {  
            await uploadFile(file); 
        }
    };

    return (
        <>
            <Button
                variant="contained"
                component="label"
                color="primary"
                startIcon={<CloudUploadIcon />}
            >
                Upload File
                <input type="file" hidden onChange={onChange} />
            </Button>
            {uploadedFileName && (
                <Typography variant="body1" style={{ marginTop: '10px' }}>
                    Uploaded File: {uploadedFileName}
                </Typography>
            )}
        </>
    );
};

export default FileUploader;