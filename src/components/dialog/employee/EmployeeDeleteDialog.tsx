import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { DialogHeaderContainer } from "@app_styles/shared/editDialog.styles";
import { FlexRow } from "@app_styles/signForm.styles";

interface DeleteDialogProps {
    isOpen: boolean;
    handleClose: () => void;
    handleDelete: () => Promise<void>;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
    isOpen,
    handleClose,
    handleDelete,
}) => {
    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>
                Confirm Deletion
            </DialogTitle>
            <DialogContent>
                <DialogHeaderContainer>
                    <p
                        style={{
                            textAlign: "center",
                            fontWeight: "normal",
                            margin: "20px",
                        }}
                    >
                        Are you sure you want to delete this item?
                    </p>
                </DialogHeaderContainer>
                <div style={{ marginLeft: "135px"}}
                >
                        <FlexRow>
                            <button
                                onClick={handleClose}
                                style={{
                                    width: "100px",
                                    height: "30px",
                                    marginRight: "10px",
                                    backgroundColor: "#23a840",
                                    border: "#23a840",
                                    color: "#FFFFFF",
                                    borderRadius: "10px",
                                    cursor: "pointer"
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                style={{
                                    width: "100px",
                                    height: "30px",
                                    backgroundColor: "#d32f2f",
                                    color: "#fff",
                                    marginRight: "160px",
                                    border: "#d32f2f",
                                    borderRadius: "10px",
                                    cursor: "pointer"
                                }}
                            >
                                Delete
                            </button>
                        </FlexRow>
                    </div>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteDialog;
