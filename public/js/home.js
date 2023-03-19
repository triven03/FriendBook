console.log("hello hii ");

const photo =document.getElementById("formFileMultiple")
const imdiv=document.getElementById("imDiv")

const addDiv=document.getElementById("addDiv")
const cngDiv=document.getElementById("cngDiv")

const YourPassDiv= document.getElementById("yrPassDiv")
const parentRow= document.getElementById("parentRow")
const imgMessage= document.getElementById("imgMessage")
const Password= document.getElementById("Password")
const errMessage= document.getElementById("errMessage")



function showAdd() {
   addDiv.style.display="block"
   cngDiv.style.display="none"
   
}

// console.log(imdiv);

function upload() {
    // console.log(photo.files);
    let b=1;
    if (photo.files.length<9 || photo.files.length >9) {
        photo.style.border="2px solid #dc3545"
        imdiv.style.display= "block"
        // imdiv.focus();
      b=0;
     } else {

        photo.style.border="2px solid #cccc"
      imdiv.style.display= "none"
      b=1;
     }

     if (photo.files.length==9) {
        let formData = new FormData();

        const file=photo.files;

        formData.append("passphoto", file);

        const reqst = new XMLHttpRequest();
        reqst.open("POST", "http://localhost:3000/changeImages");
        reqst.setRequestHeader("content-type", "application/json")
        reqst.send(formData);
    
       reqst.addEventListener("load", function () {
             let sts =reqst.status;
             
             let data = JSON.parse(reqst.responseText);

             console.log(data);
  
     })
        
     }
    
}


function hideDiv() {
   addDiv.style.display="none"
   cngDiv.style.display="block"
   
}





var passWord="";



function set(img) {

    if (passWord.length<3) {
    errMessage.style.display="none"

        let display = YourPassDiv.style.display;



            if (display !="flex") {

                YourPassDiv.style.display="flex"
            }

        const parent =img.parentNode;
        
        const pass=img.alt.toString();
        const src= img.src; 
        passWord= passWord+pass;

        const div = document.createElement("div");
        div.setAttribute("class","imgContainer")
        div.innerHTML= ` <img src="${src}" class="img-fluid" alt="${pass}" >`

        parentRow.appendChild(div)

        // console.log(img.src);
        // console.log(pass);
        console.log(passWord);
        // console.log(parent);
    }
     else {
        imgMessage.style.display="block"
        
    }

    if(passWord.length==3){
        YourPassDiv.style.border=  "1px solid rgb(11, 193, 32)";
        Password.value= passWord;

    }
    

}



function reset() {

    YourPassDiv.style.display="none";
    imgMessage.style.display="none";
    parentRow.innerHTML="";
    passWord="";
    YourPassDiv.style.border=  "1px solid  #dc3545";
    errMessage.style.display="none"



}

function checkPass() {

    if (Password.value.length==3) {
    errMessage.style.display="none"


       return true 
    }

    errMessage.style.display="block"
    return false;
    
}