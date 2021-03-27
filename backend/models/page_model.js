const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pages = new Schema(
  		{
			page_id: {type:Number},
			page_name: { type: String},
			products_listed:[{ type: Number,ref:'products'}],
			subsections: [{
					type: { type: String},
					questions:[String],
					answers: [String],
					button_name:[String],
					trigger:[String]
				}]
		},
    { timestamps: true })


module.exports = mongoose.model('pages', pages)
		
		
