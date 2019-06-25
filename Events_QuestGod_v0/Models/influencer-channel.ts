import mongoose, {Schema, Document} from 'mongoose';

export interface IInfluencer_Channel extends Document {
    _id: mongoose.Schema.Types.ObjectId,
    channelName: String,
    channelUrl: String,
    products: [mongoose.Schema.Types.ObjectId],
    followers: [mongoose.Schema.Types.ObjectId],
}

let influencerChannelSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    channelName: {type: String, required: true},
    channelUrl: {type: String, required: true},
    products: {type: [mongoose.Schema.Types.ObjectId], required: true},
    followers: {type: [mongoose.Schema.Types.ObjectId], required: true}
})

export default mongoose.model<IInfluencer_Channel>('Influencer_Channel', influencerChannelSchema);