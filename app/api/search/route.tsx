import {prisma} from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request:Request) {
      const { searchParams } = new URL(request.url);

  const search = searchParams.get("search");


    const product=await prisma.product.findMany({
        where :{
            name:{
                contains:search ?? ""
            },
        },
    });
    return NextResponse.json(product);
}