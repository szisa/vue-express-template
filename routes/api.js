var express = require('express');
var router = express.Router();
const modules = require(require('path').resolve(process.cwd(), 'modules.js'));
let loader = require('./loader');

// 在此加入
router.use(require('./access'));
router.use('/lib', require('./lib'));
router.use('/account', loader(modules.account));

router.get('/', function (req, res) {
    res.render('index', { title: 'API' });
});

module.exports = router;
