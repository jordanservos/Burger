// Import MySQL connection.
var connection = require("../config/connection.js");


function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax


// Object for all our SQL statement functions.
var orm = {
    all: function(tableInput, cb) {
        var queryString = "SELECT * FROM ??;";
        connection.query(queryString, [tableInput], function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    create: function(table, cols, vals, cb) {
        console.log(table, vals, [table].concat(vals))
        let createQuery = connection.query(`INSERT INTO ?? (${cols.toString()}) VALUES (${printQuestionMarks(vals.length)})`, [table].concat(vals), function(err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
        console.log("CREATE QUERY", createQuery.sql)
    },

    update: function(table, objColVals, condition, cb) {
        connection.query(`UPDATE ?? SET ? WHERE ?? = ?`, [table, objColVals].concat(condition), function(err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },

    delete: function(table, id, cb) {
        connection.query("DELETE FROM ?? WHERE id = ?", [table, id], (error, result) => {
            cb(result);
        })
    }
};


module.exports = orm;