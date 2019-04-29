import mongoose,{Schema,Document} from 'mongoose'

export interface IProductContainer extends Document{
  _id:mongoose.Schema.Types.ObjectId,
  products:[mongoose.Schema.Types.ObjectId],
}

let productContainerSchema = new Schema({
  _id:mongoose.Schema.Types.ObjectId,
  products: {type:[mongoose.Schema.Types.ObjectId],required :true}
});

export default mongoose.model<IProductContainer>('ProductContainer', productContainerSchema);