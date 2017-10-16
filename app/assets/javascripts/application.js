// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery.noty.packaged.min
//= require turbolinks
//= require_tree .

$(document).ready(function(){
	var count = 0;
	var tweetSoFar="";
	var tweet = $('#tweet');
	var arr = new Array();
	const LEN = 130;
	tweet.bind("input change",function(event){
		var s = $("#tweet").val();
		var i;
		var split_tweet = document.getElementById("split_tweet");
		arr = new Array();

		while(split_tweet.childNodes.length>0){
			split_tweet.removeChild(split_tweet.childNodes[0]);
		}
		var counter = 1;
		var total = parseInt(s.length/LEN);
		if(s.length%LEN!=0){
			total+=1;
		}
		for(i=0; i<s.length ;i=i+LEN){
			var newElem = document.createElement("p");
			if(s.length>=LEN){
				arr.push(s.substring(i,i+LEN)+" ("+counter+"/"+total+")");
				newElem.innerHTML = s.substring(i,i+LEN)+" ("+counter+"/"+total+")";
			}
			else{
				arr.push(s.substring(i,i+LEN)+" ("+counter+"/"+total+")");
				newElem.innerHTML = s.substring(i)+" ("+counter+"/"+total+")";	
			}
			counter+=1;
			document.getElementById("split_tweet").appendChild(newElem);
		}
	});

	var tweet_form = document.getElementById("tweet_form");
	tweet_form.addEventListener('submit',function(event){
		event.preventDefault();
		data = {
			arr: arr,
		}
		console.log("working "+data.arr);

		$.ajax({
                url: '/split_tweet_post',
                method: "POST",
                data: data,
                success: function(result) {
					noty({ text: "Your tweets are successfully posted", theme: "relax", type: 'success', layout: 'topRight' });  
					$('#tweet').val("");
				},
                error: function(error) {
                    noty({ text: "Error", theme: "relax", type: 'error', layout: 'topRight' });
                }
        });
	});

});
