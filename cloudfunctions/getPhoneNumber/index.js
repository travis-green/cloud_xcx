const cloud = require('wx-server-sdk')

cloud.init()
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'test'
});

connection.connect();

var addSql = 'INSERT INTO websites(Id,name,url,alexa,country) VALUES(0,?,?,?,?)';
var addSqlParams = ['2222', '234234324', '23453', 'CN'];
//增
connection.query(addSql, addSqlParams, function (err, result) {
	if (err) {
		console.log('[INSERT ERROR] - ', err.message);
		return;
	}
	console.log('--------------------------INSERT----------------------------');
	//console.log('INSERT ID:',result.insertId);        
	console.log('INSERT ID:', result);
	console.log('-----------------------------------------------------------------\n\n');
});

connection.end();
// 云函数入口函数
exports.main = async (event, context) => {
	return {
		phoneData: event.phoneNumber.data
	}
}