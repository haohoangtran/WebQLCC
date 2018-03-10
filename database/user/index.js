const userModel=require('./userSchema');
const {md5 }=require('../../utils')
let getAllUser=(callback)=>{
    userModel.find({},(err,result)=>{
        callback(err,result)
    });
};
let login=(username,password,callback)=>{

};
let register=(username,password,callback)=>{
    password=md5(password);
    let user=new userModel({username,password});
    user.save(err=>{
        if(err){
            console.log(err);
            callback(err,null)
        }else {
            callback(null,user)
        }
    });
};
module.exports={
    getAllUser,register
}