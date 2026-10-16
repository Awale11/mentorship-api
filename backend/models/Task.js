import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    // title-ka in lasoo paaso waa qasab
  title: { type: String, required: true },
  description: String,
  status: {
    type: String,
    // enum= options midkood waa inuu lahaado
    enum: ['pending', 'in progress', 'completed'],
    // marka ugu horeeso default ahan waa pending
    default: 'pending'
  },
  dueDate: Date,
//   yaa iskaleh text-gaan
  createdBy: {
    // text-gan userka iska leh id-iga ayan save garenaynaa
    type: mongoose.Schema.Types.ObjectId,
    // wuxu refrence u yhy collection-ka User
    ref: 'User',
    required: true
  }
//   schema-ha meshu ku xirmo gadaashiisa ayad dhigaysaa timestamps-ka= it tells sacaadda markaas iyo tarikhda otomatically
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);

// si loo isticaamlo this schema we make zod in folder of schema file taskSchema