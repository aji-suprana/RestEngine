import mongoose, {Schema, Document} from 'mongoose';

export interface IMulter_Model extends Document{
    _id: mongoose.Schema.Types.ObjectId,
    name: string,
}

let multerSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type:String, required: true}
})

export default mongoose.model<IMulter_Model>('Multer_Model', multerSchema);