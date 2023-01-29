

function createModal(data) {
    var color = data.level === "error" ? "red" : data.level === "success" ? "green" : data.level === "warning" ? "yelow" : "black"
    var bgColor = data.level === "error" ? "#fff0f0" : data.level === "success" ? "#f0fff1" : data.level === "warning" ? "#fffef0" : "white"
    var div = document.createElement("div")
    div.style = "position:fixed;top:0;width:100vw;height:100vh;z-index:9999;"
    div.id = "modal"
    div.innerHTML = `
    <div style="position:relative;width:100%;height:100%;">
        <div style="border-radius:5px;overflow:hidden;border:2px solid ${color};text-align:center;width:400px;height:280px;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background-color:${bgColor};color:${color}">
            <div style="position:relative;width:100%;margin-top:10px;">
                <h1 >${data.title}</h1>
                <h2 style="margin-top:15px;">${data.message}</h2>
                <span onClick="closeModal()" id="closeModal" style="position:absolute;top:-18px;right:5px;font-size:42px;cursor:pointer;">&times;</span>
            </div>
        </div>
    </div>
    `
    document.body.appendChild(div)
    document.body.style = "height:100%; overflow: hidden;"
}
function closeModal() {
    document.getElementById("modal").remove()
    document.body.style = ""
}
