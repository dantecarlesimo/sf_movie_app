"use strict";

$(function () {

  $(".results").delegate(".favouriter", "click", function (e) {

    var imdata = $(e.target).closest('li').data("imdbid");
  });

  $(".results").delegate("li", "click", function (e) {
    e.preventDefault();
    var imdata = $(e.target).data("imdbid");

    var poster = $.ajax({
      url: "http://www.omdbapi.com/",
      type: "get",
      dataType: "json",
      async: true,
      data: {i: imdata}
    });

    poster.done(function (data) {
      var img = $('<img/>');
      img.attr('src', data["Poster"]);
      $(".posterplace").html(img);
    });
  });

  $("#searchButton").on("click", function (e) {
    e.preventDefault();
    var userInput = $("#searchTerm").val();

    // var refinedInput = $userInput.replace(" ", "%20");


    var request = {
      url: "http://www.omdbapi.com/",
      type: "get",
      dataType: "json",
      data: {s: userInput},
      beforeSend: function () {
        $(".results").empty();
        $(".posterplace").empty();
      }
    };

    $.ajax(request).done(function (data) {
      var searchall = data.Search
      $.each(searchall, function (index, value) {
        $(".results").append(build_list_item(value));
      });
    });

  });

  function build_list_item(movie) {
    var li = $('<li></li>');

    li.data('imdbid', movie["imdbID"]);

    li.append(movie["Title"]);

    var icon = $('<img class="favouriter"/>');

    icon.attr('src', 'images/favourite.png');

    li.append(icon);

    return li;
  }


});