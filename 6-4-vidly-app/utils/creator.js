class Creator {
  constructor(app, Model) {
    this.app = app;
    this.Model = Model;
  }

  run = (validator) => {
    // -----------------------------------------  Get ------------------------------------------------
    this.app.get(`/`, async (req, res) => {
      try {
        const collection = await this.Model.find();
        res.send(collection);
      } catch (e) {
        res.status(500).send(e.message);
      }
    });

    this.app.get(`/:id`, async (req, res) => {
      const id = req.params.id;

      try {
        const document = await this.Model.findById(id);
        res.send(document);
      } catch (e) {
        res.status(404).send(`The item with the given ID was not found!!! `);
      }
    });

    // -----------------------------------------  Post ------------------------------------------------
    this.app.post(`/`, async (req, res) => {
      const { body } = req;

      //  Validate
      if (validator) {
        const { error } = validator(body);
        if (error) return res.status(400).send(error.details[0].message);
      }

      //  Create new document in Model database
      const document = new this.Model(body);

      try {
        await document.save();
        res.send(document);
      } catch (e) {
        res.status(500).send(e.message);
      }
    });

    // -----------------------------------------  Put ------------------------------------------------

    this.app.put(`/:id`, async (req, res) => {
      const { error } = validator(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      try {
        const document = await this.Model.findByIdAndUpdate(
          req.params.id,
          { ...req.body },
          { new: true }
        );

        res.send(document);
      } catch (e) {
        res.status(500).send(e.message);
      }
    });

    // -----------------------------------------  Delete ------------------------------------------------
    this.app.delete(`/:id`, async (req, res) => {
      try {
        const genre = await this.Model.findByIdAndRemove(req.params.id);
        res.send(genre);
      } catch (e) {
        res.status(500).send(e.message);
      }
    });
  };
}

module.exports = Creator;
