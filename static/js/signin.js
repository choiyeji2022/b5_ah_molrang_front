
window.onload = () => {
    console.log("로딩되었음!")
}

async function handleSignin(){
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    console.log(username,password)

    const response = await fetch(`${backend_base_url}/users/login/`,{
        headers: {
            'content-type' : 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
                "username":username,
                "password":password,
            }) 
    })
    
    if(response.status==200){
        const response_json = await response.json()

    console.log(response_json)
    console.log(response)

    localStorage.setItem("access", response_json.access)
    localStorage.setItem("refresh", response_json.refresh)

    const base64Url = response_json.access.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    localStorage.setItem("payload", jsonPayload);

    alert("환영합니다!")
    window.location.replace(`${frontend_base_url}/`)

    }else{
        alert("회원정보가 일치하지 않습니다!")
    }
    

} 
checkLogin()