const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

const routes = require('./routes/index')


mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://uvay8usjbe54psz1fhii:hiKwFcrPkbnElVj6OvMm@brpuevp1wfwomgz-mongodb.services.clever-cloud.com:27017/brpuevp1wfwomgz`,
                { useNewUrlParser: true }, (err) => {
                    if (!err) {
                        console.log('Database is connected!')
                    }
});

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', routes);

let port = 3001;
app.listen(port, () => {
    console.log('your app is runing in port' + port)
})
