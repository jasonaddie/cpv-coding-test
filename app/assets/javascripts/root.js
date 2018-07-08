
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

// load the page based on the url params
function load_current_state(){
  console.log('load current state');
  console.log(window.location.href);
  var code = getQueryString('code');
  var q = getQueryString('q');
  if (q != null){
    var params = {q: q};
    $('input#q').val(q);

    // see if code exists
    make_ajax_call(generate_api_url('search'), params, function(data){
      run_search();
    });
  }

  if (code != null){
    var params = {code: code};

    // see if code exists
    make_ajax_call(generate_api_url('cpv'), params, function(data){
      if (data != null){

        load_children(params, data.cpv.description + ' (' + data.cpv.code + ')');

      }else{
        $('.cpv_container .cpv_children').html('');
        $('.cpv_container .cpv_children').removeClass('active');
      }
    });
  }
}

// on page load, if param exists, get the children for it
$(function() {
  load_current_state();
});

// on back button press, load the state at that time
$(window).on("popstate", function() {
  load_current_state();
});

// get the children when a parent is clicked on
$('body').on('click', 'a.cpv-parent', function(e){
  e.preventDefault();

  var params = {code: $(this).data('code')};
  load_children(params, $(this).html());

  // show the code in the url
  history.pushState(params, '', updateQueryString('code', params.code, window.location.href));
});

// run the search
$('input#q').on('keyup', debounce(function(){
    run_search();
  }, 250)
);



// get the children of the selected parent
function load_children(params, parent_description){
  // call the children api
  make_ajax_call(generate_api_url('children'), params, function(data){
    // build the children block;
    build_children_block(data, parent_description);
  });
}

// build the block showing the children of the selected parent
function build_children_block(data, parent_description){
  var html = '';
  var i, data_item;

  // create heading
  html += '<h2>CPV Category: ' + parent_description + '</h2>';

  if (data.cpvs.length == 0){
    // no items found
    html += '<div class="no-data">No items were found.</div>';
  }else{

    // build the breadcrumb
    if (data.ancestors.length > 0){
      html += '<div class="cpv-breadcrumb">';
      html += 'Parent Categories: '
      for(i=0; i<data.ancestors.length; i++){
        data_item = data.ancestors[i];
        html += '<a href="#" class="cpv-parent" data-code="' + data_item.code + '" title="Click to view items in this category">';
        html += data_item.description + ' (' + data_item.code +  ')';
        html += '</a>';

        if (i < data.ancestors.length-1){
          html += ' > ';
        }
      }

      html += '</div>';
    }

    // show the children
    html += '<ul class="cpv-parents">';
    for(i=0; i<data.cpvs.length; i++){
      data_item = data.cpvs[i];
      html += '<li>';
      if (data_item.has_children){
        html += '<a href="#" class="cpv-parent" data-code="' + data_item.code + '" title="Click to view items in this category">';
        html += data_item.description + ' (' + data_item.code +  ')';
        html += '</a>';
      }else{
        html += data_item.description + ' (' + data_item.code +  ')';
      }
      html += '</li>';
    }
    html += '</ul>';
  }

  $('.cpv_container .cpv_children').fadeOut(function(){
    $('.cpv_container .cpv_children').html(html);
    $('.cpv_container .cpv_children').addClass('active');
    $('.cpv_container .cpv_children').fadeIn();
  });
}

// run the search and show the results
function run_search(){
  var val = $('input#q').val();
  var params = {q: val}

  if (val == ''){
    $('.cpv_container .cpv-search-results').fadeOut(function(){
      $('.cpv_container .cpv-search-results').html('');
      $('.cpv_container .cpv-parents').fadeIn();
    });

    history.pushState(params, '', updateQueryString('code', null, updateQueryString('q', null, window.location.href)));

  }else{
    // call the search api
    make_ajax_call(generate_api_url('search'), params, function(data){
      // build the search results
      build_search_results(data, val);
    });

    // show the code in the url
    history.pushState(params, '', updateQueryString('q', params.q, window.location.href));
  }

  // hide children
  $('.cpv_container .cpv_children').html('');
  $('.cpv_container .cpv_children').removeClass('active');


}

// show the search results
function build_search_results(data, q){
  var html = '';
  var i, data_item;

  // create heading
  html += '<h2>Found ' + data.cpvs.length + ' search results for: ' + q + '</h2>';

  if (data.cpvs.length > 0){
    html += '<ul>';

    for(i=0; i<data.cpvs.length; i++){
      data_item = data.cpvs[i];
      html += '<li>';
      if (data_item.has_children){
        html += '<a href="#" class="cpv-parent" data-code="' + data_item.code + '" title="Click to view items in this category">';
        html += data_item.description + ' (' + data_item.code +  ')';
        html += '</a>';
      }else{
        html += data_item.description + ' (' + data_item.code +  ')';
      }
      html += '</li>';
    }
    html += '</ul>';
  }

  $('.cpv_container .cpv-parents').fadeOut(function(){
    $('.cpv_container .cpv-search-results').fadeOut(function(){
      $('.cpv_container .cpv-search-results').html(html);
      $('.cpv_container .cpv-search-results').fadeIn();
    });
  });

}