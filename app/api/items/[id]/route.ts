import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// UPDATE
export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  const { name } = await req.json()
  const updated = await prisma.item.update({ where: { id: Number(id) }, data: { name } })
  return NextResponse.json(updated)
}

// DELETE
export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  await prisma.item.delete({ where: { id: Number(id) } })
  return NextResponse.json({ message: 'Deleted' })
}
