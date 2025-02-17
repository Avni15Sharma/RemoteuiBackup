import React, { useState } from "react";
import axios from "axios";
import {  Container,  Typography,  Grid,  TextField,  Checkbox,  FormControlLabel,  Button,  Paper} from "@mui/material";

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
  
    const processedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value === "" ? null : value])
    );

    axios
      .post("https://localhost:7248/sm/BondBonds", processedData)
      .then(() => alert("Bond added successfully"))
      .catch((error) => {
        console.error("Error adding bond:", error);
        alert("Error adding bond");
      });
  };

  return (
    <Container maxWidth="lg">
      <Paper sx={{ padding: 3, marginTop: 5, marginBottom: 5 }}>
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

export default AddBond;
