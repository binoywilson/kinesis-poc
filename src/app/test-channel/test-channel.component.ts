import { AfterViewInit, Component } from '@angular/core';
import { KinesisVideo } from 'aws-sdk';

import { AppConfigService } from '../app-config.service';

import { registerEvents } from '../kinesis-helper/event-hanlders';
import { configureLogging } from '../kinesis-helper/logger.helper';
import { IFormValues } from '../models';

@Component({
  selector: 'app-test-channel',
  templateUrl: './test-channel.component.html',
  styleUrls: ['./test-channel.component.scss'],
})
export class TestChannelComponent implements AfterViewInit {
  formValues: IFormValues;

  constructor(private appConfig: AppConfigService) {
    this.formValues = {
      region: this.appConfig.config.aws.region,
      accessKeyId: this.appConfig.config.aws.accessKeyId,
      secretAccessKey: this.appConfig.config.aws.secretAccessKey,
      sessionToken: this.appConfig.config.aws.sessionToken,
      endpoint: this.appConfig.config.aws.endpoint,
      channelName: this.appConfig.config.aws.channelName,
      clientId: this.appConfig.randomClientId,
      video: true,
      resolution: 'widescreen',
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

  async createSignalingChannel() {
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
        ChannelName: this.formValues.channelName,
      })
      .promise();

    // Get signaling channel ARN
    const describeSignalingChannelResponse = await kinesisVideoClient
      .describeSignalingChannel({
        ChannelName: this.formValues.channelName,
      })
      .promise();
    const channelARN = describeSignalingChannelResponse.ChannelInfo.ChannelARN;
    console.log('[CREATE_SIGNALING_CHANNEL] Channel ARN: ', channelARN);
  }

  ngAfterViewInit() {
    // The page is all setup. Hide the loading spinner and show the page content.
    document.querySelector('.loader').classList.add('d-none');
    document.querySelector('#main').classList.remove('d-none');
    console.log('Page loaded');

    registerEvents(this.formValues);
  }
}
