
import { Model, models, model, Types, Document, Schema, Date } from "mongoose";

interface RequestDocument extends Document {
    isAssignedBy: string;
    isApprovedBy: string
    status: "pending" | "completed";
    dateCompleted: Date
    // include relationship to the computer it's being dignosed to
}

const requestSchema = new Schema<RequestDocument>({
    isAssignedBy: {
        type: String
    },
    isApprovedBy: {
        type: String
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending"
    },
    dateCompleted: {
        type: Date
    }
    // include relationship to the computer it's being dignosed to

})

const Request = models.Request || model("Request", requestSchema);

export default Request as Model<RequestDocument>