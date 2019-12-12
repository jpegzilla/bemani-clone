console.log("server.js stands ready!");

class Database {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.db = {};
  }

  create(object, overwrite = false) {
    fetch("http://localhost/eiko-api/", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
      });
  }

  read(object) {}

  update(object) {}

  delete(object) {}

  reset(force = false) {}
}
