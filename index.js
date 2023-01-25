//global variables
require('dotenv').config()

let token = process.env.TOKEN
let postId = ''
//fetch functions
const registerNewUser = async() => {
    try { 
        const response = await fetch('https://strangers-things.herokuapp.com/api/2209-ftb-et-web-am/users/register', 
        {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user: {
                username: 'matts',
                password: '123go'
              }
            })})
        const result = await response.json()
        token = result.data.token
     }catch(error){
        console.log(error)
     }
};

/*const registerNewUser = async() => {
    try { 
        const response = await fetch()
        const result = await response.json()
     }catch(error){
        console.log(error)
     }
};*/
const loginUser = async() => {
    try { 
        const response = await fetch('https://strangers-things.herokuapp.com/api/2209-ftb-et-web-am/users/login', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user: {
                username: 'matts',
                password: '123go'
              }
            })
          })
        const result = await response.json()
        console.log(result.data.token)
     }catch(error){
        console.log(error)
     }
};

const getAllPosts = async() => {
    try { 
        const response = await fetch('https://strangers-things.herokuapp.com/api/2209-ftb-et-web-am/posts')
        const result = await response.json()
        console.log(result.data.posts)
     }catch(error){
        console.log(error)
     }
};

const createPost = async() => {
    try { 
        const response = await fetch('https://strangers-things.herokuapp.com/api/2209-ftb-et-web-am/posts', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              post: {
                title: "Dirtbike",
                description: "This is a beautiful dirtbike, mint condition.",
                price: "$560.00",
                willDeliver: true
              }
            })
          })
        const result = await response.json()
        console.log('created post',result.data)
        postId = result.data.post._id
     }catch(error){
        console.log(error)
     }
};

const editPost = async() => {
    try { 
        const response = await fetch(`http://strangers-things.herokuapp.com/api/2209-ftb-et-web-am/posts/${postId}`, {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              post: {
                title: "Dirtbike",
                description: "This is a beautiful dirtbike, mint condition.",
                price: "$1000.00",
                location: "New York, NY",
                willDeliver: false
              }
            })
          })
        const result = await response.json()
        console.log(result.data)
     }catch(error){
        console.log(error)
     }
};

const deletePost = async() => {
    try { 
        const response = await fetch(`https://strangers-things.herokuapp.com/api/2209-ftb-et-web-am/posts/${postId}`, {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          })
        const result = await response.json()
        console.log(result)
     }catch(error){
        console.log(error)
     }
};

const createMessage = async() => {
    try { 
        const response = await fetch('https://strangers-things.herokuapp.com/api/2209-ftb-et-web-am/posts/63a5f2147ff05500179f7399/messages', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              message: {
                content: "Still available? Will you take $25?"
              }
            })
          })
        const result = await response.json()
        console.log(result.data.message)
     }catch(error){
        console.log(error)
     }
};

const getCurrentUserMessages = async() => {
    try { 
        const response = await fetch('https://strangers-things.herokuapp.com/api/2209-ftb-et-web-am/users/me', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          })
        const result = await response.json()
        console.log(result.data.messages)
     }catch(error){
        console.log(error)
     }
};

const runFile = async() => {
    try { 
        if (!token){
            await registerNewUser()
        }
        await loginUser()
        await getAllPosts()
        await createPost()
        await editPost()
        await deletePost()
        await createMessage()
        await getCurrentUserMessages()
      }catch(error){
        console.log(error)
     }
};

runFile()