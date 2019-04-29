import mongoose,{Schema,Document} from 'mongoose'

export interface IProduct extends Document{
  _id:mongoose.Schema.Types.ObjectId,
  owner:mongoose.Types.ObjectId
  name:string,
  productType: string
}

let productSchema = new Schema({
  _id:mongoose.Schema.Types.ObjectId,
  owner: {type:mongoose.Types.ObjectId,required:true},
  name: {type:String,required:true},
  productType:{type:String,required:true}
});

export default mongoose.model<IProduct>('Product', productSchema);