import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Checkbox, FormControlLabel, Button, Grid, Typography, Paper } from "@mui/material";

const Add = () => {
    const [formData, setFormData] = useState({
        securityName: "",
        securityDescription: "",
        hasPosition: false,
        isActive: true,
        roundLotSize: "",
        bloombergUniqueName: "",
        cusip: "",
        isin: "",
        sedol: "",
        bloombergTicker: "",
        bloombergUniqueId: "",
        bloombergGlobalId: "",
        bloombergTickerAndExchange: "",
        isAdr: false,
        adrUnderlyingTicker: "",
        adrUnderlyingCurrency: "",
        sharesPerAdr: "",
        ipoDate: "",
        priceCurrency: "",
        settleDays: "",
        sharesOutstanding: "",
        votingRightsPerShare: "",
        _20DayAverageVolume: "",
        beta: "",
        shortInterest: "",
        ytdReturn: "",
        _90DayPriceVolatility: "",
        formPfAssetClass: "",
        formPfCountry: "",
        formPfCreditRating: "",
        formPfCurrency: "",
        formPfInstrument: "",
        formPfLiquidityProfile: "",
        formPfMaturity: "",
        formPfNaicsCode: "",
        formPfRegion: "",
        formPfSector: "",
        formPfSubAssetClass: "",
        issueCountry: "",
        exchange: "",
        issuer: "",
        issueCurrency: "",
        tradingCurrency: "",
        bloombergIndustrySubGroup: "",
        bloombergIndustryGroup: "",
        bloombergIndustrySector: "",
        countryOfIncorporation: "",
        riskCurrency: "",
        openPrice: "",
        closePrice: "",
        volume: "",
        lastPrice: "",
        askPrice: "",
        bidPrice: "",
        peRatio: "",
        declaredDate: "",
        exDate: "",
        recordDate: "",
        payDate: "",
        amount: "",
        frequency: "",
        dividendType: "",
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.securityName.trim()) {
            alert("Security Name is required");
            return;
          }

        const cleanedData = Object.fromEntries(
            Object.entries(formData).filter(([_, value]) => value !== "" && value !== null)
        );

        axios
            .post("https://localhost:7248/sm/EquityEquities", cleanedData)
            .then(() => {
                alert("Equity added successfully");
            })
            .catch((error) => {
                console.error("Error adding equity:", error);
                alert("Error adding equity");
                
            });
    };

    return (
        <Container maxWidth="lg">
            <Paper sx={{ padding: 3, marginTop: 5 ,marginBottom: 5}}>
                <Typography variant="h5" gutterBottom>
                    Add a new Equity
                </Typography>
                <br></br>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {Object.keys(formData).map((key) => (
                            <Grid item xs={12} sm={6} key={key}>
                                {typeof formData[key] === "boolean" ? (
                                    <FormControlLabel
                                        control={
                                            <Checkbox name={key} checked={formData[key]} onChange={handleChange} />
                                        }
                                        label={key.replace(/([A-Z])/g, " $1").trim()}
                                    />
                                ) : (
                                    <TextField
                                        fullWidth
                                        label={key.replace(/([A-Z])/g, " $1").trim()}
                                        name={key}
                                        type={key.includes("Date") ? "date" : key.includes("Price") || key.includes("Amount") || key.includes("Volume") ? "number" : "text"}
                                        value={formData[key]}
                                        onChange={handleChange}
                                        InputLabelProps={key.includes("Date") ? { shrink: true } : {}}
                                    />
                                )}
                            </Grid>
                        ))}
                    </Grid>
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 3 }}>
                        Submit
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default Add;
