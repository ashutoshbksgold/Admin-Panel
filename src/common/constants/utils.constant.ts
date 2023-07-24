const EmptyBadRequest = {
  error: 'Bad Request',
  message: 'Oops something went wrong',
  statusCode: 400,
};

const ROOTS_TITLE = 'BKS My Gold';

function title(root: string, sublink: string) {
  return `${sublink} | ${root}`;
}

const CPageTitles = {
  root: ROOTS_TITLE,
  contacts: {
    root: title('Contacts', ROOTS_TITLE),
    list: title('Contacts List', ROOTS_TITLE),
    create: title('Create Contact', ROOTS_TITLE),
    edit: title('Edit Contact', ROOTS_TITLE),
  },
  project: {
    root: title('Project', ROOTS_TITLE),
    list: title('Project List', ROOTS_TITLE),
    create: title('Create Project', ROOTS_TITLE),
    edit: title('Edit Project', ROOTS_TITLE),
  },
  projectcredentials: {
    root: title('Project Credentials', ROOTS_TITLE),
    list: title('Project Credentials List', ROOTS_TITLE),
    create: title('Create Project Credentials', ROOTS_TITLE),
    edit: title('Edit Project Credentials', ROOTS_TITLE),
    view: title('View Project Credentials', ROOTS_TITLE),
  },
  mainDashboard: {
    root: title('Main Dashboard', ROOTS_TITLE),
    expenseDashboard: title('CRM Dashboard', ROOTS_TITLE),
  },
  blog: {
    root: title('Blogs', ROOTS_TITLE),
    create: title('Blog: New Post', ROOTS_TITLE),
  },
};

export { EmptyBadRequest, CPageTitles };

export const CPhoneRegExp = /^\+(?:[0-9]●?){6,14}[0-9]$/;
