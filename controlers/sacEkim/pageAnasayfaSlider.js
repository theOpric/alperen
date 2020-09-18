const htmlspecialchar = require('htmlspecialchars');
const moment = require('moment'); moment().locale('tr');
const queryManager = require('../queryManager');
const queryString = 'hastaAdi gorsel hastaGorsel yaziTR createUser createDate';
const schemaAnasayfaSlider = require('../../models/sacEkim/schemaAnasayfaSlider');

const Click = (data, actionName, callback) => {
    schemaAnasayfaSlider.find({}).then((sliderData) => {
        let tableData = [{
            _id: '',
            hastaAdi: '',
            gorsel: '',
            hastaGorsel: '',
            yaziTR: '',
            createUser: '',
            createDate: '',
        }];
        let json = {
            request: data,
            tableData,
            actionName,
            queryString,
            queryJSON: {},
            querySchema: 'AnasayfaSlider'
        };
        queryManager.Click(json, (result) => {
            result['sliderData'] = sliderData;
            callback(result);
        });
    });
};
const Insert = (data, actionName, callback) => {
    let clientData = data.data;
    let uniqueFields = {};
    let newData = new schemaAnasayfaSlider({
        hastaAdi: clientData[0],
        yaziTR: clientData[1],
        yaziEN: clientData[2],
        yaziES: clientData[3],
        yaziFR: clientData[4],
        yaziDE: clientData[5],
        yaziIT: clientData[6],
        yaziAR: clientData[7],
        yaziPT: clientData[8],
        yaziRU: clientData[9],
        gorsel: clientData[10],
        hastaGorsel: clientData[11],
    });
    let returnDataFormat = ['_id', 'hastaAdi', 'yaziTR', 'gorsel', 'hastaGorsel', 'createUser', 'createDate'];
    delete data['data'];
    let json = {
        request: data, actionName,
        newData,
        createInfo: { status: true, editFormat: 'YYYY/MM/DD HH:mm', createFormat: 'YYYY/MM/DD HH:mm' },
        unique: { status: false },
        returnDataFormat
    };
    queryManager.Insert(json, (processStatus) => {
        callback(processStatus);
    });
};
const Update = (data, actionName, callback) => {
    let _id = htmlspecialchar(data.processID);
    let clientData = data.data;
    let returnDataFormat = [
        '_id',//0
        'hastaAdi',//1
        'gorsel',//2
        'hastaGorsel',//3
        'yaziTR',//4
        'yaziEN',//5
        'yaziES',//6
        'yaziFR',//7
        'yaziDE',//8
        'yaziIT',//9
        'yaziAR',//10
        'yaziPT',//11
        'yaziRU',//12
        'createUser',//13
        'createDate'//14
    ];
    let updateFieldValue = [
        '',//0
        clientData[0],//1
        'no-update',//2
        'no-update',//3
        clientData[1],//4
        clientData[2],//5
        clientData[3],//6
        clientData[4],//7
        clientData[5],//8
        clientData[6],//9
        clientData[7],//10
        clientData[8],//11
        clientData[9],//12
        'no-update',//13
        moment().format('YYYY/MM/DD HH:mm')//14
    ];
    let json = {
        request: data,
        actionName,
        returnDataFormat,
        updateFieldValue,
        unique: { status: false, },
        queryJSON: { _id },
        queryString,
        querySchema: 'AnasayfaSlider',
        hasBelong: false,
    };
    queryManager.Update(json, (result) => {
        delete result['arr'].yaziEN;
        delete result['arr'].yaziES;
        delete result['arr'].yaziFR;
        delete result['arr'].yaziDE;
        delete result['arr'].yaziIT;
        delete result['arr'].yaziAR;
        delete result['arr'].yaziPT;
        delete result['arr'].yaziRU;
        callback(result);
    });
};
const Delete = (data, actionName, callback) => {
    let _id = htmlspecialchar(data.processID);
    let json = {
        request: data,
        actionName,
        queryJSON: { _id, },
        querySchema: 'AnasayfaSlider',
        dtColLen: 4,
    };
    queryManager.Delete(json, (result) => {
        callback(result);
    });
};
module.exports = {
    Click,
    Insert,
    Delete,
    Update
};