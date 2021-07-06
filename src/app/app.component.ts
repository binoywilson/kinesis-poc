import { Component } from '@angular/core';

import { SignalingClient } from 'amazon-kinesis-video-streams-webrtc';
import { AppConfigService } from './app-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'aws-kinesis';

  constructor(private appConfig: AppConfigService) {}

  async setupKinesis() {
    // DescribeSignalingChannel API can also be used to get the ARN from a channel name.
    const channelARN = this.appConfig.config.aws.channelARN;

    // AWS Credentials
    const accessKeyId = this.appConfig.config.aws.accessKeyId;
    const secretAccessKey = this.appConfig.config.aws.secretAccessKey;

    // <video> HTML elements to use to display the local webcam stream and remote stream from the master
    const localView = document.getElementsByTagName('video')[0];
    const remoteView = document.getElementsByTagName('video')[1];

    const region = this.appConfig.config.aws.region;
    const clientId = this.appConfig.randomClientId;

    const sessionToken = '';
    const endpoint = '';


  }
}
