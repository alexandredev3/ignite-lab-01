import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";

import { CoursesService } from "services/courses.service";
import { EnrollmentsService } from "services/enrollments.service";
import { StudentsService } from "services/students.service";

export interface Product {
  id: string
  title: string
  slug: string
}

export interface Customer {
  authUserId: string
  product: Product
}

export interface PurchaseCreatedPayload {
  customer: Customer;
}

@Controller()
export class PurchaseController {
  constructor(
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private enrollmentsService: EnrollmentsService
  ) {}

  @EventPattern('purchases.new-purchase')
  async purchaseCreated(
    @Payload('value') payload: PurchaseCreatedPayload
  ) {
    const { customer } = payload;

    let student = await this.studentsService.getStudentByAuthUserId(
      customer.authUserId
    );

    if (!student) {
      student = await this.studentsService.createStudent(customer.authUserId);
    }

    let course = await this.coursesService.getCourseBySlug(customer.product.slug);

    if (!course) {
      course = await this.coursesService.createOneCourse({
        title: customer.product.title,
      });
    }

    await this.enrollmentsService.createEnrollment({
      courseId: course.id,
      studentId: student.id
    })
  }
}