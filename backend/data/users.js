import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Staff Member',
    email: 'staff@cafe.com',
    password: bcrypt.hashSync('staff123', 10),
    role: 'staff'
  },
  {
    name: 'Malith Madhuwanthe',
    email: 'malith@cafe.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'customer'
  },
  {
    name: 'Pasindu Fernando',
    email: 'pasindu@cafe.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'customer'
  },
  {
    name: 'Kavindu Perera',
    email: 'kavindu@cafe.com',
    password: bcrypt.hashSync('123456', 10),
    role: 'customer'
  }
];

export default users;