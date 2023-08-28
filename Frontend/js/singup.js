const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const form = document.getElementById('signup-form')
const details = document.getElementById('details')
form.addEventListener('submit' , signUp)

async function signUp (e){

e.preventDefault();
  const obj = {
    name : username.value,
    email : email.value,
    password : password.value
  }
  try
  {
    let user = await axios.post(`http://localhost:9000/user/signup` , obj)
    console.log(user.ispremiumuser)
    localStorage.setItem('ispremium' ,user.ispremiumuser)
     username.value  = "",
     email.value = "",
     password.value = "" ,
     window.location.href = "../html/login.html"
    
    }catch(err){
    console.log(err);
   
  }
}



