

require('express');
require('mysql2');
exports.setApp = function ( app, client )
{
    app.post('/api/login', async (req, res, next) =>
    {
        const [result] = await client.query('SELECT * FROM Person');
        console.log(result);
        var ret = {info: result};
        res.status(200).json(ret);
    });
}