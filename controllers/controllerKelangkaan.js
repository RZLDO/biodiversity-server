'use strict';

const response = require('./res');
const connection = require('../service/koneksi');


//ordo
exports.getTbKelangkaan = function (req, res) {
    connection.query("SELECT * FROM tb_kelangkaan ORDER BY id_kategori ASC", function (error, rows, field) {
        if (error) {
            connection.log(error);
        } else {
            response.server(rows, res)
        }
    });
};
