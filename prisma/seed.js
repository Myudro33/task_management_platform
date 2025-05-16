import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  // Seed roles
  const departments = await prisma.departments.createMany({
    data: [
      { id: 1, name: 'HR' },
      { id: 2, name: 'IT' },
      { id: 3, name: 'Finance' },
      { id: 4, name: 'Marketing' },
      { id: 5, name: 'Design' },
    ],
  });
  const statuses = await prisma.statuses.createMany({
    data: [
      { id: 1, name: 'pending' },
      { id: 2, name: 'in_progress' },
      { id: 3, name: 'done' },
    ],
  });
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
        email: 'qanashvilinika7@gmail.com',
        password: bcrypt.hashSync('nika123', 10),
        roleId: 1,
        departmentId: 1,
      },
      {
        id: 2,
        name: 'saba',
        email: 'saba@gmail.com',
        password: bcrypt.hashSync('nika123', 10),
        roleId: 2,
        departmentId: 2,
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
