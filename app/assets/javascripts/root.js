// on page load, if param exists, get the children for it
$(function() {
  var code = getQueryString('code');
  if (code != null){
    var params = {code: code};

    // see if code exists
    make_ajax_call(generate_api_url('cpv'), params, function(data){
      if (data != null){

        load_children(params, data.cpv.description);

      }else{
        $('.cpv_container .cpv_children').html('');
        $('.cpv_container .cpv_children').removeClass('active');
      }
    });


  }
});

// get the children when a parent is clicked on
$('body').on('click', 'a.cpv-parent', function(e){
  e.preventDefault();

  var params = {code: $(this).data('code')};
  load_children(params, $(this).html());

  // show the code in the url
  history.pushState(params, '', '/?code=' + params.code);


});


function load_children(params, parent_description){
  // call the children api
  make_ajax_call(generate_api_url('children'), params, function(data){
    // build the children block;
    build_children_block(data, parent_description);
  });
}


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
        html += data_item.description;
        html += '</a>';

        if (i < data.ancestors.length-1){
          html += ' > ';
        }
      }

      html += '</div>';
    }

    // show the children
    html += '<ul class="cpv-parents">';
    var data_item;
    for(i=0; i<data.cpvs.length; i++){
      data_item = data.cpvs[i];
      html += '<li>';
      if (data_item.has_children){
        html += '<a href="#" class="cpv-parent" data-code="' + data_item.code + '" title="Click to view items in this category">';
        html += data_item.description;
        html += '</a>';
      }else{
        html += data_item.description;
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
  // $('.cpv_container .cpv_children').animate({bottom: '300px'});

  return false;
}
