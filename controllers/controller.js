'use strict';

const response = require('./res');
const connection = require('../service/koneksi');
const md5 = require('md5');


exports.index = function (req, res) {
    response.success("Running Rest API success", res);
};

//get  tb class
exports.getTbClass = function (req, res) {
    connection.query("SELECT * FROM tb_class where verifikasi=? ORDER BY id_class ASC ",['sukses'], function (error, rows, field) {
        if (error) {
            connection.log(error);
        } else {
            response.server(rows, res)
        }
    });
};
exports.getTbClassV = function (req, res) {
    connection.query("SELECT * FROM tb_class where verifikasi=? ORDER BY id_class ASC ",[''], function (error, rows, field) {
        if (error) {
            connection.log(error);
        } else {
            response.server(rows, res)
        }
    });
};
//post tb class
exports.postTbClas = async (req, res,next)=> {
    const nama_latin = req.body.nama_latin;
    const nama_umum = req.body.nama_umum;
    const ciri_ciri = req.body.ciri_ciri;
    const keterangan = req.body.keterangan;
    const image = req.body.image;
    console.log(req.file);
    await connection.query("INSERT INTO tb_class (id_class,nama_latin,nama_umum,ciri_ciri,keterangan,gambar) VALUES (?,?,?,?,?,CONCAT(?))",[null,nama_latin, nama_umum, ciri_ciri, keterangan, image], function (error, rows, field) {
        if (error) {
            connection.log(error);
        } else {
             res.json({status:"success"});
             next();
        }
    });
}
exports.postTbInstansi = async (req, res,next)=> {
    const nama = req.body.nama;
    const alamat = req.body.alamat;
    const username = req.body.username;
    const password = req.body.password;
    const id_level = req.body.id_level;
    console.log(req.file);
    await connection.query("INSERT INTO tb_institusi (id_institusi,nama,alamat,username,password,id_level) VALUES (?,?,?,?,?,?)",[null,nama, alamat, username, md5(password),id_level], function (error, rows, field) {
        if (error) {
            connection.log(error);
        } else {
             res.json({status:"success"});
             next();
        }
    });
}

exports.putTbClasV = async (req, res,next)=> {
    const verifikasi= req.body.verifikasi;
    const id_class = req.body.id_class;

    console.log(req.file);
    await connection.query("UPDATE tb_class SET verifikasi=? WHERE id_class=? ",[verifikasi,id_class], function (error, rows, field) {
        if (error) {
            connection.log(error);
        } else {
             res.json({status:"success"});
             next();
        }
    });
}
exports.putTbClas = async (req, res,next)=> {
    const nama_latin = req.body.nama_latin;
    const id_class = req.body.id_class;
    const nama_umum = req.body.nama_umum;
    const ciri_ciri = req.body.ciri_ciri;
    const keterangan = req.body.keterangan;
    const image = req.body.image;
    console.log(req.file);
    await connection.query("UPDATE tb_class SET nama_latin=?,nama_umum=?,ciri_ciri=?,keterangan=?,gambar=? WHERE id_class=? ",[nama_latin, nama_umum, ciri_ciri, keterangan, image,id_class], function (error, rows, field) {
        if (error) {
            connection.log(error);
        } else {
             res.json({status:"success"});
             next();
        }
    });
}

exports.deletebClass = function (req, res) {
    const id = req.params.id;
    connection.query("DELETE FROM tb_class WHERE id_class=?",[id], function (error, rows, field) {
        if (error) {
            connection.log(error);
        } else {
            response.server(rows, res)
        }
    });
};

//user
exports.getTbInstansi = function (req, res) {
    const id = req.params.id;
    connection.query("SELECT tb_institusi.nama,tb_userlevel.nama_level FROM tb_institusi,tb_userlevel WHERE tb_institusi.id_institusi =? AND tb_userlevel.id_level = tb_institusi.id_level ",[id], function (error, rows, field) {
        if (error) {
            connection.log(error);
        } else {
            response.server(rows, res)
        }
    });
};



exports.getTbInstansiAll = function (req, res) {
    connection.query("SELECT * FROM tb_institusi ORDER BY id_institusi ASC", function (error, rows, field) {
        if (error) {
            connection.log(error);
        } else {
            response.server(rows, res)
        }
    });
};
exports.getTbkategori= function (req, res) {
    connection.query("SELECT * FROM tb_kelangkaan ORDER BY id_kategori ASC", function (error, rows, field) {
        if (error) {
            connection.log(error);
        } else {
            response.server(rows, res)
        }
    });
};

