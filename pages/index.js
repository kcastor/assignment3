import { useState } from 'react'

import Head from 'next/head'
import Image from 'next/image'

import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import NavBar from '../components/NavBar'
import Title from '../components/Title'
import FavouriteBooks from '../components/FavouriteBooks'
import { TableCell } from '@mui/material';

const FAVOURITE_BOOKS = [
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    rating: 9
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    rating: 8
  }
]

export default function Home() {


  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [rating, setRating] = useState("")
  const [book, setBooks] = useState(FAVOURITE_BOOKS)
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    fetch(book).then((response) => { 
      return response.json()
    }).then((data) => {
      setBooks(
        {  title: data.title,
          author: data.author,
          rating: data.rating
        }
    )})
  }


  const favoriteBooks = () => {
    
    let FavoriteBooks = [...FAVOURITE_BOOKS]
  
    setBooks(FavoriteBooks)

    
    if (title.trim().length === 0) {
      setErrorMessage("")
      return
    }
    if (author.trim().length === 0) {
      setErrorMessage("")
      return
    }
    if (rating.trim().length === 0) {
      setErrorMessage("")
      return
    }
  
  }

  return (
    <div>
      <Head>
        <title>Library App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar title={"Our Library"} />
      <main>
        <Container sx={{paddingTop: '2rem'}} maxWidth="md">
           <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', marginBottom: "2rem"}}>
              <Title>Add a New Favourite</Title>
            <form
              style={{width: '100%'}}
             onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="title"
                      name="title"
                      label="Book Title"
                      fullWidth
                      variant="standard"
                      onChange={(e)=> {setTitle(e.target.value)}}
                      value={title}
                    />
                  </Grid>
                  <Grid item xs={10} sm={4}>
                    <TextField
                      required
                      id="author"
                      name="author"
                      label="Author"
                      fullWidth
                      variant="standard"
                      onChange={(e)=> {setAuthor(e.target.value)}}
                      value={author}
                    />
                  
                </Grid>
                 <Grid item xs={10} sm={4}>
                    <TextField
                      required
                      id="rating"
                      name="rating"
                      label="Rating"
                      fullWidth
                      variant="standard"
                      onChange={(e)=> {setRating(e.target.value)}}
                      value={rating}
                    />
                  </Grid>
                  <Grid item xs={2} sm={2}>
                  <Button onSubmit={handleSubmit}
                    variant="contained" sx={{ mt: 1.5, ml: 1 }}>Add</Button>
                  </Grid>
                </Grid>
              </form>
           </Paper>
          
  </Container>
      </main>
    </div>
  )
}
