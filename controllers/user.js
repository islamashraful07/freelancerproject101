var express = require('express');
var userModel = require.main.require('./model/user_model');

var router = express.Router();



router.get('/login',(req,res)=>{
    res.render('login');

})
router.post('/login', (req, res)=>{
	
	var user ={
		email : req.body.email,
		password : req.body.password
	};
	
	userModel.validate(user, function(result){
		if(result.length > 0){
            if(result[0].utype=="buyer"){
                req.session.uid = result[0].user_id;
            // console.log(req.session.uid);
			res.redirect('/user/buyerdashboard');
        }
        else if(result[0].utype=="seller")
        {
            
                req.session.uid = result[0].user_id;
            // console.log(req.session.uid);
			res.redirect('/user/sellerdashboard');
        }
        else{
            res.redirect('/user/login');
			
		}

    
    }

    

			//req.session.name = req.body.uname;
            
	});
});


router.get('/register',(req,res)=>{
    res.render('register');

})
router.post('/register',(req,res)=>{
    var user ={
		uname : req.body.uname,
		password : req.body.pass,
        type : req.body.utype,
        email :req.body.email,
        phone:req.body.phone
	};
	
	userModel.insertUser(user, function(success){
		if(success){
            
            
            res.redirect('/user/login');
            
		}else{
			res.render("register");
		}
	});

})

router.get('*', function(req, res, next){
    if(req.session.uid != null){
        next();
    }else{
        res.redirect('/user/login');
    }
});

router.get('/buyerdashboard',(req,res)=>{
    var id={
        id:req.session.uid
    }
    console.log(req.session.uid);
    userModel.getUser(req.session.uid,function(result){
        userModel.getPost(req.session.uid,function(result2){
            var data={
                result:result,
                result2:result2
            }
            console.log(result);
            
            console.log(result2);
            res.render('buyerdashboard',data);   
        })
        
        
    })
    //res.render('sellerdashboard');
    
})
router.post('/buyerdashboard',(req,res)=>{
    var data ={
		uid : req.session.uid,
		
        category : req.body.category,
        title :req.body.title,
        description:req.body.description,
        budget:req.body.budget
	};
	
	userModel.insertPost(data, function(success){
		if(success){
            console.log("successful");
            
            
            res.redirect('/user/buyerdashboard');
            
		}else{
			res.redirect('/user/buyerdashboard');
            
		}
	});

})

router.post('/delete/:id', (req, res)=>{
	
	userModel.delete(req.params.id, function(success){
		if(success){
			res.redirect('/user/buyerdashboard');
		}else{
			res.redirect("/user/buyerdashboard");
		}
	});
});
router.get('/sellerdashboard',(req,res)=>{
    var id={
        id:req.session.uid
    }
    //console.log(req.session.uid);
    userModel.getUser(req.session.uid,function(result){
        userModel.getAllPost(req.session.uid,function(result2){
            
            
            userModel.getSpecPost(result2,function(result3){
                var data={
                    result:result,
                    result2:result2,
                    result3:result3
                }
                res.render('sellerdashboard',data);
                //console.log(result3);
            });
            //console.log(result);
            
            //console.log(result2);
               
        })
        
        
    })
    //res.render('sellerdashboard');
    
})
router.post('/sellerdashboard',(req,res)=>{
    var data ={
		uid : req.session.uid,
		
        
        postid:req.body.postId,
        bidmsg:req.body.bidmsg
	};
	
	userModel.insertBid(data, function(success){
		if(success){
            //console.log("successful");
            
            
            res.redirect('/user/sellerdashboard');
            
		}else{
			res.redirect('/user/sellerdashboard');
            
		}
	});

})

router.get('/sellerprofile',function(req,res){
    userModel.getSellerinfo(req.session.uid,function(result){
        userModel.getGiginfo(req.session.uid,function(result2){
         
        console.log(result);
        console.log(result2);
        var data={
            result:result,
            result2:result2
            
        }
        
        res.render('sellerprofile',data);
           
    })
    })
    
})
router.post('/sellerprofile',(req,res)=>{
    var data ={
		uid : req.session.uid,
		
        category : req.body.category,
        title :req.body.title,
        description:req.body.description,
        budget:req.body.budget
	};
	
	userModel.insertGig(data, function(success){
		if(success){
            console.log("successful");
            
            
            res.redirect('/user/sellerprofile');
            
		}else{
			res.redirect('/user/sellerprofile');
            
		}
	});

})
router.get('/edit/sellerprofile/:id', (req, res)=>{

	userModel.getSellerinfo(req.params.id, function(result){
        var data={
            result:result
        }
		if(result.length >0 ){
			res.render('editsellerpro', data);
		}else{
			res.redirect('/user/sellerprofile');
		}
	});
});
router.post('/edit/sellerprofile/:id', (req, res)=>{
	
	var user ={
		id: req.params.id,
		uname : req.body.uname,
		password : req.body.password,
		type : req.body.phone
	};
	
	userModel.editProfile(user, function(success){
		if(success){
			res.redirect('/user/sellerprofile');
		}else{
			res.render("/user/edit/sellerprofile/"+req.params.id);
		}
	});
});


//bid route

router.get('/buyerdashboard/bid-details/:id', function(req, res){
    
    
    var id = {id:req.params.id};
    
    userModel.post_bid_details(id, function(result){
        
       userModel.getUser(req.session.uid, function(result2){
           console.log(result2);
           var data = {
               user: result2,
               bid_details: result
           };
           
           res.render('project-bidded', data);
       });
        
       
        
    });
    
    
    
    
});



module.exports = router;


