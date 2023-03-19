// const adminService =require("../../services/admin/adminService")
const userModel=require("../../database/models/user")
const postModel=require("../../database/models/post")
const fs = require("fs")


const showLogin = async function(req,res){
    res.render("login",{ error: "",success:"" })

}


const showSignup = async function(req,res){
 res.render("signup",{error:"",})
}

const saveUser = async function(req,res){
    
    user = {
        Name:req.body.Name,
        Email:req.body.email,
        Password: req.body.password,	    
        Mobile: req.body.mob,
        ProfilePhoto: req.file.filename,
        Friends:[],
        Post:[]	    
	}		

	try
	{

        // console.log(user);
		const data=  new userModel(user);
         
         data.save((err,data)=>{
            if (err) {
                console.log(err);
            } else {
                // req.session.data=data;
                // console.log(data);
                console.log("saved user");
        
                res.render("login",{error:"",success:"success"})
            }
        })
	}
	catch(err)
	{
		console.log(err)
        console.log("error aaya");
	}

}




const checkMail= async (req,res)=>{

    const mail =req.body.email;

    try {
     const mailFound= await userModel.find({Email:mail});
     if (mailFound.length) {
        res.status(400);
        res.send("Email Aready taken")
     }
     else{
        res.status(200);
        res.send("Your Email is Unique")
     }
        
    } catch (error) {
        console.log(error);
    }
}
const checkMob= async (req,res)=>{

    const mob =req.body.Mobile;

    try {
     const mailFound= await userModel.find({Mobile:mob});
     if (mailFound.length) {
        res.status(400);
        res.send("Mobile Number Aready taken")
     }
     else{
        res.status(200);
        res.send("Your Mobile Number is Unique")
     }
        
    } catch (error) {
        console.log(error);
    }
}


const loginUser= async function(req,res){

    const mob= req.body.Mob;
    const password =req.body.password;
    try {
        const user= await userModel.find({Mobile:mob,Password:password})
    
        if (user.length) {
            const member=user[0];
           
        req.session.isLoggedIn = true;
        req.session.user = user[0];
        
       res.redirect("/")
    
        } else {
            const err={code:400,massage:"User Not Found"}
            res.render("login", { error:err ,success:""});
            
        }
    
    } catch (error) {
        console.log(error);
    }
    
    
    }
    
   const getFriends =  async function(req,res) {
        const user =req.session.user;
        const totalFr= user.Friends.length;
        const list = user.Friends;
        res.render("friends",{user:user,count:totalFr,list:list});
    }

   const FriendProfile =  async function(req,res) {

       try {
            const user =req.session.user;
            const id = req.body.fid;
            // console.log("req.param.id = "+id);

            const friendData= await userModel.findOne({Mobile:id })
            const mutualf =  friendData.Friends.filter((a)=>{
            return user.Friends.find((b)=>{
                return a.Mobile==b.Mobile
            });
        });

        console.log("Friends data :" +friendData);
        console.log("mutual data :" +mutualf);

        // res.send(friendData)
        res.render("friendProfile",{user:req.session.user,Friend:friendData,Mutual:mutualf});
        } 
        
        catch (error) {
            console.log("Catch block me aaya error "+error);
            
        }
        

        
    }
   

   const addFriend =  async function(req,res) {
        try {
        const user =req.session.user;
        const fid = req.body.fid;

            const Mydata= {
                Name:user.Name,
                Email:user.Email,
                Mobile:`${user.Mobile}`,
                Mobile:user.Mobile,
                ProfilePhoto: user.ProfilePhoto,
                id:user._id
            }

            const fData= await userModel.findOne({Mobile:fid })

            console.log("friend data :"+fData);

            const Frienddata= {
                Name:fData.Name,
                Email:fData.Email,
                Password:fData.Password,
                Mobile:`${fData.Mobile}`,
                ProfilePhoto: fData.ProfilePhoto,
                id:fData._id
            }

            console.log();

           await userModel.findByIdAndUpdate(user._id,{$push:{Friends:Frienddata}});
           await userModel.findByIdAndUpdate(fData._id,{$push:{Friends:Mydata}});

        //    await userModel.updateOne({Mobile:fid},{$set:{$push:{Friends:Mydata}}})

        //    await userModel.findByIdAndUpdate(fid,{$push:{Friends:Mydata}});
        
           console.log("add friend success");

           const newUser= await userModel.findOne({_id:user._id})

           req.session.user=newUser;

           res.redirect("/friends");

       
        
        // res.render("friendProfile",{user:user,Friend:friendData,Mutual:mutualf});
        } catch (error) {
            console.log(error);
            
        }
        


    }
   
   const userProfile =  async function(req,res) {

    try {
        const user =req.session.user;
        const totalFr= user.Friends.length;
        const post = await postModel.find({CreateBy:user._id});

        // const post= await postModel.aggregate([
        //     {"$match":{CreateBy:user._id}},
        //     {"$sort":{"Time":-1}}
        // ])

        console.log("post"+post);

        res.render("profile",{user:user,count:totalFr,Post:post});
    } catch (error) {
        console.log(error);
    }
        
    }
   const showSearch =  async function(req,res) {
        const user =req.session.user;
        res.render("search",{user:user});
    }
   const SearchRes =  async function(req,res) {
        
    try {
        const user =req.session.user;
        const search= req.body.data;
        const list = user.Friends;

        const data= await userModel.find({"Name":{$regex:".*"+search+".*",$options:'i'}});
        // console.log(data);
        if (data.length>0) {
            // let massage= data.length;

            let friend= [];
            friend =data.filter((a)=>{
                return user.Friends.find((b)=>{
                    return a.Mobile==b.Mobile
                });
            });

            let not_friend=  [];
            not_friend= data.filter((a)=>{
                return !user.Friends.find((b)=>{
                    return a.Mobile==b.Mobile
                });
            });

            let not_user=  [];
            not_user=not_friend.filter((a)=>{
                return a.Mobile!=user.Mobile
              })


            console.log("search result :"+data);
            console.log("friends result :"+friend.length);

            console.log("friend :"+friend);

            res.status(200).send({msg:`${not_user.length + friend.length} Result Found`,Result:not_user,Friend:friend})
        } else {
            res.status(200).send({msg:"No Result Found",Result:data})
            
        }
    } 
        
        catch (error) {
            console.log(error);
        }
       
   }

   const addPost =  async function(req,res) {
        const user =req.session.user;
        // const data= req.body.data;
        
       const post = {
        Name:user.Name,
        Para:req.body.para,
        Photo: (req.file ? req.file.filename : ""),
        Privacy:req.body.privacy,
        CreateBy:user._id 
        }	

        try
	{
		const data=  new postModel(post);
         
         data.save((err,data)=>{
            if (err) {
                console.log(err);
            } else {
                console.log(data);
                console.log("saved post");
                
                res.redirect("/")

            }
        })
	}
	catch(err)
	{
		console.log(err)
        console.log("error aaya");
	}

    }

    const userHome= async function (req,res){

        if ( req.session.isLoggedIn) {

            const post= await postModel.aggregate([
                {"$match":{"Privacy":"Public"}},
                {"$sort":{"Time":-1}}
            ])
    
            res.render("userhome",{user:req.session.user,post:post});
            
          }
    else{
    
        res.render("home",{ error: "" })
    }
    
    }


    const showChangePass =  async function(req,res) {
        const user =req.session.user;
        res.render("changePass",{user:user,error:""});
    }

    const ChangePass =  async function(req,res) {
        const user =req.session.user;

        const password= req.body.Newpassword;

        try {
            userModel.findByIdAndUpdate(user._id, { Password: password },
                function (err, docs) {
                        if (err){
                        console.log(err)
                        }
                        else{
                        // console.log("Updated User : ", docs);
                        let err={
                            massage:"Password Changed Successfully"
                        }
                        res.render("changePass",{user:user, error:err});
                        }
                    });
        } catch (error) {
            let err={
                massage:"Your Password is Not Changed"
            }
          console.log("Password change me error"+error);  
          res.render("changePass",{user:user, error:err});

        }
    }

    
    const friendSuggestion= async function(req,res){
            const user =req.session.user;

            const friend= user.Friends;
            res.send(friend);

        }


module.exports={
saveUser,
loginUser,
showSignup,
showLogin,
checkMail,
checkMob,
getFriends,
FriendProfile,
SearchRes,
showSearch,
userProfile,
addPost,
userHome,
addFriend,
showChangePass,
ChangePass,
friendSuggestion
} 