

var suggestions=[];
addFriendSuggestion();
const searchWrapper = document.querySelector(".search-input");
const tHead = document.getElementById("tHead")
const tBody = document.getElementById("tBody")

const idInputSf= document.getElementById("fidSf")
const btnSubmmitSf= document.getElementById("subBtnSf")

const idInputAf= document.getElementById("fidAf")
const btnSubmmitAf= document.getElementById("subBtnAf")



const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;

// if user press any key and release
inputBox.onkeyup = (e)=>{
    let userData = e.target.value; //user enetered data
    let emptyArray = [];
    if(userData){
        icon.onclick = ()=>{
            console.log(userData);

            const reqst = new XMLHttpRequest();
      reqst.open("POST", `/search`);
      
      reqst.setRequestHeader("content-type", "application/json")
      reqst.send(JSON.stringify({ data: userData}));
  
     reqst.addEventListener("load", function () {
           let sts =reqst.status;
           if (sts==400) {
            console.log("error aaya hai rearch me");
           }
           else if(sts=200){
            let result = JSON.parse(reqst.responseText);

            // let data =JSON.parse(result.data);
            console.log(result);
            if (tBody.hasChildNodes) {
                tBody.innerHTML="";
            }
        suggBox.innerHTML = "";

            tHead.innerHTML=`<tr><th class="head" colspan="5">${result.msg}</th></tr>`
            result.Friend.forEach(fr => {
                let child1= document.createElement("tr");

                child1.innerHTML = `<td><img src="${fr.ProfilePhoto}" /></td>
                <td class="name" onclick="ShowFriendProf(${fr.Mobile})"> ${fr.Name}</td>       
                <td onclick="ShowFriendProf(${fr.Mobile})">${fr.Mobile}</a></td>       
                <td onclick="ShowFriendProf(${fr.Mobile})">${fr.Email}</a></td>       
                <td class="addF"><button onclick="ShowFriendProf(${fr.Mobile})">Friends<i class="fas fa-user-friends"></i></button> </td>  `
                

                
                tBody.appendChild(child1)
            });

            result.Result.forEach(fr => {
                let child= document.createElement("tr");
                child.innerHTML = `<td><img src="${fr.ProfilePhoto}" /></td>
                <td class="name" onclick="ShowFriendProf(${fr.Mobile})"> ${fr.Name}</td>       
                <td onclick="ShowFriendProf(${fr.Mobile})">${fr.Mobile}</a></td>       
                <td onclick="ShowFriendProf(${fr.Mobile})">${fr.Email}</a></td>       
                <td class="addF"><button onclick="addFriend(${fr.Mobile})">Add <i class="fas fa-user-plus"></i></button> </td>  `
                
                tBody.appendChild(child)
            });
           }

   })

        }
        emptyArray = suggestions.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data = `<li>${data}</li>`;
        });
        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }
}

function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    icon.onclick = ()=>{
        
        console.log(selectData);

        const reqst = new XMLHttpRequest();
      reqst.open("POST", `/search`);
      
      reqst.setRequestHeader("content-type", "application/json")
      reqst.send(JSON.stringify({ data: selectData}));
  
     reqst.addEventListener("load", function () {
           let sts =reqst.status;
           if (sts==400) {
            console.log("error aaya hai rearch me");
           }
           else if(sts=200){
            let result = JSON.parse(reqst.responseText);

            // let data =JSON.parse(result.data);
            console.log(result);
            if (tBody.hasChildNodes) {
                tBody.innerHTML="";
            }

        suggBox.innerHTML = "";


            tHead.innerHTML=`<tr><th class="head" colspan="5">${result.msg}</th></tr>`

             result.Friend.forEach(fr => {
                let child1= document.createElement("tr");

                child1.innerHTML = `<td><img src="${fr.ProfilePhoto}" /></td>
                <td class="name" onclick="ShowFriendProf(${fr.Mobile})"> ${fr.Name}</td>       
                <td onclick="ShowFriendProf(${fr.Mobile})">${fr.Mobile}</a></td>       
                <td onclick="ShowFriendProf(${fr.Mobile})">${fr.Email}</a></td>       
                <td class="addF"><button onclick="ShowFriendProf(${fr.Mobile})">Friends <i class="fas fa-user-friends"></i></button> </td>  `
                

                
                tBody.appendChild(child1)
            });

            result.Result.forEach(fr => {
                let child= document.createElement("tr");

                child.innerHTML = `<td><img src="${fr.ProfilePhoto}" /></td>
                <td class="name" onclick="ShowFriendProf(${fr.Mobile})"> ${fr.Name}</td>       
                <td onclick="ShowFriendProf(${fr.Mobile})">${fr.Mobile}</a></td>       
                <td onclick="ShowFriendProf(${fr.Mobile})">${fr.Email}</a></td>       
                <td class="addF"><button onclick="addFriend(${fr.Mobile})">Add <i class="fas fa-user-plus"></i></button> </td>  `
                

                
                tBody.appendChild(child)
            });
           }

   })
        
    }
    searchWrapper.classList.remove("active");
}

function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    suggBox.innerHTML = listData;
}


function addFriend(id) {
    idInputAf.value=id;
    // console.log(idInputAf);

    // console.log("click add friend");
    btnSubmmitAf.click();
    // console.log(idInputAf.value);


}

function ShowFriendProf(fid) {
    // console.log(idInputSf);
    idInputSf.value=fid;
    // console.log("clicl"+fid);
    // console.log(idInputSf.value);

    btnSubmmitSf.click();
} 


function addFriendSuggestion() {

    const reqst = new XMLHttpRequest();
      reqst.open("GET", `/friendSuggestion`);
      
      reqst.setRequestHeader("content-type", "application/json")
      reqst.send();
  
     reqst.addEventListener("load", function () {
        let result = JSON.parse(reqst.responseText);
           
        if (result.length) {
            result.forEach(element => {
            suggestions.push(element.Name);
          });
        }
        });
       

        
}
