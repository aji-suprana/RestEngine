import mongoose, {Schema, Document} from 'mongoose';

export interface ITransaction extends Document{
    _id: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
    productId: mongoose.Schema.Types.ObjectId,
    status: Number
}

let transactionSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
    productId: mongoose.Schema.Types.ObjectId,
    status: {type: Number, default: null }
})
export default mongoose.model<ITransaction>('Transaction', transactionSchema);