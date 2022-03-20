import axios, { AxiosResponse } from 'axios';
import { User, UserProps } from './models/User';
import { Collection } from './models/Collection';
import { UserForm } from './views/UserForm';
import { UserEdit } from './views/UserEdit';
import { UserList } from './views/UserList';

// ///////////////////
// // axios.post('http://localhost:3000/users', {name: 'name', age: 1})
// // axios.get('http://localhost:3000/users/1');

// const user = new User({ name: 'myName', age: 20 });
// const emptyUser = new User({});

// user.set({ name: 'newName' });

// console.log(user.get('name'));
// console.log(user.get('age'));

// user.on('change', () => {
//   console.log('change#1 was triggered');
// });
// user.on('change', () => {
//   console.log('change#2 was triggered');
// });
// user.on('save', () => {
//   console.log('save was triggered');
// });

// // on test
// console.log(user.events);

// // trigger test
// user.trigger('change');
// user.trigger('save');

// // fetch test
// const anotherUser = new User({ id: 1 });

// anotherUser.fetch();
// setTimeout(() => {
//   console.log('fetch test');
// }, 4000);

// // save test
// anotherUser.set({ name: 'NEW NAME', age: 99999 });
// // anotherUser.save();

// const newUser = new User({ name: 'new record', age: 0 });
// // newUser.save();

////////////////////////////////////////////////
// refactor using composition and inheritance //
////////////////////////////////////////////////

// const newUser = User.buildUser({ name: 'joe', age: 9 });
// newUser.on('save', () => {
//   console.log(newUser, 'user was saved');
// });
// newUser.save();

// const user = User.buildUser({ id: 1 });

// user.on('change', () => {
//   console.log(user);
// });

// user.fetch();

///////////////////////////////
// adding a Collection class //
///////////////////////////////

// const collection = new Collection('http://localhost:3000/users');

// collection.fetch();

// collection.on('change', () => {
//   console.log(collection.models);
// });

////////////////////////////////////////////////////
/// transforming Collection into a generic class ///
////////////////////////////////////////////////////

// const collection = new Collection<User, UserProps>(
//   'http://localhost:3000/users',
//   (json: UserProps) => User.buildUser(json)
// );
// collection.fetch();
// collection.on('change', () => {
//   console.log(collection.models);
// });

///////////////////
// after refactor//
///////////////////

// const collection = User.buildUserCollection();
// collection.fetch();
// collection.on('change', () => {
//   console.log(collection);
// });

///////////////
// user form //
///////////////

// const user = User.buildUser({ name: 'jane', age: 20 });

// const root = document.getElementById('root');

// if (root) {
//   const userForm = new UserForm(root, user);
//   userForm.render();
// } else {
//   throw new Error('Root element not found');
// }

///////////////
// user edit //
///////////////
// const user = User.buildUser({ name: 'USER NAME', age: 777 });
// const root = document.getElementById('root');

// if (root) {
//   const userEdit = new UserEdit(root, user);
//   userEdit.render();

//   console.log(userEdit);
// } else {
//   throw new Error('Root element not found');
// }

/////////////////////
// user collection //
/////////////////////

const users = new Collection(
  'http://localhost:3000/users',
  (json: UserProps) => {
    return User.buildUser(json);
  }
);

users.on('change', () => {
  const root = document.getElementById('root');

  if (root) {
    new UserList(root, users).render();
  }
});

users.fetch();
