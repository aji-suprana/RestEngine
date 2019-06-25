import mongoose, {Schema, Document} from 'mongoose'

export interface IUser_Quest extends Document
{
    _id: mongoose.Schema.Types.ObjectId,
    quests: [mongoose.Schema.Types.ObjectId],
}

let userQuestSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    quests: { type:[ mongoose.Schema.Types.ObjectId ], required:true }
})

export default mongoose.model<IUser_Quest>('User_Quest', userQuestSchema);