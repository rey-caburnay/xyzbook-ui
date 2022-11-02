import { handleResponse, GET_OPTIONS, POST_FORM } from "../utils";
export function fetchApi(url, options) {
    const backend = 'http://localhost:9090'
    return fetch(`${backend}/${url}`, options).then(handleResponse)
    .then(response => {
        return response;
   },error=>{
    return error;
   }).catch();
}



export const bookService = {
    getBookByISBN13,
    getAllBooks,
    getAuthors,
    getPublishers,
    validateISBN,
    saveBook,
    updateBookCover,
    deleteBook
    
}


function getBookByISBN13(isbn13) {
    return fetchApi(`book/${isbn13}`, GET_OPTIONS())
}

function getAllBooks(criteria) {
    return fetchApi(`books`, GET_OPTIONS())
}

function getAuthors() {
    return fetchApi(`authors`, GET_OPTIONS())
}

function getPublishers() {
    return fetchApi(`publishers`, GET_OPTIONS())
}

function validateISBN(isbn) {
    return fetchApi(`books/${isbn}/validate`, GET_OPTIONS())
}

function saveBook(book) {
    return fetchApi(`book`, 
    {
        //   mode: 'no-cors',
           method:'POST',
           headers:{
            // "Content-type": "multipart/form-data",
           },
           body:book
          }
    );
}

function updateBookCover(isbn, formdata) {
    return fetchApi(`book/${isbn}/cover`, 
    {
        //   mode: 'no-cors',
           method:'PUT',
           headers:{
            // "Content-type": "multipart/form-data",
           },
           body:formdata
          }
    );
}

function deleteBook(isbn, formdata) {
    return fetchApi(`book/${isbn}`, 
    {
        //   mode: 'no-cors',
           method:'DELETE',
           headers:{
            // "Content-type": "multipart/form-data",
           }
           
          }
    );
}