const express = require("express")
const fs = require("fs")
const session = require('express-session')
const multer = require('multer')
const moment = require("moment")
const postModel=require("./database/models/post")

const port = process.env.PORT || 3000;
const startDb = require("./database/init");
const userModel = require("./database/models/user");
const userController = require("./controllers/User/userController");


startDb();

const app = express();

app.use(express.static("public"));
app.use(express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const upload = multer({ dest: 'uploads' })

app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false }

}))

app.set("view engine", "ejs");
app.set("views", "./views");


app.route("/").get(userController.userHome)

app.get("/logout", function (req, res) {
	req.session.destroy();
	res.redirect("/");
})

// app.route("/admin").get(AdminControl.getAdmin)
app.route("/login").get(userController.showLogin).post(userController.loginUser)
app.route("/signup").get(userController.showSignup).post(upload.single("profilePic"),userController.saveUser)
app.route("/checkMail").post(userController.checkMail)
app.route("/checkMob").post(userController.checkMob)
app.route("/friends").get(userController.getFriends)
app.route("/search").get(userController.showSearch).post(userController.SearchRes)
app.route("/profile").get(userController.userProfile)
app.route("/addPost").post(upload.single("postPhoto"),userController.addPost)
app.route("/friendProf").post(userController.FriendProfile)
app.route("/addFriend").post(userController.addFriend)
app.route("/changePass").get(userController.showChangePass).post(userController.ChangePass)
app.route("/friendSuggestion").get(userController.friendSuggestion)

// let a ="64167e0337b3efb565effca6";
// let b ="Public";
// find(a);
// async function find(a) {

// 	let post ;
// 	// post= await postModel.find({CreateBy:a})

// 	 post= await postModel.aggregate([
// 		// {"$match":{"CreateBy":"$$a"}}
// 		{"$match":{"Privacy":b}}
// 		// {"$sort":{"Time":-1}}
// 	])
	
// 	console.log("post"+post);
// }




const time =new Date() ;

console.log(time.toDateString());


app.listen(port, () => {
    console.log(`server is start port number ${port}`);
});

