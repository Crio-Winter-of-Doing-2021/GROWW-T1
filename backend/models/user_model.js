const mongoose = require('mongoose')
const Schema = mongoose.Schema

const users = new Schema(
    {
		user_id:{type:Number},
		user_name:{type:String},
		phone_number: {type:String},
		status: {type:String},
		password: {type:String},
		email: {type:String},
		kyc_status: {type:String},
		kyc_details:{pan:{type:String}},
		orders:[{order_id:{type:Number}, order_status: {type:String}, product_id:[{type:Number,ref:'products'}], units:[Number]}]
	},
    { timestamps: true })


module.exports = mongoose.model('users', users)
