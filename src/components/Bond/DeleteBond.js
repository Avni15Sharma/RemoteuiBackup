import React, { useState } from "react";
import { TextField, Button, Typography, Container, Paper} from "@mui/material";
import axios from "axios";
import ErrorDialog from "../ErrorDialog";
const DeleteBond = ({ onBondDeleted }) => {
    const [securityName, setSecurityName] = useState("");
    const [error, setError] = useState("");

    const handleDelete = async () => {
        if (!securityName.trim()) {
            setError("Security name is required.");
            // alert("Error deleting bond:", error)
            return;
        }

        setError("");

        try {
            await axios.delete(`https://localhost:7248/sm/BondBonds/DeleteByName/${securityName}`);
            // alert("Bond deleted successfully");
            setError("Bond deleted successfully");
            setSecurityName(""); 
           
        } catch (error) {
            console.error("Error deleting bond:", error);   
            // alert("Error deleting bond:", error);
            setError("Error deleting bond:", error);
        }
    };

    return (
        <Container maxWidth="md">
            <Paper sx={{ padding: 3, marginTop: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Delete Bond
                </Typography>

                <TextField
                    label="Security Name"
                    variant="outlined"
                    fullWidth
                    value={securityName}
                    onChange={(e) => setSecurityName(e.target.value)}
                    error={!!error}
                    helperText={error}
                    sx={{ marginBottom: 2 }}
                />

                <Button
                    variant="contained"
                    color="error"
                    onClick={handleDelete}
                    disabled={!securityName.trim()}
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

export default DeleteBond;
