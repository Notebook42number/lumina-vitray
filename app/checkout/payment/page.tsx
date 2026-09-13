import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import PaymentClient from "./PaymentClient"

export default async function PaymentPage() {

  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return <PaymentClient />
}