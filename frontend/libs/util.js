import axios from 'axios';
import env from '../config/env';
import config from '../../config.json'

let util = {

};
util.title = function(title) {
    title = title ? title + ' - 自考英语查询' : '自考英语查询';
    window.document.title = title;
};

const ajaxUrl = env === 'development' ?
    `http://localhost:${config.base.port}/` :
    env === 'production' ?
    '/' :
    '/';

util.ajaxUrl = ajaxUrl;

export default util;