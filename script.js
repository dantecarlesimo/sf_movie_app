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
			data: {s: userInput}
		};

		$.ajax(request).done(function(data) {
			var searchall = data.Search
			$.each(searchall, function(index, value) {
				$(".results").append("<li data-imdbid>" + value["Title"] + ", " + value["Year"] + "</li>")
			});
		});

		$(".results").delegate("li", "click", function(e) {
		      var imdata = $(e.target).data("data-imdbid")
		      console.log(imdata);
		      var request2 = {
		        url: "http://www.omdbapi.com/",
		        type: "get",
		        dataType: "json",
		        data: {i: imdata}
		      };

		      $.ajax(request2).done(function(data) {
		      	console.log(data)
		      });
    	});
	});
});