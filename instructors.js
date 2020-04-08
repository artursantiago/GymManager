const fs = require('fs');

const data = require('./data.json');

// Create
exports.post =  (req, res) => {
  /**
   * Returns an array with the names of the 
   * enumerable string properties and methods 
   * of an object.
   */
  const keys = Object.keys(req.body);

  for (key of keys) {
    /**
     * req.body[key]
     * Is the same as req.body.key
     */
    if (req.body[key] == "") {
      return res.send('Please, fill all the fields.');
    }
  }

  let {avatar_url, name, birth, gender, services} = req.body;

  birth = Date.parse(birth);
  const id = Number(data.instructors.length + 1);
  const created_at = Date.now();

  data.instructors.push({
    id,
    avatar_url,
    name,
    birth,
    gender,
    services,
    created_at
  });
  
  /**
   * JSON.stringify(1º, 2º, 3º)
   * 1º data to be transformed
   * 2º Some property thay I dont know yet
   * 3º Numbers of spaces after a line break
   */
  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
    if (err) {
      return res.send('Write file error!');
    }

    return res.redirect('/instructors');
  });

  // return res.send(req.body);
}