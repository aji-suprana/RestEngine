import mongoose,{Schema,Document} from 'mongoose'

export interface IProduct extends Document{
  _id:mongoose.Schema.Types.ObjectId,
  owner:mongoose.Types.ObjectId,
  name:string,
  productType: string,
  // quest: mongoose.Schema.Types.ObjectId,
}

let productSchema = new Schema({
  _id:mongoose.Schema.Types.ObjectId,
  owner: {type:mongoose.Types.ObjectId,required:true,index:true},
  name: {type:String,required:true},
  productType:{type:String,required:true},
  // quest: {type:[mongoose.Schema.Types.ObjectId],required :true, index:true},

});

export default mongoose.model<IProduct>('Product', productSchema);