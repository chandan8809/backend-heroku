const express= require("express")
const app=express()



const connect=require("./configs/db")

const userController=require("./controller/user.controller")
const productController=require("./controller/product.controller")
const {register, login,newToken}= require("./controller/auth.controller")



app.use(express.json())



app.post("/register",register);
app.post("/login",login);




app.use("/users", userController)
app.use("/products",productController)

const passport=require("./configs/google-oath")

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
     done(null, user);
});

app.get('/auth/google',
  passport.authenticate('google', { scope:
  	[ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
	passport.authenticate( 'google', {
		
		failureRedirect: '/auth/google/failure'
}),(req,res)=>{
        const token=newToken(req.user)
        res.send({user:req.user, token})

        res.send(req.user)
    }

);



app.listen(2345,async function(){
    try{
        await connect();
        console.log("listining on port 2345")

    }
    catch(err){
        console.log("errors:",err)
    }
    
})

