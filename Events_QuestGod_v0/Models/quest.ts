import mongoose,{Schema,Document} from 'mongoose'

export interface IQuest extends Document{
  _id:mongoose.Schema.Types.ObjectId,
  issuer_id:mongoose.Schema.Types.ObjectId,
  issuedDate:Date,
  endDate:Date,
  questName:string,
  participants: Array<mongoose.Schema.Types.ObjectId>,
  completed:  Array<mongoose.Schema.Types.ObjectId>,
  targetCompletion: Number
}

let questSchema = new Schema({
  _id:mongoose.Schema.Types.ObjectId,
  issuer_id:mongoose.Schema.Types.ObjectId,
  issuedDate:{ type: String, required:true},
  endDate : { type: String, required:false},
  questName:{ type: String, required:true},
  participants: [mongoose.Schema.Types.ObjectId],
  completed:  [mongoose.Schema.Types.ObjectId],
  targetCompletion: {type: Number,required :true},
});

export default mongoose.model<IQuest>('Quest', questSchema);