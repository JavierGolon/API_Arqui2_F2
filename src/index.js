const express = require('express'); // inicializa la apliacion
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet'); 
const morgan = require('morgan');
const path = require('path');


// Inicializacion 
const app = express();
app.set('views', path.join(__dirname, 'views'));
//Settigns
app.set('port',process.env.PORT || 8080);
// codificacion de las urls
app.use(express.urlencoded())
//WiddleWares
app.use(morgan('dev')); // muestra mensajes y procesos por consola 
// helmet to apis security
app.use(helmet());
// enabling CORS for all requests
app.use(cors());
// habilitando json
app.use(express.json());

//***************************** ENDPOINTS *************************************************** */
app.use((req,res,next)=>{

    next();
  });

app.get('/', (req, res) => {
    res.send('Servidor Funcionando');
  });
  app.use('/Cardiaco',require('./Routes/SensorCardiaco'));
  app.use('/Giroscopio',require('./Routes/SensorGiroscopio'));
  app.use('/Lluvia',require('./Routes/SensorLLuvia'));
  app.use('/Luz',require('./Routes/SensorLuz'));
  app.use('/Peso',require('./Routes/SensorPeso'));
  app.use('/Sonido',require('./Routes/SensorSonido'));
  app.use('/Robo',require('./Routes/ControlAntirrobo'));
  
  




//************************************************************************************************** */


app.listen(app.get('port'),'0.0.0.0',()=>{
    console.log('Server on port',app.get('port'));
})


