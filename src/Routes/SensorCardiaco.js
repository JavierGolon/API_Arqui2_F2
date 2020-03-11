const express =  require('express');
const router =  express.Router();
const index=require('../index');
const connection = require('../ConexionSQL');
const {Request } = require("tedious");

router.get('/',(req,res)=>{
    res.send('hola Cardiaco');
});


router.post('/',(req,res)=>{
    var valor = req.body.Pulso;
    console.log(req.body);
    var fechafull = ObtenerFecha();
    InsertarCardiaco(valor,fechafull);
    res.send('Insertando Pulso Cardiaco.....');
  });


function ObtenerFecha(){
    let now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();
    var day = now.getDay();
    var hora = now.getHours();
    var minutos = now.getMinutes();
    var seconds = now.getSeconds();
    var fechafull = year+'-'+month+'-'+day+' '+hora+':'+minutos+':'+seconds;
    return fechafull;
}

function InsertarCardiaco(valor,fecha) {
    console.log("Reading rows from the Table...");
  
    // Read all rows from table
  
      //SQL satement
      var sql = "insert into pulso(valor,fecha) values ('"+valor+"','"+fecha+"')"
      console.log('query========='+sql)
  
    const request = new Request(sql,
      (err, rowCount)=> {
        if (err) {
          console.error(err.message);
        } else {
          console.log('rowCount======='+rowCount);
        }
      }
    );
    connection.execSql(request);
  }


 



module.exports=router;