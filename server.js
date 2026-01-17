const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

let appointments = [
    {
        AppointmentID: '1111',
        Date: '2026-01-17',
        Time: '09:00',
        Status: 'ยืนยันแล้ว',
        Notes: 'ตรวจสุขภาพประจำปี'
    }
];
app.get('/', function(req, res) {
    res.render('index', { appointments: appointments });
});
app.get('/new', function(req, res) {
    res.render('create');
});
app.post('/appointments', function(req, res) {
    const newId = Date.now().toString();

    const newAppt = {
        AppointmentID: newId,
        Date: req.body.date,
        Time: req.body.time,
        Status: req.body.status,
        Notes: req.body.notes
    };
    appointments.push(newAppt);
    res.redirect('/');
});
app.get('/edit/:id', function(req, res) {
    const id = req.params.id;

    const foundAppt = appointments.find(function(app) {
        return app.AppointmentID === id;
    });

    if (foundAppt) {
        res.render('edit', { appt: foundAppt });
    } else {
        res.redirect('/');
    }
});
app.put('/appointments/:id', function(req, res) {
    const id = req.params.id;

    const index = appointments.findIndex(function(app) {
        return app.AppointmentID === id;
    });
    if (index !== -1) {
        appointments[index] = {
            AppointmentID: id,
            Date: req.body.date,
            Time: req.body.time,
            Status: req.body.status,
            Notes: req.body.notes
        };
    }
    res.redirect('/');
});
app.delete('/appointments/:id', function(req, res) {
    const id = req.params.id;
    appointments = appointments.filter(function(app) {
        return app.AppointmentID !== id;
    });

    res.redirect('/');
});
app.listen(PORT, function() {
    console.log("Server กำลังทำงานที่ http://localhost:3000");
});