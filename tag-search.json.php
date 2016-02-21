<?php
header('Content-Type: application/json');

if(isset($_GET['term'])){
$gettag = urlencode($_GET['term']);

$url = "https://api.flickr.com/services/rest/?method=flickr.tags.getRelated&api_key=1c677e797eb03c62ac8e14aae3926fbf&tag=".$gettag."&format=json&nojsoncallback=1";


$response = json_decode(file_get_contents($url));

$tags = $response->tags->tag;
$pertags = array();
if($response){
foreach($tags as $key => $tag){
	
	// $tag_content = $tag->_content;
	
	// $api_key = 'aa16a2d93627e7cb4ff8e957553050fb';
	
	// $url_ = 'https://api.flickr.com/services/rest/?method=flickr.photos.search';
	// $url_.= '&api_key='.$api_key;
	// $url_.= '&tags='.$tag_content;
	// $url_.= '&per_page=1';
	// $url_.= '&format=json';
	// $url_.= '&nojsoncallback=1';
	// $url_.= '&page=1';
	
	// $response_ = json_decode(file_get_contents($url_));
	// $photo_array = $response_->photos->photo;
	
	// $farm_id = $photo_array[0]->farm;
	// $server_id = $photo_array[0]->server;
	// $photo_id = $photo_array[0]->id;
	// $secret_id = $photo_array[0]->secret;
	// $size = 's';
	
	
	// $title = $photo_array[0]->title;
	// $photo_url = 'https://farm'.$farm_id.'.staticflickr.com/'.$server_id.'/'.$photo_id.'_'.$secret_id.'_'.$size.'.'.'jpg';
	
	
	$tagres['id'] = $key;
	$tagres['label'] = $tag->_content;
	$tagres['value'] = $tag->_content;
	// $tagres['title'] = $title;
	// $tagres['image'] = $photo_url;
	
	$pertags[] = $tagres;
}

}


echo json_encode($pertags);
}
?>