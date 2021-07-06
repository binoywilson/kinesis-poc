export const configureLogging = () => {
  const log = (level, messages) => {
    const text = messages
      .map((message) => {
        if (typeof message === 'object') {
          return JSON.stringify(message, null, 2);
        } else {
          return message;
        }
      })
      .join(' ');

    $('#logs').append(
      $(`<div class="${level.toLowerCase()}">`).text(
        `[${new Date().toISOString()}] [${level}] ${text}\n`
      )
    );
  };

  console['_error'] = console.error;
  console.error = function (...rest) {
    log('ERROR', Array.prototype.slice.call(rest));
    console['_error'].apply(this, rest);
  };

  console['_warn'] = console.warn;
  console.warn = function (...rest) {
    log('WARN', Array.prototype.slice.call(rest));
    console['_warn'].apply(this, rest);
  };

  console['_log'] = console.log;
  console.log = function (...rest) {
    log('INFO', Array.prototype.slice.call(rest));
    console['_log'].apply(this, rest);
  };
};
