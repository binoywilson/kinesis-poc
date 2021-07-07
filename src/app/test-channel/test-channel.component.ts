import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { KinesisVideo } from 'aws-sdk';

import { AppConfigService } from '../app-config.service';

import { registerEvents } from '../kinesis-helper/event-hanlders';
import { configureLogging } from '../kinesis-helper/logger.helper';
import { ModalService } from '../modal.service';
import { IFormValues, ScreenResolution } from '../models';

@Component({
  selector: 'app-test-channel',
  templateUrl: './test-channel.component.html',
  styleUrls: ['./test-channel.component.scss'],
})
export class TestChannelComponent implements AfterViewInit {
  formValues: IFormValues;

  createChannelLoading = false;

  constructor(
    private appConfig: AppConfigService,
    private router: Router,
    private modalService: ModalService
  ) {
    this.formValues = {
      region: this.appConfig.config.aws.region,
      accessKeyId: this.appConfig.config.aws.accessKeyId,
      secretAccessKey: this.appConfig.config.aws.secretAccessKey,
      sessionToken: this.appConfig.config.aws.sessionToken,
      endpoint: this.appConfig.config.aws.endpoint,
      channelName: this.appConfig.config.aws.channelName,
      clientId: this.appConfig.randomClientId,
      video: true,
      resolution: ScreenResolution.widescreen,
      natTraversal: 'STUN',
      useTrickleICE: true,
    };

    window.addEventListener('error', function (event) {
      console.error(event.message);
      event.preventDefault();
    });

    window.addEventListener('unhandledrejection', function (event) {
      console.error(event.reason.toString());
      event.preventDefault();
    });

    configureLogging();
  }

  startNewChannel(startNewChannelTemplate) {
    const modalRef = this.modalService.open(startNewChannelTemplate, {
      windowClass: 'modal-lmd',
      centered: true,
      backdrop: 'static',
    });

    modalRef.result.then(res => {
      if (res) {
        this.createSignalingChannel(res);
      }
    });
  }

  async createSignalingChannel(channelName: string) {
    try {
      if (this.createChannelLoading) {
        return;
      }

      this.createChannelLoading = true;

      // Create KVS client
      const kinesisVideoClient = new KinesisVideo({
        region: this.formValues.region,
        accessKeyId: this.formValues.accessKeyId,
        secretAccessKey: this.formValues.secretAccessKey,
        sessionToken: this.formValues.sessionToken,
        endpoint: this.formValues.endpoint,
      });

      // Get signaling channel ARN
      await kinesisVideoClient
        .createSignalingChannel({
          ChannelName: channelName,
        })
        .promise();

      this.router.navigate(['/join'], {
        queryParams: {
          channel: channelName,
        },
      });
    } catch {
      this.createChannelLoading = false;
    }
  }

  ngAfterViewInit() {
    // The page is all setup. Hide the loading spinner and show the page content.
    document.querySelector('.loader').classList.add('d-none');
    document.querySelector('#main').classList.remove('d-none');
    console.log('Page loaded');

    registerEvents(this.formValues);
  }
}
