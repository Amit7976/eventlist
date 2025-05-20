import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/userModal";
import { connectToDatabase } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    console.log("➡️ Connecting to DB...");
    await connectToDatabase();

    const body = await req.json();
    const { title, url, image, date, location, email, price } = body;

    if (!title || !url || !image || !date || !location || !email || !price) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newUser = new User({
      title,
      url,
      image,
      date,
      location,
      email,
      price,
    });

    await newUser.save();

    return NextResponse.json({ success: true, user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Error saving user:", error);
    return NextResponse.json(
      { success: false, message: "Server error", error: String(error) },
      { status: 500 }
    );
  }
}
