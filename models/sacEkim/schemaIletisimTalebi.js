const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schemaIletisimTalebi= new Schema({
    //Gerekli Kısımlar
    isim: { type: String, required: true, },
    telefon: { type: String, required: true },
    createDate: String,
    status: String,
});
schemaIletisimTalebi= mongoose.model('schemaIletisimTalebi', schemaIletisimTalebi);
module.exports = schemaIletisimTalebi;