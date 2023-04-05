import mongoose from 'mongoose'

const profileSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    contact: String,
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    confirmPassword: String
})

const Profile = mongoose.model('Profile', profileSchema)

export default Profile