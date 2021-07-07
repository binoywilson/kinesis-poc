import { Route, RouterModule } from '@angular/router';
import { JoinChannelComponent } from './join-channel/join-channel.component';
import { TestChannelComponent } from './test-channel/test-channel.component';
import { TestTelegramComponent } from './test-telegram/test-telegram.component';

const AppRoutes: Route[] = [
  {
    path: 'join',
    component: JoinChannelComponent,
  },
  {
    path: 'test-channel',
    component: TestChannelComponent,
  },
  {
    path: 'test-telegram',
    component: TestTelegramComponent,
  },
  {
    path: '',
    redirectTo: 'test-channel',
    pathMatch: 'full',
  },
];

export const AppRoutingModule = RouterModule.forRoot(AppRoutes);
