import React, { useState } from "react";
import "./Home.css"; // CSS File
import { Button, Box, Paper, Typography, Grid } from "@mui/material";
import EquitySidebar from "./EquitySidebar";
import BondSidebar from "./BondSidebar";
import Delete from "./Equity/Delete";
import Get from "./Equity/Get";
import AddBond from "./Bond/AddBond";
import DeleteBond from "./Bond/DeleteBond";
import Add from "./Equity/Add";
import Put from "./Equity/Put";
import GetByName from "./Equity/GetByName";
import GetBond from "./Bond/GetBond";
import PutBond from "./Bond/PutBond";
import GetByNameBond from "./Bond/GetByNameBond";
import GetTabWiseBond from "./Bond/GetTabWiseBonds";
import GetTabs from "./Equity/GetTabs";
import { Outlet } from "react-router-dom";

const Home = () => {
    const [selectedTab, setSelectedTab] = useState(null); // Track selected tab
    const [selectedOption, setSelectedOption] = useState(""); // Track selected sidebar option

    
    const renderContent = () => {
        if (selectedTab === "equity") {
            switch (selectedOption) {
                case "add": return <Add />;
                case "update": return <Put />;
                case "search": return <GetByName />;
                case "delete": return <Delete />;
                case "details": return <Get />;
                case "gettabs": return <GetTabs />;
                default: return <Typography variant="h6">Pick an Option</Typography>;
            }
        } else if (selectedTab === "bond") {
            switch (selectedOption) {
                case "add": return <AddBond />;
                case "update": return <PutBond />;
                case "search": return <GetByNameBond />;
                case "delete": return <DeleteBond />;
                case "details": return <GetBond />;
                case "gettabs": return <GetTabWiseBond />;
                default: return <Typography variant="h6">Pick an Option</Typography>;
            }
        } else {
            return <Typography variant="h6">Choose a Security Type</Typography>;
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            
            <Paper elevation={3} sx={{ p: 2, mb: 3, textAlign: "center", backgroundColor: "#000000" }}>
                <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
                    Security Dashboard
                </Typography>

                
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: selectedTab === "equity" ? "#ff9800" : "#1B2A49",
                            color: "white",
                            "&:hover": { backgroundColor: "#ff9800" } 
                        }}
                        onClick={() => { setSelectedTab("equity"); setSelectedOption(""); }}
                    >
                        Equity
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: selectedTab === "bond" ? "#ff9800" : "#FFF9C4", 
                            color: "#000",
                            "&:hover": { backgroundColor: "#ff9800" }
                        }}
                        onClick={() => { setSelectedTab("bond"); setSelectedOption(""); }}
                    >
                        Bond
                    </Button>
                </Box>
            </Paper>

            <Grid container spacing={2}>
         
                <Grid item xs={12} sm={3}>
                    <Paper elevation={3} sx={{ p: 2, minHeight: "710px", display:"flex", justifyContent:"center", backgroundColor:"#ffb74d"}} >
                        {selectedTab !== "bond" && <EquitySidebar onSelect={setSelectedOption} />}
                        {selectedTab === "bond" && <BondSidebar onSelect={setSelectedOption} />}
                    </Paper>
                </Grid>

           
                <Grid item xs={12} sm={9}>
                    <Paper elevation={3} sx={{ p: 2, minHeight: "710px", backgroundColor: "#FFF9C4" }}>
                        {renderContent()} 
                    </Paper>
                </Grid>
            </Grid>
            <Outlet />
        </Box>
    );
};

export default Home;
