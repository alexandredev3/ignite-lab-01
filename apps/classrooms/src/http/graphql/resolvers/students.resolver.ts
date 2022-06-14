import { UseGuards } from '@nestjs/common';
import { Resolver, Query, ResolveField, Parent } from "@nestjs/graphql";

import { AuthorizationGuard } from 'http/auth/authorization.guard';

import { AuthUser, CurrentUser } from 'http/auth/current-user';

import { Student } from "../models/student";

import { StudentsService } from 'services/students.service';
import { EnrollmentsService } from 'services/enrollments.service';

@Resolver(() => Student)
export class StudentsResolver {
  constructor (
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService
  ) {}

  // @Query(() => Student)
  // @UseGuards(AuthorizationGuard)
  // me(@CurrentUser() user: AuthUser) {
  //   const { sub } = user;

  //   return this.studentsService.getStudentByAuthUserId(sub);
  // }

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  students() {
    return this.studentsService.listAllStudents();
  }

  @ResolveField()
  enrollments(
    @Parent() student: Student
  ) {
    const { id } = student;

    return this.enrollmentsService.listEnrollmentsByStudentId(id);
  }
}