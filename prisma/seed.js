import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  // Seed roles
  const roles = await prisma.roles.createMany({
    data: [
      { id: 1, name: 'admin' },
      { id: 2, name: 'employee' },
    ],
  });
  const users = await prisma.users.createMany({
    data: [
      {
        id: 1,
        name: 'nika',
        email: 'nika@gmail.com',
        password: bcrypt.hashSync('nika123', 10),
        roleId: 1,
      },
      {
        id: 2,
        name: 'saba',
        email: 'saba@gmail.com',
        password: bcrypt.hashSync('nika123', 10),
        roleId: 2,
      },
    ],
  });
  console.log('successfully seeded roles and users');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
