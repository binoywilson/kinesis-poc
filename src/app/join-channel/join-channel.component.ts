import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KinesisVideo } from 'aws-sdk';
import * as $ from 'jquery';

import { AppConfigService } from '../app-config.service';
import { onStatsReport } from '../kinesis-helper/event-hanlders';
import { IFormValues, ScreenResolution } from '../models';
import {
  startViewer as addJoinee,
  stopViewer as exitJoinee,
} from '../kinesis-helper/viewer.channel';
import {
  startMultipleViewerMasterChannel,
  stopMasterChannel,
} from '../kinesis-helper/multiple-viewer-master.channel';

@Component({
  selector: 'app-join-channel',
  templateUrl: './join-channel.component.html',
  styleUrls: ['./join-channel.component.scss'],
})
export class JoinChannelComponent implements OnInit {
  channelName: string;

  isViewer = false;
  clientId: string;

  formValues: IFormValues;

  constructor(
    private route: ActivatedRoute,
    private appConfig: AppConfigService
  ) {
    this.formValues = {
      region: this.appConfig.config.aws.region,
      accessKeyId: this.appConfig.config.aws.accessKeyId,
      secretAccessKey: this.appConfig.config.aws.secretAccessKey,
      sessionToken: this.appConfig.config.aws.sessionToken,
      endpoint: this.appConfig.config.aws.endpoint,
      video: true,
      resolution: ScreenResolution.widescreen,
      natTraversal: 'STUN',
      useTrickleICE: true,
    };
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.channelName = params['channel'];
      this.clientId = params['clientId'];
      this.isViewer = params['view'] == '1';

      if (this.channelName) {
        this.setupSignalingChannel();
      } else {
        alert('Please select a valid channel.');
      }
    });
  }

  async setupSignalingChannel() {
    this.formValues.channelName = this.channelName;
    this.formValues.clientId = this.clientId;

    // Create KVS client
    const kinesisVideoClient = new KinesisVideo({
      region: this.appConfig.config.aws.region,
      accessKeyId: this.appConfig.config.aws.accessKeyId,
      secretAccessKey: this.appConfig.config.aws.secretAccessKey,
      sessionToken: this.appConfig.config.aws.sessionToken,
      endpoint: this.appConfig.config.aws.endpoint,
    });

    // Get signaling channel ARN
    const describeSignalingChannelResponse = await kinesisVideoClient
      .describeSignalingChannel({
        ChannelName: this.formValues.channelName,
      })
      .promise();

    const channelARN = describeSignalingChannelResponse.ChannelInfo.ChannelARN;
    console.log('[MASTER] Channel ARN: ', channelARN);

    if (this.isViewer) {
      this._startJoinee();
    } else {
      this._startMaster();
    }
  }

  private _startMaster() {
    $('#master').removeClass('d-none');
    $('#hideAll').removeClass('d-none');

    const localView = $('#master .local-view')[0] as HTMLVideoElement;
    const remoteView = $('#master #remote-view')[0] as HTMLDivElement;

    startMultipleViewerMasterChannel(
      localView,
      remoteView,
      this.formValues,
      onStatsReport,
      (event) => {}
    );

    $('#stop-master-button').on('click', async () => {
      stopMasterChannel();

      $('#hideAll').addClass('d-none');
      $('#master').addClass('d-none');
    });
  }

  startJoinee() {
    window.open(`${window.location}&view=1&clientId=${this.appConfig.randomClientId}`, '_blank');
  }

  private _startJoinee() {
    $('#hideAll').removeClass('d-none');
    $('#viewer').removeClass('d-none');

    const localView = $('#viewer .local-view')[0] as HTMLVideoElement;
    const remoteView = $('#viewer .remote-view')[0] as HTMLVideoElement;

    addJoinee(
      localView,
      remoteView,
      this.formValues,
      onStatsReport,
      (event) => {}
    );

    $('#stop-viewer-button').on('click', async () => {
      exitJoinee();

      $('#hideAll').addClass('d-none');
      $('#viewer').addClass('d-none');
    });
  }
}
