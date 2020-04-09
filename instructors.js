const fs = require('fs');
const data = require('./data.json');
const { age, date } = require('./utils');

// Show
exports.show = (req, res) => {
  const { id } = req.params;

  const foundInstructor = data.instructors.find(
    instructor => {
      return instructor.id == id;
    }
  );

  if (!foundInstructor) {
    return res.send('Instructor not found!');
  }

  const instructor = {
    ...foundInstructor,
    age: age(foundInstructor.birth),
    services: foundInstructor.services.split(','),
    created_at: new Intl.DateTimeFormat('pt-BR').format(foundInstructor.created_at),
  }

  return res.render('instructors/show', { instructor });

}

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
    if (req.body[key] == '') {
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
}

// Edit View
exports.edit = (req, res) => {
  const { id } = req.params;
  const foundInstructor = data.instructors.find(
    instructor => instructor.id == id
  )

  if (!foundInstructor) {
    return res.send('Instructor not found');
  }

  instructor = {
    ...foundInstructor,
    birth: date(foundInstructor.birth),
  }

  return res.render('instructors/edit', {instructor});
}

// Put
exports.put = (req, res) => {
  const { id } = req.body;
  let index = 0;

  const foundInstructor = data.instructors.find(
    (instructor, foundIndex) => {
      if (instructor.id == id) {
        index = foundIndex;
        return true;
      }
    }
  )

  if (!foundInstructor) {
    return res.send('Instructor not found');
  }

  const instructor = {
    ...foundInstructor,
    ...req.body,
    birth: Date.parse(req.body.birth),
  }

  data.instructors[index] = instructor;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
    if (err) {
      return res.send('Write file error!');
    }
    return res.redirect(`/instructors/${instructor.id}`);
  });
}

// Delete
exports.delete = (req, res) => {
  const { id } = req.body;
  
  const filteredInstructors = data.instructors.filter(
    instructor => {
      return instructor.id != id;
    }
  );

  data.instructors = filteredInstructors;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) {
      return res.send('Write file error!');
    }
    return res.redirect('/instructors');
  })
}