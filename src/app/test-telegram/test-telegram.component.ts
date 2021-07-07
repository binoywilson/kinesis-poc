import { Component, OnInit } from '@angular/core';

import { AppConfigService } from '../app-config.service';

@Component({
  selector: 'app-test-telegram',
  templateUrl: './test-telegram.component.html',
  styleUrls: ['./test-telegram.component.scss'],
})
export class TestTelegramComponent implements OnInit {
  constructor(private appConfig: AppConfigService) {}

  ngOnInit(): void {}
}
