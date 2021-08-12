/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = [];
let currentMood = "Tolerant"
let possibleMoods = []
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target

  let kitten = {
    id: generateId(),
    name: form.name.value,
    affection: 5,
    mood: "Tolerant"
  }

  // @ts-ignore
  kittens.push(kitten)
  saveKittens()
  form.reset()
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let storedKittens = JSON.parse(window.localStorage.getItem("kittens"))
  if (storedKittens) {
    kittens = storedKittens
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let kittensListElem = document.getElementById("kittens")
  let kittensTemplate = ""
  kittens.forEach(kitten => {
    kittensTemplate += `
     <div id="kittencard" class="card container kitten">
        <img src="https://robohash.org/${kitten.name}.png?set=set4">
          <div>
            <span id="kitten-title">Name:</span>
            <span id="kitten-name">${kitten.name}</span>
            </div>
            <div>
             <span>Mood:</span>
             <span>${kitten.mood}</span>
           </div>
          <div>
            <span>Affection:</span>
            <span>${kitten.affection}</span>
          </div>
          <div>
          <button onclick="pet('${kitten.id}')">Pet</button>
          <button onclick="catnip('${kitten.id}')">Cat Nip</button>
          </div>
      </div>
    `
  })
  kittensListElem.innerHTML = kittensTemplate
}

function removeKittens() {
  kittens.splice(0, kittens.length)
  saveKittens()
}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
function pet(id) {
  let index = kittens.findIndex(kitten => kitten.id == id)
  let chaos = Math.random()
  if (chaos > .7)
    kittens[index].affection += 1
  else kittens[index].affection -= 1
  setKittenMood(kittens[index])
  saveKittens()
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {
  let index = kittens.findIndex(kitten => kitten.id == id)
  kittens[index].affection = 5
  setKittenMood(kittens[index])
  saveKittens()
}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
  let kittenElement = document.getElementById("kittencard")
  if (kitten.affection > 6) {
    kittenElement.classList.remove("kitten")
    kitten.mood = "Happy"
  }
  if (kitten.affection <= 5) {
    kittenElement.classList.remove("kitten")
    kitten.mood = "Tolerant"
  }
  if (kitten.affection <= 3) {
    kittenElement.classList.remove("kitten")
    kitten.mood = "Angry";
  }
  if (kitten.affection <= 0) {
    kittenElement.classList.remove("kitten")
    kitten.mood = "Gone"
  }

}



function getStarted() {
  document.getElementById("welcome").classList.add("hidden");
  document.getElementById("kittens").classList.remove("hidden")
  drawKittens();
}

/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}

loadKittens()
drawKittens()