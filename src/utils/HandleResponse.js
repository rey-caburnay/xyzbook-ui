export function GET_OPTIONS() {
    return {
      // mode: 'no-cors',
      method:'GET',
    }
}

export function POST_OPTIONS(data)  {
  return {
//   mode: 'no-cors',
   method:'POST',
   headers:{
    'Content-Type': 'application/json'
   },
   body:data
  }
}

export function POST_FORM(data)  {
  return {
//   mode: 'no-cors',
   method:'POST',
   headers:{
   },
   body:data
  }
}


export function handleResponse(response) {
        return response.text().then(text => {
           let data = null;
            try{
                data = text ? JSON.parse(text) : {};
    //            return text ? text : {};
            }catch(e) {
              console.log("error parsing response:" + e);
              console.dir(text);
            }
    
            if (!response.ok) {
              if([500].indexOf(response.status) !== -1) {
                  let message = "Internal server error: ";
                  if(data) {
                    message = message + data.message;
                  }
                  return Promise.reject({message:message, status: response.status});
                }
    
                if(data == null) {
                  return Promise.reject("Unable to communicate with the server.");
                } else  {
                  return data;
                }
    
            } else {
    
                 const data = text ? JSON.parse(text) : {};
                 return data;
            }
    
    
        });
    
    }
    
    export function handleBlobResponse(response) {
            
            return response.blob().then(blob => {
                blob.status = response.status;
                 return blob;
    
          });
    
    }
    
    
    