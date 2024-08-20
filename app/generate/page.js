'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Container,
  CardActionArea,
} from '@mui/material'
import { collection, doc, getDoc, writeBatch } from 'firebase/firestore'
import { db } from '../../firebase.js' // Assuming you have a firebaseConfig file

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [text, setText] = useState('')
  const [flashcards, setFlashcards] = useState([])
  const [flipped, setFlipped] = useState({})
  const [name, setName] = useState('')
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: text,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate flashcards');
      }
      const data = await response.json();
      setFlashcards(data);
    } catch (err) {
      console.error('Error generating flashcards:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const saveFlashcards = async () => {
    if (!name.trim()) {
      alert('Please enter a name for your flashcard set.')
      return
    }

    try {
      const batch = writeBatch(db)
      const userDocRef = doc(collection(db, 'users'), user.id)
      const docSnap = await getDoc(userDocRef)

      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || []
        if (collections.find((f) => f.name === name)) {
          alert('A flashcard collection with this name already exists. Please choose a different name.')
          return
        } else {
          collections.push({ name })
          batch.set(userDocRef, { flashcards: collections }, { merge: true })
        }
      } else {
        batch.set(userDocRef, { flashcards: [{ name }] }, { merge: true })
      }

      const colRef = collection(userDocRef, name)
      flashcards.forEach((flashcard) => {
        const cardDocRef = doc(colRef)
        batch.set(cardDocRef, flashcard)
      })

      await batch.commit()
      handleClose()
      router.push('/flashcards')
    } catch (err) {
      console.error('Error saving flashcards:', err)
      alert('Failed to save flashcards. Please try again.')
    }
  }

  return (
    <Container maxWidth="md">
      <Box sx={{
        mt: 4, mb: 6, display: 'flex', flexDirection: 'column', alignItems: 'center'
      }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Generate Flashcards
        </Typography>
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          label="Enter text"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          sx={{ mb: 2 }}
        />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSubmit} 
        fullWidth
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Submit'}
      </Button>
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          Error: {error}
        </Typography>
      )}
      </Box>
      
      {flashcards.length > 0 && (
        <>
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Flashcards Preview
            </Typography>
            <Grid container spacing={3}>
              {flashcards.map((flashcard, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <CardActionArea onClick={() => handleCardClick(index)}>
                    <CardContent>
                      <Box 
                        sx={{
                          perspective: '1000px',
                          '& > div': {
                            transition: 'transform 0.6s',
                            transformStyle: 'preserve-3d',
                            position: 'relative',
                            width: '100%',
                            height: '208px',
                            boxShadow: '0 4px 8px 0 rgba(0,0,0, 0.2)',
                            transform: flipped[index] 
                              ? 'rotateY(180deg)' 
                              : 'rotateY(0deg)',
                          },
                          '& > div > div': {
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            backfaceVisibility: 'hidden',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 2,
                            boxSizing: 'border-box',
                          },
                          '& > div > div:nth-of-type(2)': {
                            transform: 'rotateY(180deg)', 
                          }
                        }}
                      >
                        <div>
                          <div>
                            <Typography variant="h6" component="div">
                              {flashcard.front}
                            </Typography>
                          </div>
                          <div>
                            <Typography variant="body1" component="div">
                              {flashcard.back}
                            </Typography>
                          </div>
                        </div>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" color="primary" onClick={handleOpen}>
              Save Flashcards
            </Button>
          </Box>
        </>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save Flashcard Set</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your flashcard set.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Set Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveFlashcards} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}