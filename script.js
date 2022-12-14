const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();
let ticketPrice = +movieSelect.value;

let firebaseConfig = {
  apiKey: "AIzaSyC34SmPQTP8dqjhpxp9k2Sncm-9Yi2MtNY",
  authDomain: "abhi123-b4108.firebaseapp.com",
  databaseURL: "https://abhi123-b4108-default-rtdb.firebaseio.com",
  projectId: "abhi123-b4108",
  storageBucket: "abhi123-b4108.appspot.com",
  messagingSenderId: "1049148542296",
  appId: "1:1049148542296:web:62b08346f54376981fe92d",
  measurementId: "G-8WQC5QB6QG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth();
const database = firebase.database();

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  //copy selected seats into arr
  // map through array
  //return new array of indexes

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// get data from localstorage and populate ui
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Movie select event
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

// intial count and total
updateSelectedCount();

async function bookticket(){
  try{
    alert(parseInt(count.innerText,10))
  var user_data = {
    ticketCount: parseInt(count.innerText,10),
  };
  const email=localStorage.getItem("user");
  const usersRef = database.ref("users/" + email.split("@")[0]);
  await usersRef.update(user_data);
  alert("ticket booked")
  localStorage.removeItem("selectedSeats")
  window.close();
}catch(err){
  console.log("error");
}
}
