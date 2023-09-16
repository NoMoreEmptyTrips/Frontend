import { Button, Dialog, DialogTitle } from "@mui/material";
import React, { useEffect } from "react";

function ErrorDialog(props: any) {
    const { setErrorDialogOpen, error, open } = props;
  
    const handleClose = () => {
        setErrorDialogOpen(false);
    };
  
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Error</DialogTitle>
        <div style={{margin: '0 20px 20px 20px'}}>
            <p>{error}</p>
            <div>
                <Button variant="contained" onClick={handleClose}>Close</Button>
            </div>
        </div>
      </Dialog>
    );
  }

export default ErrorDialog;