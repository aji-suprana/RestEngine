import mongoose,{Schema,Document} from 'mongoose'

export interface IGameProduct extends Document{
  _id:mongoose.Schema.Types.ObjectId,
  issuer_id:mongoose.Schema.Types.ObjectId,
  name:string,

}

let gameproductSchema = new Schema({
  _id:mongoose.Schema.Types.ObjectId,
  issuer_id:mongoose.Schema.Types.ObjectId,
  name: {type:String,required:true}
});

export default mongoose.model<IGameProduct>('GameProduct', gameproductSchema);