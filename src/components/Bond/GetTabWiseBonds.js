import React, { useState , useEffect} from "react";
import axios from "axios";
import { Tabs, Tab, Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const GetTabWiseBond = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const tabNames = [
        "Security Summary",
        "Security Identifier",
        "Security Details",
        "Risk",
        "Regulatory Details",
        "Reference Data",
        "Pricing and Analytics",
        "Call Schedule",
        "Put Schedule",
    ];

    const fetchDetails = async (tabIndex) => {
        setSelectedTab(tabIndex);
        setError(null);
        setData(null);

        try {
            const tabName = tabNames[tabIndex];
            const response = await axios.get(`https://localhost:7248/sm/BondBonds/GetTabWiseBond/${tabName}`);

            if (response.data.length === 0) {
                setError(`No data found for ${tabName}.`);
            } else {
                setData(response.data);
            }
        } catch (err) {
            setError("Error fetching data. Please check the API or try again.");
        }
    };

    useEffect(()=>{
        fetchDetails(0)
    },[]);

    return (
        <Box sx={{ maxWidth: "900vw", mx: "auto", mt: 3, p: 3, textAlign: "center", border: "1px solid #ddd", borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>
                Tab-Wise Bond Details
            </Typography>

            
            <Tabs
                value={selectedTab}
                onChange={(_, newValue) => fetchDetails(newValue)}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ mb: 2, background: "#f5f5f5", borderRadius: 1 }}
            >
                {tabNames.map((tab, index) => (
                    <Tab key={index} label={tab} />
                ))}
            </Tabs>

            
            {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                    {error}
                </Typography>
            )}

           
            {data && (
                <TableContainer component={Paper} sx={{ mt: 3, maxHeight: 500 }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {Object.keys(data[0]).map((key) => (
                                    <TableCell key={key} sx={{ fontWeight: "bold", background: "#f5f5f5" }}>
                                        {key}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row, index) => (
                                <TableRow key={index}>
                                    {Object.values(row).map((value, i) => (
                                        <TableCell key={i}>{value !== null ? value.toString() : "-"}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};

export default GetTabWiseBond;
