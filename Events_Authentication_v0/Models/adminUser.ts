import mongoose,{Schema,Document} from 'mongoose'

export interface IAdminUser extends Document{
  _id:mongoose.Schema.Types.ObjectId,
  email:string,
  password:string,
  userType: string
}

let adminSchema = new Schema({
  _id:mongoose.Schema.Types.ObjectId,
  email:{
      type: String,
       required: true,
        unique:true,
        match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password:{ type: String, required:true},
  userType:{type:String,required:true}
});

export default mongoose.model<IAdminUser>('AdminUser', adminSchema);