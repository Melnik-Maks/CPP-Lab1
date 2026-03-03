import { Subject } from './subject.model';

export class TeacherSubjects {
  teacherName: string;
  subjects: Subject[] = [];

  constructor(name: string) {
    this.teacherName = name;
  }

  add(subject: Subject) {
    this.subjects.push(subject);
  }

  get count(): number {
    return this.subjects.length;
  }
}