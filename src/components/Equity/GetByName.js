import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from "@mui/material";

const GetEquityByName = () => {
    const [securityName, setSecurityName] = useState("");
    const [securityData, setSecurityData] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    const handleSearch = () => {
        if (!securityName.trim()) {
            setErrorMsg("Please enter a security name.");
            return;
        }

        axios.get(`https://localhost:7248/sm/EquityEquities/GetByName/${securityName}`)
            .then((response) => {
                setSecurityData(response.data);
                setErrorMsg("");
            })
            .catch((error) => {
                setErrorMsg("Error fetching data. Please try again.");
                console.error(error);
            });
    };

    const columns = securityData ? Object.keys(securityData).filter(col => col.toLowerCase() !== "securityid") : [];

    return (
        <Box sx={{ maxWidth: 800, mx: "auto", textAlign: "center", mt: 3, p: 3, border: "1px solid #ddd", borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>
                Looking for an Equity? Search here!
            </Typography>

            <TextField
                label="Security Name"
                variant="outlined"
                fullWidth
                value={securityName}
                onChange={(e) => setSecurityName(e.target.value)}
                sx={{ mb: 2 }}
            />

            <Button variant="contained" color="primary" onClick={handleSearch} fullWidth>
                Search
            </Button>

            {errorMsg && (
                <Typography color="error" sx={{ mt: 2 }}>
                    {errorMsg}
                </Typography>
            )}

            {securityData && (
                <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Equity Details
                    </Typography>

                    <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: "bold", background: "#f5f5f5" }}>Attribute</TableCell>
                                    <TableCell sx={{ fontWeight: "bold", background: "#f5f5f5" }}>Value</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {columns.map((key) => (
                                    <TableRow key={key}>
                                        <TableCell>{key.replace(/([A-Z])/g, " $1").trim().replace(/^./, (char) => char.toUpperCase())}
                                        </TableCell>
                                        <TableCell>
                                            {typeof securityData[key] === "boolean" ? (securityData[key] ? "Yes" : "No") : securityData[key]}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}
        </Box>
    );
};

export default GetEquityByName;
