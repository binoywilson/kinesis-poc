import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppConfigService } from './app-config.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JoinChannelComponent } from './join-channel/join-channel.component';
import { TestChannelComponent } from './test-channel/test-channel.component';
import { AppRoutingModule } from './app.routes';

// Add this function
export function initConfig(config: AppConfigService) {
  return () => config.loadCofig();
}

@NgModule({
  declarations: [AppComponent, JoinChannelComponent, TestChannelComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [AppConfigService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
