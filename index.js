const express = require('express');
const path = require('path');//sử dụng cho tinimce
var methodOverride = require('method-override'); //dùng để nạp module, giả lập PUT, patch,.. khi trình duyệt chỉ hỗ trợ gửi form get, post, dùng post để thay cho cá thẻ còn lại
const bodyParser = require('body-parser'); // dùng để giúp đọc và hiểu dữ liệu mà client gửi lên server. ở dạng json (req.body)
//3 thư viện để hiển thị thông báo
const cookieParser = require('cookie-parser');//thư viện giúp đọc được cookies bên phía frontend
const session = require('express-session');
const flash = require('express-flash'); 
// end 3 thư viện để hiển thị thông báo
const moment = require("moment"); // thư viện giúp chuyển đổi ngày tháng
const http = require('http');
const { Server} = require("socket.io"); //sử dụng socketio


//cài đặt evn
require("dotenv").config();

const route = require("./routes/client/index_route"); // import route clinet
const routeAdmin = require("./routes/admin/index_route"); // import route adimn   



const database = require("./config/database");//nhúng file databasse
database.connect();// gọi tên hàm cần sử dụng trong file database

const systemConfig = require("./config/system");//import config system

const app = express();
app.use(methodOverride('_method'));

// parse application/x-www-form-urlencoded (áp dụng cho dữ liệu lấy từ phần form)
app.use(bodyParser.urlencoded())

const port = process.env.PORT;//import từ file env để dùng port


//setting cho static files, cần chỉ đâu ra là public đâu là private
app.use(express.static(`${__dirname}/public`));

//socketio
const server = http.createServer(app);
const io = new Server(server); //khởi tạo socketio
global._io=io;//tạo biến toàn cục là io (dùng bất kỳ đâu)
//end socketio


// flash
app.use(cookieParser('dasdas312'));
app.use(session({ cookie:{maxAge:60000 }}));
app.use(flash());
// end flash

//tinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
//end tinyMCE

//app locals variables, áp biến đó cho toàn cục, chỉ áp dụng cho file render, ở đây là file PUG
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;


//setting cho pug
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

app.get('/favicon.ico', (req, res) => res.status(204).end());


//router
//gọi hàm trong file router                                      
route(app); // sử dùng hàm trong file, vì trong
//  database chỉ có một hàm nên không cần chỉ tên hàm đã gọi
routeAdmin(app);
//end router

// thêm trang 404
app.use((req, res) => {
  res.status(404).render("client/pages/errors/errors404", {
    pageTitle: "404 Not Found",
  });
});


server.listen(port, () => {
  console.log(`Example app listening on port ${port}`) 
})