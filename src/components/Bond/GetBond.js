import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from "@mui/material";

const GetBond = () => {
    const [securities, setSecurities] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        fetchBonds();
    }, []);

    const fetchBonds = () => {
        axios.get("https://localhost:7248/sm/BondBonds")
            .then(response => {
                setSecurities(response.data);
                setErrorMsg("");
            })
            .catch(error => {
                console.error(error);
                setErrorMsg("Error retrieving bonds.");
            });
    };

    const columns = securities.length > 0 ? Object.keys(securities[0]).filter(col => col.toLowerCase() !== "securityid") : [];

    return (
        <Box sx={{ maxWidth: 800, mx: "auto", textAlign: "center", mt: 3, p: 2 }}>
            <Typography variant="h5" gutterBottom>
                Bonds
            </Typography>
            <br></br>
            

            {errorMsg && (
                <Typography color="error" sx={{ mb: 2 }}>
                    {errorMsg}
                </Typography>
            )}

            {securities.length > 0 ? (
                <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {columns.map((col, index) => (
                                    <TableCell key={index} sx={{ fontWeight: "bold", background: "#f5f5f5" }}>
                                        {col.replace(/([A-Z])/g, " $1").trim().replace(/^./, (char) => char.toUpperCase())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {securities.map((security, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {columns.map((col, colIndex) => (
                                        <TableCell key={colIndex}>
                                            {security[col] === "" || security[col] === null || security[col] === undefined
                                                ? "-"
                                                : typeof security[col] === "boolean"
                                                    ? (security[col] ? "Yes" : "No")
                                                    : security[col]}
                                        </TableCell>

                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                !errorMsg && <Typography>No securities found.</Typography>
            )}
        </Box>
    );
};

export default GetBond;
