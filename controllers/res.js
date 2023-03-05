'use strict';

exports.success = function(values, res){
    var data = {
        'status':200,
        'biodiversity':values,
    };
     res.json(data);
     res.end();
}

exports.server = function(values, res){
     res.json(values);
     res.end();
}