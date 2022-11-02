import React , {useEffect, useState}from 'react';
import{bookService} from '../service';
import Book from './Book';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';



let rows = [];




const BooksList = () => {
 const [books, setBooks]= useState([]);
  
 useEffect(() => {
    console.log('here');
      getAllBooks({});
  },[]);

  const getAllBooks=(critieria)=>{
    bookService.getAllBooks(critieria).then(
      response=> {
        console.log(response);
        if(response.status === 200) {
          //create rows
            rows =  response.data;
            setBooks({});
        }
      }
    )
  }
  
  

  return (
    <React.Fragment>
    <Box sx={{ flexGrow: 1 }}><Grid container spacing={2}>
  {rows.map((row) => (
    <Grid item xs={4}>
    
      <Book book={row}/>
      
    </Grid>

  ))}
 
  </Grid>
  </Box>
  

  </React.Fragment>
  )
};

export default BooksList;