import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { About } from './components/about/about';
import { Contact } from './components/contact/contact';
import { Products } from './products/products';
import { ProductDetail } from './product-detail/product-detail';
import { UserRegistration } from './components/user-registration/user-registration';
import { UserLogin } from './components/user-login/user-login';
import { NotFound } from './components/not-found/not-found';

export const routes: Routes = [
   { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
   { path: 'home', component: Home },
   { path: 'about', component: About },
   { path: 'contact', component: Contact },
   { path: 'products', component: Products },
   { path: 'products/:id', component: ProductDetail }, // Route with parameter
   { path: 'register', component: UserRegistration }, // User registration route
   { path: 'login', component: UserLogin }, // User login route
   { path: '**', component: NotFound } // Wildcard route for 404 - MUST be last
];

/* 
ANSWERS TO QUESTIONS:

1. Is the order of routes important? YES!
   - Angular uses first-match wins strategy
   - Routes are evaluated from top to bottom
   - More specific routes should come before general ones
   - Wildcard route (**) must be last

2. First-match wins strategy:
   - Angular stops at the first route that matches
   - If wildcard (**) was first, it would catch everything
   - That's why specific routes like 'products/:id' come before general routes
*/