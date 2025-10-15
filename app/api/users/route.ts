import { NextResponse } from 'next/server';
import { MOCK_USERS_DATA } from '@/constants';
import { User } from '@/types';

export async function GET() {
  // In a real application, you would fetch this data from a database.
  const users: User[] = MOCK_USERS_DATA;

  // Simulate a network delay to mimic a real-world API response time.
  await new Promise(resolve => setTimeout(resolve, 500));

  return NextResponse.json(users);
}
