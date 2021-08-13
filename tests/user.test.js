const request = require('supertest');
const app = require('../src/app');
const User = require('../src/modules/user');

const userOne = {
  name: 'Mike',
  email: 'mikeemail@gmail.com',
  password: 'mikePass!!',
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test('Should signup new user', async () => {
  await request(app)
    .post('/users')
    .send({
      name: 'Denis',
      email: 'example@gamil.com',
      password: 'MyPass777!',
    })
    .expect(201);
});

test('Should login existing user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
});

test('Should not login non-existing user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: userOne.password + 's',
    })
    .expect(400)
    .send((err) => {
      if (err) throw err;
    });
});
