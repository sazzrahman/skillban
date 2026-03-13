import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        {
          error: {
            code: "UNAUTHORIZED",
            message: "You must be logged in to view your skill map",
            details: {},
          },
        },
        { status: 401 }
      );
    }

    // Get all concepts with user's skill data
    const skillMap = await prisma.concept.findMany({
      where: {
        language: {
          slug: "javascript", // MVP: JavaScript only
        },
      },
      include: {
        language: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        userConceptSkills: {
          where: {
            userId: session.user.id,
          },
          select: {
            score: true,
            attempts: true,
            lastAttempt: true,
            status: true,
          },
        },
      },
      orderBy: {
        difficulty: "asc",
      },
    });

    // Transform the data for easier frontend consumption
    const transformedSkillMap = skillMap.map((concept) => {
      const userSkill = concept.userConceptSkills[0];
      return {
        id: concept.id,
        name: concept.name,
        slug: concept.slug,
        description: concept.description,
        difficulty: concept.difficulty,
        prerequisites: concept.prerequisites,
        language: concept.language,
        skill: userSkill
          ? {
              score: userSkill.score,
              attempts: userSkill.attempts,
              lastAttempt: userSkill.lastAttempt,
              status: userSkill.status,
            }
          : {
              score: 0,
              attempts: 0,
              lastAttempt: null,
              status: "unseen",
            },
      };
    });

    // Calculate summary stats
    const totalConcepts = transformedSkillMap.length;
    const proficientCount = transformedSkillMap.filter(
      (c) => c.skill.status === "proficient"
    ).length;
    const inProgressCount = transformedSkillMap.filter(
      (c) => c.skill.status === "in_progress"
    ).length;
    const strugglingCount = transformedSkillMap.filter(
      (c) => c.skill.status === "struggling"
    ).length;

    return NextResponse.json({
      skillMap: transformedSkillMap,
      summary: {
        totalConcepts,
        proficientCount,
        inProgressCount,
        strugglingCount,
        overallProgress:
          totalConcepts > 0
            ? Math.round((proficientCount / totalConcepts) * 100)
            : 0,
      },
    });
  } catch (error) {
    console.error("Skill map error:", error);
    return NextResponse.json(
      {
        error: {
          code: "SKILL_MAP_FAILED",
          message: "Failed to retrieve skill map",
          details: {},
        },
      },
      { status: 500 }
    );
  }
}
