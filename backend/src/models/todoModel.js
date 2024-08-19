const {Schema,model} = require('mongoose');

const todoSchema = new Schema({
    title: {type: String, required: true},
    status: {type: Boolean,enum:[true,false], default: false},
    userId: {type: Schema.Types.ObjectId, ref: "users"},
});

const todoModel= model('todos', todoSchema)

module.exports = todoModel;