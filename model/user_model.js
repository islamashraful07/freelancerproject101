var db = require('./db');

module.exports={

	getUser: function(id, callback){
		var sql = "select * from userinfo where user_id=?";

		db.getResult(sql, [id], function(result){
			callback(result);
		});
	},
	getAll: function(callback){
		var sql = "select * from user";
		db.getResult(sql, [], function(results){
			callback(results);
		});
	},
	validate: function(user, callback){
        console.log(user);
        var sql = "select * from userinfo where email=? and password=?";
        

		db.getResult(sql, [user.email, user.password], function(result){
            console.log(sql);
			callback(result);
		});
	},
	insert: function(user, callback){
        var sql = "insert into user values (null, ?,?,?)";
        var type=user.type;
		db.execute(sql, [user.uname, user.password, type], function(status){
			callback(status);
		});
	},
	
	delete: function(postid, callback){
		var sql = "delete from buyertable where postid=?";
		db.execute(sql, [postid], function(status){
			callback(status);
		});
    },
    insertUser: function(user, callback){
        //console.log(user);
        var sql = "insert into userinfo values (null, ?,?,?,?,?)";
        //console.log(user.type);
		db.execute(sql, [user.uname,user.email,user.phone,user.type,user.password], function(status){
            //console.log(sql);
            //console.log(status);
			callback(status);
		});
    },
    insertPost: function(data, callback){
        //console.log(user);
        var sql = "insert into buyertable values (null, ?,?,?,?,?)";
        //console.log(data);
		db.execute(sql, [data.uid,data.title,data.category,data.description,data.budget], function(status){
            //console.log(sql);
            //console.log(status);
			callback(status);
		});
    },
    getPost: function(id, callback){
		var sql = "select * from buyertable where buyer_id=?";

		db.getResult(sql, [id], function(result2){
			callback(result2);
		});
	},
	getAllPost: function(id,callback){
		var sql = "select * from bidtable where sellerid=? ";

		db.getResult(sql,[id],function(result2){
			callback(result2);
		});
	},
	getSpecPost: function(result2,callback){


       var arr = 0;

		for(var i = 0; i < result2.length; i++){

			arr[i] = result2[i]['postid'];

		}


		

		var sql = "select * from buyertable where postid not in (?) ";

		 db.getResult(sql,[arr],function(result3){
			 
			//console.log(result3);
			//console.log(sql);
		 	callback(result3);
		 });
	},
	insertBid: function(data, callback){
        //console.log(user);
        var sql = "insert into bidtable values (null, ?,?,?)";
        //console.log(data);
		db.execute(sql, [data.postid,data.uid,data.bidmsg], function(status){
            //console.log(sql);
            //console.log(status);
			callback(status);
		});
	},
	getSellerinfo: function(id, callback){
		var sql = "select * from userinfo where user_id=?";

		db.getResult(sql, [id], function(result){
			console.log(result);
			callback(result);
		});
	},
	insertGig: function(data, callback){
        //console.log(user);b
        var sql = "insert into gigtable values (null, ?,?,?,?,?)";
        //console.log(data);
		db.execute(sql, [data.uid,data.title,data.budget,data.description,data.category], function(status){
            //console.log(sql);
            //console.log(status);
			callback(status);
		});
	},
	getGiginfo: function(id, callback){
		var sql = "select * from gigtable where sellerid=?";

		db.getResult(sql, [id], function(result2){
			callback(result2);
		});
	},
	editProfile: function(user, callback){
		var sql = "update userinfo set uname=?,password=?, phone=? where user_id=?";
		db.execute(sql, [user.uname, user.password,user.type, user.id], function(status){
			callback(status);
		});
	},
    //post bid details
    post_bid_details: function(id, callback){
        
        var sql = "select * from bidtable where postid=?";
        
        db.execute(sql,[id.id],function(result){
            
           callback(result);
            
            console.log(result);
            
        });
        
        
    }
    
    
    
}