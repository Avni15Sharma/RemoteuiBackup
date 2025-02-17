import React, { useState } from "react";
import axios from "axios";
import { TextField, Checkbox, Button, Typography, Grid, FormControlLabel, Container, Paper } from "@mui/material";

const PutBond = () => {
    const [securityName, setSecurityName] = useState("");
    const [formData, setFormData] = useState({});
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const handleSearch = () => {
        if (!securityName.trim()) {
            alert("Please enter a security name.");
            return;
        }

        axios.get(`https://localhost:7248/sm/BondBonds/GetByName/${securityName}`)
            .then((response) => {
                console.log("API Response:", response.data);
                if (response.data) {
                    setFormData({ ...response.data });
                    setIsDataLoaded(true);
                } else {
                    alert("Bond not found.");
                }
            })
            .catch((error) => {
                console.error("Error fetching bond:", error);
                alert("Error fetching bond data");
            });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting Data:", formData);
    
        axios.put(`https://localhost:7248/sm/BondBonds/PutByName/${securityName}`, formData, {
            headers: { "Content-Type": "application/json" }
        })
        .then(() => {
            alert("Bond updated successfully!");
        })
        .catch((error) => {
            console.error("Error updating bond:", error);
            alert("Error updating bond.");
        });
    };
    

    return (
        <Container maxWidth="md">
            <Paper style={{ padding: 20, marginTop: 20 , marginBottom:10}}>
            <Typography variant="h5" gutterBottom>
                            Looking for a Bond? Search here!
            </Typography>
            
                <TextField
                    label="Security Name"
                    value={securityName}
                    onChange={(e) => setSecurityName(e.target.value)}
                    fullWidth
                    margin="normal"
                />

                <Button variant="contained" color="primary" onClick={handleSearch}>
                    Search
                </Button>

                {isDataLoaded && (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2} style={{ marginTop: 20}}>
                            {Object.keys(formData).map((field, index) => {
                                if (field === "securityId" ) return null; 

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
                                                    field.includes("Price") || field.includes("Amount") || field.includes("Ratio") || field.includes("Volume") || field.includes("LotSize") ? "number" :
                                                    "text"
                                                }
                                                InputLabelProps={field.includes("Date") ? { shrink: true } : {}}
                                                value={formData[field] ?? ""}
                                                onChange={handleChange}
                                                disabled={field=== "securityName"}
                                            />
                                        )}
                                    </Grid>
                                );
                            })}
                        </Grid>

                        <Button type="submit" variant="contained" color="primary" style={{ marginTop: 20 }}>
                            Save Changes
                        </Button>
                    </form>
                )}
            </Paper>
        </Container>
    );
};

export default PutBond;
