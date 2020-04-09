module.exports = {
  age: function(timestamp) {
    const today = new Date();
    const birth = new Date(timestamp);
  
    let age = today.getFullYear() - birth.getFullYear();
    const month = today.getMonth() - birth.getMonth();
    
    if (month < 0 ||
        month == 0 &&
        today.getDate() < birth.getDate()) {
          age--;
    }
  
    return age;
  },
  date: function(timestamp) {
    const date = new Date(timestamp);

    const year = date.getUTCFullYear();
    /**
     * date.prototype.getMonth() returns
     * 0 - 1 ... 10 -  11
     * January - February ... November - December
     */
    const month = `0${date.getUTCMonth() + 1}`.slice(-2);
    const day = `0${date.getUTCDate()}`.slice(-2);

    return `${year}-${month}-${day}`;
  }   
}