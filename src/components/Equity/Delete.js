import React, { useState } from "react";
import { TextField, Button, Typography, Box, Container, Paper } from "@mui/material";
import axios from "axios";
import ErrorDialog from "../ErrorDialog";
const DeleteEquity = () => {
    const [deleteName, setDeleteName] = useState("");
    const [error, setError] = useState("");

    const handleDelete = async () => {
        if (!deleteName.trim()) {
            setError("Security name is required.");
            // alert("Error deleting equity:", error);
            return;
        }

        setError(""); 
        try {
            await axios.delete(`https://localhost:7248/sm/EquityEquities/ByName/${deleteName}`);
            // alert("Equity deleted successfully");
            setError("Equity deleted successfully")
            setDeleteName(""); 
         
        } catch (error) {
            console.error("Error deleting equity:", error);
           setError("Error deleting equity ");
            // alert("Error deleting equity:", error);
        }
    };

    return (
        <Container maxWidth="md">
            <Paper sx={{ padding: 3, marginTop: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Delete Equity
                </Typography>

                <TextField
                    label="Security Name"
                    variant="outlined"
                    fullWidth
                    value={deleteName}
                    onChange={(e) => setDeleteName(e.target.value)}
                    error={!!error}
                    helperText={error}
                    sx={{ marginBottom: 2 }}
                />

                <Button
                    variant="contained"
                    color="error"
                    onClick={handleDelete}
                    disabled={!deleteName.trim()}
                    fullWidth
                    sx={{ height: 45, fontSize: "1rem" }}
                >
                    Delete
                </Button>
            </Paper>
            {error && <ErrorDialog error={error} onClose={() => setError(null)} />}
        </Container>
    );
};

export default DeleteEquity;
