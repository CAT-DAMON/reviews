class Timer {
  constructor(props) {
    this.timeCapsule = {
      moment: null,
      interval: ''
    };
  };

  moment(interval) {
    if (interval === 'milliseconds') {
      return new Date().getTime();
    } else if (interval === 'seconds') {
      return new Date().getTime() / 1000;
    };
  };

  start(interval) {
    this.timeCapsule.interval = interval;
    this.timeCapsule.moment = this.moment(interval);
    return this.timeCapsule;
  };

  end(timeCapsule, assignment = '[ASSIGNMENT]', ...args) {
    var end = this.moment(timeCapsule.interval);
    var start = timeCapsule.moment;
    var mil = `FINISHED IN ${end - start} Milliseconds\n`;
    var sec = `FINISHED IN ${Math.floor((end - start) / 60)} MIN ${Math.floor((end  - start) % 60)} SECONDS\n`;
    // IF ADDITIONAL ARGUMENTS ARE USED LOG THOSE FIRST THEN TIME STAMP
    if (timeCapsule.interval === 'milliseconds') {
      return args.length > 0 ?
        () => {console.log(args,`\n${assignment}-\n${mil}`)} :
        () => {console.log(`${assignment}-\n${mil}`)};
    } else if (timeCapsule.interval === 'seconds') {
      return args.length > 0 ?
        () => {console.log(args,`\n${assignment}-\n${sec}`)} :
        () => {console.log(`${assignment}-\n${sec}`)};
    };
  };
};

module.exports = { Timer };
