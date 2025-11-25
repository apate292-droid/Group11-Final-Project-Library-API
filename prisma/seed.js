import bcrypt from 'bcrypt';
import { prisma } from '../src/config/db.js';
async function main() {
  console.log("Seeding database...");

  // Create admin user
  const adminPassword = await bcrypt.hash("Admin123!", 10);
  const admin = await prisma.user.create({
    data: {
      username: "admin",
      password: adminPassword,
      isAdmin: true,
    },
  });

  // Create regular user
  const userPassword = await bcrypt.hash("User123!", 10);
  const user = await prisma.user.create({
    data: {
      username: "testuser",
      password: userPassword,
      isAdmin: false,
    },
  });

  // Create authors
  const rowling = await prisma.author.create({
    data: {
      name: "J.K. Rowling",
    },
  });

  const orwell = await prisma.author.create({
    data: {
      name: "George Orwell",
    },
  });

  // Create books
  const hp = await prisma.book.create({
    data: {
      title: "Harry Potter and the Sorcerer's Stone",
      authorId: rowling.id,
    },
  });

  const nineteenEightyFour = await prisma.book.create({
    data: {
      title: "1984",
      authorId: orwell.id,
    },
  });

  // Create reviews
  await prisma.review.create({
    data: {
      rating: 5,
      comment: "Loved it!",
      bookId: hp.id,
      userId: user.id,
    },
  });

  await prisma.review.create({
    data: {
      rating: 4,
      comment: "Dark but powerful.",
      bookId: nineteenEightyFour.id,
      userId: admin.id,
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
