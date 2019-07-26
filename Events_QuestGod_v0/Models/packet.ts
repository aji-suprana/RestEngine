import mongoose, {Schema, Document} from 'mongoose';

export interface IPacket extends Document{
    _id:mongoose.Schema.Types.ObjectId,
    packet:[mongoose.Schema.Types.ObjectId]
  }

  let packetSchema = new Schema({
      _id : mongoose.Schema.Types.ObjectId,
      packet: [mongoose.Schema.Types.ObjectId]
        
        
        
  });

  export default mongoose.model<IPacket>('Packet', packetSchema);

