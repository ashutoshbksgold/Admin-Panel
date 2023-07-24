import { ProjectStatus } from "src/common/enums/project.enum";
export type projectType = {
    _id: string;
    title: string;
    type:string;
    description: string;
    status: ProjectStatus;

  };
  