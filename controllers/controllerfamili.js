'use strict';

const response = require('./res');
const connection = require('../service/koneksi');


//ordo
exports.getTbFamili = function (req, res) {
    connection.query("SELECT * FROM tb_famili where verifikasi='sukses' ORDER BY id_famili ASC", function (error, rows, field) {
        if (error) {
            connection.log(error);
        } else {
            response.server(rows, res)
        }
    });
};
exports.getTbFamiliv = function (req, res) {
    connection.query("SELECT * FROM tb_famili where verifikasi='' ORDER BY id_famili ASC", function (error, rows, field) {
        if (error) {
            connection.log(error);
        } else {
            response.server(rows, res)
        }
    });
};
// post famili
exports.postTbFamili = async (req, res,next)=> {
    const nama_latin = req.body.nama_latin;
    const nama_umum = req.body.nama_umum;
    const ciri_ciri = req.body.ciri_ciri;
    const keterangan = req.body.keterangan;
    const image = req.body.image;
    const id_ordo = req.body.id_ordo;
    console.log(req.file);
    await connection.query("INSERT INTO tb_famili (id_famili,nama_latin,nama_umum,ciri_ciri,keterangan,gambar,id_ordo) VALUES (?,?,?,?,?,CONCAT(?),?)",[null,nama_latin, nama_umum, ciri_ciri, keterangan, image,id_ordo], function (error, rows, field) {
        if (error) {
            connection.log(error);
        } else {
             res.json({status:"success"});
             next();
        }
    });
};

exports.deleteFamili = function (req, res) {
    const id = req.params.id;
    connection.query("DELETE FROM tb_famili WHERE id_famili=?",[id], function (error, rows, field) {
        if (error) {
            connection.log(error);
        } else {
            response.server(rows, res)
        }
    });
};
exports.getTbFamiliId = function (req, res) {
    const id = req.params.id;
    connection.query("SELECT * FROM tb_famili WHERE id_ordo=?",[id], function (error, rows, field) {
        if (error) {
            connection.log(error);
        } else {
            response.server(rows, res)
        }
    });
};



exports.putTbFamili = async (req, res,next)=> {
    const nama_latin = req.body.nama_latin;
    const id_ordo = req.body.id_ordo;
    const id_famili = req.body.id_famili;
    const nama_umum = req.body.nama_umum;
    const ciri_ciri = req.body.ciri_ciri;
    const keterangan = req.body.keterangan;
    const image = req.body.image;
    console.log(req.file);
    await connection.query("UPDATE tb_famili SET nama_latin=?,nama_umum=?,ciri_ciri=?,keterangan=?,gambar=?,id_ordo=? WHERE id_famili=? ",[nama_latin, nama_umum, ciri_ciri, keterangan, image,id_ordo,id_famili], function (error, rows, field) {
        if (error) {
            connection.log(error);
        } else {
            res.json({status:"success"});
            next();
        }
    });
}

exports.putTbFamiliv = async (req, res,next)=> {
  
    const id_famili = req.body.id_famili;
   
    console.log(req.file);
    await connection.query("UPDATE tb_famili SET verifikasi='sukses' WHERE id_famili=? ",[id_famili], function (error, rows, field) {
        if (error) {
            connection.log(error);
        } else {
            res.json({status:"success"});
            next();
        }
    });
}
