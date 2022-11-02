import React , {useEffect, useState}from 'react';
import { styled } from '@mui/material/styles';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from '@mui/material/TableHead';
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import{bookService} from '../service';
import { Row, Col, Button} from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';



let rows = [];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



const BooksMgt = () => {
 const [books, setBooks]= useState([]);
 const navigate = useNavigate();
  useEffect(() => {
      getAllBooks({});
  },[]);

  const getAllBooks=(critieria)=>{
    bookService.getAllBooks(critieria).then(
      response=> {
        if(response.status === 200) {
          //create rows
            rows =  response.data;
            setBooks(rows);
        }
      }
    )
  }
  
  

  return (
    <React.Fragment>
    <Row>
        <Col><Button variant="primary" className="bg-success" href="/add"><AddIcon/> Add Book</Button></Col>
    </Row>
    <Row>
        <Col>
        
    <TableContainer component={Paper}>
      
    <Table sx={{ minWidth: 700 }} aria-label="simple table">
      <TableHead>
        <TableRow className="font-weight-bold">
          <StyledTableCell>Title</StyledTableCell>
          <StyledTableCell  align="center">Author</StyledTableCell>
          <StyledTableCell align="left">ISBN 13</StyledTableCell>
          <StyledTableCell align="right"> Year</StyledTableCell>
          <StyledTableCell align="left">Publisher</StyledTableCell>
          <StyledTableCell align="left">Edition</StyledTableCell>
          <StyledTableCell align="right">Price</StyledTableCell>
          <StyledTableCell align="right"></StyledTableCell>
          
       
       
       
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <StyledTableRow
            key={row.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0} }}
          >
            <TableCell size="" align="left">{row.title}</TableCell>
            <TableCell align="center">{row.authors}</TableCell>
            <TableCell align="left"><a href={`book/${row.isbn13}`}>{row.isbn13}</a></TableCell>
            <TableCell align="right">{row.publication}</TableCell>
            <TableCell align="left">{row.publisher}</TableCell>
         
            <TableCell align="left">{row.edition}</TableCell>
            <TableCell align="right">{row.price}</TableCell>
            <TableCell align="right"><DeleteIcon className="text-danger"
                onClick={()=>{
                    bookService.deleteBook(row.isbn13).then(response=>{
                        if(response.status === 200) {
                            getAllBooks({});
                        }
                    })
                }}
            /> <EditIcon
                onClick={()=>{
                    navigate(`/edit/${row.isbn13}`)
                }}
            /></TableCell>
            
    
    
    
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
    
  </TableContainer>
  
  </Col>
    </Row>
  </React.Fragment>
  )
};

export default BooksMgt;