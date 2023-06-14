const mongoose = require("mongoose")

// connection string
mongoose.connect("mongodb://127.0.0.1:27017/carSerever", { useNewUrlParser: true })

// model 
// schema means fields and values
const User = mongoose.model("User",
    {
        cname: String,
        cid: Number,
        password: String,
        Accepted:String,
        transactions:[]
    })


module.exports = {
    User
}


