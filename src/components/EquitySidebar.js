import React from "react";
import { Paper, Button, Stack, Typography } from "@mui/material";
import {useTheme} from "@mui/material/styles";

const EquitySidebar = ({ onSelect }) => {
    const theme=useTheme();
    return (
        <div >
            <br></br><br></br>
            <Typography variant="h6" gutterBottom>
                Equity Panel
            </Typography>
            <Stack spacing={1} minWidth={"20vw"}>
                <Button variant="contained" sx={{ backgroundColor: "#1B2A49" }} fullWidth onClick={() => onSelect("add")}>
                    Create
                </Button>
                
                <Button variant="contained" sx={{ backgroundColor: "#FFF9C4", color: "#000" }} fullWidth onClick={() => onSelect("update")}>
                    Search & Edit
                </Button>
                <Button variant="contained" sx={{ backgroundColor: "#1B2A49" }} fullWidth onClick={() => onSelect("details")}>
                    Details
                </Button>
                <Button variant="contained" sx={{ backgroundColor: "#FFF9C4", color: "#000" }} fullWidth onClick={() => onSelect("gettabs")}>
                    Tab Info
                </Button>
                <Button variant="contained" color="warning" fullWidth onClick={() => onSelect("delete")}>
                    Remove
                </Button>
            </Stack>
       
        </div>
    );
};

export default EquitySidebar;
