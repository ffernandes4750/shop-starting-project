import mongoose, { Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import 'dotenv/config';
import { UserSchema } from '../src/users/schemas/user.schema';

async function run() {
  const uri = process.env.MONGO_URI!;
  if (!uri) {
    console.error('MONGO_URI não definido no .env');
    process.exit(1);
  }

  await mongoose.connect(uri);

  // nome do modelo 'User' e força coleção 'users'
  const UserModel = mongoose.model('User', UserSchema, 'users') as Model<any>;

  const now = new Date();
  const adminEmail = 'admin@elegant.dev';
  const userEmail = 'user@elegant.dev';

  const adminHash = await bcrypt.hash('Admin123!', 12);
  const userHash = await bcrypt.hash('User123!', 12);

  await UserModel.updateOne(
    { email: adminEmail },
    {
      $set: {
        email: adminEmail,
        name: 'Site Admin',
        role: 'admin',
        passwordHash: adminHash,
        status: 'active',
        updatedAt: now,
      },
      $setOnInsert: { createdAt: now },
    },
    { upsert: true },
  );

  await UserModel.updateOne(
    { email: userEmail },
    {
      $set: {
        email: userEmail,
        name: 'Regular User',
        role: 'user',
        passwordHash: userHash,
        status: 'active',
        updatedAt: now,
      },
      $setOnInsert: { createdAt: now },
    },
    { upsert: true },
  );

  console.log('✅ Seed concluído: admin e user prontos.');
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
