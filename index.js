// Get DOM element by selector
const elem = (target) => document.querySelector(target);

// Component to render a store
const StoreComponet = (store) => {
  // Set CSS class based on open/closed
  const openClass = store.isOpen === "open" ? "open" : "closed";
  // Return store HTML
  return `<div class="store">
    <div>
      <h2>${store.name}</h2>
      <span class="${openClass}">${store.isOpen}</span>  
    </div>
    <p>${store.address}</p>
    <div>
      <img src="clock-three-svgrepo-com.svg" alt="" />
      <span>${store.schedules}</span>
    </div>
  </div>
  `;
};

// Fetch JSON data from file
const openJson = async (fileName) => {
  try {
    const req = await fetch(fileName);
    return await req.json();
  } catch (error) {
    return;
  }
};

// Fade In Effect
const fadeIn = (element, time) => {
  element.style.opacity = 0;

  setTimeout(() => {
    element.style.opacity = 1;
  }, time);
};

// Render all stores to DOM
const renderStores = (stores) => {
  // Clear input and list
  elem("#zip-code").value = "";
  elem("#store-list").innerHTML = "";
  // Loop stores and render
  stores.map((store) => {
    elem("#store-list").innerHTML += StoreComponet(store);
  });

  const storesElements = document.querySelectorAll(".store");

  storesElements.forEach((storeElem) => {
    storeElem.style.opacity = 0;

    setTimeout(() => {
      storeElem.style.opacity = 1;
    }, 100);
  });
};

// Find store by zip code
const findStore = (stores, zip) => stores.find((s) => s.zip.includes(zip));

// Handle zip code search
const handleZipSearch = (e, stores) => {
  // If input empty, render all
  if (e.target.value === "") {
    renderStores(stores);
    return;
  }

  // Clear list, find store, render or show not found
  elem("#store-list").innerHTML = "";
  const store = findStore(stores, e.target.value);

  if (store) {
    elem("#store-list").innerHTML += StoreComponet(store);
    fadeIn(elem(".store"), 100);
  } else {
    elem("#store-list").innerHTML = "No store found";
    fadeIn(elem("#store-list"), 100);
  }
};

// App entry point
const main = async () => {
  // Get stores
  const stores = await openJson("stores.json");

  // Bind events
  elem("#zip-code").addEventListener("keydown", (e) =>
    handleZipSearch(e, stores)
  );

  elem("#view-all-stores").addEventListener("click", (e) =>
    renderStores(stores)
  );

  // Initial render
  renderStores(stores);
};

main();
