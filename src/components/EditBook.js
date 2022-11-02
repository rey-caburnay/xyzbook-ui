import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';

import Card from '@mui/material/Card';
import { bookService } from '../service';
import { Delete } from '@mui/icons-material';
import BookForm from './BookForm';

export default function EditBook() {
    const{id} = useParams();
  
  
    const[book, setBook] = useState(null);


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
                <Card>
                    {book && 
                        <BookForm book={book}/>
                    }
                </Card>
                </Col>
            </Row>         
    </React.Fragment>
  );
}
