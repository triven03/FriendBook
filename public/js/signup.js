console.log("hello");

const pass= document.getElementById("password")

const photo= document.getElementById("formFileMultiple")
const pasdiv= document.getElementById("pasDiv")
const imdiv= document.getElementById("imDiv")
const emailDiv= document.getElementById("emailDiv")
const mobDiv= document.getElementById("mobDiv")
const mobDivMessage= document.getElementById("mobDivM")

// imdiv.style.display= "block"

// photo.style.border="2px solid #dc3545"

var emailCheck=0;
var mobCheck=0;

function checkMail(input) {
   const email= input.value;
   if (email.length) {
      
      const reqst = new XMLHttpRequest();
      reqst.open("POST", "/checkMail");
      // reqst.open("POST", "https://graphicalpassword-3p34g811xx2lcdgtc2c.codequotient.in/checkMail");
      reqst.setRequestHeader("content-type", "application/json")
      reqst.send(JSON.stringify({ email: email}));
  
     reqst.addEventListener("load", function () {
           let sts =reqst.status;
           if (sts==400) {
            emailCheck=0;
            input.style.border="2px solid #dc3545";
            emailDiv.style.display= "block";
           }
           else if(sts=200){
            emailCheck=1;
            input.style.border="2px solid #cccc";
            emailDiv.style.display= "none";
           }

   })
 }
  else {

      input.style.border="2px solid #cccc";
            emailDiv.style.display= "none";
   }
   
}
function checkMob(input) {
   const mobile= input.value;

if (mobile.length<10) {
   mobCheck=0;
   input.style.border="2px solid #dc3545";
   mobDiv.style.display= "block";
   mobDivMessage.innerText="Your Mobile  Number is Wrong"
  }
  else {
   mobCheck=1;
   input.style.border="2px solid #cccc";
   mobDiv.style.display= "none";
  
  }

if (mobile.length==10) {
      
      const reqst = new XMLHttpRequest();
      reqst.open("POST", "/checkMob");
      // reqst.open("POST", "https://graphicalpassword-3p34g811xx2lcdgtc2c.codequotient.in/checkMob");
      reqst.setRequestHeader("content-type", "application/json")
      reqst.send(JSON.stringify({ Mobile: mobile}));
  
     reqst.addEventListener("load", function () {
           let sts =reqst.status;
           if (sts==400) {
            mobCheck=0;
            input.style.border="2px solid #dc3545";
            mobDivMessage.innerText="Your Mobile  Number is Already Used"

            mobDiv.style.display= "block";
           }
           else if(sts=200){
            mobCheck=1;
            input.style.border="2px solid #cccc";
            mobDiv.style.display= "none";
           }

   })
 }
  else {

      input.style.border="2px solid #cccc";
            emailDiv.style.display= "none";
   }
   
}


function checkForm() {
   // console.log( pass.value.length);
let a=1;

   if (pass.value.length<8) {
      pasdiv.focus();
    pass.style.border="2px solid #dc3545"
    pasdiv.style.display= "block"
    a=0;
    
   }
   else{
    pass.style.border="2px solid #cccc"
    pasdiv.style.display= "none"
    a=1;
   }
  

   if (a && mobCheck && emailCheck) {
      return true;
   } 
   return false;
}
