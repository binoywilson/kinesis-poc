import { IFormValues } from './app.component';
import { sendMasterMessage, stopMaster, startMaster } from './master.channel';
import { sendViewerMessage, stopViewer, startViewer } from './viewer.channel';

export function onStatsReport(report) {
  // TODO: Publish stats
}

export const toggleDataChannelElements = (formValues: IFormValues) => {
  if (formValues.openDataChannel) {
    $('.datachannel').removeClass('d-none');
  } else {
    $('.datachannel').addClass('d-none');
  }
};

export const registerEvents = (createSignalingChannel, formValues: IFormValues) => {
  $('#master-button').click(async () => {
    $('#form').addClass('d-none');
    $('#master').removeClass('d-none');

    const localView = $('#master .local-view')[0];
    const remoteView = $('#master .remote-view')[0];
    const localMessage = $('#master .local-message')[0] as HTMLInputElement;
    const remoteMessage = $('#master .remote-message')[0];

    $(remoteMessage).empty();
    localMessage.value = '';
    toggleDataChannelElements(formValues);

    startMaster(localView, remoteView, formValues, onStatsReport, (event) => {
      remoteMessage.append(`${event.data}\n`);
    });
  });

  $('#stop-master-button').click(async () => {
    stopMaster();

    $('#form').removeClass('d-none');
    $('#master').addClass('d-none');
  });

  $('#viewer-button').click(async () => {
    $('#form').addClass('d-none');
    $('#viewer').removeClass('d-none');

    const localView = $('#viewer .local-view')[0];
    const remoteView = $('#viewer .remote-view')[0];
    const localMessage = $('#viewer .local-message')[0] as HTMLInputElement;
    const remoteMessage = $('#viewer .remote-message')[0];

    $(remoteMessage).empty();
    localMessage.value = '';
    toggleDataChannelElements(formValues);

    startViewer(localView, remoteView, formValues, onStatsReport, (event) => {
      remoteMessage.append(`${event.data}\n`);
    });
  });

  $('#stop-viewer-button').click(async () => {
    stopViewer();

    $('#form').removeClass('d-none');
    $('#viewer').addClass('d-none');
  });

  $('#create-channel-button').click(async () => {
    createSignalingChannel(formValues);
  });

  $('#master .send-message').click(async () => {
    const masterLocalMessage = $(
      '#master .local-message'
    )[0] as HTMLInputElement;
    sendMasterMessage(masterLocalMessage.value);
  });

  $('#viewer .send-message').click(async () => {
    const viewerLocalMessage = $(
      '#viewer .local-message'
    )[0] as HTMLInputElement;
    sendViewerMessage(viewerLocalMessage.value);
  });
};
