import { Model, models, model, Document, Schema, Types } from "mongoose";

interface LaboratoryDocument extends Document {
  name: string;
  department: string;
  computers: Types.ObjectId;
}

const laboratorySchema = new Schema<LaboratoryDocument>({
    name: { 
        type: String, 
        required: true },
    department: { 
        type: String, 
        required: true },
    computers: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Request'
        }
    ]

});

const Laboratory = models.Laboratory || model("Laboratory", laboratorySchema);

export default Laboratory as Model<LaboratoryDocument>;
