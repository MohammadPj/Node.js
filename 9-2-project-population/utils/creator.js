class Creator {
  constructor(app, items) {
    this.app = app;
    this.items = items;
  }

  run = (listName, validator) => {
    // -----------------------------------------  Get ------------------------------------------------
    this.app.get(`/`, (req, res) => {
      res.send(this.items);
    });

    this.app.get(`/:id`, (req, res) => {
      const item = this.items.find((itm) => itm.id === +req.params.id);

      if (!item)
        return res
          .status(404)
          .send(`The ${listName} with the given ID was not found!!! `);

      res.send(item);
    });

    // -----------------------------------------  Post ------------------------------------------------
    this.app.post(`/`, async (req, res) => {
      //  Validate
      if (validator) {
        const { error } = validator(req.body);
        if (error) return res.status(400).send(error.details[0].message);
      }

      //  Create new course
      const item = {
        ...this.items[0],
        ...req.body,
        id: this.items.length + 1,
      };

      //  Add new course
      this.items.push(item);
      res.send(item);
    });

    // -----------------------------------------  Put ------------------------------------------------

    this.app.put(`/:id`, (req, res) => {
      //  Lookup the course
      //  if not exist, return 404
      let item = this.items.find((itm) => itm.id === +req.params.id);
      if (!item)
        return res
          .status(404)
          .send(`The ${listName} with the given ID was not found!!! `);

      //  Validate
      //  if invalid return, 400 bad request
      const { error } = validator(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      //Update the course


      const index = this.items.findIndex(itm => itm.id === +req.params.id)
      const newItem = {
        ...this.items[index],
        ...req.body,
      };
      this.items.splice(index, 1, newItem)

      res.send(newItem);


    });// -----------------------------------------  Delete ------------------------------------------------

    this.app.delete(`/:id`, (req, res) => {
      //  Look up the course
      //  if not existed, 404
      const item = this.items.find((itm) => itm.id === +req.params.id);
      if (!item) return res.status(404).send(`The ${listName} with the given ID was not found!!!`);

      //  Delete
      const index = this.items.findIndex((itm) => itm.id === +req.params.id);
      this.items.splice(index, 1);

      //  Return the same course
      res.send(item);
    });
  };
}

module.exports = Creator;
