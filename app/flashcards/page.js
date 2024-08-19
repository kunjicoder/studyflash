'use client'

import { useUser } from '@clerk/nextjs'
import { useState, useEffect } from 'react'
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
} from '@mui/material'
import { collection, doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase.js' // Assuming you have a firebase.js file

export default function Flashcards() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [flashcardSets, setFlashcardSets] = useState([])
  const [flipped, setFlipped] = useState({})

  useEffect(() => {
    const fetchFlashcardSets = async () => {
      if (!isLoaded || !isSignedIn) return

      try {
        const userDocRef = doc(collection(db, 'users'), user.id)
        const docSnap = await getDoc(userDocRef)

        if (docSnap.exists()) {
          const userData = docSnap.data()
          setFlashcardSets(userData.flashcardSets || [])
        } else {
          setFlashcardSets([])
        }
      } catch (error) {
        console.error('Error fetching flashcard sets:', error)
      }
    }

    fetchFlashcardSets()
  }, [isLoaded, isSignedIn, user])

  const handleCardClick = (setIndex, cardIndex) => {
    setFlipped((prev) => ({
      ...prev,
      [`${setIndex}-${cardIndex}`]: !prev[`${setIndex}-${cardIndex}`],
    }))
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Your Flashcard Sets
        </Typography>

        {flashcardSets.length > 0 ? (
          flashcardSets.map((set, setIndex) => (
            <Box key={setIndex} sx={{ mt: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                {set.name}
              </Typography>
              <Grid container spacing={2}>
                {set.flashcards.map((flashcard, cardIndex) => (
                  <Grid item xs={12} sm={6} md={4} key={cardIndex}>
                    <Card onClick={() => handleCardClick(setIndex, cardIndex)}>
                      <CardContent>
                        <Typography variant="h6">
                          {flipped[`${setIndex}-${cardIndex}`] ? 'Back:' : 'Front:'}
                        </Typography>
                        <Typography>
                          {flipped[`${setIndex}-${cardIndex}`] ? flashcard.back : flashcard.front}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))
        ) : (
          <Typography variant="body1">
            No flashcard sets found. Generate some flashcards first!
          </Typography>
        )}
      </Box>
    </Container>
  )
}