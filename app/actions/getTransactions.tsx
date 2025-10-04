'use server';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { Transaction } from '@/types/Transaction';

async function getTransactions(): Promise<{
  transactions?: Transaction[];
  error?: string;
}> {
  const { userId } = auth();

  if (!userId) {
    return { error: 'User not found' };
  }

  try {
    const transactionsRaw = await db.transaction.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Serialize dates to strings for transfer to client components
    const transactions = transactionsRaw.map((t) => ({
      id: t.id,
      text: t.text,
      amount: t.amount,
      userId: t.userId,
      category: (t as any).category ?? null,
      createdAt: t.createdAt.toISOString(),
    }));

    return { transactions };
  } catch (error) {
    return { error: 'Database error' };
  }
}

export default getTransactions;
