const openJson = async (fileName) => {
    try {
      const req = await fetch(fileName);
      return await req.json();
    } catch (error) {
      return;
    }
  };
  
  const main = async () => {
    const stores = await openJson("stores.json");
    stores.map((elm) => {
      console.log(elm.name);
    });
  };
  
  main();
  