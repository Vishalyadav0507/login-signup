
// Get the URL search parameters
const urlSearchParams = new URLSearchParams(window.location.search);
let Name=document.getElementById("Name")
let Email=document.getElementById("Email")

// Get the value of a specific query parameter
const displayName = urlSearchParams.get('displayName'); 
const email = urlSearchParams.get('email'); 
const id = urlSearchParams.get('id'); 
Name.value=displayName
Email.value=email

async function signup(e) {
    try {
        e.preventDefault()

        const signUpData = {
            Name: e.target.Name.value,
            Email:e.target.Email.value,
            Password: e.target.Password.value,
        }
        console.log(signUpData)
        const response = await axios.post('http://localhost:3000/user/signup', signUpData)
        if (response.status === 201) {
            alert('signUp successfully')
            window.location.href = 'login.html'
        }
        
    } catch(err){
        console.log(err)
        if(err.status==401){
            alert("user already exist")
        }
        document.body.innerHTML += `<div style="colour:red;">${err.response.data}</div>`;
    }
}
