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

function validateStrs(strs) {
   let faults = 0;
   for (let n of strs) {
      nn = Number(n);
      if (!isNaN(nn)) { faults += 1}
   }

   if (faults === 0) { return true}
   if (faults > 0) {return false}
}

function validateNums(nums) {
   let faults = 0;

   for (let n of nums) {
      nn = Number(n);
      if (n === "" || isNaN(nn) || nn < 0) {
         faults += 1;
      } 
   }

   if (faults === 0) { return true}
   if (faults > 0) {return false}

}

// function that checks the fuel status and changes faulty items to display
function checkStatus(pilot, copilot, fuelAmt, cargoAmt) {
   let faulty = document.querySelector('#faultyItems');
   let launchStatus = document.querySelector('#launchStatus');
   let fuelStatus = document.querySelector('#fuelStatus');
   let cargoStatus = document.querySelector('#cargoStatus');
   let faults = 0;
   // update names
   if (pilot && copilot) {
      document.querySelector('#pilotStatus').innerHTML = `Pilot, ${pilot}, ready.`;
      document.querySelector('#copilotStatus').innerHTML = `Copilot, ${copilot}, ready.`;
   }

   //checkfuel
   if (fuelAmt < 10000) {
      faults += 1;
      fuelStatus.innerHTML = 'Fuel Level Insufficient.';
   }

   //checkcargo
   if (cargoAmt > 10000) {
      faults += 1;
      cargoStatus.innerHTML = 'Total mass in excess of 10000 kg. Shuttle will not reach orbit.'
   }

   //check faults
   if (faults > 0) {
      faulty.setAttribute('style', 'visibility:visible;');
      launchStatus.setAttribute('style', 'color:red;');
      launchStatus.innerHTML = 'SHUTTLE NOT READY FOR LAUNCH';
      return false;
   } else if (faults === 0) {
      faulty.setAttribute('style', 'visibility:visible;');
      launchStatus.setAttribute('style', 'color:green;');
      launchStatus.innerHTML = 'SHUTTLE CLEARED FOR LAUNCH';
      fuelStatus.innerHTML = 'Fuel level sufficient.';
      cargoStatus.innerHTML = 'Cargo mass acceptible.';
      return true;
   }

}

window.addEventListener('load', function(){
   // console.log('PAGE LOADED');

   let form = document.querySelector('#launchForm form');


   form.addEventListener('submit', function(event){
      // console.log('BEGIN TEST');
      event.preventDefault();

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

      let test2 = validateStrs(strs);
      if (!test2) {
         alert('Numbers are not valid names!  (No robots!)');
         event.preventDefault();
      }

      let test3 = validateNums(nums);
      if (!test3) {
         alert('Fuel Level and Cargo Mass must be valid non-negative numbers!');
         event.preventDefault();
      }

      // console.log('test1 passed? ' + test1)
      // console.log('test2 passed? ' + test2)
      let allTests = test1&&test2&&test3;
      
      if (allTests){
         let statusTest = checkStatus(pilotName, copilotName, fuelLevel, cargoMass);
         allTests = allTests && statusTest;
      } else {alert('Test(s) failed.  Cannot proceed.')}
      
      // console.log('tests? ' + allTests);

      if (allTests) {
         let planetsURL = 'https://handlers.education.launchcode.org/static/planets.json';
         
         fetch(planetsURL).then( function(response) {
            response.json().then( function(json) {
               let planet = json[5];

               let missionHTML = `
               <h2>Mission Destination</h2>
                  <ul>
                     <li>Name: ${planet.name}</li>
                     <li>Diameter: ${planet.diameter}</li>
                     <li>Star: ${planet.star}</li>
                     <li>Distance from Earth: ${planet.distance}</li>
                     <li>Number of Moons: ${planet.moons}</li>
                  </ul>
               <img src="${planet.image}">
               `;

               // console.log(missionHTML)

               document.querySelector('#missionTarget').innerHTML = missionHTML;

            })
         });
         

         

      }


   })


})