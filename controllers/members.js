const fs = require('fs');
const data = require('../data.json');
const { date } = require('../utils');

// Index
exports.index = (req, res) => {
  // const members = data.members.map(
  //   member => {
  //     let editedMember = {...member};
  //     editedMember.services = member.services.split(',');
      
  //     return editedMember;
  //   }
  // );

  return res.render('members/index', { members: data.members })
}

// Show
exports.show = (req, res) => {
  const { id } = req.params;

  const foundMember = data.members.find(
    member => {
      return member.id == id;
    }
  );

  if (!foundMember) {
    return res.send('Member not found!');
  }
  
  const member = {
    ...foundMember,
    birth: date(foundMember.birth).birthDay,
  }

  return res.render('members/show', { member });

}

// Create
exports.create = (req, res) => {
  return res.render('members/create');
}

// Post
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

  const birth = Date.parse(req.body.birth);

  let id = 1;
  const lastMember = data.members[data.members.length - 1];
  if (lastMember) {
    id = lastMember.id + 1;
  }

  data.members.push({
    id,
    ...req.body,
    birth,
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
    return res.redirect('/members/'+id);
  });
}

// Edit View
exports.edit = (req, res) => {
  const { id } = req.params;
  const foundMember = data.members.find(
    member => member.id == id
  )

  if (!foundMember) {
    return res.send('Member not found');
  }

  member = {
    ...foundMember,
    birth: date(foundMember.birth).iso,
  }

  return res.render('members/edit', {member});
}

// Put
exports.put = (req, res) => {
  const { id } = req.body;
  let index = 0;

  const foundMember = data.members.find(
    (member, foundIndex) => {
      if (member.id == id) {
        index = foundIndex;
        return true;
      }
    }
  )

  if (!foundMember) {
    return res.send('Member not found');
  }

  const member = {
    ...foundMember,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id),
  }

  data.members[index] = member;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
    if (err) {
      return res.send('Write file error!');
    }
    return res.redirect(`/members/${member.id}`);
  });
}

// Delete
exports.delete = (req, res) => {
  const { id } = req.body;
  
  const filteredMembers = data.members.filter(
    member => {
      return member.id != id;
    }
  );

  data.members = filteredMembers;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) {
      return res.send('Write file error!');
    }
    return res.redirect('/members');
  })
}