import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { bookService } from '../service';
import { Delete } from '@mui/icons-material';

export default function BookDtls() {
    const{id} = useParams();
    const navigate = useNavigate();


  
    const[book, setBook] = useState({});


    const getBookByISBN13 = (isbn)=> {
        bookService.getBookByISBN13(isbn).then(response=> {
                if(response.status === 200) {
                    setBook(response.data);
                }

        })
    }

    useEffect(() => {
          getBookByISBN13(id);
      },[]);
    
  
    return (
        <React.Fragment>
            <Row>
                <Col>
                <Card sx={{ maxWidth: 645 }}>
            <CardMedia
                component="img"
                height="auto"
                image={book.cover && `data:image/png;base64,${book.cover}`}
                alt={book.title}
            />
            <CardActions>
                <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Change Cover</Form.Label>
                    <Form.Control type="file" lable  onChange={(event)=>{
                            //setSelectedFile(event.target.files[0]);
                            const file = event.target.files[0];
                            const formData = new FormData();
                            formData.append('file', file);
                            bookService.updateBookCover(book.isbn13, formData).then(response=>{
                                if(response.status === 200) {
                                    setBook({...book, cover:response.data.cover})
                                }
                                    
                            });
                            

                    }}/>
                </Form.Group>
                       
            </CardActions>
            </Card>
                </Col>
                <Col>
                    <Card>
                    <CardContent>
                        <Row>
                            <Col sm={2}>Title:
                           
                            </Col>
                            <Col>
                            <Typography gutterBottom variant="h5" component="div">
                        {book.title}  <span className='badge'></span>
                            </Typography>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={2}>
                                Edition:
                            </Col>
                            <Col>
                            <Typography variant="overline">
                             {book.edition}
                            
                            </Typography>
                            </Col>
                
                        </Row>
                        <Row>
                            <Col sm={2}>
                                Authors:
                            </Col>
                            <Col>
                                   
                                <Typography variant="overline" book="text.secondary">
                                {book.authors}</Typography>
                                
                 
                            </Col>
                        </Row>
                     
                        <Row>
                            <Col sm={2}>Publisher:</Col>
                            <Col>
                            <Typography variant="overline" color="text.secondary">
                        {book.publisher} </Typography>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={2}>
                                Publication:
                            </Col>
                            <Col>
                            <Typography variant="overline" color="text.secondary">
                            {book.publication} 
                        </Typography>
                   
                            </Col>
                        </Row>

                       <Row>
                            <Col sm={2}>
                                Price:
                            </Col>
                            <Col>
                            <Typography variant="overline" color="text.primary">
                            ${book.price} 
                        </Typography>
              
                            </Col>
                        </Row>  
                    
                        <Button size="small" className="text-danger" onClick={()=>{
                            bookService.deleteBook(book.isbn13).then(response=>{
                                if(response.status === 200) {
                                    navigate('/');
                                }
                            })
                        }}><Delete/> Delete</Button>
       
                    </CardContent>
             
         
                    </Card>
                </Col>
            </Row>
         
    </React.Fragment>
  );
}
