import React, { useState } from "react";
import axios from "axios";
import { TextField, Checkbox, FormControlLabel, Button, Grid, Container, Paper, Typography } from "@mui/material";
import ErrorDialog from "../ErrorDialog";
const Put = () => {
    const [securityName, setSecurityName] = useState(""); 
    const [formData, setFormData] = useState({});
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [error,setError]= useState(null);
    
    const handleSearch = () => {
        if (!securityName.trim()) {
            // alert("Please enter a security name.");
            setError("Please enter a security name.");
            return;
        }

        axios.get(`https://localhost:7248/sm/EquityEquities/GetByName/${securityName}`)
            .then((response) => {
                console.log("API Response:", response.data);
                if (response.data) {
                    setFormData({ ...response.data });
                    setIsDataLoaded(true);
                } else {
                    // alert("Equity not found.");
                    setError("Equity not found.");
                }
            })
            .catch((error) => {
                console.error("Error fetching equity:", error);
                // alert("Equity not found.");
                setError("Equity not found.");
            });
    };

  
    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

  
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitting Data:", formData);

        axios.put(`https://localhost:7248/sm/EquityEquities/PutByName/${securityName}`, formData, {
            headers: { "Content-Type": "application/json" }
        })
        .then(() => {
            // alert("Equity updated successfully!");
            setError("Equity updated successfully!");
        })
        .catch((error) => {
            console.error("Error updating equity:", error);
            // alert("Error updating equity.");
            setError("Error updating equity.");
        });
    };

    return (
        <Container maxWidth="lg">
            <Paper style={{ padding: 20, marginTop: 20 , marginBottom:10, maxHeight: "61vh", overflow:"auto"}}>
                <Typography variant="h5" gutterBottom>
                                Looking for an Equity? Search here!
                </Typography>

                
                <TextField
                    label="Security Name"
                    value={securityName}
                    onChange={(e) => setSecurityName(e.target.value)}
                    fullWidth
                    margin="normal"
                    size="small"
                />

                <Button variant="contained" color="primary" onClick={handleSearch}>
                    Search
                </Button>

                {isDataLoaded && (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2} style={{ marginTop: 20 }}>
                            {Object.keys(formData).map((field, index) => {
                                if (field === "securityId") return null; // Exclude securityId

                                return (
                                    <Grid item xs={12} sm={6} key={index}>
                                        {typeof formData[field] === "boolean" ? (
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        name={field}
                                                        checked={formData[field] || false}
                                                        onChange={handleChange}
                                                    />
                                                }
                                                label={field.replace(/([A-Z])/g, " $1").trim()}
                                            />
                                        ) : (
                                            <TextField
                                                label={field.replace(/([A-Z])/g, " $1").trim()}
                                                name={field}
                                                fullWidth
                                                type={
                                                    field.includes("Date") ? "date" :
                                                    field.includes("Price") || field.includes("Amount") || field.includes("Ratio") || field.includes("Volume") ? "number" :
                                                    "text"
                                                }
                                                InputLabelProps={field.includes("Date") ? { shrink: true } : {}}
                                                value={formData[field] ?? ""}
                                                onChange={handleChange}
                                                disabled={field === "securityName"}
                                            />
                                        )}
                                    </Grid>
                                );
                            })}
                        </Grid>

                        
                        <Button type="submit" variant="contained" color="secondary" style={{ marginTop: 20 }}>
                            Save Changes
                        </Button>
                    </form>
                )}
            </Paper>
            {error && <ErrorDialog error={error} onClose={() => setError(null)} />}
        </Container>
    );
};

export default Put;
