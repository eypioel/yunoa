

  	var clicked = {};

  	function showModal(){

  			var src = $(this).attr('src');
  			var img = '<img src="' + src + '" class="img-responsive"/>';
  			var index = $(this).parent('li').attr('data-index');

  			clicked.prevImg = parseInt(index) - parseInt(1);
  			clicked.nextImg = parseInt(index) + parseInt(1);

  			var html = '';
  			html += img;
  			html += '<div style="height:25px;clear:both;display:block;">';
  			html += '<a class="controls next" href="'+ (clicked.nextImg) + '">next &raquo;</a>';
  			html += '<a class="controls previous" href="' + (clicked.prevImg) + '">&laquo; prev</a>';
  			html += '</div>';

  			$('#myModal').modal();
  			$('#myModal').on('shown.bs.modal', function(){
  					$('#myModal .modal-body').html(html);
  					showHideControls();
  			})
  			$('#myModal').on('hidden.bs.modal', function(){
  					$('#myModal .modal-body').html('');
  			});
  	}

  	function nextPrevHandler(){

  			var index = $(this).attr('href');
  			var src = $('li[data-index="'+index+'"] img').attr('src');

  			$('.modal-body img').attr('src', src);

  			clicked.prevImg = parseInt(index) - 1;
  			clicked.nextImg = parseInt(clicked.prevImg) + 2;

  			if($(this).hasClass('previous')){
  				$(this).attr('href', clicked.prevImg);
  				$('a.next').attr('href', clicked.nextImg);
  			}else{
  				$(this).attr('href', clicked.nextImg);
  				$('a.previous').attr('href', clicked.prevImg);
  			}

  		showHideControls();

  		return false;

  	}

  	function showHideControls(){

  		var total = ($('li').not('.clearfix').length);

  		if(total === clicked.nextImg){
  			$('a.next').hide();
  		}else{
  			$('a.next').show()
  		}

  		if(clicked.prevImg === -1){
  			$('a.previous').hide();
  		}else{
  			$('a.previous').show()
  		}
  	}



  	$(document).ready(function(){
  		$(this).on('click', 'a.controls', nextPrevHandler);
  		$('li').not('.clearfix').each(function(i){
  					$(this).attr('data-index',i);
  					var img = $(this).find('img');
  					img.on('click',showModal);
  		});
	
	}) //end doc ready


	$(function() {

 
    $( "#tag_search" ).autocomplete({
      minLength: 0,
      source: 'tag-search.json.php',
      focus: function( event, ui ) {
        $( "#tag_search" ).val( ui.item.label );
        return false;
      },
      select: function( event, ui ) {
        var tag = ui.item.label;
		$('.preloader').show();
		$('.container ul').html("");
		var api_key = 'aa16a2d93627e7cb4ff8e957553050fb';
			
		var perPage = 24;
			
		var page = 1;
			var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search';
			url += '&api_key='+ api_key;
			url += '&tags='+ tag;
			url += '&per_page='+ perPage;
			url += '&format=json';
			url += '&nojsoncallback=1';
			url += '&page='+ page;
			
			$.getJSON( url, function( data ) {
				var photo_array = data.photos.photo;
				var x = 0;
				var allli = '<li class="clearfix visible-lg-block  visible-md-block visible-sm-block visible-xs-block"></li>';
				var maxpage = data.photos.pages;
				photo_array.forEach(function(entry) {
					var farm_id = entry.farm;
					var server_id = entry.server;
					var photo_id = entry.id;
					var secret_id = entry.secret;
					var size = 'm';
					
					var title = entry.title;

					var photo_url = 'https://farm'+farm_id+'.staticflickr.com/'+server_id+'/'+photo_id+'_'+secret_id+'_'+size+'.'+'jpg';
					
					
					var li = '';
					li += '<li class="col-lg-2 col-md-2 col-sm-3 col-xs-4 col-xxs-12">';
					li += '    <img class="img-responsive" src="'+photo_url+'" >';
					if(title!='') li += '    <div class="text">'+title + '</div>';
					li += '</li>';
					

					
					allli += x%24==3 || x%24==9 || x%24==15 || x%24==21 ? '<li class="clearfix visible-xs-block"></li>':'';
					allli += x%24==4 || x%24==8 || x%24==16 || x%24==20 ? '<li class="clearfix visible-sm-block"></li>':'';
					allli += x%24==6 || x%24==18? '<li class="clearfix visible-lg-block  visible-md-block visible-xs-block"></li>':'';
					allli += x%24==12? '<li class="clearfix visible-lg-block  visible-md-block visible-sm-block visible-xs-block"></li>':'';
					allli += li;
					
					
					x++;
				});
				$('#page').val(page);
				$('.container ul').html(allli);
				$('.preloader').hide();
				$('#max').val(maxpage);
				$(document).on('click', 'a.controls', nextPrevHandler);
				$('li').not('.clearfix').each(function(i){
  					$(this).attr('data-index',i);
  					var img = $(this).find('img');
  					img.on('click',showModal);
				});
			
			}); 
		
		
		
		
        return false;
      }
    })
    .autocomplete( "instance" )._renderItem = function( ul, item ) {
      return $( "<li>" )
        .append( "<a>" + item.label + "</a>" )
        .appendTo( ul );
    };
  });
	

  $(window).scroll(function () {
	var maxpage = parseInt($('#max').val());
	var page = parseInt($('#page').val());	
	var stag = $('#tag_search').val();	

		if (($(window).scrollTop() >= $(document).height() - $(window).height() - 10) && (page <= maxpage)) {
		
			$('.preloader').show();
			var api_key = 'aa16a2d93627e7cb4ff8e957553050fb';
			var tag = stag==''?'coffee':stag;
			var perPage = 24;
			
			page++		
			var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search';
			url += '&api_key='+ api_key;
			url += '&tags='+ tag;
			url += '&per_page='+ perPage;
			url += '&format=json';
			url += '&nojsoncallback=1';
			url += '&page='+ page;
			
			$.getJSON( url, function( data ) {
				var photo_array = data.photos.photo;
				var x = 0;
				var allli = '<li class="clearfix visible-lg-block  visible-md-block visible-sm-block visible-xs-block"></li>';
				photo_array.forEach(function(entry) {
					var farm_id = entry.farm;
					var server_id = entry.server;
					var photo_id = entry.id;
					var secret_id = entry.secret;
					var size = 'm';
					
					var title = entry.title;

					var photo_url = 'https://farm'+farm_id+'.staticflickr.com/'+server_id+'/'+photo_id+'_'+secret_id+'_'+size+'.'+'jpg';
					
					
					var li = '';
					li += '<li class="col-lg-2 col-md-2 col-sm-3 col-xs-4 col-xxs-12">';
					li += '    <img class="img-responsive" src="'+photo_url+'" >';
					if(title!='') li += '    <div class="text">'+title + '</div>';
					li += '</li>';
					

					
					allli += x%24==3 || x%24==9 || x%24==15 || x%24==21 ? '<li class="clearfix visible-xs-block"></li>':'';
					allli += x%24==4 || x%24==8 || x%24==16 || x%24==20 ? '<li class="clearfix visible-sm-block"></li>':'';
					allli += x%24==6 || x%24==18? '<li class="clearfix visible-lg-block  visible-md-block visible-xs-block"></li>':'';
					allli += x%24==12? '<li class="clearfix visible-lg-block  visible-md-block visible-sm-block visible-xs-block"></li>':'';
					allli += li;
					
					
					x++;
				});
				$('#page').val(page);
				$('.container ul').append(allli);
				$('.preloader').hide();
				
				$(document).on('click', 'a.controls', nextPrevHandler);
				$('li').not('.clearfix').each(function(i){
  					$(this).attr('data-index',i);
  					var img = $(this).find('img');
  					img.on('click',showModal);
				});
			
			}); 
		}
	});
  