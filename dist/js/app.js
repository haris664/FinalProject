"use strict";var startLongitude,startLatitude,destLongitude,destLatitude,key="pk.eyJ1IjoiaGFyaXM2NjQiLCJhIjoiY2thNXdscHE0MDFoMjJzbWpxeGFoaGJ3eiJ9.eTB8EAoQFT1gFoJzyKtMrg",transitKey="zEE5nKn5wIFmy03pO7b",firstInputEle=document.querySelector(".origin-container"),startingListEle=document.querySelector(".origins"),secondInputEle=document.querySelector(".destination-container"),destinationListEle=document.querySelector(".destinations"),planTripEle=document.querySelector(".button-container");function startingLocation(t){fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/".concat(t,".json?limit=10&bbox=-97.325875,49.766204,-96.953987,49.99275&access_token=").concat(key)).then(function(t){if(t.ok)return t.json();throw new Error("something not working")}).then(function(t){insertStartingLocation(t.features)})}function insertStartingLocation(t){var n=startingListEle.innerHTML="";t.forEach(function(t){n+="<li data-long=".concat(t.geometry.coordinates[0]," data-lat=").concat(t.geometry.coordinates[1],' class="">\n      <div class="name">').concat(t.place_name.split(",")[0],"</div>\n      <div>").concat(t.place_name.split(",")[1],"</div>\n    </li>")}),startingListEle.insertAdjacentHTML("afterbegin",n)}function destinationLocation(t){fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/".concat(t,".json?limit=10&bbox=-97.325875,49.766204,-96.953987,49.99275&access_token=").concat(key)).then(function(t){if(t.ok)return t.json();throw new Error("something went wrong")}).then(function(t){insertDestinationLocation(t.features)})}function insertDestinationLocation(t){var n=destinationListEle.innerHTML="";t.forEach(function(t){n+="\n      <li data-long=".concat(t.geometry.coordinates[0]," data-lat=").concat(t.geometry.coordinates[1],' class="">\n        <div class="name">').concat(t.place_name.split(",")[0],"</div>\n        <div>").concat(t.place_name.split(",")[1],"</div>\n      </li>")}),destinationListEle.insertAdjacentHTML("afterbegin",n)}function planMyTrip(t,n,e,o){console.log(t,e,n,o),fetch("https://api.winnipegtransit.com/v3/trip-planner.json?api-key=".concat(transitKey,"&origin=geo/").concat(t,",").concat(n,"&destination=geo/").concat(e,",").concat(o)).then(function(t){return t.json()}).then(function(t){displayTheTrip(t.plans[0].segments)})}function displayTheTrip(t){console.log(t),t.forEach(function(t){console.log(t),"walk"===t.type&&void 0!==t.to.stop&&console.log("walk for ".concat(t.times.durations.total,"\n     minutes to stop#").concat(t.to.stop.key,"-").concat(t.to.stop.name)),"walk"===t.type&&void 0===t.to.stop&&console.log("Walk for ".concat(t.times.durations.total," to your destination"))})}firstInputEle.onsubmit=function(t){var n=t.target.querySelector("input");0<n.value.length&&startingLocation(n.value),t.preventDefault(),n.value=""},startingListEle.onclick=function(t){var n=t.target.closest("li");null!==n&&(n.className="selected",startLongitude=n.dataset.long,startLatitude=n.dataset.lat)},secondInputEle.onsubmit=function(t){var n=t.target.querySelector("input");0<n.value.length&&destinationLocation(n.value),t.preventDefault(),n.value=""},destinationListEle.onclick=function(t){var n=t.target.closest("li");null!==n&&(n.className="selected",destLongitude=n.dataset.long,destLatitude=n.dataset.lat)},planTripEle.onclick=function(t){"BUTTON"===t.target.tagName&&planMyTrip(startLatitude,startLongitude,destLatitude,destLongitude)};