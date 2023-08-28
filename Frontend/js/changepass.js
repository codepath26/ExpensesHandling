const form = document.getElementById('forget-pasword')
const email = document.getElementById('email')


//addevent listener

form.addEventListener('submit' , forgotPass);


//callback function

async function forgotPass(e){
  e.preventDefault();
  const obj = { 
    email : email.value ,
  }
  axios.post('http://localhost:9000/password/forgotpassword',obj).then(response => {
    if(response.status === 202){
        document.body.innerHTML += '<div style="color:red;">Mail Successfuly sent <div>'
    } else {
        console.log("somthing went wrong")
    }
}).catch(err => {
  console.log(err)
    document.body.innerHTML += `<div style="color:red;">${err} <div>`;
})
}