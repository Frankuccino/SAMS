import { Model, models, model, Types } from "mongoose";
import { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

interface UserDocument extends Document {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    role: "admin" | "manager" | "staff" | "user";
    request: Types.ObjectId;
}

interface Methods {
    comparePassword(password: string): Promise<boolean>
}

const userSchema = new Schema<UserDocument, {}, Methods>({
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true
    },
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true
    },
    firstName: {
        type: String,
        required: [true, "Please provide your first name"],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "Please provide your last name"],
        trim: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"]
    },
    role: {
        type: String,
        enum: ["admin", "manager", "staff", "user"],
        default: "user"
    },
    request: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Request'
        }
    ]
});

// Hash password before saving to DB
userSchema.pre("save", async function (next) {
// Only hash if we are modifying the password
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        throw error;
    }
})

// Compare password method
userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
}   

const User = models.User || model("User", userSchema);

export default User as Model<UserDocument, {}, Methods>;