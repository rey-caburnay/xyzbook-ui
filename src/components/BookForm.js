import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Form , Alert} from 'react-bootstrap';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { bookService } from '../service';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';


const BookForm = (props) => {
  const [book, setBook] = useState({
    title: props.book ? props.book.bookname : '',
    bookAuthors: props.book ? props.book.authors.split(",") : [],
    publisher: props.book ? props.book.quantity : '',
    price: props.book ? props.book.price : '',
    publication: props.book ? props.book.publication : '',
    edition: props.book ? props.book.edition: '',
    isbn13: props.book ? props.book.isbn13 : '',
    isbn10: props.book ? props.book.isbn10 : ''
    
  });
  const [errors, setErrors] = useState([]);
  const { title, author, price, isbn13, isbn10, edition, publication, publisher, bookAuthors } = book;
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const [alert, setAlert] = useState({
    variant:'success', 
    message:''
  });

  const handleOnSubmit = () => {
    // event.preventDefault();
    const requiredValues =[title, price, isbn13, isbn10, publication, publisher, bookAuthors];
    let errorMsg = '';
    let errors=[];

    const allFieldsFilled = requiredValues.every((field) => {
      const value = `${field}`.trim();
      return value !== '' && value !== '0';
    });
   
    if (allFieldsFilled) {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('price', price);
        formData.append('isbn13', isbn13);
        formData.append('isbn10', isbn10);
      
        formData.append('edition', edition);
        formData.append('publication', publication);
        formData.append('publisher', publisher);
        
        bookAuthors.map((option) => (
            formData.append('authors[]', option.id)
     
        ))

        if(selectedFile) {
            formData.append('image', selectedFile);
        }
    //   const book = {
    //     title:title,
    //     author:author,
    //     price:price,
    //     isbn13:isbn13,
    //     isbn10:isbn10,
    //     edition:edition,
    //     publication:publication,
    //     publisher:publisher,
    //     bookAuthors,
    //     image:selectedFile
        
    //   };
    // //   props.handleOnSubmit(book);

    bookService.saveBook(formData).then(response=>{
        if(response.status === 200) {
            setAlert({show:true, variant:'success', message:'New book added.'})
            setTimeout(()=>setAlert({show:false}),3000);
        } else {
            setAlert({show:true, variant:'danger', message:'Ooops! Something wrong with the request'})

        }
    })

    } else {
      errorMsg = 'Please fill out all the fields.';
    }
    setErrorMsg(errorMsg);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'price':
      case 'publication':
        if (value.match(/^\d{1,}(\.\d{0,2})?$/)) {
          setBook((prevState) => ({
            ...prevState,
            [name]: value
          }));
        }
        break;
      case 'author':
        const selectedAuthor = authors.filter(e=>e.id === value)[0];
        const exist = bookAuthors.filter(e=>e.id === selectedAuthor.id);
        
        if(exist.length < 1) {
            bookAuthors.push(selectedAuthor);
            setBook((prevState) => ({
                ...prevState,
                [name]: value
              }));
        }
        
        break;
      default:
        setBook((prevState) => ({
          ...prevState,
          [name]: value
        }));
    }
  };

  /**
   * component did mount, update
   */
  useEffect(() => {
      fetchAuthors();
      fetchPublishers();
  },[]);

  const fetchAuthors=()=> {
        bookService.getAuthors().then(response=>{
            if(response.status === 200){

                setAuthors(response.data)
            }
        })
  }

  const fetchPublishers=()=> {
    bookService.getPublishers().then(response=>{
        if(response.status === 200) {
            setPublishers(response.data);
        }
    })
  }

 

  return (
    <React.Fragment>
        <Card>
            <Card.Header></Card.Header>
            <Card.Body>

            <Box
                    
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 2, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleOnSubmit}
                    >
                    <Row>
                        <Col>
                            <TextField
                            required
                            name="title"
                            id="outlined-required"
                            label="Title"
                            defaultValue={title}
                            onChange={handleInputChange}
                            />
                        </Col>
                        <Col>
                           {
                            <TextField
                            required
                            error = {errors.indexOf('isbn') > -1}
                            helperText={errors && errors.indexOf('isbn') >=0 ? 'Invalid ISBN 13' : ''}
                            name="isbn13"
                            id="outlined-required"
                            label="ISBN 13"
                            value={isbn13}
                            onChange={handleInputChange}

                            onBlur={(e)=>{
                                if(e.currentTarget.value.length > 0) {
                                    bookService.validateISBN(e.currentTarget.value).then(response=>{
                                        if(response.status === 400 || response.status === 404) {
                                            // errors.push('isbn');
                                            setErrors(['isbn'])
                                        } else if(response.status === 200) {
                                            const data = response.data;
                                            setBook((prevState) => ({
                                                ...prevState,
                                                isbn10:data.isbn10,
                                                isbn13:data.isbn13
                                            }));
                                            setErrors([]);
                                        }
                                    })
                                }
                            }}
                      
                            />
                        }
                        </Col>
                        <Col>
                            <TextField
                            error = {errors.indexOf('isbn') > -1}
                            helperText={errors && errors.indexOf('isbn') >=0 ? 'Invalid ISBN 10' : ''}
                            
                            name="isbn10"
                            id="outlined-required"
                            label="ISBN 10"
                            onChange={handleInputChange}
                            value={isbn10}
                            onBlur={(e)=>{
                                    if(e.currentTarget.value.length > 0) {
                                        bookService.validateISBN(e.currentTarget.value).then(response=>{
                                            
                                            if(response.status === 400 || response.status === 404) {
                                                // errors.push('isbn');
                                                setErrors(['isbn'])
                                            } else if(response.status === 200) {
                                                const data = response.data;
                                                console.log(data);
                                                setBook((prevState) => ({
                                                    ...prevState,
                                                    isbn10:data.isbn10,
                                                    isbn13:data.isbn13
                                                }));
                                                console.log(book);
                                                setErrors([]);
                                            }
                                        })
                                    }
                            }}
                                    
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <TextField
                                required
                                select
                                name="publisher"
                                id="outlined-required"
                                label="Publisher"
                                value={publisher}
                                onChange={handleInputChange}
                      
                                >
                                  {publishers.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                    </MenuItem>
                                ))}
                                  
                        </TextField>
                        <TextField
                                required
                                name="publication"
                                id="outlined-required"
                                label="publication"
                                value={publication}
                                onChange={handleInputChange}
                      
                        />
                        <TextField
                                name="edition"
                                id="outlined"
                                label="Edition"
                                value={edition}
                                onChange={handleInputChange}
                      
                        />
                        <TextField
                                name="price"
                                id="outlined-required"
                                label="Price"
                                value={price}
                                onChange={handleInputChange}
                      
                        />
  
                            
                            
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <TextField
                                required
                                select
                                name="author"
                                id="outlined-required"
                                label="Select Author"
                                onChange={handleInputChange}
                      
                                defaultValue="">
                                {authors.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                    {option.fullName}
                                    </MenuItem>
                                ))}
                                </TextField>
                                { bookAuthors && 
                                    <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Middle Name</th>
                                        <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookAuthors.length > 0 && bookAuthors.map((option)=>(
                                        <tr>
                                        
                                        <td>{option.firstName}</td>
                                        <td>{option.lastName}</td>
                                        <td>{option.middleName}</td>
                                        <td><DeleteIcon onClick={
                                            ()=>{
                                                const newAuthors = bookAuthors.filter(e=> e.id !==option.id)
                                                setBook((prevState) => ({
                                                    ...prevState,
                                                    bookAuthors:newAuthors
                                                  }));
                                            }
                                        }/></td>
                                        </tr>
                                        ))}
                                        
                                    
                                    </tbody>
                                    </Table>}
                                
                        </Col>
                        <Col>
                          <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Default file input example</Form.Label>
                                <Form.Control type="file"  onChange={(event)=>{
                                        setSelectedFile(event.target.files[0]);
                                }}/>
                            </Form.Group>
                        </Col>

                    </Row>
                    <Row>
                        <Button  variant={"contained"} onClick={()=>handleOnSubmit()}> Save</Button>
                    </Row>
                    <Row>
                        {alert.show && 
                              <Alert  variant={alert.variant}>
                                    {alert.message}
                                </Alert>
                        }
                    </Row>
            
                   
                      
            </Box>
            </Card.Body>
        </Card>
      
       </React.Fragment>
        
  );
};

export default BookForm;