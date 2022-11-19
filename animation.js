function right_arrow(number){
  // manage the click of the right arrow
  const container = document.getElementsByClassName('scrollmenu')[number];
  container.scrollLeft += 100;
}

function left_arrow(number){
  // manage the click of the left arrow
  const container = document.getElementsByClassName('scrollmenu')[number]
  container.scrollLeft -= 100;
}
function charge_image(item,list){
    // Change the 5 first image of the categorie
    image_table = document.getElementsByClassName(item)
    number_of_image = image_table.length
    for(i = 0; i < list.length; i++){
        image_table[i].src = list[i]["image_url"]
    }
}

function charge_image_2(item,list){
  // Change the last 2 images of the categorie
  image_table = document.getElementsByClassName(item)
  image_table[5].src = list[0]["image_url"]
  image_table[6].src = list[1]["image_url"]
}

function recuperate_data(film){
  // Recuperate sepcifique information about a film
            return ["Titre : " + film['title'], "Année : " + film['year'], "Score Imdb : "  + film['imdb_score'], "Nombre de vote : " + film['votes'], "Directeur : " + film['directors'], "Atceur : " +film['actors'], "Auteur : " + film['writers'], "Genres : " + film['genres'],"Durée : " + film["duration"], "Pays : " +  film['countries'], "Date de sortie : " + film["date_published"], "Resumé : " + film["long_description"], "Rated : " + film["rated"], "Box office : " + film["worldwide_gross_income"]];
}
async function test(id) {
  // Request the data of a specifique film
  return await fetch(
    'http://localhost:8000/api/v1/titles/'+id,{
      method: 'GET',
      }
      ).then(function(res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function(value) {
        
        for (x in recuperate_data(value)){
          console.log('Here', recuperate_data(value)[x])
        }
        var modal = document.getElementById("myModal");
        display_modal_text(modal, value)
      })
      .catch(function(err) {
        // Une erreur est survenue
      });

  
}
async function getResponse(url, item, main = false, best_categorie = false) {
  // Call the API and take the information from it  
  return await fetch(
      url,{
        method: 'GET',
        }
        ).then(function(res) {
          if (res.ok) {
            return res.json();
          }
        })
        .then(function(value) {
          console.log(value);
          if (main){
            // Part for the main image
            var main_container = document.getElementsByClassName("Main-film-container");
            main_container[0].style = "background-image: url('" + value.results[0]["image_url"]+"')";
            main_container[0].getElementsByClassName("Main-button")[0].onclick = function click(){
              document.getElementById("myModal").style.display = "block";
              test(value.results[0]['id'])
              
            }

          }
          image_table = document.getElementsByClassName(item)
          if (best_categorie){
            // Case of the best categorie (first image removed)
            image_table[0].src = value.results[1]["image_url"]
            image_table[1].src = value.results[2]["image_url"]
            image_table[2].src = value.results[3]["image_url"]
            image_table[3].src = value.results[4]["image_url"]
            best_film_cat_modal(item, value.results)
          }
          else {
            // general case
            charge_image(item, value.results);
            test_modal(item,value.results)
          }


        })
        .catch(function(err) {
        });

    
  }
async function getResponse_2(url, item, best_categorie = false) {
  // get the second page of the API for this categorie
  return await fetch(
      url,{
        method: 'GET',
        }
        ).then(function(res) {
          if (res.ok) {
            return res.json();
          }
        })
        .then(function(value) {
          console.log(value);
          if (best_categorie){
            // Case of the best categorie (first image removed)
            image_table = document.getElementsByClassName(item)
            image_table[4].src = value.results[0]["image_url"]
            image_table[5].src = value.results[1]["image_url"]
            image_table[6].src = value.results[2]["image_url"]
            best_film_modif_modal(item, value.results)

          }
          else {
            // general case
            charge_image_2(item, value.results);
            modif_modal(item, value.results)
          }

        })
        .catch(function(err) {
        });

    
  }

function display_modal_text(modal,data){
  // add the film picture on the modal
  modal_text = modal.getElementsByTagName("p")
  modal_text_table = recuperate_data(data)
  modal.getElementsByClassName('modal-image')[0].src = data["image_url"]
  
  for(j = 0; j < modal_text.length; j++){
    modal_text[j].textContent = modal_text_table[j];
  }
}
function best_film_cat_modal(btn_name, data){
    // Get the modal
    var modal = document.getElementById("myModal");
    // Get the the modal name
    var modal_img = modal.getElementsByTagName("modal-image")
    var btn = document.getElementsByClassName(btn_name);
  
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
      // When the user clicks on the buttons, open the modal
      btn[0].onclick = function click(){
        modal.style.display = "block";
          display_modal_text(modal, data[1]);
          test([data[1]['id']])
        }
    
        btn[1].onclick = function click(){
        modal.style.display = "block";
          display_modal_text(modal, data[2]);
          test([data[2]['id']])
        }
    
        btn[2].onclick = function click(){
          modal.style.display = "block";
          display_modal_text(modal, data[3]);
          test([data[3]['id']])
        }
    
        btn[3].onclick = function click(){
          modal.style.display = "block";
          display_modal_text(modal, data[4]);
          test([data[4]['id']])
        }
    
      // When the user clicks on <span> (x), close the modal
      span.onclick = function() {
        modal.style.display = "none";
      }
  
}
function test_modal(btn_name, data){
  // Get the modal
  var modal = document.getElementById("myModal");
  // Get the the modal name
  var modal_img = modal.getElementsByTagName("modal-image")
  var btn = document.getElementsByClassName(btn_name);

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on the buttons, open the modal
    btn[0].onclick = function click(){
    modal.style.display = "block";
      display_modal_text(modal, data[0]);
      test([data[0]['id']])
    }

    btn[1].onclick = function click(){
    modal.style.display = "block";
      display_modal_text(modal, data[1]);
      test([data[1]['id']])
    }

    btn[2].onclick = function click(){
      modal.style.display = "block";
      display_modal_text(modal, data[2]);
      test([data[2]['id']])
    }

    btn[3].onclick = function click(){
      modal.style.display = "block";
      display_modal_text(modal, data[3]);
      test([data[3]['id']])
    }

    btn[4].onclick = function click(){
      modal.style.display = "block";
      display_modal_text(modal, data[4]);
      test([data[4]['id']])
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
function modif_modal(btn_name, data){
  // manage the button for the last 2 images
  var modal = document.getElementById("myModal");
  var btn = document.getElementsByClassName(btn_name);
  
  btn[5].onclick = function click(){
    modal.style.display = "block";
    display_modal_text(modal, data[0]);
  }
  btn[6].onclick = function click(){
    modal.style.display = "block";
    display_modal_text(modal, data[1]);
  }

}
function best_film_modif_modal(btn_name, data){
  // Manage the modal for the best film
  var modal = document.getElementById("myModal");
  var btn = document.getElementsByClassName(btn_name);
  
  btn[4].onclick = function click(){
    modal.style.display = "block";
    display_modal_text(modal, data[0]);
    test([data[0]['id']])
  }
  btn[5].onclick = function click(){
    modal.style.display = "block";
    display_modal_text(modal, data[1]);
    test([data[1]['id']])
  }
  btn[6].onclick = function click(){
    modal.style.display = "block";
    display_modal_text(modal, data[1]);
    test([data[2]['id']])
  }

}
var response;

getResponse('http://localhost:8000//api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=',
"item-1", true, true).then(response);
getResponse_2("http://localhost:8000//api/v1/titles/?actor=&actor_contains=&company=&company_contains=&country=&country_contains=&director=&director_contains=&genre=&genre_contains=&imdb_score=&imdb_score_max=&imdb_score_min=&lang=&lang_contains=&max_year=&min_year=&page=2&rating=&rating_contains=&sort_by=-imdb_score&title=&title_contains=&writer=&writer_contains=&year=",
"item-1", true).then(response);

getResponse('http://localhost:8000//api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=action&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=',
                "item-2");
getResponse_2('http://localhost:8000/api/v1/titles/?actor=&actor_contains=&company=&company_contains=&country=&country_contains=&director=&director_contains=&genre=action&genre_contains=&imdb_score=&imdb_score_max=&imdb_score_min=&lang=&lang_contains=&max_year=&min_year=&page=2&rating=&rating_contains=&sort_by=-imdb_score&title=&title_contains=&writer=&writer_contains=&year=',
                "item-2");
getResponse('http://localhost:8000///api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=Adventure&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=',
                "item-3")
getResponse_2("http://localhost:8000/api/v1/titles/?actor=&actor_contains=&company=&company_contains=&country=&country_contains=&director=&director_contains=&genre=Adventure&genre_contains=&imdb_score=&imdb_score_max=&imdb_score_min=&lang=&lang_contains=&max_year=&min_year=&page=2&rating=&rating_contains=&sort_by=-imdb_score&title=&title_contains=&writer=&writer_contains=&year=",
                "item-3")
getResponse('http://localhost:8000//api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=Animation&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=',
                "item-4")
getResponse_2('http://localhost:8000//api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=Animation&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=',
                "item-4")

