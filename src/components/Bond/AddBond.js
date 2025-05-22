import React, { useState } from "react";
import axios from "axios";
import {  Container,  Typography,  Grid,  TextField,  Checkbox,  FormControlLabel,  Button,  Paper} from "@mui/material";
import ErrorDialog from "../ErrorDialog";
const AddBond = () => {
  const [formData, setFormData] = useState({
    securityName: "",
    securityDescription: "",
    assetType: "",
    investmentType: "",
    tradingFactor: "",
    pricingFactor: "",
    cusip: "",
    isin: "",
    sedol: "",
    bloombergTicker: "",
    bloombergUniqueId: "",
    firstCouponDate: "",
    couponCap: "",
    couponFloor: "",
    couponFrequency: "",
    couponRate: "",
    couponType: "",
    floatSpread: "",
    isCallable: false,
    isFixToFloat: false,
    isPutable: false,
    issueDate: "",
    lastResetDate: "",
    maturityDate: "",
    maximumCallNoticeDays: "",
    maximumPutNoticeDays: "",
    penultimateCouponDate: "",
    resetFrequency: "",
    hasPosition: false,
    duration: "",
    volatility30d: "",
    volatility90d: "",
    convexity: "",
    averageVolume30d: "",
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
    bloombergIndustryGroup: "",
    bloombergIndustrySubGroup: "",
    bloombergSector: "",
    issueCountry: "",
    issueCurrency: "",
    issuer: "",
    riskCurrency: "",
    putDate: "",
    putPrice: "",
    callDate: "",
    callPrice: "",
    askPrice: "",
    highPrice: "",
    lowPrice: "",
    openPrice: "",
    volume: "",
    bidPrice: "",
    lastPrice: "",
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

    const processedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value === "" ? null : value])
    );

    axios
      .post("https://localhost:7248/sm/BondBonds", processedData)
      .then(() => {
        setApiError("Bond added successfully");
    })
    .catch((err) => {
        console.error("Error adding bond:", err);
        setApiError(err.message || "Something went wrong");
    });
  };

  return (
    <Container maxWidth="lg">
      <Paper sx={{ padding: 3, marginTop: 5, marginBottom: 5 ,maxHeight: "61vh", overflow:"auto"}}>
      <Typography variant="h5" gutterBottom>
        Add a new Bond
      </Typography>
      <br></br>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {Object.keys(formData).map((key) => (
            <Grid item xs={6} sm={6} key={key}>
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
                  type={
                    key.includes("Date")
                      ? "date"
                      : key.includes("Price") || key.includes("Amount") || key.includes("Volume")
                        ? "number"
                        : "text"
                  }
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

export default AddBond;
