import mongoose, {Schema, Document} from 'mongoose'

export interface IInfluencer_Product extends Document {
    _id: mongoose.Schema.Types.ObjectId,
    ownerId: mongoose.Schema.Types.ObjectId,
    name: String,
    command: Number,
    price: number,
}

let influencerProductSchema = new Schema({
    //influencer id
    _id: mongoose.Schema.Types.ObjectId,
    ownerId: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true},
    command: { type: Number, required: true},
    price: { type: Number, required: true }
})

export default mongoose.model<IInfluencer_Product>('Influencer_Product', influencerProductSchema);