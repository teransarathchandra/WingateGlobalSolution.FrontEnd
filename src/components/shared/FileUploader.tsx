import useFileUpload from "@app_hooks/useFileUpload";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, Typography } from "@mui/material";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useEffect, useState } from "react";
import { FlexRow } from "@app_styles/shared/commonStyles.style";

const FileUploader = ({uploadUrl, folderPath, onUploadSuccess, onUploadError, itemID, documentType }) => {

    const { file, handleFileChange, handleFileUpload, setFolderPath } = useFileUpload(uploadUrl, folderPath,  itemID, documentType);
    const [uploadedFileName, setUploadedFileName] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    useEffect(() => {
        setFolderPath(folderPath);
    }, [folderPath, setFolderPath]);

    useEffect(() => {
        if (file) {
            uploadFile(file);
        }
    }, [file]);

    const uploadFile = async (file) => {
        try {
            const result = await handleFileUpload(file);
            setUploadedFileName(file.name);
            setUploadSuccess(true);
            if (onUploadSuccess) {
                onUploadSuccess(result);
            }
        } catch (error) {
            setUploadedFileName(null);
            setUploadSuccess(false);
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
            {uploadedFileName && uploadSuccess && (
                <FlexRow justifyContent="center" alignItems="center" columnGap="1rem">
                    <Typography variant="body1" style={{ marginTop: '10px' }}>
                        Uploaded File: {uploadedFileName} <TaskAltIcon style={{ color: 'green' }}/>
                    </Typography>
                </FlexRow>
            )}
        </>
    );
};

export default FileUploader;