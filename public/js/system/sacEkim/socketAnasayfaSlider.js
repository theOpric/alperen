$(document).ready(() => {
    let sayfaAnasayfaSlider = 'sacEkim_AnasayfaSlider';
    socket.on(sayfaAnasayfaSlider + '_Click_Result', (data) => {
        let input = [
            { type: 'fileReader', icon: 'fa fa-photo', fileType: 'image', id: 'gorsel' },
            { type: 'fileReader', icon: 'fa fa-photo', fileType: 'image', id: 'hastaGorsel' },
            { type: 'text', icon: 'entypo-comment', id: 'hastaAdi', placeholder: 'Hasta Adı...' },
            { type: 'text', icon: 'entypo-comment', id: 'yaziTR', placeholder: 'Hasta Yorumu Türkçe...' },
            { type: 'text', icon: 'entypo-comment', id: 'yaziEN', placeholder: 'Hasta Yorumu İngilizce...' },
            { type: 'text', icon: 'entypo-comment', id: 'yaziES', placeholder: 'Hasta Yorumu İspanyolca...' },
            { type: 'text', icon: 'entypo-comment', id: 'yaziFR', placeholder: 'Hasta Yorumu Fransızca...' },
            { type: 'text', icon: 'entypo-comment', id: 'yaziDE', placeholder: 'Hasta Yorumu Almanca...' },
            { type: 'text', icon: 'entypo-comment', id: 'yaziIT', placeholder: 'Hasta Yorumu İtalyanca...' },
            { type: 'text', icon: 'entypo-comment', id: 'yaziAR', placeholder: 'Hasta Yorumu Arapça...' },
            { type: 'text', icon: 'entypo-comment', id: 'yaziPT', placeholder: 'Hasta Yorumu Porketizce...' },
            { type: 'text', icon: 'entypo-comment', id: 'yaziRU', placeholder: 'Hasta Yorumu Rusça...' },
        ];
        xlargeConfirmBox = true;
        pageBuilder({
            dataTable: true,
            dataTableOpt: {
                json: data.tableData,
                buttons: {
                    class: ['btnDelete', 'btnEdit'],
                    icons: ['fa fa-trash-o', 'fa fa-edit'],
                    style: ['btn-red', 'btn-orange']
                },
                confirmBoxOpt: [
                    {
                        container:
                        {
                            type: 'new',
                            body: [ // New Record;
                                {
                                    width: 'col-md-12',
                                    items: {
                                        input,
                                    }
                                }
                            ]
                        },
                    },
                    {
                        container:
                        {
                            type: 'edit',
                            body: [ // New Record;
                                {
                                    width: 'col-md-12',
                                    items: {
                                        input: [
                                            { type: 'text', icon: 'entypo-comment', id: 'hastaAdi', placeholder: 'Hasta Adı...' },
                                            { type: 'text', icon: 'entypo-comment', id: 'yaziTR', placeholder: 'Hasta Yorumu Türkçe...' },
                                            { type: 'text', icon: 'entypo-comment', id: 'yaziEN', placeholder: 'Hasta Yorumu İngilizce...' },
                                            { type: 'text', icon: 'entypo-comment', id: 'yaziES', placeholder: 'Hasta Yorumu İspanyolca...' },
                                            { type: 'text', icon: 'entypo-comment', id: 'yaziFR', placeholder: 'Hasta Yorumu Fransızca...' },
                                            { type: 'text', icon: 'entypo-comment', id: 'yaziDE', placeholder: 'Hasta Yorumu Almanca...' },
                                            { type: 'text', icon: 'entypo-comment', id: 'yaziIT', placeholder: 'Hasta Yorumu İtalyanca...' },
                                            { type: 'text', icon: 'entypo-comment', id: 'yaziAR', placeholder: 'Hasta Yorumu Arapça...' },
                                            { type: 'text', icon: 'entypo-comment', id: 'yaziPT', placeholder: 'Hasta Yorumu Porketizce...' },
                                            { type: 'text', icon: 'entypo-comment', id: 'yaziRU', placeholder: 'Hasta Yorumu Rusça...' },
                                        ]
                                    }
                                }
                            ],
                            jsonData: data.sliderData
                        },
                    },
                    {
                        container: { // btnEdit
                            type: 'delete'
                        },
                    }
                ]
            },
        });
    });
    socket.on(sayfaAnasayfaSlider + '_Delete_Result', (data) => {
        dbActionResult('delete', data);
    });
    socket.on(sayfaAnasayfaSlider + '_Insert_Result', (data) => {
        dbActionResult('insert', data);
    });
    socket.on(sayfaAnasayfaSlider + '_Update_Result', (data) => {
        dbActionResult('update', data);
    });
});