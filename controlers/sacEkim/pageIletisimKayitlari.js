const htmlspecialchar = require('htmlspecialchars');
const moment = require('moment'); moment().locale('tr');
const queryManager = require('../queryManager');
const permissions = require('../permissions');

const Click = (data, actionName, callback) => {
    let tableData = [{
        _id: '',
        isim: '',
        telefon: '',
        mesaj: '',
        createDate: '',
        status: '',
    }];
    let json = {
        request: data,
        tableData,
        actionName,
        queryString: 'isim telefon mesaj createDate status',
        queryJSON: { status: "Dönüş sağlandı", },
        querySchema: 'IletisimTalebi'
    };
    queryManager.Click(json, (result) => {
        callback(result);
    });
};
module.exports = {
    Click,
};