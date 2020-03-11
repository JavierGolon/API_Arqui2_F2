const express =  require('express');
const router =  express.Router();
const index=require('../index');

router.get('/',(req,res)=>{
    res.send('hola Antirrobo');
});


module.exports=router;