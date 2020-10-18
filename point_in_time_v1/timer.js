class Timer {
  constructor(props) {
    this.timeCapsule = {
      moment: null,
      interval: ''
    };
  }

  moment = (interval) => {
    if (interval === 'milliseconds') {
      return new Date().getTime();
    } else if (interval === 'seconds') {
      return new Date().getTime() / 1000;
    }
  }

  start = (interval) => {
    this.timeCapsule.interval = interval;
    this.timeCapsule.moment = this.moment(interval);
    return this.timeCapsule;
  };

  end = (timeCapsule) => {
    var end = this.moment(timeCapsule.interval);
    var start = timeCapsule.moment;
    if (timeCapsule.interval === 'milliseconds') {
      return `FINISHED IN ${end - start} Milliseconds`
    } else if (timeCapsule.interval === 'seconds') {
      return `FINISHED IN ${Math.floor((end - start) / 60)} MIN ${Math.floor((end  - start) % 60)} SECONDS`
    }
  };
}
module.exports = { Timer };
