const access_token = localStorage.getItem("access");
const payload = localStorage.getItem('payload')
const payload_parse = JSON.parse(payload)
const user = JSON.parse(payload)['user_id']
console.log(payload_parse)

window.onload = async function (){
    // getUsers()
    const payload = localStorage.getItem("payload")
    const payload_parse = JSON.parse(payload)
    console.log(payload_parse.username)
    const old_username = document.getElementById("old_username")

    old_username.innerText = `${payload_parse.username}`

    console.log(payload_parse.email)
    const old_email = document.getElementById("old_email")

    old_email.innerText = `${payload_parse.email}`
}
async function update_button() {

        const updateData = {
            email: document.querySelector("#update_email").value,
            username: document.querySelector("#update_username").value,
            password: document.querySelector("#update_password").value,
        }

        const response = await fetch(`${backend_base_url}/users/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer "+access_token,
            },
            method: 'PATCH',
            body: JSON.stringify(updateData)
        }
        )
        const data = await response.json()
        console.log(data["message"])
        if (response.status == 200) {
            alert("회원정보 수정 완료!! 다시 로그인을 진행해 주세요!")
            localStorage.removeItem("access")
            localStorage.removeItem("refresh")
            localStorage.removeItem("payload")
            location.replace(`${frontend_base_url}/templates/signup.html`)
        }else{
            alert(data["message"])}
    } 
