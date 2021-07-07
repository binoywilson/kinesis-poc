import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppConfigService } from './app-config.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JoinChannelComponent } from './join-channel/join-channel.component';
import { TestChannelComponent } from './test-channel/test-channel.component';
import { AppRoutingModule } from './app.routes';
import { TestTelegramComponent } from './test-telegram/test-telegram.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Add this function
export function initConfig(config: AppConfigService) {
  return () => config.loadCofig();
}

@NgModule({
  declarations: [AppComponent, JoinChannelComponent, TestChannelComponent, TestTelegramComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
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
