var mongoose = require('mongoose');
//var db = require('./connect');


var Schema = mongoose.Schema;

var User = mongoose
                .model('users',new Schema({
                    id: String,
                    device_id: String,
                    email: String,
                    username: String,
                    password: String,
                    profile_picture: String,
                    role: Number,
                    user_ip: Array,
                    department: String,
                    timestamp: Date
                },{collection: 'usuarios'}))

var Bug = mongoose
                .model('bug',new Schema({
                    id: String,
                    bug_title: String,
                    status: String,
                    priority: String,
                    severity: String,
                    area: String,
                    tester_id: String,
                    tester_name: String,
                    description: String,
                    how_to_rep: String,
                    suggested_fix: String,
                    coments: Number,
                    timestamp: String
                },{collection: 'bugs'}))


var Message = mongoose
                .model('message',new Schema({
                    id: String,
                    from_id: String,
                    to_id: String,
                    from_device_id:String,
                    sender_name: String,
                    receiver_name: String,
                    message: String,
                    bug_report_id: String,
                    timestamp: Date
                },{ collection: 'messages' }))



var Category = mongoose
                .model('category',new Schema({
                    id: String,
                    category: String,
                    description: String,
                    imageurl: String,
                    timestamp: Date,
                    updated: Date
                },{ collection: 'categories' }))


var Contact = mongoose
                .model('contact', new Schema({
                    id: String,
                    username: String,
                    contact_id: String,
                    contact_department: String,
                    contact: String
                },{collection: 'contacts'}))


module.exports = {
     User
    ,Bug
    ,Category
    ,Message
    ,Contact
}
