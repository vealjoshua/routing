import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import {
  resolveUserName,
  UserTasksComponent,
} from './users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { routes as userRoutes } from './users/users.routes';
import { inject } from '@angular/core';

const dummyCanMatch: CanMatchFn = (route, segments) => {
  const shouldGetAccess = Math.random();
  if (shouldGetAccess < 1) {
    return true;
  }

  const router = inject(Router);
  return new RedirectCommand(router.parseUrl('/unauthorized'));
};

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
    title: 'No task selected',
    // redirectTo: '/users/u1',
    // pathMatch: 'full',
  },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    children: userRoutes,
    canMatch: [dummyCanMatch],
    data: {
      message: 'Hello!',
    },
    resolve: {
      userName: resolveUserName,
    },
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
