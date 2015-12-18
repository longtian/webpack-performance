/**
 * Created by yan on 15-12-18.
 */
var $ = require('jquery');
var imgDataUrl = require('url!./assets/shakespeare.jpg');
var quote = require('file!./assets/quote.txt');
var format = require('./lib/format.js');

require('style!css!./assets/style.css');

require.ensure([], function (require) {
    var moment = require('moment');
    var _ = require('lodash');
    var time = moment().format(format);
    $(function () {
        $('q').load(quote);
        $('<img>').attr({
            'src': imgDataUrl,
            'alt': 'shakespeare'
        }).insertBefore('p');
        $('<footer>').text(time).appendTo('body');
    });
})
