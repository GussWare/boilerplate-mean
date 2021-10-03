import mysql from "mysql2/promise";

export const getListaNombres = async () => {
    var conn = await mysql.createConnection({
        host     : '127.0.0.1',
        user     : 'root',
        password : '123qweAA',
        database : 'base_mean'
    });

	const [rows ]= await conn.execute('SELECT * FROM tbl_jerarquia');

    conn.end();

    return rows;
};