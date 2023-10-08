import { Model, models, model, Document, Schema, Types } from "mongoose";

interface ComputerDocument extends Document {
  name: string;
  laboratory: Types.ObjectId; // Reference to the associated laboratory
  details: string;
  // Add other computer-related fields as needed
}

const computerSchema = new Schema<ComputerDocument>({
    name: { 
        type: String, 
        required: true 
    },
    laboratory: { 
        type: Schema.Types.ObjectId, 
        ref: "Laboratory", 
        required: true 
    },
    details: { 
        type: String 
    },
    // Add other computer-related fields as needed
});

const Computer = models.Computer || model("Computer", computerSchema);

export default Computer as Model<ComputerDocument>;
