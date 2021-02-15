const router = require('express').Router();

router.get('/',req,res)=>{
    res.json({
        post:{
            title:"my first post",
            description:'random data you shouldnt access'
        }
    });
}