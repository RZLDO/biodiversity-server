var connection = require('../service/koneksi');
var mysql = require('mysql');
var md5 = require('md5');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');
var response = require('../controllers/res');

//controller register

exports.registrasi = function (req,res) {
    var post={
        nama : req.body.nama,
        alamat : req.body.alamat,
        username : req.body.username,
        password : md5(req.body.password),
        id_level : req.body.id_level,
    };
    var query = "SELECT username FROM ?? WHERE ??=? ";
    var table = ['tb_institusi','username', post.username];

    var querysql = mysql.format(query,table);
    connection.query(querysql,async (error,rows) =>{
        if (error) {
            console.log(error);
        }else{
            if (rows.length ==0) {
                var query = "INSERT INTO ?? SET ?";
                var table = ['tb_institusi'];
                var querysql = mysql.format(query,table);
                connection.query(querysql,post, async (error,rows)=> {
                    if (error) {
                        console.log(error)
                    }else{
                        response.success('Username berhasil terdaftar !',res);
                    }
                });
            }else{
                response.success('Username sudah terdaftar !',res);

            }
        }
    })

}


exports.login = function (req,res) {
    var post={
        username:req.body.username,
        password: md5(req.body.password),
    }
    var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
    var table = ['tb_institusi','username',post.username,'password',post.password];
    var querysql = mysql.format(query,table);
    connection.query(querysql,async(error,rows)=>{
        if (error) {
            console.log(error);
        }else{
            if (rows.length==1) {
                var token = jwt.sign({rows},config.secret,{
                    expiresIn:1440
                });
                id_user = rows[0].id_institusi;
                var data = {
                    id_user: id_user,
                    access_token:token,
                    ip_address: ip.address(),

                }
                var query = "INSERT INTO ?? SET ?";
                var table = ['akses_token',data];
                var querysql = mysql.format(query,table);
                connection.query(querysql,async(error,rows)=>{
                    if (error) {
                        console.log(error);
                    }else{
                         res.json({
                             success:true,
                             message:"Token JWT tergenerate !",
                             token:token,
                             currUser: data.id_user,
                             stastusCode:200
                         });
                    }
                });
            }else{
                 res.json({
                    stastusCode:400,
                     "success":false,"Message":"username dan password salah !"
                 });
            }
        }
    });
}

exports.halamanrahasia = function (req,res) {
    response.success("Halaman ini hanya untuk user dengan role = 2",res);
    
}