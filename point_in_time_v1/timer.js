
class Timer {
  constructor(props) {
    this.moment = () => new Date().getTime() / 1000;
  }
  start = (interval) => {
    if (interval === 'seconds') {
      return this.moment()
    }
  };
  end = (start, interval) => {
    if (interval === 'seconds') {
      let end = this.moment();
      return `FINISHED IN ${Math.floor((end - start) / 60)} MIN ${Math.floor((end  - start) % 60)} SECONDS`
    }
  };
}

module.exports = {Timer}


