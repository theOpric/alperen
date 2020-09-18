const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let schemaAnasayfaSlider = new Schema({
    //Gerekli Kısımlar
    gorsel: String,
    hastaGorsel: String,
    hastaAdi: String,
    yaziTR: Object,
    yaziEN: Object,
    yaziES: Object,
    yaziFR: Object,
    yaziDE: Object,
    yaziIT: Object,
    yaziAR: Object,
    yaziPT: Object,
    yaziRU: Object,
    createUser: String,
    createDate: String,

});
schemaAnasayfaSlider = mongoose.model('schemaAnasayfaSlider', schemaAnasayfaSlider);
module.exports = schemaAnasayfaSlider;