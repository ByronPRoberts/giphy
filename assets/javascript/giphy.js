$(document).ready(function(){

    var gifsArray=["Wayne's World","Toy Story", "Forrest Gump","Jumanji","Home Alone","House Party" ]

    function displayGifBtn() {
        $("#gifBtns").empty();
        for(var i=0;i< gifsArray.length; i++){
            var gifBtn = $("<button>");
            gifBtn.addClass("display","btn-primary","btn" );
            gifBtn.attr("data-name",gifsArray[i]);
            gifBtn.text(gifsArray[i]);
            $("#gifBtns").append(gifBtn);
        }
    }

    function newBtn() {
        $("#newGif").on("click", function(){
            var userGif = $("#user-input").val().trim();
            if(userGif == ""){
                return false;
            }

            gifsArray.push(userGif);

            displayGifBtn();
            return false;
        });
    }

    function displayGif(){
        var userGif = $(this).attr("data-name");
        var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + userGif + "&api_key=BcWuKX52OYVBK3Fhk3hmwrqwsedEKx1C";
        console.log(queryUrl);
        $.ajax({
            url: queryUrl,
            method: "GET",
        })
        .done(function(response){
            console.log(response);
            $("#gifsSpot").empty();
            var results = response.data;
            // if(results == ""){
            //     alert("No ")
            // }
            for(var i=0;i<results.length;i++){
                var gifDiv = $("<div>");
                gifDiv.addClass("gifDiv");
                var gifRating= $("<p>").text("rating is " + results[i].rating);
                gifDiv.append(gifRating);
                var gifIm=$("<img>");
                gifIm.attr("src",results[i].images.fixed_height_small_still.url);
                gifIm.attr("data-still", results[i].images.fixed_height_small_still.url);
                gifIm.attr("data-animate", results[i].images.fixed_height_small.url);
                gifIm.attr("data-state","still");
                gifIm.addClass("gif");
                gifDiv.append(gifIm);
                $("#gifsSpot").prepend(gifDiv);
            }
        });
    
    }
    displayGifBtn();
    newBtn();
    $(document).on("click",".display",displayGif);
    $(document).on("click",".gif", function(){
        var state = $(this).attr("data-state");
        if(state =="still"){
            $(this).attr("src",$(this).data("animate"));
            $(this).attr("data-state","animate");
        }else{
            $(this).attr("src",$(this).data("still"));
            $(this).attr("data-state", "still");
        }
    });
    $(document).on()
});
