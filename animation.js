
function right_arrow(item) {
    // document.getElementsByClassName(item)[0].setAttribute("hidden","hidden");
    // document.getElementsByClassName(item)[1].setAttribute("hidden","hidden");
    // document.getElementsByClassName(item)[2].setAttribute("hidden","hidden");
    // document.getElementsByClassName(item)[4].removeAttribute("hidden");
    // document.getElementsByClassName(item)[5].removeAttribute("hidden");
    // document.getElementsByClassName(item)[6].removeAttribute("hidden");
      var div = document.getElementsByClassName('scrollmenu')[0];
      var hs = div.scrollWidth > div.clientWidth;
      var vs = div.scrollHeight > div.clientHeight;
      console.log(div, hs, vs)
      document.getElementsByTagName("h2").innerHTML 
              = "Horizontal Scrollbar - " + hs
              +"<br>Vertical Scrollbar - " + vs;
}

function left_arrow(item) {
    document.getElementsByClassName(item)[4].setAttribute("hidden","hidden");
    document.getElementsByClassName(item)[5].setAttribute("hidden","hidden");
    document.getElementsByClassName(item)[6].setAttribute("hidden","hidden");
    document.getElementsByClassName(item)[0].removeAttribute("hidden");
    document.getElementsByClassName(item)[1].removeAttribute("hidden");
    document.getElementsByClassName(item)[2].removeAttribute("hidden");
}

function charge_image(item,list){

    image_table = document.getElementsByClassName(item)
    number_of_image = image_table.length
    for(i = 0; i < list.length; i++){
        image_table[i].src = list[i]["image_url"]
        //image_table[i].setAttribute('id' , list[i]["id"])
    }
}

function recuperate_data(url,item){
    const request = new Request(url, {method: 'GET'});
    fetch(request)
    .then((response) => {
      if (response.status === 200) {
        console.log(response.status)
        return response.json();
      } else {
        throw new Error('Something went wrong on API server!');
      }
    })
    .then((response) => {
      console.log(response.results.length)
      charge_image(item, response.results)
      // …
    }).catch((error) => {
      console.log(error);
    });
}

async function getResponse(url,item) {
    const response = await fetch(
      url,
      {
        method: 'GET'
        });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data.results.length)
    charge_image(item, data.results)
    console.log(data.results)
    test_modal(data.results[0]['title'])
  }
function test_modal(text){
    // Get the modal
  var modal = document.getElementById("myModal");
  modal.getElementsByTagName("p")[0].textContent = "Hello brp"
  // console.log('Here : ', modal.getElementsByTagName('p'))
  modal.getElementsByTagName("p")[1].textContent = text
  // Get the button that opens the modal
  var btn = document.getElementById("myBtn1");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
  //console.log(modal,btn,span)
  // When the user clicks on the button, open the modal
  btn.onclick = function click(){
    modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

getResponse('http://localhost:8000//api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=',
                "item-1")
getResponse('http://localhost:8000//api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=action&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=',
                "item-2")
getResponse('http://localhost:8000///api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=Adventure&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=',
                "item-3")
getResponse('http://localhost:8000//api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=Animation&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=',
                "item-4")