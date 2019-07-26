import mongoose, {Schema, Document} from 'mongoose';

export interface ITest extends Document{
    _id: mongoose.Schema.Types.ObjectId,
    status: String
}

let testSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    status: {type:String, required: true}
});

export default mongoose.model<ITest>("Test", testSchema);