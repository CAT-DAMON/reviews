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
    }
  }

  start = (interval) => {
    this.timeCapsule.interval = interval;
    this.timeCapsule.moment = this.moment(interval);
    return this.timeCapsule;
  };

  end = (timeCapsule) => {
    let start = timeCapsule.moment;
    let end = this.moment('seconds');
    return `FINISHED IN ${Math.floor((end - start) / 60)} MIN ${Math.floor((end  - start) % 60)} SECONDS`

  };
}
module.exports = {Timer};
