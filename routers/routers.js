const express = require('express');
const router = express.Router();
const schemaGenelAyarlamalar = require('../models/sacEkim/schemaGenelAyarlamalar');
const schemaAnasayfaSlider = require('../models/sacEkim/schemaAnasayfaSlider');
const schemaBlogYazilari = require('../models/sacEkim/schemaBlogYazilari');

router.get('/', (req, res) => {
    schemaGenelAyarlamalar.findOne({}).then((ayarlar) => {
        schemaAnasayfaSlider.find({}).then((slider) => {
            schemaBlogYazilari.find({}).then((blog) => {
                res.render('index', {
                    yonetim: 0,
                    kurumAdi: ayarlar ? ayarlar.kurumAdi : "Genel ayarları yapınız...",
                    telefon: ayarlar ? ayarlar.telefon : "Genel ayarları yapınız...",
                    eposta: ayarlar ? ayarlar.eposta : "Genel ayarları yapınız...",
                    youtube: ayarlar ? ayarlar.youtube : "Genel ayarları yapınız...",
                    instagram: ayarlar ? ayarlar.instagram : "Genel ayarları yapınız...",
                    facebook: ayarlar ? ayarlar.facebook : "Genel ayarları yapınız...",
                    slider,
                    blog,
                });
            });
        });
    });

});
router.get('/blog', (req, res) => {
    schemaGenelAyarlamalar.findOne({}).then((ayarlar) => {
        schemaBlogYazilari.find({}).then((blog) => {
            res.render('blog', {
                yonetim: 0,
                kurumAdi: ayarlar ? ayarlar.kurumAdi : "Genel ayarları yapınız...",
                telefon: ayarlar ? ayarlar.telefon : "Genel ayarları yapınız...",
                eposta: ayarlar ? ayarlar.eposta : "Genel ayarları yapınız...",
                youtube: ayarlar ? ayarlar.youtube : "Genel ayarları yapınız...",
                instagram: ayarlar ? ayarlar.instagram : "Genel ayarları yapınız...",
                facebook: ayarlar ? ayarlar.facebook : "Genel ayarları yapınız...",
                blog,
            });
        });
    });
});
router.get('/blogicerigi', (req, res) => {
    if (req.cookies["blogID"]) {
        schemaGenelAyarlamalar.findOne({}).then((ayarlar) => {
            schemaBlogYazilari.findOne({ _id: req.cookies["blogID"] }).then((blogYazisi) => {
                res.render('blogicerigi', {
                    yonetim: 0,
                    kurumAdi: ayarlar ? ayarlar.kurumAdi : "Genel ayarları yapınız...",
                    telefon: ayarlar ? ayarlar.telefon : "Genel ayarları yapınız...",
                    eposta: ayarlar ? ayarlar.eposta : "Genel ayarları yapınız...",
                    youtube: ayarlar ? ayarlar.youtube : "Genel ayarları yapınız...",
                    instagram: ayarlar ? ayarlar.instagram : "Genel ayarları yapınız...",
                    facebook: ayarlar ? ayarlar.facebook : "Genel ayarları yapınız...",
                    blogYazisi,
                });
            });
        });
    }
    else {
        res.redirect('/blog');
    };

});
router.get('/yonetim', (req, res) => {
    res.render('login', {
        yonetim: 1
    });
});

router.get('/forgetPass', (req, res) => {
    res.render('forgetPass', {
        yonetim: 1
    });
});

router.all('*', (req, res) => {
    res.redirect('/');
});

module.exports = router;