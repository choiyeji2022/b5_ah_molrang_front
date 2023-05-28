// 네비게이션 바가 있는 html에서 먼저 실행되면 여기서 base url들을 불러옴
const backend_base_url = "http://127.0.0.1:8000";
const frontend_base_url = "http://127.0.0.1:5500";

// 네비게이션 바를 불러오는 함수 로그인 되었을 때와 안 되어 있을 때 보여지는 화면 다름
async function injectNavbar() {
    fetch("../navbar.html").then(response => {
        return response.text()
    })
        .then(data => {
            document.querySelector("header").innerHTML = data;
        })
    let navbarHtml = await fetch("../navbar.html")
    let data = await navbarHtml.text()
    document.querySelector("header").innerHTML = data;

    // 로그인 전 상품 등록 네브바에서 숨겨짐
    let nav_left1 = document.getElementById("nav-left1")
    nav_left1.style.display = "none"
    // 로그인 전 회원정보 수정 네브바에서 숨겨짐
    let nav_left2 = document.getElementById("nav-left2")
    nav_left2.style.display = "none"
    // 로그인 전 회원 탈퇴 네브바에서 숨겨짐
    let nav_left3 = document.getElementById("nav-left3")
    nav_left3.style.display = "none"
    // 로그인 전 마이페이지 네브바에서 숨겨짐
    let nav_left4 = document.getElementById("nav-left4")
    nav_left4.style.display = "none"

    const payload = localStorage.getItem("payload")
    const payload_parse = JSON.parse(payload)


    if (payload) {

        // 어드민일 경우 글작성 버튼 보이게 하기
        if (payload_parse.is_admin) {
            nav_left1.style.display = "block"
        } else {
            nav_left1.style.display = "none"
        }

        nav_left2.style.display = "block"
        nav_left3.style.display = "block"
        nav_left4.style.display = "block"

        // 로그인 후 회원정보에서 유저네임 불러와서 네브바에서 보여주기
        console.log(payload_parse.username)

        const intro = document.getElementById("intro")

        intro.innerText = `${payload_parse.username} 님 안녕하세요!`



        // 로그아웃 버튼 네브바에서 보여주기
        let navbarRight = document.getElementById("nav-right")
        let newLi = document.createElement("li")
        newLi.setAttribute("class", 'nav-link active')

        newLi.innerText = "로그아웃"
        newLi.setAttribute("onClick", "handleLogout()")



        navbarRight.appendChild(newLi)

        // 로그인 후 로그인, 회원가입 버튼 숨김
        let loginButton = document.getElementById("login-button")
        loginButton.style.display = "none"

        let signupButton = document.getElementById("signup-button")
        signupButton.style.display = "none"


    }
}

console.log("로딩되었습니다.")

// 로그아웃 함수
function handleLogout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    location.replace(`${frontend_base_url}/index.html`)
    console.log(response)
}

// 로그인 시 들어가지 않아도 되는 페이지(ex.로그인, 회원가입 등) 직접 입력해서 들어갈 때 메인페이지로 리다이렉트 해주는 함수
// 필요한 js에 checkLogin()하면 실행됨
function checkLogin() {
    const payload = localStorage.getItem("payload")
    if (payload) {
        window.location.replace(`${frontend_base_url}/index.html`)
    }
}



// 네비게이션 바 실행시켜주는 함수
injectNavbar()