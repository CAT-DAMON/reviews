class Timer {
  constructor(props) {
    this.timeCapsule = {
      moment: null,
      interval: ''
    };
  }

  moment = (interval) => {
    if (interval === 'seconds') {
      return new Date().getTime() / 1000;
    } else if (interval === 'milliseconds') {
      return new Date().getTime();
    }
  }

  start = (interval) => {
    this.timeCapsule.interval = interval;
    this.timeCapsule.moment = this.moment(interval);
    return this.timeCapsule;
  };

  end = (timeCapsule) => {
    if (timeCapsule.interval === 'milliseconds') {
      let start = timeCapsule.moment;
      let end = this.moment('milliseconds');
      return `FINISHED IN .${end - start} Second(s)`
    } else if (timeCapsule.interval === 'seconds') {
      let start = timeCapsule.moment;
      let end = this.moment('seconds');
      return `FINISHED IN ${Math.floor((end - start) / 60)} MIN ${Math.floor((end  - start) % 60)} SECONDS`
    }
  };
}
module.exports = {Timer};
