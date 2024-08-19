import React from 'react'
import { Container, Box, Typography, AppBar, Toolbar, Button } from '@mui/material'
import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'

export default function SignUpPage() {
  return <Container maxWidth="lg">
    <AppBar position="static" sx={{backgroundColor: '#3f51b5'}}>
    <Toolbar>
        <Typography variant="h6" sx={{flexGrow: 1}}>
        StudyFlash AI
        </Typography>
        <Button color="primary" variant="contained" href="/login">
            Login
        </Button>
    </Toolbar>
    </AppBar>

    <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{textAlign: 'center', my: 4}}
        >
        <Typography variant="h4" component="h1" gutterBottom>
            Sign In
        </Typography>
        <SignIn />
    </Box>

  </Container>
}