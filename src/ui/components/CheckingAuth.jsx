import { CircularProgress, Grid } from "@mui/material"

export const CheckingAuth = () => {
  return (
    <div>
    <Grid
        container
        spacing={0}
        direction= 'column'
        alignItems= 'center'
        justifyContent='center'
        sx={{ minHeight: '100vh', backgroundColor : 'primary.main', pb : 4 }}
    >

    <Grid container
        direction='row'
        justifyContent='center'
    >

            <CircularProgress color="warning" />

    </Grid>
    </Grid>
    </div>
  )
}
