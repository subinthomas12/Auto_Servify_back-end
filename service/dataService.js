const jwt = require("jsonwebtoken")
const db = require("./db")







view = (cid) => {

  return db.User.findOne({cid}).then(user => {
    if (user) {
      if (user.Accepted == "accepted") {
        return {
          status: true,
          message: "Service Request is accepted ",
          statusCode:200

        }
      }
      else if(user.Accepted=="Rejected"){

        return{
          status:true,
          message:"Service Request is rejected",
          statusCode:200

        }
      }
      else{
        return{
          status:true,
          message:"no messages",
          statusCode:200
        }
      }
    }
  })


}



accept = (cid) => {
  return db.User.findOne({cid}).then(user => {


    if (user) {
      user.Accepted = "accepted"
      user.save()
      return {

        status: true,
        message: "accepted",
        statusCode: 200

      }
    }
    else{
      return {

        status: false,
        message: "service request reject",
        statusCode: 404
      }
    }


  })
}



reject=(cid)=>{
  return db.User.findOne({cid}).then(user=>{
      if(user){

          user.Accepted="Rejected"

          user.save()

          return{
              status:true,
              message:"Success",
              statusCode:200
          }

      }
  })
}














reci = () => {
  return db.User.find({}).then(user => {
    console.log(user);
    if (user) {

      return {
        status: true,
        message: "login success",
        statusCode: 200,
        transactions:user.map(n1=>n1["transactions"]).flat(),

      }
    }

    else {
      return {
        status: false,
        message: "incorrect password or acountnumber",
        statusCode: 404


      }
    }
  }
  )

}



vregister = (cid,vnum,vtype,date,sq,desc) => {

  return db.User.findOne({ cid }).then(user => {

    if (user) {

      user.transactions.push({
        vnum,
        sq,
        desc,
        vtype,
        Date:date,
        cid
      })
      user.save()

      return {
        status: true,
        message: "Data Updated",
        statusCode: 200
      }
    }
    else {

      return {
        status: false,
        message: "User not present",
        statusCode: 200
      }
    }
  })
}


register = (cid, cname, psw) => {

  return db.User.findOne({ cid }).then(user => {
    // if acno present in db then get the object of that user else null response
    if (user) {
      return {
        status: false,
        message: "user already present",
        statusCode: 404
      }

    }
    else {

      newUser = new db.User({
        customername: cname,
        cid,
        password: psw,
        balance: 0,
        transactions: []
      })
      newUser.save()
      return {
        status: true,
        message: "registered",
        statusCode: 200
      }
    }
  })
}





login = (cid, psw) => {

  return db.User.findOne({ cid, password: psw }).then(user => {
    if (user) {
      currentUser = user.username
      currentCid = cid
      const token = jwt.sign({ cid }, "superkey123")
      return {
        status: true,
        message: "login success",
        statusCode: 200,
        currentUser,
        currentCid,
        token
      }
    }
    else {
      return {
        status: false,
        message: "incorrect acno or password",
        statusCode: 404
      }
    }
  })
}


module.exports = {
  register, login, vregister, reci,accept,view,reject
}