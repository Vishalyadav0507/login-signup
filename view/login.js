async function login(e) {
    try {
        e.preventDefault()
        const Data = {
            Email: e.target.Email.value,
            Password: e.target.Password.value
        }
        console.log(Data)
        const response = await axios.post("http://localhost:3000/user/login", Data)
        console.log(response.status)
        if (response.status === 200){
            alert("login successfully")
            localStorage.setItem("token",response.data.token)
            window.location.href="data.html"
        } 
        else if(response.status===401){
            alert("password mismatch")
        }else if(response.status===404){
            alert("user is not exist")
        }
        else {
            alert("something went wrong")
        }
    } catch (err) {
        console.log(err)
    }
}

  function onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  }
  function onFailure(error) {
    console.log(error);
  }
  function renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': onSuccess,
      'onfailure': onFailure
    });
  }
