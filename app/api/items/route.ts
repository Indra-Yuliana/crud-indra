import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET (Read all)
export async function GET() {
  const items = await prisma.item.findMany({ orderBy: { id: 'desc' } })
  return NextResponse.json(items)
}

// POST (Create)
export async function POST(req: Request) {
  const { name } = await req.json()
  const newItem = await prisma.item.create({ data: { name } })
  return NextResponse.json(newItem)
}
