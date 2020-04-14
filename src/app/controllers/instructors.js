const { age, date } = require('../../lib/utils');

module.exports = {
  // Index
  index(req, res) {
    // const instructors = data.instructors.map(
    //   instructor => {
    //     let editedInstructor = {...instructor};
    //     editedInstructor.services = instructor.services.split(',');
        
    //     return editedInstructor;
    //   }
    // );

    return res.send('index');
  },

  // Show
  show(req, res) {
    return res.send('show');
  },

  // Create
  create(req, res) {
    return res.render('instructors/create');
  },

  // Post
  post(req, res) {
    /**
     * Returns an array with the names of the 
     * enumerable string properties and methods 
     * of an object.
     */
    const keys = Object.keys(req.body);
    
    for (key of keys) {
      if (req.body[key] == '') {
        return res.send('Please, fill all the fields.');
      }
    }

    let {avatar_url, name, birth, gender, services} = req.body;

    return res.send('post');
  },

  // Edit View
  edit(req, res) {
    return res.send('delete');
  },

  // Put
  put(req, res) {
        /**
     * Returns an array with the names of the 
     * enumerable string properties and methods 
     * of an object.
     */
    const keys = Object.keys(req.body);
    
    for (key of keys) {
      if (req.body[key] == '') {
        return res.send('Please, fill all the fields.');
      }
    }

    let {avatar_url, name, birth, gender, services} = req.body;

    return res.send('put');
  },

  // Delete
  delete(req, res) {
    return res.send('delete');
  },
}