

class Timer {
  constructor(props) {
    super(props)
    this.moment = () => new Date().getTime() / 1000;
  }

  this.start = (interval) => {
    if (interval === 'seconds') {
      return this.moment()
    }
  }
}