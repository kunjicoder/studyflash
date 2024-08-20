import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Button, Container, Toolbar, Typography, Box, Grid } from "@mui/material";
import Head from "next/head";

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Head>
        <title>StudyFlashAI</title>
        <meta name="description" content="Generate AI based advanced flashcards from your text, documents, etc" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppBar position="static" sx={{ backgroundColor: '#fff', boxShadow: 'none', mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#333' }}>
            StudyFlashAI
          </Typography>
          <SignedOut>
            <Button color="primary" variant="outlined" sx={{ mx: 1, '&:hover': { boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)', transform: 'scale(1.05)' } }} href="/sign-in">Login</Button>
            <Button color="primary" variant="contained" sx={{ '&:hover': { boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)', transform: 'scale(1.05)' } }} href="/sign-up">Register</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box sx={{ textAlign: 'center', my: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          Welcome to StudyFlash AI
        </Typography>
        <Typography variant="h5" component="h2" sx={{ mb: 4, color: '#666' }}>
          Unlock Your Learning Potential with our AI-Driven Flashcards.
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2, mx: 1 }} href="/generate">
          Get Started
        </Button>
        <Button variant="outlined" color="primary" sx={{ mt: 2, mx: 1 }}>
          Learn More
        </Button>
      </Box>

      <Box sx={{ my: 6, textAlign: 'center', p: 4, borderRadius: 4, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 5, fontWeight: 'bold', color: '#333' }}>
          Features
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[
            { title: 'AI-Powered Content Generation', description: 'Automatically generate flashcards from your text and documents.' },
            { title: 'Customizable Flashcards', description: 'Personalize your flashcards with images, colors, and styles.' },
            { title: 'Progress Tracking', description: 'Monitor your learning progress and performance over time.' },
            { title: 'Collaborative Learning', description: 'Share flashcards with friends and study together.' },
            { title: 'Multi-Format Support', description: 'Import content from various formats including PDFs and Word documents.' },
            { title: 'Mobile-Friendly', description: 'Access your flashcards on any device, anytime, anywhere.' },
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} sx={{ p: 2 }}>
              <Box sx={{ 
                backgroundColor: '#fff', 
                p: 3, 
                borderRadius: 3, 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                textAlign: 'center', 
                transition: 'transform 0.4s ease, box-shadow 0.4s ease', 
                '&:hover': { 
                  transform: 'scale(1.05)', 
                  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)' 
                }
              }}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: '600', color: '#222' }}>
                  {feature.title}
                </Typography>
                <Typography sx={{ color: '#666' }}>
                  {feature.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ my: 6, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4, fontWeight: 'bold', color: '#333' }}>
          Pricing
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ 
              backgroundColor: '#fff', 
              p: 3, 
              borderRadius: 3, 
              textAlign: 'center', 
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
              transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
              '&:hover': { 
                transform: 'scale(1.03)', 
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' 
              }
            }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
                Free Plan
              </Typography>
              <Typography variant="h5" sx={{ mb: 3, color: '#1e88e5' }}>
                $0
              </Typography>
              <Typography sx={{ mb: 2, color: '#666' }}>
                - 10 flashcards generatable per day
              </Typography>
              <Typography sx={{ mb: 2, color: '#666' }}>
                - Limited customization options
              </Typography>
              <Typography sx={{ mb: 2, color: '#666' }}>
                - Basic progress tracking
              </Typography>
              <Button variant="outlined" color="primary" href="/sign-up">
                Sign Up Free
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ 
              backgroundColor: '#fff', 
              p: 3, 
              borderRadius: 3, 
              textAlign: 'center', 
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
              transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
              '&:hover': { 
                transform: 'scale(1.03)', 
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' 
              }
            }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
                Premium Plan
              </Typography>
              <Typography variant="h5" sx={{ mb: 3, color: '#1e88e5' }}>
                $2/month
              </Typography>
              <Typography sx={{ mb: 2, color: '#666' }}>
                - Unlimited flashcards
              </Typography>
              <Typography sx={{ mb: 2, color: '#666' }}>
                - Advanced customization options
              </Typography>
              <Typography sx={{ mb: 2, color: '#666' }}>
                - Detailed progress tracking
              </Typography>
              <Button variant="contained" color="primary" href="/sign-up">
                Upgrade Now
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}