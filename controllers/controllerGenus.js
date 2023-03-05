'use strict';

const response = require('./res');
const connection = require('../service/koneksi');


//ordo
exports.getTbGenus = function (req, res) {
    connection.query("SELECT * FROM tb_genus where verifikasi='sukses' ORDER BY id_genus ASC", function (error, rows, field) {
        if (error) {
            connection.log(error);
        } else {
            response.server(rows, res)
        }
    });
};
exports.getTbGenusv = function (req, res) {
    connection.query("SELECT * FROM tb_genus where verifikasi='' ORDER BY id_genus ASC", function (error, rows, field) {
        if (error) {
            connection.log(error);
        } else {
            response.server(rows, res)
        }
    });
};
// post genus
exports.postTbGenus = async (req, res,next)=> {
    const nama_latin = req.body.nama_latin;
    const nama_umum = req.body.nama_umum;
    const ciri_ciri = req.body.ciri_ciri;
    const keterangan = req.body.keterangan;
    const image = req.body.image;
    const id_famili = req.body.id_famili;
    console.log(req.file);
    await connection.query("INSERT INTO tb_genus (id_genus,nama_latin,nama_umum,ciri_ciri,keterangan,gambar,id_famili) VALUES (?,?,?,?,?,CONCAT(?),?)",[null,nama_latin, nama_umum, ciri_ciri, keterangan, image,id_famili], function (error, rows, field) {
        if (error) {
            connection.log(error);
        } else {
             res.json({status:"success"});
             next();
        }
    });
};

exports.deleteGenus = function (req, res) {
    const id = req.params.id;
    connection.query("DELETE FROM tb_genus WHERE id_genus=?",[id], function (error, rows, field) {
        if (error) {
            connection.log(error);
        } else {
            response.server(rows, res)
        }
    });
};

exports.getTbGenusID = function (req, res) {
    const id = req.params.id;
    connection.query("SELECT * FROM tb_genus WHERE id_famili=?",[id], function (error, rows, field) {
        if (error) {
            connection.log(error);
        } else {
            response.server(rows, res)
        }
    });
};



exports.putTbGenus = async (req, res,next)=> {
    const nama_latin = req.body.nama_latin;
    const id_genus = req.body.id_genus;
    const id_famili = req.body.id_famili;
    const nama_umum = req.body.nama_umum;
    const ciri_ciri = req.body.ciri_ciri;
    const keterangan = req.body.keterangan;
    const image = req.body.image;
    console.log(req.file);
    await connection.query("UPDATE tb_genus SET nama_latin=?,nama_umum=?,ciri_ciri=?,keterangan=?,gambar=?,id_famili=? WHERE id_genus=? ",[nama_latin, nama_umum, ciri_ciri, keterangan, image,id_famili,id_genus], function (error, rows, field) {
        if (error) {
            connection.log(error);
        } else {
            res.json({status:"success"});
            next();
        }
    });
}
exports.putTbGenusv = async (req, res,next)=> {
  
    const id_genus = req.body.id_genus;
  
    console.log(req.file);
    await connection.query("UPDATE tb_genus SET verifikasi='sukses' WHERE id_genus=? ",[id_genus], function (error, rows, field) {
        if (error) {
            connection.log(error);
        } else {
            res.json({status:"success"});
            next();
        }
    });
}

