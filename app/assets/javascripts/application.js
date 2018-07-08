// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require_tree .

var api_url = '/api/v1/';

function generate_api_url(action){
  return api_url + action
}


function make_ajax_call(url, data, callback){
  $.ajax({
    url: url,
    dataType: 'jsonp',
    data: data,
    method: 'GET',
    beforeSend: function( xhr ) {
      xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
    }
  })
  .fail(function( jqXHR, textStatus, error ) {
    console.log('AJAX FAIL: ' + textStatus);
    console.log(error);
  })
  .done(function( data ) {
    callback(data);
  });
}

/**
 * Get the value of a querystring
 * @param  {String} field The field to get the value of
 * @param  {String} url   The URL to get the value from (optional)
 * @return {String}       The field value
 */
var getQueryString = function ( field, url ) {
  var href = url ? url : window.location.href;
  var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
  var string = reg.exec(href);
  return string ? decodeURIComponent(string[1].replace('+', ' ')) : null;
};
