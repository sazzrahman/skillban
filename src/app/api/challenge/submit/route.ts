import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { submitChallengeSchema } from "@/lib/validators";

// Mock submission evaluation for MVP scaffold
// TODO: Integrate with Piston API for actual code execution
async function evaluateCode(code: string, _testCases: unknown): Promise<{
  passed: boolean;
  testResults: Array<{
    id: string;
    description: string;
    passed: boolean;
    output?: string;
    error?: string;
  }>;
}> {
  // Stub implementation - always passes for MVP scaffold
  // Real implementation will:
  // 1. Send code to Piston API for sandboxed execution
  // 2. Run test cases against the output
  // 3. Return detailed results

  return {
    passed: code.includes("greeting") && code.includes("Hello, World!"),
    testResults: [
      {
        id: "test-1",
        description: "Variable 'greeting' should exist",
        passed: code.includes("greeting"),
        output: code.includes("greeting") ? "Variable found" : "Variable not found",
      },
      {
        id: "test-2",
        description: "Variable 'greeting' should equal 'Hello, World!'",
        passed: code.includes("Hello, World!"),
        output: code.includes("Hello, World!") ? "Correct value" : "Incorrect value",
      },
    ],
  };
}

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        {
          error: {
            code: "UNAUTHORIZED",
            message: "You must be logged in to submit a challenge",
            details: {},
          },
        },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validationResult = submitChallengeSchema.safeParse(body);

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

    const { challengeId, code, timeTaken, hintUsed } = validationResult.data;

    // TODO: Fetch actual challenge from database to get test cases
    // const challenge = await prisma.challenge.findUnique({
    //   where: { id: challengeId },
    //   include: { concept: true },
    // });

    // Mock test cases for MVP scaffold
    const mockTestCases = [
      { id: "test-1", description: "Variable exists", expected: "string" },
      { id: "test-2", description: "Correct value", expected: "Hello, World!" },
    ];

    const evaluation = await evaluateCode(code, mockTestCases);

    // TODO: Store attempt in database
    // await prisma.userChallengeAttempt.create({
    //   data: {
    //     userId: session.user.id,
    //     challengeId,
    //     code,
    //     passed: evaluation.passed,
    //     testResults: evaluation.testResults,
    //     timeTaken: timeTaken || null,
    //     hintUsed: hintUsed || false,
    //   },
    // });

    // TODO: Update user's concept skill score based on result
    // await updateConceptSkill(session.user.id, challenge.conceptId, evaluation.passed);

    return NextResponse.json({
      passed: evaluation.passed,
      testResults: evaluation.testResults,
      message: evaluation.passed
        ? "Great job! You completed this challenge."
        : "Not quite right. Check the test results and try again.",
    });
  } catch (error) {
    console.error("Challenge submission error:", error);
    return NextResponse.json(
      {
        error: {
          code: "SUBMISSION_FAILED",
          message: "Failed to evaluate your submission. Please try again.",
          details: {},
        },
      },
      { status: 500 }
    );
  }
}
