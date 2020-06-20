import mongoose from 'mongoose';
import {Password} from "../services/password";

// An interface that describes the properties that are required for user creation
interface UserAttrs {
    email: string;
    password: string;
}

//An interface that describes the properties that the User model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

//An interface that describes the properties that a User Document has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}


const userSchema = new mongoose.Schema({
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        // This hides the password and __v values when object is parsed into json
        toJSON: {
            transform(doc, ret) {
                delete ret.password;
                delete ret.__v;

            }
        }
    }
);

userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
})

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export {User};
