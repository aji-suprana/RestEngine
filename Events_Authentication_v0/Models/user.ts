import mongoose,{Schema,Document} from 'mongoose'

export interface IUser extends Document{
  _id:mongoose.Schema.Types.ObjectId,
  email:string,
  password:string,
  userType: string,
  point: Number
}

let userSchema = new Schema({
  _id:mongoose.Schema.Types.ObjectId,
  email:{
      type: String,
       required: true,
        unique:true,
        match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password:{ type: String, required:true},
  userType: { type: String, required: true},
  point: {type: Number, required: true}
});

export default mongoose.model<IUser>('User', userSchema);