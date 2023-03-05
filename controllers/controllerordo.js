'use strict';

const response = require('./res');
const connection = require('../service/koneksi');


//ordo

exports.getTbOrdo = function (req, res) {
    connection.query("SELECT * FROM tb_ordo where verifikasi ='sukses' ORDER BY id_ordo ASC", function (error, rows, field) {
        if (error) {
            connection.log(error);
        } else {
            response.server(rows, res)
        }
    });
};
exports.getTbOrdov = function (req, res) {
    connection.query("SELECT * FROM tb_ordo where verifikasi ='' ORDER BY id_ordo ASC ", function (error, rows, field) {
        if (error) {
            connection.log(error);
        } else {
            response.server(rows, res)
        }
    });
};
//post ordo
exports.postTbOrdo = async (req, res,next)=> {
    const nama_latin = req.body.nama_latin;
    const nama_umum = req.body.nama_umum;
    const ciri_ciri = req.body.ciri_ciri;
    const keterangan = req.body.keterangan;
    const id_class = req.body.id_class;
    const image = req.body.image;
    console.log(req.file);
    await connection.query("INSERT INTO tb_ordo (id_ordo,nama_latin,nama_umum,ciri_ciri,keterangan,gambar,id_class) VALUES (?,?,?,?,?,CONCAT(?),?)",[null,nama_latin, nama_umum, ciri_ciri, keterangan, image,id_class], function (error, rows, field) {
        if (error) {
            connection.log(error);
        } else {
             res.json({status:"success"});
             next();
        }
    });
};

exports.deleteOrdo = function (req, res) {
    const id = req.params.id;
    connection.query("DELETE FROM tb_ordo WHERE id_ordo=?",[id], function (error, rows, field) {
        if (error) {
            connection.log(error);
        } else {
            response.server(rows, res)
        }
    });
};

exports.getTbOrdoId = function (req, res) {
    const id = req.params.id;
    connection.query("SELECT * FROM tb_ordo WHERE id_class=?",[id], function (error, rows, field) {
        if (error) {
            connection.log(error);
        } else {
            response.server(rows, res)
        }
    });
};



exports.putTbOrdo = async (req, res,next)=> {
    const nama_latin = req.body.nama_latin;
    const id_class = req.body.id_class;
    const id_ordo = req.body.id_ordo;
    const nama_umum = req.body.nama_umum;
    const ciri_ciri = req.body.ciri_ciri;
    const keterangan = req.body.keterangan;
    const image = req.body.image;
    console.log(req.file);
    await connection.query("UPDATE tb_ordo SET nama_latin=?,nama_umum=?,ciri_ciri=?,keterangan=?,gambar=?,id_class=? WHERE id_ordo=? ",[nama_latin, nama_umum, ciri_ciri, keterangan, image,id_class,id_ordo], function (error, rows, field) {
        if (error) {
            connection.log(error);
        } else {
             res.json({status:"success"});
             next();
        }
    });
}


exports.putTbOrdov = async (req, res,next)=> {
    const verifikasi = req.body.verifikasi
    const id_class = req.body.id_class;
    const id_ordo = req.body.id_ordo;

    console.log(req.file);
    await connection.query("UPDATE tb_ordo SET verifikasi=?,id_class=? WHERE id_ordo=? ",[verifikasi,id_class,id_ordo], function (error, rows, field) {
        if (error) {
            connection.log(error);
        } else {
             res.json({status:"success"});
             next();
        }
    });
}