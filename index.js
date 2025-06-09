const express = require('express');
var methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash'); 


const route = require("./routes/client/index_route"); // import route clinet
const routeAdmin = require("./routes/admin/index_route"); // import route adimn   

//cài đặt evn
require("dotenv").config();

const database = require("./config/database");//nhúng file databasse
database.connect();// gọi tên hàm cần sử dụng trong file database

const systemConfig = require("./config/system")//import config system

const app = express();
app.use(methodOverride('_method'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())
const port = process.env.PORT;//import từ file env để dùng port


//setting cho static files, cần chỉ đâu ra là public đâu là private
app.use(express.static(`${__dirname}/public`));


// flash
app.use(cookieParser('dasdas312'));
app.use(session({ cookie:{maxAge:60000 }}));
app.use(flash());
// end flash


//app locals variables, áp biến đó cho toàn cục, chỉ áp dụng cho file render, ở đây là file PUG
app.locals.prefixAdmin = systemConfig.prefixAdmin;

//setting cho pug
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

//router
//gọi hàm trong file router                                      
route(app); // sử dùng hàm trong file, vì trong
//  database chỉ có một hàm nên không cần chỉ tên hàm đã gọi
routeAdmin(app);
//end router

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`) 
})