import { Injectable } from '@nestjs/common';

import { PrismaService } from 'database/prisma/prisma.service';
import slugify from 'slugify';

interface CreateCourseParams {
  title: string;
  slug?: string;
}

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  listAllCourses() {
    return this.prisma.course.findMany();
  }

  getCourseBySlug(slug: string) {
    return this.prisma.course.findUnique({
      where: {
        slug,
      },
    });
  }

  getCourseById(id: string) {
    return this.prisma.course.findUnique({
      where: {
        id,
      },
    });
  }

  async createOneCourse({
    title,
    slug = slugify(title, {
      lower: true,
    })
  }: CreateCourseParams) {
    const courseSlugAlreadyExists = await this.prisma.course.findUnique({
      where: {
        slug,
      },
    });

    if (courseSlugAlreadyExists) {
      throw new Error('Course already exists');
    }

    return this.prisma.course.create({
      data: {
        title,
        slug,
      },
    });
  }
}
