import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const ErrorDialog = ({ error, onClose }) => {
    return (
        <Dialog open={Boolean(error)} onClose={onClose}>
            <DialogTitle>
                {error && error.toLowerCase().includes("success") ? "Success" : "Error"}
            </DialogTitle>

            <DialogContent>{error}</DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ErrorDialog;