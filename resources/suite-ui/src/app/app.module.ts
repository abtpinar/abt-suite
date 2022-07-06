import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MainModule } from './main/main.module';
import { CommonModule } from './common/common.module';

import { AppComponent } from './app.component';

import { DashboardComponent, MainPageComponent, NotFoundPageComponent } from './main/components';
import { LockScreenPageComponent } from './auth/components/lock-screen-page/lock-screen-page.component';
import { LoginPageComponent } from './auth/components/login-page/login-page.component';

import { FarmersModule, ROUTES as farmersRoute } from './farmers/farmers.module';
import { ProductsModule, ROUTES as productsRoute } from './products/products.module';
import { CLsModule, ROUTES as clsRoute } from './cls/cls.module';
import { ContractsModule, ROUTES as contractsRoute } from './contracts/contracts.module';
import { FarmsModule, ROUTES as farmsRoute } from './farms/farms.module';
import { UsersModule, ROUTES as usersRoutes } from './users/users.module';
import { GeneralParametersModule, ROUTES as generalParametersRoutes } from './parameters/general/general-parameters.module';
import { CommunicationParametersModule, ROUTES as communicationParametersRoutes } from './parameters/communications/communications.module';
import { EmployeesModule, ROUTES as employeesRoutes } from './employees/employees.module';
import { FarmersPageComponent } from './farmers/containers/farmers-page/farmers-page.component';
// tslint:disable-next-line:max-line-length
import { CommunicationContractsModule, ROUTES as communicationContractsRoutes } from './communication-contracts/communication-contracts.module';
import { CoverParametersModule, ROUTES as coverParametersRoutes } from './parameters/cover/cover-parameters.module';

import { AuthModule } from './auth/auth.module';
import { I18nModule } from './i18n/i18n.module';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TokenRefreshInterceptor } from './common/services/token-refresh-interceptor.service';
import { JwtModule } from '@auth0/angular-jwt';
import { UserAuthenticatedGuard } from './auth/guards/user-authenticated.guard';
import { AppRootStoreModule } from './@rootStore/app-root-store.module';
import { NgxPermissionsGuard } from 'ngx-permissions';

/**
 * Function for JWT library be able to get the access token from the storage.
 *
 * @returns {string | null} The value of the 'access_token' key in the local storage of the browser.
 */
export function tokenGetter() {
  return localStorage.getItem('access_token');
}

const defaultPermissions = {
  only: ['ADMINISTRATOR']
};

const allowedPermissionsByModule = {
  CL: {
    only: ['CL_IMPORTER', 'CL_AUDIT', 'CL_TAX', 'CL_PAYMENT']
  },
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,

    I18nModule,
    MainModule,
    AuthModule,
    FarmersModule,
    ProductsModule,
    CLsModule,
    ContractsModule,
    FarmersModule,
    FarmsModule,
    UsersModule,
    GeneralParametersModule,
    CommunicationParametersModule,
    EmployeesModule,
    CommunicationContractsModule,
    CoverParametersModule,

    RouterModule.forRoot([
      {


        path: '',
        component: DashboardComponent,
        children: [
          {
            path: '',
            component: FarmersPageComponent,/*MainPageComponent,*/
            canActivate: [UserAuthenticatedGuard, NgxPermissionsGuard],
            data: {
              permissions: {
                only: [
                  ...defaultPermissions.only, ...allowedPermissionsByModule.CL.only
                ],
                redirectTo: '/'
              }
            }
          },
          {
            path: 'cls',
            children: clsRoute,
            canActivate: [UserAuthenticatedGuard, NgxPermissionsGuard],
            data: {
              permissions: {
                only: [
                  ...defaultPermissions.only, ...allowedPermissionsByModule.CL.only
                ],
                redirectTo: '/'
              }
            }
          },
          {
            path: 'farmers',
            children: farmersRoute,
            canActivate: [UserAuthenticatedGuard, NgxPermissionsGuard],
            data: {
              permissions: {
                only: [
                  'ADMINISTRATOR', 'CONTRACT_CENTER'
                ],
                redirectTo: '/'
              }
            }
          },
          {
            path: 'products',
            children: productsRoute,
            canActivate: [UserAuthenticatedGuard, NgxPermissionsGuard],
            data: {
              permissions: {
                only: [
                  'ADMINISTRATOR', 'CONTRACT_CENTER'
                ],
                redirectTo: '/'
              }
            }
          },
          {
            path: 'contracts',
            children: contractsRoute,
            canActivate: [UserAuthenticatedGuard, NgxPermissionsGuard],
            data: {
              permissions: {
                only: [
                  'ADMINISTRATOR', 'CONTRACT_CENTER'
                ],
                redirectTo: '/'
              }
            }
          },
          {
            path: 'farms',
            children: farmsRoute,
            canActivate: [UserAuthenticatedGuard, NgxPermissionsGuard],
            data: {
              permissions: {
                only: [
                  'ADMINISTRATOR', 'CONTRACT_CENTER'
                ],
                redirectTo: '/'
              }
            }
          },
          {
            path: 'users',
            children: usersRoutes,
            canActivate: [UserAuthenticatedGuard, NgxPermissionsGuard],
            data: {
              permissions: {
                only: [
                  'ADMINISTRATOR'
                ],
                redirectTo: '/'
              }
            }
          },
          {
            path: 'control-panel',
            children: [
              ...generalParametersRoutes,
              {
                path: 'communications',
                children: communicationParametersRoutes,
                canActivate: [UserAuthenticatedGuard, NgxPermissionsGuard],
                data: {
                  permissions: {
                    only: [
                      'ADMINISTRATOR', 'COMMUNICATION_CENTER'
                    ],
                    redirectTo: '/'
                  }
                }
              },
              ...coverParametersRoutes
            ],
            canActivate: [UserAuthenticatedGuard, NgxPermissionsGuard],
            data: {
              permissions: {
                only: [
                  'ADMINISTRATOR', 'CONTRACT_CENTER'
                ],
                redirectTo: '/'
              }
            }
          },
          {
            path: 'employees',
            children: employeesRoutes,
            canActivate: [UserAuthenticatedGuard, NgxPermissionsGuard],
            data: {
              permissions: {
                only: [
                  'ADMINISTRATOR', 'COMMUNICATION_CENTER'
                ],
                redirectTo: '/'
              }
            }
          },
          {
            path: 'communication-contracts',
            children: communicationContractsRoutes,
            canActivate: [UserAuthenticatedGuard, NgxPermissionsGuard],
            data: {
              permissions: {
                only: [
                  'ADMINISTRATOR', 'COMMUNICATION_CENTER'
                ],
                redirectTo: '/'
              }
            }
          }
        ]
      },
      { path: 'login', component: LoginPageComponent },
      { path: 'lock-screen', component: LockScreenPageComponent },
      { path: '404', component: NotFoundPageComponent },
      { path: '**', redirectTo: '/404' }
    ]),

    HttpClientModule,

    // JWT Module
    JwtModule.forRoot({
      config: {
        authScheme: 'Bearer ',
        tokenGetter: tokenGetter,
        whitelistedDomains: environment.jwt_whitelistedDomains,
        blacklistedRoutes: environment.jwt_blacklistedRoutes
      }
    }),

    // @NGRX/STORE
    AppRootStoreModule.forRoot()
  ],
  providers: [TokenRefreshInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
