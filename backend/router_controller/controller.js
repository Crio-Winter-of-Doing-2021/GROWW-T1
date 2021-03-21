import mongoose from 'mongoose'; 
const users = require('../models/user_model.js')
const pages = require('../models/page_model.js')
const products = require('../models/product_model.js')

exports.getProducts = async(req, res) => {
	var path=req.path.substring(1);
    await pages.aggregate([
    {$match : { page_name: path } },
	{$lookup:
		     {
		        from: "products",
		        localField: "products_listed",
		        foreignField: "product_id",
		        as: "page"
		    }
        },
        { $unset: [  "page_id","page_name" ,"products_listed","_id"] }
        ], (err, page_req) => {	
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!page_req.length) {
            return res.status(200).send(path+" doesn't contain products");
        }
    else {
    return res.status(200).json(page_req); }
	});											
    	};
exports.loggingUser =async(req,res) => {
	if(req.body.status==="logging in")
	{
		let username=req.body.username, password=req.body.password;
		await users.find({user_name: req.body.username}, (err, user) =>{
			if(err)
			{
				return res.status(400).json({ success: false, error: err })
			}
			else if(!user.length)
			{
					let obj={user_name:req.body.username, phone_number:"", status: "logged in", password: req.body.password, email: "", kyc_status: "not done", kyc_details:{pan: ""},orders:[]};
					let new_user=new users(obj);
					if (!new_user){
        				return res.status(400).json({ success: false, error: "Schema failed" })
    				}
					new_user.save()																							
					.then(() => {
						return res.status(201).send("New user registration saved successfully");
					})
					.catch(error => {
						return res.status(404).send("Error: New user registration not done.");
					})
					res.status(200).send("New user registered successfully!");
			}
			else
			{
				if (user[0].password===password)
				{
				users.findOneAndUpdate({user_name:req.body.username}, {status:"logged in"}, { useFindAndModify: false })
    				.then(data => {																							
      				if (!data) {																						
        			res.status(404).send("Cannot update status . Maybe user was not found!");
			  		} else {
			  		console.log(data);																				
			  		res.status(200).send("User successfully logged in");
					}
					})
					.catch(err => {
			  		res.status(404).send( "Error updating user log-in status");
			  		});
				}
					
				else
				{
					res.status(403).send("Wrong password. Try again!");
				}
			}
		});
	}
	else
	{
		users.findOneAndUpdate({user_name:req.body.username}, {status:"logged out"}, { useFindAndModify: false })
    	.then(data => {																							
      		if (!data) {																						
        	res.status(404).send("Cannot update status . Maybe user was not found!");
      		} else {
      		console.log(data);																				
      		res.status(201).send("User logged out successfully." )}
    		})
    	.catch(err => {
      		res.status(404).send( "Error updating user log-in status");
      		});
	}	
};
exports.getPdtFaq =async(req,res) => {
	await products.findOne({product_id:req.params.id},(err,pdt) => {
	if(err)
	{
		res.status(400).send("Error occured");
	}
	else if(pdt===null)
	{
		res.status(200).send("Product does not exist")
	}
	else
	{
		res.status(200).send(pdt);
	}
	});
};

exports.getSelectedOrderFaq = async(req,res) =>{
	await users.findOne({user_name:req.params.user},(err,user) =>{
	if(err)
	{
		res.status(400).send("Error occured");
	}
	else if(user===null)
	{
		res.status(200).send("User not found");
	}
	else
	{
	 	var list=user.orders;
	 	for(var i=0;i<list.length;i++)
	 	{
	 			if(list[i].order_id==req.params.id)
	 			{
	 				var status=list[i].order_status;
	 				pages.findOne({page_name:"orders"}, (err,page) =>{
    					if(err)
    					{
    						res.status(400).send("Error");
    					}
    					else if(page===null)
    					{
    						res.status(200).send("Order status doesn't exist");
    					}
    					else
    					{
    						var findtype=page.subsections;
    						for(var j=0;j<findtype.length;j++)
    						{
    							if(page.subsections[j].type===status)
    							{
									res.status(200).send(page.subsections[j]);
    							}
    						}
    					}
    					
    		 		});
	 			}
	}
	}
	});

};
