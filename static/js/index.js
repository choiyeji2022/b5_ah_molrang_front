console.log("로딩되었습니다.")

window.onload = () => {
    const payload = localStorage.getItem("payload")
    const payload_parse = JSON.parse(payload)
    console.log(payload_parse.username)

    const intro = document.getElementById("intro")

    intro.innerText = `${payload_parse.username} 님 안녕하세요!`
    
    
    let navbarRight = document.getElementById("nav-right")
    let newLi = document.createElement("li")
    newLi.setAttribute("class", 'nav-link active')

    newLi.innerText = "로그아웃"
    newLi.setAttribute("onClick","handleLogout()")

    

    navbarRight.appendChild(newLi)

    let loginButton = document.getElementById("login-button")
    loginButton.style.display = "none"
    
}

function handleLogout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    location.replace(`${frontend_base_url}/index.html`)

    console.log(response)
}

function checkLogin(){
    const payload = localStorage.getItem("payload")
    if(payload){
        window.location.replace(`${frontend_base_url}/index.html`)
    }
}
