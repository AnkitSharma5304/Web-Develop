//const clock = document.querySelector('#clock') //use any method getElementById() or querySelector()

const clock = document.getElementById('clock');

setInterval(function () {
  let date = new Date();
  //console.log(date.toLocaleTimeString())
  clock.innerHTML = date.toLocaleTimeString('en-GB');
}, 1000);