function charge_image(item,list){

    image_table = document.getElementsByClassName(item)
    number_of_image = image_table.length
    for(i = 0; i < list.length; i++){
        image_table[i].src = list[i]["image_url"]
        //image_table[i].setAttribute('id' , list[i]["id"])
    }
}

function charge_image_2(item,list){
  image_table = document.getElementsByClassName(item)
  image_table[5].src = list[0]["image_url"]
  image_table[6].src = list[1]["image_url"]
}

// function recuperate_data(film){
//   let data = [];
//   for (x = 0; x < 5; x++){
//     data.append([film[x]['title'], film[x]['year'], film['imdb_score'], film[x]['votes'], film[x]['directors'], film[x]['actors'], film[x]['writers'], film[x]['genres']]);
//   };
//   return data;
// }
function recuperate_data(film){
  return [film['title'], film['year'], film['imdb_score'], film['votes'], film['directors'], film['actors'], film['writers'], film['genres']];
}

// async function getResponse(url,item) {
//     const response = await fetch(
//       url,
//       {
//         method: 'GET'
//         });
    
//     const data = await response.json();
//     charge_image(item, data.results);

//     //console.log(recuperate_data(data.results))
//     test_modal();
//     return data;
    
//   }
async function getResponse(url,item) {
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
          charge_image(item, value.results);
          test_modal(item,value.results)
        })
        .catch(function(err) {
          // Une erreur est survenue
        });

    
  }
async function getResponse_2(url,item) {
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
          charge_image_2(item, value.results);
          modif_modal(item,value.results)
        })
        .catch(function(err) {
          // Une erreur est survenue
        });

    
  }

function display_modal_text(modal,data){
  modal_text = modal.getElementsByTagName("p")
  modal_text_table = recuperate_data(data)
  for(j = 0; j < modal_text.length; j++){
    modal_text[j].textContent = modal_text_table[j];
  }
}
function test_modal(btn_name, data){
  // Get the modal
  var modal = document.getElementById("myModal");
  // Get the the modal name
  var btn = document.getElementsByClassName(btn_name);

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on the buttons, open the modal
    btn[0].onclick = function click(){
    modal.style.display = "block";
    display_modal_text(modal, data[0]);

  }
    btn[1].onclick = function click(){
    modal.style.display = "block";
    display_modal_text(modal, data[1]);
    }

    btn[2].onclick = function click(){
      modal.style.display = "block";
      display_modal_text(modal, data[2]);
    }
    btn[3].onclick = function click(){
      modal.style.display = "block";
      display_modal_text(modal, data[3]);
    }
    btn[4].onclick = function click(){
      modal.style.display = "block";
      display_modal_text(modal, data[4]);
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
var response;
getResponse('http://localhost:8000//api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=',
"item-1").then(response);
getResponse_2("http://localhost:8000//api/v1/titles/?actor=&actor_contains=&company=&company_contains=&country=&country_contains=&director=&director_contains=&genre=&genre_contains=&imdb_score=&imdb_score_max=&imdb_score_min=&lang=&lang_contains=&max_year=&min_year=&page=2&rating=&rating_contains=&sort_by=-imdb_score&title=&title_contains=&writer=&writer_contains=&year=",
"item-1").then(response);

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

console.log('final',best_film_list)

// let data = [];
// for (x = 0; x < 5; x++){
//   data.append([best_film_list.results[x]['title'], best_film_list.results[x]['year'], best_film_list.results['imdb_score'], best_film_list.results[x]['votes'], best_film_list.results[x]['directors'], best_film_list.results[x]['actors'], best_film_list.results[x]['writers'], best_film_list.results[x]['genres']]);
//   console.log(data)
// };



var first_list_film = []
// const promise = new Promise((resolve,reject) => {
  // const best_film_list = getResponse('http://localhost:8000//api/v1/titles/?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=-imdb_score&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=',
  // "item-1");
//   test_modal("item-1");

//   if(best_film_list) {
//       resolve(best_film_list)
    
//   }
// })

// promise.then((best_film_list) =>{

//   console.log("1",best_film_list)
//   first_list_film = best_film_list.results
//   return first_list_film
// })
// first_list_film = promise.resolve();
// console.log(first_list_film)