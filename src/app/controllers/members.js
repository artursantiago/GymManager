const { age, date } = require('../../lib/utils');

module.exports = {
  // Index
  index(req, res) {
    // const members = data.members.map(
    //   member => {
    //     let editedMember = {...member};
    //     editedMember.services = member.services.split(',');
        
    //     return editedMember;
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
    return res.render('members/create');
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

    return res.send('put');
  },

  // Delete
  delete(req, res) {
    return res.send('delete');
  },
}