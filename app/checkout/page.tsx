import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import CheckoutClient from "./CheckoutClient"

export default async function CheckoutPage() {

  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return <CheckoutClient />
}