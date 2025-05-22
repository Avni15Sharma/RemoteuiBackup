import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Checkbox, FormControlLabel, Button, Grid, Typography, Paper } from "@mui/material";
import ErrorDialog from "../ErrorDialog";
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
    const [validationErrors, setValidationErrors] = useState({});
    const [apiError, setApiError] = useState(null);
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;

        setFormData((prev) => ({ ...prev, [name]: newValue }));

        // Validation
        const errors = { ...validationErrors };

        if (
            (name.includes("Price") || name.includes("Amount") || name.includes("Volume")) &&
            newValue !== "" && isNaN(newValue)
        ) {
            errors[name] = `${name.replace(/([A-Z])/g, " $1").trim()} must be a number`;
        } else {
            delete errors[name]; // Clear field error if valid
        }

        setValidationErrors(errors);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setApiError(null); // clear previous API errors

        // Required field check
        if (!formData.securityName.trim()) {
            setValidationErrors((prev) => ({
                ...prev,
                securityName: "Security Name is required",
            }));
            return;
        }

        // Abort if any validation errors exist
        if (Object.keys(validationErrors).length > 0) {
            setApiError("Please fix validation errors before submitting.");
            return;
        }

        const cleanedData = Object.fromEntries(
            Object.entries(formData).filter(([_, value]) => value !== "" && value !== null)
        );

        axios
            .post("https://localhost:7248/sm/EquityEquities", cleanedData)
            .then(() => {
                setApiError("Equity added successfully");
            })
            .catch((err) => {
                console.error("Error adding equity:", err);
                setApiError(err.message || "Something went wrong");
            });
    };


    return (
        <Container maxWidth="lg">
            <Paper sx={{ padding: 3, marginTop: 5, marginBottom: 5 ,maxHeight: "61vh", overflow:"auto"}}>
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
                                        type={key.includes("Date") ? "date" :
                                            key.includes("Price") || key.includes("Amount") || key.includes("Volume") ? "number" : "text"}
                                        value={formData[key]}
                                        onChange={handleChange}
                                        error={Boolean(validationErrors[key])}
                                        helperText={validationErrors[key]}
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
            {apiError && <ErrorDialog error={apiError} onClose={() => setApiError(null)} />}

        </Container>
    );
};

export default Add;
