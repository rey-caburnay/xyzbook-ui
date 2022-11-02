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



const Publishers = () => {
 
  const[data, setData] = useState([]);
  useEffect(() => {
      getPublishers({});
  },[]);

  const getPublishers=()=>{
    bookService.getPublishers().then(
      response=> {
        if(response.status === 200) {
          //create rows
            rows =  response.data;
            setData(rows);
        }
      }
    )
  }
  
  

  return (
    <React.Fragment>
    <Row>
        <Col><Button variant="primary" className="bg-success" href="/add"><AddIcon/> Add Author</Button></Col>
    </Row>
    <Row>
        <Col>
        
    <TableContainer component={Paper}>
      
    <Table sx={{ minWidth: 700 }} aria-label="simple table">
      <TableHead>
        <TableRow className="font-weight-bold">
          <StyledTableCell>Publisher</StyledTableCell>
          <StyledTableCell align="left"></StyledTableCell>
     
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <StyledTableRow
            key={row.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell align="left">{row.name}</TableCell>
            <TableCell align="right"><DeleteIcon className="text-danger"/>  <EditIcon/></TableCell>
            
    
    
    
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

export default Publishers;