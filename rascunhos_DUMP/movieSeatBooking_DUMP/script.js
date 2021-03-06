const container = document.querySelector(".container");
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const movie = document.getElementById("movie");
const count = document.getElementById("count");
const total = document.getElementById("total");

let ticketPrice = +movie.value

populateUi();

//Salvar o index e o preço do filme selecionado no Local Storage 
function setMovieData(movieIndex, moviePrice){
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

const updatedSelectedCount = function(){
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  
  const selectedSeatsCount = selectedSeats.length

  //Explicação: Dentro de 'seats', mapearemos todas as cadeiras
  //selecionadas (selectedSeats) e daremos um index à elas
  const seatsIndex = [...selectedSeats].map(function(seat){
    return [...seats].indexOf(seat)
  })

  console.log(seatsIndex)

  localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex))

  count.innerText = selectedSeatsCount
  total.innerText = selectedSeatsCount * ticketPrice
}


// Get from local storage and populate UI
function populateUi(){
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if(selectedSeats !== null && selectedSeats.length > 0){
    seats.forEach(function(seat, index){
      if(selectedSeats.indexOf(index) > -1){
        seat.classList.add('selected')
      }
    })
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')

  if(selectedMovieIndex !== null) {
    movie.selectedIndex = selectedMovieIndex
  }
}

// > -1
// classList.add('selected')

// Event Listener - Movie change
movie.addEventListener('change', e => {
  ticketPrice = +e.target.value
  setMovieData(e.target.selectedIndex, e.target.value)
  updatedSelectedCount()
}) 

// Event Listeners - Selected Seats
container.addEventListener('click', function(e){
  if (e.target.classList.contains('seat') && 
   !e.target.classList.contains('occupied')){
    e.target.classList.toggle('selected')
  }

  updatedSelectedCount()
})

//Initial count and total set
updatedSelectedCount()

/*

Adicionando funcionalidades do LocalStorage

1) Passar de um simples nodelist para um array com o número
das cadeiras (em formato de index)
  dica: usar spread operator
  dica: indexOf()

2) Salvar o index e o preço do filme selecionado no Local Storage 
*/

/* 
==== TOMANDO NOTAS DA AULA ==== 

x) forEach não retorna nada, map retorna um array
x) Caso no indexOf() passarmos um valor que não existe, retornará
  o index -1
x) Faltou o Prof. explicar que selectedIndex é uma propriedade do JS

*/

