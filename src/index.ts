import axios from 'axios';
import { User } from './models/User';

///////////////////
// axios.post('http://localhost:3000/users', {name: 'name', age: 1})
// axios.get('http://localhost:3000/users/1');

const user = new User({ name: 'myName', age: 20 });
const emptyUser = new User({});

user.set({ name: 'newName' });

console.log(user.get('name'));
console.log(user.get('age'));

user.on('change', () => {
  console.log('change#1 was triggered');
});
user.on('change', () => {
  console.log('change#2 was triggered');
});
user.on('save', () => {
  console.log('save was triggered');
});

// on test
console.log(user.events);

// trigger test
user.trigger('change');
user.trigger('save');

// fetch test
const anotherUser = new User({ id: 1 });

anotherUser.fetch();
setTimeout(() => {
  console.log('fetch test');
}, 4000);

// save test
anotherUser.set({ name: 'NEW NAME', age: 99999 });
anotherUser.save();

const newUser = new User({ name: 'new record', age: 0 });
newUser.save();
