<?php require('require/header.php'); ?>
<?php
$api_key = 'aa16a2d93627e7cb4ff8e957553050fb';
$tag = isset($_POST['tag'])?urlencode($_POST['tag']):'coffee';
$perPage = 24;

$url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search';
$url.= '&api_key='.$api_key;
$url.= '&tags='.$tag;
$url.= '&per_page='.$perPage;
$url.= '&format=json';
$url.= '&nojsoncallback=1';
$url.= '&page=1';



$response = json_decode(file_get_contents($url));

$photo_array = $response->photos->photo;
$pages = $response->photos->pages;
?>

  <body>
	<input type="hidden" id="page" name="page" value="1">
	<input type="hidden" id="max" name="max" value="<?php echo $pages; ?>">
    <div class="container">
        <div class="row" style="text-align:center; border-bottom:1px dashed #ccc;  padding:0 0 20px 0; margin-bottom:40px;">
            <h3 style="font-family:'Bree Serif', arial; font-weight:bold; font-size:30px;">
                Update/Develop by: yunoa_12@yahoo.com for exam porpose only.
            </h3>
            <p>Image searching on flickr dafault tag: coffee</p>
        </div>
		<div class="row" id="search">
		  <div class="col-lg-6">
		   <form method="POST">
			<div class="input-group">
			 
			  <input type="text" class="form-control" id="tag_search" name="tag" placeholder="Search for..." value="<?php echo urldecode($tag); ?>">
			  <span class="input-group-btn">
				<button class="btn btn-default" type="submit">Go!</button>
			  </span>
			
			</div><!-- /input-group -->
			</form>
		  </div><!-- /.col-lg-6 -->
		</div><!-- /.row -->
        <ul class="row">
		<?php
		$x = 0;
		foreach($photo_array as $single_photo){
		
			$farm_id = $single_photo->farm;
			$server_id = $single_photo->server;
			$photo_id = $single_photo->id;
			$secret_id = $single_photo->secret;
			$size = 'm';
			
			$title = $single_photo->title;

			$photo_url = 'https://farm'.$farm_id.'.staticflickr.com/'.$server_id.'/'.$photo_id.'_'.$secret_id.'_'.$size.'.'.'jpg';
			
			
			$li = '';
			$li .= '<li class="col-lg-2 col-md-2 col-sm-3 col-xs-4 col-xxs-12">';
            $li .= '    <img class="img-responsive" src="'.$photo_url.'" >';
            if($title!='') $li .= '    <div class="text">'.$title . '</div>';
            $li .= '</li>';
			

			
			echo $x%24==3 || $x%24==9 || $x%24==15 || $x%24==21 ? '<li class="clearfix visible-xs-block"></li>':'';
			echo $x%24==4 || $x%24==8 || $x%24==16 || $x%24==20 ? '<li class="clearfix visible-sm-block"></li>':'';
			echo $x%24==6 || $x%24==18? '<li class="clearfix visible-lg-block  visible-md-block visible-xs-block"></li>':'';
			echo $x%24==12? '<li class="clearfix visible-lg-block  visible-md-block visible-sm-block visible-xs-block"></li>':'';
			echo $li;
			$x++;
		}
		?>
        </ul>
		<div class="preloader">
			
		</div>
    </div> <!-- /container -->


    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->

  </body>

</html>
