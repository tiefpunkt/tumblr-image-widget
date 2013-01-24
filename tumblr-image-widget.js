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

function cycleImages(){
      var $active = $('.output .active');
      var $next = ($active.next().length > 0) ? $active.next() : $('.output a:first');
      $next.css('z-index',2);//move the next image up the pile
      $active.fadeOut(1500,function(){//fade out the top image
	  $active.css('z-index',1).show().removeClass('active');//reset the z-index and unhide the image
          $next.css('z-index',3).addClass('active');//make the next image the top one
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
		var output = "";
		for (var i=0;i<Math.min(recent_posts_count,photos.length);i++) {
			output += "<a href=\"" + photos[i]["link-url"] + "\" title=\"" +
				photos[i]["caption"] + "\""  + (i==0 ? " class=\"active\"": "") + 
				"><img src=\"" + photos[i]["photo-url"] + "\" class=\"scale\"></a>";
		}
		$(".output").html($(".output").html() + output);
		$(".output img.scale").imgscale({ parent: ".output", scale: "fill", center: true, fade: 0 });
		$(".output a.active img").load(function(){
			$(".output #loader").hide();
			setInterval('cycleImages()', time_between_fades);
		})
		
	} else {
		$(".output").html("error while loading.");
	}
});
