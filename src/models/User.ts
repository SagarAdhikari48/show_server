import mongoose, { Document, Schema } from "mongoose";
export interface IUser extends Document{
    name: string;
    email:string;
    age:number;
    createdAt: Date;
}

const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /.+\@.+\..+/
    },
    age: {
        type: Number,
        required: true,
        min: 0,
        max: 120
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    versionKey: false
});
export default mongoose.model<IUser>('User', UserSchema);
// This code defines a Mongoose schema and model for a User entity in a Node.js application.
// The schema includes fields for name, email, age, and createdAt timestamp.
// It also includes validation rules such as required fields, unique email, and age limits.
// The model is then exported for use in other parts of the application.                