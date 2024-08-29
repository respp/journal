import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const blackTheme = createTheme({
    palette : {
        primary : {
            main : '#221f1e'
        },
        secondary : {
            main : '#11100f'
        },
        error : {
            main : red.A400
        },
    }
})