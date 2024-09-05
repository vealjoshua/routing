import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { UsersService } from '../users.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterOutlet,
  RouterStateSnapshot,
} from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent {
  userId = input.required<string>();
  message = input.required<string>();
  // userName = '';
  userName = input.required<string>();
  private usersService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  // ngOnInit() {
  //   this.activatedRoute.data.subscribe({
  //     next: (data) => console.log(data),
  //   });
  // }
  // ngOnInit(): void {
  //   // console.log('INPUT DATA', this.message());
  //   // console.log(this.activatedRoute.snapshot);
  //   // console.log(this.activatedRoute.snapshot.paramMap.get('userId'));
  //   // console.log(this.activatedRoute);
  //   const subscription = this.activatedRoute.paramMap.subscribe({
  //     next: (paramMap) => {
  //       this.userName =
  //         this.usersService.users.find((u) => u.id === paramMap.get('userId'))
  //           ?.name || '';
  //     },
  //   });

  //   this.destroyRef.onDestroy(() => subscription.unsubscribe());
  // }

  // userName = computed(
  //   () => this.usersService.users.find((u) => u.id === this.userId())?.name
  // );
}

export const resolveUserName: ResolveFn<string> = (
  activateRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const usersService = inject(UsersService);
  const userName =
    usersService.users.find(
      (u) => u.id === activateRoute.paramMap.get('userId')
    )?.name || '';
  return userName;
};

export const resolveTitle: ResolveFn<string> = (
  activateRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  return resolveUserName(activateRoute, routerState) + "'s Tasks";
};
