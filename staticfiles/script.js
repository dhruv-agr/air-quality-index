const myForm=document.getElementById("myForm")

myForm.addEventListener("submit",function (e){

    e.preventDefault()
    
    const formData = new FormData(this)
    const searchParams = new URLSearchParams()

    for (const pair of formData){
        searchParams.append(pair[0],pair[1])
    }

    fetch("/",{
        method:"post",
        body:searchParams
    })
    .then(resp=>resp.text())
    .then(function(resp){
        document.getElementById("apidata").innerHTML=resp
    })
        
})



