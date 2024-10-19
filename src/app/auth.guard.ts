import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const username = localStorage.getItem('username');
  const router = inject(Router); // Using inject to get the Router instance

  if (username) {
    return true; // User is authenticated, allow access
  } else {
    router.navigate(['/login']); // Redirect to login if not authenticated
    return false; // Block access
  }
};
