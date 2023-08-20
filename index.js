const elem = (target) => document.querySelector(target);
const StoreComponet = (store) => {
  const openClass = store.isOpen === "open" ? "open" : "closed";
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

const openJson = async (fileName) => {
  try {
    const req = await fetch(fileName);
    return await req.json();
  } catch (error) {
    return;
  }
};

const renderStores = (stores) => {
  elem("#zip-code").value = "";
  elem("#store-list").innerHTML = "";
  stores.map((store) => {
    elem("#store-list").innerHTML += StoreComponet(store);
  });
};

const findStore = (stores, zip) => stores.find((s) => s.zip.includes(zip));

const handleZipSearch = (e, stores) => {
  if (e.target.value === "") {
    renderStores(stores);
    return;
  }

  elem("#store-list").innerHTML = "";

  const store = findStore(stores, e.target.value);

  store
    ? (elem("#store-list").innerHTML += StoreComponet(store))
    : (elem("#store-list").innerHTML = "No store found");
};

const main = async () => {
  const stores = await openJson("stores.json");

  elem("#zip-code").addEventListener("keydown", (e) =>
    handleZipSearch(e, stores)
  );

  elem("#view-all-stores").addEventListener("click", (e) =>
    renderStores(stores)
  );

  renderStores(stores);
};

main();
