import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "همه فیلدها الزامی هستند" },
        { status: 400 }
      );
    }


    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });


    if (existingUser) {
      return NextResponse.json(
        { message: "این ایمیل قبلا ثبت شده" },
        { status: 400 }
      );
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });


    return NextResponse.json(
      {
        message: "ثبت نام موفق بود",
        user: {
          id: user.id,
          email: user.email,
        },
      },
      { status: 201 }
    );


  } catch (error) {

    return NextResponse.json(
      { message: "خطای سرور" },
      { status: 500 }
    );

  }
}