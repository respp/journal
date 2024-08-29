import { useMemo } from "react"
import { Google } from "@mui/icons-material"
import { Grid, Typography, TextField, Link, Button, Alert } from "@mui/material"
import { Link as RouterLink } from 'react-router-dom'
import { AuthLayout } from "../layout"
import {useForm} from '../../hooks'
import { useDispatch, useSelector } from "react-redux"
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth"

const formData = {
  email:'jorgelin@google.com',
  password:'123456'
}

export const LoginPage = () => {

  const { status, errorMessage } = useSelector(state => state.auth)

  const dispatch = useDispatch()
  const { password, email, onInputChange } = useForm( formData )

  const isAuthenticating = useMemo( ()=> status === 'checking', [status] )

  const onSubmit =e=>{
    e.preventDefault()
    console.log(email, password)
    dispatch( startLoginWithEmailPassword({email, password}) )
  }

  const onGoogleSignIn = e =>{
    console.log('on google sign in')
    dispatch( startGoogleSignIn(email, password) )

  }

  return (
        <AuthLayout title='Login'>
        <form onSubmit={onSubmit}
    className="animate__animated animate__fadeIn animate__fasted"
        
        >
          <Grid container>

            <Grid item xs={12} sx={{ mt:2}}>
              <TextField 
              label='Correo' 
              type="email" 
              placeholder="correo@google.com" 
              fullWidth
              name="email"
              value={ email }
              onChange={onInputChange}
              />
            </Grid>  

            <Grid item xs={12} sx={{mt:2}}>
              <TextField 
              label='Contraseña' 
              type="password" 
              placeholder="contraseña" 
              fullWidth
              name="password"
              value={ password }
              onChange={onInputChange}
              />
            </Grid> 

            <Grid container spacing={2} sx={{mb:2,mt:1}}>

            <Grid 
                item 
                xs={ 12 }
                display={ !!errorMessage ? '': 'none' }
              >
                <Alert severity='error'>{ errorMessage }</Alert>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button 
                type="submit" 
                variant='contained' 
                fullWidth 
                disabled={ isAuthenticating ? true : false }
                >
                  Login
                </Button>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button 
                variant='contained' 
                fullWidth 
                onClick={onGoogleSignIn}
                disabled={ isAuthenticating ? true : false }
                >
                  <Google />
                  <Typography sx={{ml:1}}>Google</Typography>
                </Button>
              </Grid>
            </Grid>

            <Grid container direction='row' justifyContent='end'>
              <Link component={RouterLink} color='inherit' to='/auth/register'>
                Crear una cuenta
              </Link>
            </Grid>

          </Grid>
        </form>
        </AuthLayout>
  )
}
