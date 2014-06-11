"use strict";

$(function() {


	$("#searchButton").on("click", function(e) {
		e.preventDefault();
		var userInput = $("#searchTerm").val();

		// var refinedInput = $userInput.replace(" ", "%20");


		var request = {
			url: "http://www.omdbapi.com/",
			type: "get",
			dataType: "json",
			data: {s: userInput},
			beforeSend: function(){
				$(".results").empty();
				$(".posterplace").empty();
			}
		};

		$.ajax(request).done(function(data) {
			var searchall = data.Search
			$.each(searchall, function(index, value) {
				$(".results").append("<li data-imdbid=" + value["imdbID"] + ">" + value["Title"] + ", " + value["Year"] + "</li>")
			});
		});

		$(".results").delegate("li", "click", function(e) {
			  e.preventDefault();
		      var imdata = $(e.target).data("imdbid");
		      var poster = $.ajax({
		        url: "http://www.omdbapi.com/",
		        type: "get",
		        dataType: "json",
		        async: true,
		        data: {i: imdata},
		        beforeSend: function(){
		        	$(".posterplace").empty();
		        }
		      });

		      poster.done(function(data){
		      	$(".posterplace").append("<img src='" + data["Poster"] + "'>")
		      });
		});
	});
});