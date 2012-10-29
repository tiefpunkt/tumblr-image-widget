// ---------------
//  Configuration
// ---------------

// Number of loaded posts (max. 50)
const recent_posts_count = 20;
// Time between fades [ms]
const time_between_fades = 5000;
// Fade duration [ms] or 'fast' or 'slow'
const fade_duration = "slow";

// ====================

function nextImage(id) {
	if (id >= photos.length) {
		id = 0;
	}
	$("#output a img").fadeOut(fade_duration, function() {
		$(this).attr("src", photos[id]["photo-url"]);
		$("#output a").attr("href", photos[id]["link-url"]);
		$("#output a").attr("title", photos[id]["caption"]);
		$(this).load(function(){
			$(this).imgscale({ parent: "#output", scale: "fill", center: true, fade: 0 });
			$(this).fadeIn(fade_duration);
			window.setTimeout(function() {
					nextImage(id+1);
				}, time_between_fades);
		});
	});
	
}

var tumblr_api_read = tumblr_api_read || null;
var photos 	= new Array();

$(window).load(function () {
	var photo;
	if (tumblr_api_read != null) {
		$.each(tumblr_api_read.posts, function(key, value) {
			if (value.photos.length == 0) {
				photos.push({
					"photo-url": value["photo-url-500"],
					"link-url": value["url-with-slug"],
					"caption": value["photo-caption"]
				});
			} else {
				$.each(value.photos, function(sub_key, sub_value) {
					photos.push({
						"photo-url": sub_value["photo-url-500"],
						"link-url": value["url-with-slug"],
						"caption": value["photo-caption"]
					});
				});
			}
		});
		nextImage(0);
	} else {
		$("#output").html("fail");
	}
});