import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { nextChallengeSchema } from "@/lib/validators";

// Mock challenge for MVP scaffold
const MOCK_CHALLENGE = {
  id: "mock-challenge-001",
  conceptId: "mock-concept-001",
  concept: {
    id: "mock-concept-001",
    name: "Variables",
    slug: "variables",
    language: {
      id: "mock-language-001",
      name: "JavaScript",
      slug: "javascript",
    },
  },
  prompt:
    "Create a variable called `greeting` and assign it the string 'Hello, World!'",
  analogy:
    "Think of a variable like a labeled box where you can store something to use later.",
  scaffold: "// Write your code here\n\n",
  testCases: [
    {
      id: "test-1",
      description: "Variable 'greeting' should exist",
      expected: "string",
    },
    {
      id: "test-2",
      description: "Variable 'greeting' should equal 'Hello, World!'",
      expected: "Hello, World!",
    },
  ],
  difficulty: 1,
};

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        {
          error: {
            code: "UNAUTHORIZED",
            message: "You must be logged in to get a challenge",
            details: {},
          },
        },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const validationResult = nextChallengeSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid input data",
            details: validationResult.error.flatten().fieldErrors,
          },
        },
        { status: 400 }
      );
    }

    // TODO: Implement adaptive engine to select appropriate challenge
    // For now, return mock challenge
    // Future implementation will:
    // 1. Get user's skill map
    // 2. Identify concepts that need practice
    // 3. Use AI to generate or select appropriate challenge

    return NextResponse.json({ challenge: MOCK_CHALLENGE });
  } catch (error) {
    console.error("Challenge generation error:", error);
    return NextResponse.json(
      {
        error: {
          code: "CHALLENGE_GENERATION_FAILED",
          message:
            "Unable to generate a challenge at this time. Please try again.",
          details: {},
        },
      },
      { status: 500 }
    );
  }
}
