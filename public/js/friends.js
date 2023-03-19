

const idInputSf= document.getElementById("fidSf")
const btnSubmmitSf= document.getElementById("subBtnSf")




function ShowFriendProf(btn) {
    // console.log(idInputSf);
    idInputSf.value=btn.id;
   

    btnSubmmitSf.click();
} 