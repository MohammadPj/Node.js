class Creator {
  constructor(app, Model) {
    this.app = app;
    this.Model = Model;
  }

  run = (validator) => {
    // -----------------------------------------  Get ------------------------------------------------
    this.app.get(`/`, async (req, res) => {
      const collection = await this.Model.find();
      res.send(collection);
    });

    this.app.get(`/:id`, async (req, res) => {
      const id = req.params.id

      const document = await this.Model.findById(id);

      if (!document)
        return res
          .status(404)
          .send(`The item with the given ID was not found!!! `);

      res.send(document);
    });

    // -----------------------------------------  Post ------------------------------------------------
    this.app.post(`/`, async (req, res) => {
      const { body } = req;

      //  Validate
      if (validator) {
        const { error } = validator(body);
        if (error) return res.status(400).send(error.details[0].message);
      }

      //  Create new deocument in Model database
      const document = new this.Model(body);
      await document.save();

      // return document in response
      res.send(document);
    });

    // -----------------------------------------  Put ------------------------------------------------

    this.app.put(`/:id`, async (req, res) => {
      const { error } = validator(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      const document = await this.Model.findByIdAndUpdate(
        req.params.id,
        { ...req.body },
        { new: true }
      );
      // const genre = await Genre.findById(req.params.id)
      if (!document) return res.status(404).send("Genre not found");

      const result = await document.save();
      res.send(result);
    });

    // -----------------------------------------  Delete ------------------------------------------------
    this.app.delete(`/:id`, async (req, res) => {
      const genre = await this.Model.findByIdAndRemove(req.params.id);

      if (!genre) return res.status(404).send("Genre not found");

      res.send(genre);
    });
  };
}

module.exports = Creator;
