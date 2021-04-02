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
        { $unset: [ "page_id","page_name" ,"products_listed","_id"] }
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
    	
    	
    	
exports.getOrdersList = (req,res) => {
var user=req.params.user;
users.findOne({user_name:user})
.then(function(usr){
	if(usr===null)
	{
		res.status(400).end("User not found!");
	}
	else
	{
	let orders=usr.orders,i=0;
	orders.forEach(function(order){
	let end=orders.length,tot=0,arr=[];
	products.find({product_name:{$in:order.productName}})
			.then(function(pdt) {  
			let j=0;
             pdt.forEach(function(p){
             let val=parseFloat(p.Stock_price.substring(1))*order.units[j];
             arr.push(val);
             j++;
             tot=tot+val;
             });
              i++;
              return arr;
         })
         .then(function(arr)
         {		
         order.costs=arr;
         order.total=tot;
         if(i===end)
         {
         	res.send(orders);
         }
         }, function(err) {
res.status(400).send("Error occured");
         });
		});
	}
},function(err){ res.status.send(err);});
}; 	

 
 
exports.getUser = async(req,res) => {
var user=req.params.user;
await users.findOne({user_name:user},(err,usr) =>
{
	if(err)
	{
		res.send(err);
	}
	else if(usr===null)
	{
		res.status(400).end("User not found!");
	}
	else
	{
		let obj={name:usr.user_name, phone_number:usr.phone_number, email:usr.email, kyc_status:usr.kyc_status, kyc_details:usr.kyc_details}
		res.status(200).send(obj);
	}
});
}; 	
  	


exports.getPdtInfo =async(req,res) => {
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




exports.getPageFaq = async(req,res) => {
var result = /[^/]*$/.exec(req.path)[0];
await pages.findOne({page_name:result},(err,page) =>{
	if(err)
	{
		res.send(err);
	}
	else if(page===null)
	{
		res.status(200).send("Page does not exist!");
	}
	else
	{
		var items=page.subsections;
		let st=0,q1=[],ar=[]
		const steps=[{
			id: "Greet",
			message: "Hello there, this is Emilia. How may I help you?",
			delay: 5,
			trigger: "question",
		  },{
		  id: "Ask",
		  message:"Anything else I can help you with?",
		  trigger:"Options",
		  },
		  {
		  id:"Options",
		options:[{value:1,label:"No",trigger:"End"},{value:2,label:"Yes",trigger:"Greet"}]
		  },{
		  id: "End",
		message: "See you later!",
		end:true
		  }];
		  if(req.body.kyc_status!="done")
		  {
		  	q1.push({value:0,label:"Kyc related questions",trigger:"qs"+(page.subsections.length)});
		  	steps.push({id:"qs"+(page.subsections.length),options:[
		  	{value:1,label:"How do I get my full kyc done",trigger:"a1"},
		  	{value:2,label:"I don't have a pan card. Can I still invest?",trigger:"a2"},
		  	{value:3,label:"Do you charge for processing kyc?",trigger:"a3"}]});
		  	steps.push({id:"a1",message:"You can get your full KYC done by uploading the required documents. Your full KYC will be done along with your first investment. Tap on 'Upload Docs'.",trigger:"Ask"});
		  	steps.push({id:"a2",message:"You cannot invest without a PAN card as per SEBI rules. Please get your PAN card made to start investing.",trigger:"Ask"});
		  	steps.push({id:"a3",message:"No. We do not charge anything for processing your KYC. We do it for free along with your first investment.",trigger:"Ask"});
		  }
          for (let i = 0; i < page.subsections.length; i = i + 1) {
            q1.push({value:i+1, label: page.subsections[i].type, trigger: "qs"+st });
            st = st + 1;
          }
          steps.push({id:"question",options:q1});
          for (let i = 0; i < items.length; i = i + 1) 
          {
		ar=[];
	   for(let j=0; j<items[i].questions.length;j=j+1)
		{
		  ar.push({value:i*10+j,label:items[i].questions[j],trigger:"ans"+i+j});
		}
	   steps.push({id:"qs"+i,options:ar});
	   for(let j=0; j<items[i].questions.length;j=j+1)
		{
		  steps.push({id:"ans"+i+j,message:items[i].answers[j],trigger:"Ask"});
		}
	}
	res.send(steps);
	}
});
};




exports.getPdtFaq=async(req,res) => {
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
		var q=pdt.questions,a=pdt.answers;
		let st=0,q1=[],ar=[];
		const steps=[{
			id: "Greet",
			message: "Hello there, this is Emilia. How may I help you?",
			delay: 5,
			trigger: "question",
		  },{
		  id: "Ask",
		  message:"Anything else I can help you with?",
		  trigger:"Options",
		  },
		  {
		  id:"Options",
		options:[{value:1,label:"No",trigger:"End"},{value:2,label:"Yes",trigger:"Greet"}]
		  },{
		  id: "End",
		message: "See you later!",
		end:true
		  }];
		  if(req.body.kyc_status!="done")
		  {
		  	q1.push({value:q.length+1,label:"How do I get my full kyc done",trigger:"a1"});
		  	q1.push({value:q.length+2,label:"I don't have a pan card. Can I still invest?",trigger:"a2"});
		  	q1.push({value:q.length+3,label:"Do you charge for processing kyc?",trigger:"a3"});
		  	steps.push({id:"a1",message:"You can get your full KYC done by uploading the required documents. Your full KYC will be done along with your first investment. Tap on 'Upload Docs'.",trigger:"Ask"});
		  	steps.push({id:"a2",message:"You cannot invest without a PAN card as per SEBI rules. Please get your PAN card made to start investing.",trigger:"Ask"});
		  	steps.push({id:"a3",message:"No. We do not charge anything for processing your KYC. We do it for free along with your first investment.",trigger:"Ask"});
		  }
          for (let i = 0; i <q.length; i = i + 1) {
            q1.push({value:i+1, label:q[i], trigger: "ans"+st });
            st = st + 1;
          }
          steps.push({id:"question",options:q1});
	   	for(let j=0; j<a.length;j=j+1)
		{
		  steps.push({id:"ans"+j,message:a[j],trigger:"Ask"});
		}
		 res.send(steps);
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
									var q=page.subsections[j].questions,a=page.subsections[j].answers;
									const steps=[{
						id: "Greet",
						message: "Hello there, this is Emilia. How may I help you?",
						delay: 5,
						trigger: "question",
					  },{
					  id: "Ask",
					  message:"Anything else I can help you with?",
					  trigger:"Options",
					  },
					  {
					  id:"Options",
					options:[{value:1,label:"No",trigger:"End"},{value:2,label:"Yes",trigger:"Greet"}]
					  },{
					  id: "End",
					message: "See you later!",
					end:true
					  }];
					  let st=0,q1=[],ar=[];
		  		if(req.body.kyc_status!="done")
				  {
				  	q1.push({value:q.length+1,label:"How do I get my full kyc done",trigger:"a1"});
				  	q1.push({value:q.length+2,label:"I don't have a pan card. Can I still invest?",trigger:"a2"});
				  	q1.push({value:q.length+3,label:"Do you charge for processing kyc?",trigger:"a3"});
				  	steps.push({id:"a1",message:"You can get your full KYC done by uploading the required documents. Your full KYC will be done along with your first investment. Tap on 'Upload Docs'.",trigger:"Ask"});
				  	steps.push({id:"a2",message:"You cannot invest without a PAN card as per SEBI rules. Please get your PAN card made to start investing.",trigger:"Ask"});
				  	steps.push({id:"a3",message:"No. We do not charge anything for processing your KYC. We do it for free along with your first investment.",trigger:"Ask"});
				  }
									
									  for (let i = 0; i <q.length; i = i + 1) {
										q1.push({value:i+1, label:q[i], trigger: "ans"+st });
										st = st + 1;
									  }
									  steps.push({id:"question",options:q1});
								   	for(let j=0; j<a.length;j=j+1)
									{
									  steps.push({id:"ans"+j,message:a[j],trigger:"Ask"});
									}
									res.send(steps);
    							}
    						}
    					}
    		 		});
	 			}
	}
	}
	});
};




exports.loggingUser =async(req,res) => {
	if(req.body.status==="logging in")
	{
		let password=req.body.password;
		await users.findOne({email: req.body.email}, (err, user) =>{
			if(err)
			{
				return res.status(400).json({ success: false, error: err })
			}
			else if(user===null)
			{
				res.status(404).send("You haven't registered. Sign in first");
			}
			else
			{
				if (user.password===password)
				{
				users.findOneAndUpdate({email:req.body.email}, {status:"logged in"}, { useFindAndModify: false })
    				.then(data => {																							
      				if (!data) {																						
        			res.status(404).send("Cannot update status . Maybe user was not found!");
			  		} else {
			  		console.log(data);																				
			  		res.status(200).send(user);
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
		users.findOneAndUpdate({email:req.body.email}, {status:"logged out"}, { useFindAndModify: false })
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






exports.registerUser =async(req,res) =>{
	let obj={user_name:req.body.username, phone_number:req.body.phone_number, status: "logged in",
	 password: req.body.password, email: req.body.email, kyc_status: req.body.kyc_status, kyc_details:{pan: req.body.pan},orders:[]};
					users.find({email:req.body.email},(err,user)=>{
						if(!user.length)
						{
							let new_user=new users(obj);
							if (!new_user){
								return res.status(400).json({ success: false, error: "Schema failed" })
							}
							new_user.save()																							
							.then(() => {
								return res.status(201).send(new_user);
							})
							.catch(error => {
								return res.status(404).send("Error: New user registration not done.");
							})
						}
						else
						{
							res.status(404).send("User already exits.");
						}
					});
					
};







exports.addOrder = async(req,res) =>{
	await users.findOne({user_name:req.params.user})
	.then(function(user){
		if(user===null)
		{
			res.status(400).send("User not found");
		}
		else
		{
			let order={order_id:user.orders.length+1,order_status:"Processing",
			productName:req.body.productName,units:req.body.units,
			costs:[],total:0};
			return order;
		}
	})
	.then(function(order){
		users.findOneAndUpdate({user_name:req.params.user},{$push:{orders:order}},{ useFindAndModify: false })
		.then(data => {																							
			if (!data) {																						
		  res.status(404).send("Cannot place order. Maybe user was not found!");
			} else {
			console.log(data);																				
			res.status(200).send("Order successfully placed");
		  }
		  })
		  .catch(err => {
			res.status(404).send(err);
			});
	},function(err){
		res.status(400).send(err);
	});	
};




exports.insertPageFaq = async(req,res) =>{
await pages.findOne({page_name:req.params.pagename},(err,page) =>{
		if(err)
		{
			res.send(err);
		}
		else if(page===null)
		{
			res.send("Page not found");
		}
		else
		{
			let subsection=req.body.subsection,subsections=page.subsections,f=0;
			for(let i=0;i<page.subsections.length;i++)
			{
				if(subsections[i].type===subsection)
				{
					f=1;
					subsections[i].questions.push(req.body.question);
					subsections[i].answers.push(req.body.answer);
					pages.findOneAndUpdate({page_name:req.params.pagename},{subsections:subsections}, { useFindAndModify: false })
					.then(data => {																							
					  if (!data) {																				
						res.status(404).send( `Cannot add page question to subsection with type=${subsection}. Maybe subsection was not found!`);
					  } else {																
					  res.status(201).send("Question added successfully!");}
					})
					.catch(err => {
					  res.status(404).send(err);
					});
					break;
				}
			}
			if(f===0)
			{
			res.status(400).send("Requested subsection not found");
			}
			
		}
});
};





exports.insertProductFaq = async(req,res) => {
	products.findOneAndUpdate(
   { product_id: req.params.id }, 
   { $push: { questions: req.body.question ,answers:req.body.answer} },(err, product) =>{
        if (err) {
            res.send(err);
        } else {
            res.status(201).send("FAQ-Answer pair successfully added!");
        }
    });
};






exports.updatePageFaq = async(req,res) =>{
await pages.findOne({page_name:req.params.pagename},(err,page) =>{
		if(err)
		{
			res.send(err);
		}
		else if(page===null)
		{
			res.send("Page not found");
		}
		else
		{
			let subsection=req.body.subsection,subsections=page.subsections,f=0;
			for(let i=0;i<page.subsections.length;i++)
			{
				if(subsections[i].type===subsection)
				{
					f=1;
					let c=0;
					for(let j=0;j<subsections[i].questions.length;j++)
					{
						if(subsections[i].questions[j]===req.body.oldquestion)
						{
								subsections[i].questions.splice(j,1);
								subsections[i].answers.splice(j,1);
								c=1;
								break;
						}
					}
					if(c===0)
					{
							res.status(404).send("Question or answer not found");
							break;
					}
					else
					{
					subsections[i].questions.push(req.body.newquestion);
					subsections[i].answers.push(req.body.newanswer);
					pages.findOneAndUpdate({page_name:req.params.pagename},{subsections:subsections}, { useFindAndModify: false })
					.then(data => {																							
					  if (!data) {																				
						res.status(404).send( `Cannot add page question to subsection with type=${subsection}. Maybe subsection was not found!`);
					  } else {																
					  res.status(201).send("Question-answer pair updated successfully!");}
					})
					.catch(err => {
					  res.status(404).send(err);
					});
					break;
					}
				}
			}
			if(f===0)
			{
			res.status(400).send("Requested subsection not found");
			}
			
		}
});
};







exports.updateProductFaq =async(req,res) =>{
	products.findOneAndUpdate(
   { product_id: req.params.id }, 
   { $pull: { questions: req.body.oldquestion ,answers:req.body.oldanswer} },(err, product) =>{
        if (err) {
            res.send(err);
        } else {
        	products.findOneAndUpdate(
		   { product_id: req.params.id }, 
		   { $push :{ questions: req.body.newquestion ,answers:req.body.newanswer} },(error, pdt) =>{
				if (error) {
				    res.send(error);
				} else {
					
				    res.status(200).send("FAQ-Answer pair updated successfully!");
				}
			});
        }
    });
};







exports.deletePageFaq = async(req,res) =>{
await pages.findOne({page_name:req.params.pagename},(err,page) =>{
		if(err)
		{
			res.send(err);
		}
		else if(page===null)
		{
			res.send("Page not found");
		}
		else
		{
			let subsection=req.body.subsection,subsections=page.subsections,f=0;
			for(let i=0;i<page.subsections.length;i++)
			{
				if(subsections[i].type===subsection)
				{
					f=1;
					let c=0;
					for(let j=0;j<subsections[i].questions.length;j++)
					{
						if(subsections[i].questions[j]===req.body.question)
						{
								subsections[i].questions.splice(j,1);
								subsections[i].answers.splice(j,1);
								c=1;
								break;
						}
					}
					if(c===0)
					{
						res.status(404).send("Question or answer not found!");
						break;
					}
					else
					{
					pages.findOneAndUpdate({page_name:req.params.pagename},{subsections:subsections}, { useFindAndModify: false })
					.then(data => {																							
					  if (!data) {																				
						res.status(404).send( `Cannot add page question to subsection with type=${subsection}. Maybe subsection was not found!`);
					  } else {																
					  res.status(201).send("Question-answer pair deleted successfully!");}
					})
					.catch(err => {
					  res.status(404).send(err);
					});
					break;
					}
				}
			}
			if(f===0)
			{
			res.status(400).send("Requested subsection not found");
			}
			
		}
});
};








exports.deleteProductFaq = async(req,res) => {
	products.findOneAndUpdate(
   { product_id: req.params.id }, 
   { $pull: { questions: req.body.question ,answers:req.body.answer} },(err, product) =>{
        if (err) {
            res.send(err);
        } else {
            res.status(200).send("FAQ-Answer pair deleted successfully!");
        }
    });
};
