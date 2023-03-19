const CurrentPass= document.getElementById("CurrentPass")
const crntPassDiv= document.getElementById("crntPassDiv")

const Newpassword= document.getElementById("Newpassword")
const newPassDiv= document.getElementById("newPassDiv")

const Cnfpassword= document.getElementById("Cnfpassword")
const cnfmPassDiv= document.getElementById("cnfmPassDiv")


const CurrentPassVal= document.getElementById("CurrentPassVal")





function checkForm() {
    // console.log( pass.value.length);
 let a=1;
 let b=1;
 let c=1;
 


    if (CurrentPassVal.value!=CurrentPass.value) {
        crntPassDiv.focus();
        CurrentPass.style.border="2px solid #dc3545"
        crntPassDiv.style.display= "block"
        a=0;
     
    }
    else{
        CurrentPass.style.border="2px solid #cccc"
        crntPassDiv.style.display= "none"
        a=1;
    }


    if (Newpassword.value.length<8) {
        newPassDiv.focus();
        Newpassword.style.border="2px solid #dc3545"
        newPassDiv.style.display= "block"
        b=0;
     
    }
    else{
        Newpassword.style.border="2px solid #cccc"
        newPassDiv.style.display= "none"
        b=1;
    }


    if (Cnfpassword.value !=Newpassword.value) {
        cnfmPassDiv.focus();
        Cnfpassword.style.border="2px solid #dc3545"
        cnfmPassDiv.style.display= "block"
        b=0;
     
    }
    else{
        Cnfpassword.style.border="2px solid #cccc"
        cnfmPassDiv.style.display= "none"
        b=1;
    }
   
 
    if (a && b && c) {
       return true;
    } 
    return false;
 }