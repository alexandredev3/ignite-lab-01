import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { AuthorizationGuard } from 'http/auth/authorization.guard';

import { Enrollment } from '../models/enrollment';
import { Course } from '../models/course';

import { EnrollmentsService } from 'services/enrollments.service';
import { CoursesService } from 'services/courses.service';
import { StudentsService } from 'services/students.service';
import { Student } from '../models/student';

@Resolver(() => Enrollment)
export class EnrollmentsResolver {
  constructor(
    private enrollmentsService: EnrollmentsService,
    private coursesService: CoursesService,
    private studentsService: StudentsService
  ) {}

  @Query(() => [Enrollment])
  @UseGuards(AuthorizationGuard)
  enrollments() {
    return this.enrollmentsService.listAllEnrollments();
  }

  @ResolveField()
  course(@Parent() enrollment: Enrollment) {
    const { courseId } = enrollment;

    return this.coursesService.getCourseById(courseId);
  }

  @ResolveField()
  student(@Parent() enrollment: Enrollment) {
    const { studentId } = enrollment;

    return this.studentsService.getStudentById(studentId);
  }
}
