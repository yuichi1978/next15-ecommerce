import { hashPassword } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🧹 Cleaning up database...");
  
  // 外部キー制約の順序に従って削除
  // 1. 注文関連テーブル
  await prisma.orderItem.deleteMany();
  console.log("✅ OrderItems deleted");
  
  await prisma.order.deleteMany();
  console.log("✅ Orders deleted");
  
  // 2. カート関連テーブル
  await prisma.cartItem.deleteMany();
  console.log("✅ CartItems deleted");
  
  await prisma.cart.deleteMany();
  console.log("✅ Carts deleted");
  
  // 3. 商品とカテゴリ
  await prisma.product.deleteMany();
  console.log("✅ Products deleted");
  
  await prisma.category.deleteMany();
  console.log("✅ Categories deleted");
  
  // 4. ユーザー（最後に削除）
  await prisma.user.deleteMany();
  console.log("✅ Users deleted");

  console.log("🌱 Starting to seed database...");

  // カテゴリの作成
  const electronics = await prisma.category.create({
    data: {
      name: "Electronics",
      slug: "electronics",
    },
  });

  const clothing = await prisma.category.create({
    data: {
      name: "Clothing",
      slug: "clothing",
    },
  });

  const home = await prisma.category.create({
    data: {
      name: "Home",
      slug: "home",
    },
  });

  console.log("✅ Categories created");

  // 商品の作成（idを削除してPrismaに自動生成させる）
  const productsData = [
    {
      name: "Wireless Headphones",
      description:
        "Premium noise-cancelling wireless headphones with long battery life.",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      categoryId: electronics.id,
      slug: "wireless-headphones",
      inventory: 15,
    },
    {
      name: "Smart Watch",
      description:
        "Fitness tracker with heart rate monitoring and sleep analysis.",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      categoryId: electronics.id,
      slug: "smart-watch",
      inventory: 10,
    },
    {
      name: "Running Shoes",
      description: "Lightweight running shoes with responsive cushioning.",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      categoryId: clothing.id,
      slug: "running-shoes",
      inventory: 3,
    },
    {
      name: "Ceramic Mug",
      description: "Handcrafted ceramic mug with minimalist design.",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d",
      categoryId: home.id,
      slug: "ceramic-mug",
      inventory: 0,
    },
    {
      name: "Leather Backpack",
      description: "Durable leather backpack with multiple compartments.",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7",
      categoryId: clothing.id,
      slug: "leather-backpack",
      inventory: 1,
    },
  ];

  for (const product of productsData) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log("✅ Products created");

  // ユーザーの作成（idを削除してPrismaに自動生成させる）
  const usersData = [
    {
      email: "admin@example.com",
      password: "password123",
      name: "Admin User",
      role: "admin" as const,
    },
    {
      email: "user@example.com",
      password: "password456",
      name: "Regular User",
      role: "user" as const,
    },
  ];

  for (const user of usersData) {
    const hashedPassword = await hashPassword(user.password);
    await prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });
  }

  console.log("✅ Users created");
  console.log("🎉 Database seeding completed successfully!");
}

main()
  .then(async () => {
    console.log("Seeding complete!");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Error during seeding:", e);
    await prisma.$disconnect();
    process.exit(1);
  });