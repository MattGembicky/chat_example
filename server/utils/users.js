class User {
  constructor(id, socket) {
    this.id = id;
    this.socket = socket;
    this.name = undefined;
  }
}


class Users {
  constructor() {
    this.list = {};
    this.count = 0;
  }

  add = (socket) => {
    this.list[this.count] = new User(this.count, socket);
    this.count++;
    return this.count - 1;
  }

  unusedName = (name) => {
    for(const [key, user] of Object.entries(this.list)){
      if(user.name === name){
        return false;
      }
    }
    return true;
  }

  getIdBySocket = (socket) => {
    for(const [key, user] of Object.entries(this.list)){
      if(user.socket === socket){
        return key;
      }
    }
    return false;
  }

  setName = (id, name) => {
    this.list[id].name = name;
  }

  getOnilne = () => {
    let pack = [];
    for(const [key, user] of Object.entries(this.list)){
      if(user.name !== undefined){
        pack.push({id: user.id, name: user.name});
      }
    }
    return pack;
  }

  getSockets = () => {
    let pack = [];
    for(const [key, user] of Object.entries(this.list)){
      if(user.name !== undefined){
        pack.push(user.socket);
      }
    }
    return pack;
  }

  delete = (id) => {
    delete this.list[id];
  }

}

module.exports = Users;
