const express =  require('express');
const router =  express.Router();
const index=require('../index');
const connection = require('../ConexionSQL');
const {Request } = require("tedious");

var list ={
  'datos':[]
};

router.post('/Post',(req,res)=>{
  var getfecha=req.body.Fecha
  console.log(getfecha);
  ObtenerAcele(getfecha);
  json = JSON.stringify(list);
  res.send(json);
  CleanData();

});


router.post('/',(req,res)=>{
    var xval = req.body.X;
    var yval = req.body.Y;
    var zval = req.body.Z;
    var paso = req.body.Paso;
    console.log(xval+'->'+yval+'->'+zval);
    console.log(req.body);
    var fechafull = ObtenerFecha();
    InsertGiroscopio(xval,yval,zval,fechafull);
    InsertPasos(paso,fechafull);
    res.send('Insertando Giroscopio....');
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


function InsertGiroscopio(x,y,z,fecha) {
    console.log("Reading rows from the Table...");
  
    // Read all rows from table
  
      //SQL satement
      var sql = "insert into acelerometro(x,y,z,fecha) values ('"+x+"','"+y+"','"+z+"','"+fecha+"')"
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



  function InsertPasos(valor,fecha) {
    console.log("Reading rows from the Table...");
  
    // Read all rows from table
  
      //SQL satement
      var sql = "insert into Pasos(valor,fecha) values ('"+valor+"','"+fecha+"')"
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


  function ObtenerAcele(dia){
    
    console.log("Reading rows from the Table...");

    // Read all rows from table
    const request = new Request(
      `select x,y,z
      from acelerometro
      where cast(fecha as date) = '`+dia+`';`,
      (err, rowCount) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log(`${rowCount} row(s) returned`);
        }
      }
    );
  
    request.on("row", columns => {
      var jsondata={};
   
      columns.forEach(column => {
        //console.log("%s\t%s", column.metadata.colName, column.value);
        //list.datos.push({"valor":column.value});
        jsondata['valor']=column.value;
        
      }
      );
      list.datos.push(jsondata);
      
      
    });
  
    connection.execSql(request);
  }


   function CleanData(){
    while(list.datos.length>0){
      list.datos.pop();
    }
  }


module.exports=router;