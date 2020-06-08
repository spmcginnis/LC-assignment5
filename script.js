// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/

function hasInputTest(strs, nums) {
   let faults = 0;
   let list = strs.concat(nums);
   for (let n of list) {
      if (n.length == 0) {faults += 1}
   }
   if (faults === 0) { return true}
   if (faults > 0) {return false}
}

function validateNums(nums) {
   let faults = 0;

   for (let n of nums) {
      n = Number(n);
      if (n === "" || isNaN(n) || n < 0) {
         faults += 1;
      } 
   }

   if (faults === 0) { return true}
   if (faults > 0) {return false}

}

window.addEventListener('load', function(){
   console.log('PAGE LOADED');

   let form = document.querySelector('#launchForm form');


   form.addEventListener('submit', function(event){
      console.log('BEGIN TEST');


      let pilotName = document.querySelector('input[name=pilotName]').value;
      let copilotName = document.querySelector('input[name=copilotName]').value;
      let fuelLevel = document.querySelector('input[name=fuelLevel]').value;
      let cargoMass = document.querySelector('input[name=cargoMass]').value;

      let strs = [pilotName, copilotName];
      let nums = [fuelLevel, cargoMass];

      let test1 = hasInputTest(strs,nums);
      if (!test1) {
         alert('All fields are required!');
         event.preventDefault();
      }

      let test2 = validateNums(nums);
      if (!test2) {
         alert('Fuel Level and Cargo Mass must be valid non-negative numbers!');
         event.preventDefault();
      }

      // console.log('test1 passed? ' + test1)
      // console.log('test2 passed? ' + test2)






   })


})