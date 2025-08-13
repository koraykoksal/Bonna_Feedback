import React from 'react'
import Avatar from "@mui/material/Avatar"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import LockIcon from "@mui/icons-material/Lock"
import { Link, Outlet, useNavigate } from "react-router-dom"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { Formik, Form } from "formik"
import { object, string } from "yup"
import useAuthCall from '../hooks/useAuthCall'
import { useState } from 'react'
import { IoHome } from "react-icons/io5";
import image from "../assets/img/loginImg.png"
import { loginPageStyle } from '../styles/globalStlye'

const Login = () => {


  const [info, setInfo] = useState({
    email: "",
    password: ""
  })

  const { login } = useAuthCall()

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {

    e.preventDefault()

    login(info)

    setInfo({
      email: "",
      password: ""
    })
  }

  return (

    <div style={loginPageStyle}>
      <Container sx={{ mt: 15 }}>

        <Grid
          container
          justifyContent="center"
          direction="row-reverse"
          sx={{
            alignItems: 'center',
            p: 2,
            gap: 5,
          }}
        >


          <Grid item xs={10} sm={8} md={6}>
            <Avatar
              sx={{
                backgroundColor: "secondary.light",
                m: "auto",
                width: 40,
                height: 40,
              }}
            >
              <LockIcon size="30" />
            </Avatar>
            <Typography
              variant="h4"
              align="center"
              mb={4}
              color="secondary.light"
            >
              Login
            </Typography>


            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }} component='form' onSubmit={handleSubmit}>
              <TextField
                required
                label="E-Posta"
                name="email"
                id="email"
                type="text"
                variant="outlined"
                value={info.email}
                onChange={handleChange}
              />
              <TextField
                required
                label="Parola"
                name="password"
                id="password"
                type="password"
                variant="outlined"
                value={info.password}
                onChange={handleChange}
              />
              <Button variant="contained" type="submit" sx={{ letterSpacing: 5, textTransform: 'none' }}>
                Giriş
              </Button>

            </Box>



          </Grid>

          <Grid item xs={10} sm={8} md={5}>
            <Container>
              <img src={image} alt="img" />
            </Container>
          </Grid>

        </Grid>
      </Container>
    </div>

  )
}

export default Login