import mongoose,{Schema,Document} from 'mongoose'

export interface IUser_Product extends Document{
  _id:mongoose.Schema.Types.ObjectId,
  products:[mongoose.Schema.Types.ObjectId],
}

let userProductSchema = new Schema({
  _id:mongoose.Schema.Types.ObjectId,
  products: {type:[mongoose.Schema.Types.ObjectId],required :true}
});

export default mongoose.model<IUser_Product>('User_Product', userProductSchema);