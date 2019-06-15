class ModifyResult {
	static pad0(value) {
		if (value === undefined) 
			return value;
		let result = value.toString();
		if (result.length < 2) {
			result = '0' + result;
		}
		return result;
	}
}
	
class StopWatch extends React.Component {		
	constructor() {
		super();
		this.state = {
			running: false,
			minutes: 0,
			seconds: 0,
			miliseconds: 0,
			formatted: '',
			watch: null
		}
	}
	
	print() {
		this.setState({formatted: `${ModifyResult.pad0(this.state.minutes)}:${ModifyResult.pad0(this.state.seconds)}:${ModifyResult.pad0(Math.floor(this.state.miliseconds))}`});
	}
		
	start() {
		if (!this.state.running) {
			this.setState({
				running: true,
				watch: setInterval(() => this.step(), 10)
			});
		}
	}
	
	step() {
		if (!this.state.running) return;
		this.calculate();
		this.print();
	}
	
	calculate() {
		var self = this;
		var newTimes = {
			miliseconds: self.state.miliseconds,
			seconds: self.state.seconds,
			minutes: self.state.minutes
		};
		newTimes.miliseconds = newTimes.miliseconds + 1;
		if (newTimes.miliseconds >= 100) {
			newTimes.seconds += 1;
			newTimes.miliseconds = 0;
		}
		if (newTimes.seconds >= 60) {
			newTimes.minutes += 1;
			newTimes.seconds = 0;
		}
		this.setState({
			miliseconds: newTimes.miliseconds,
			seconds: newTimes.seconds,
			minutes: newTimes.minutes
		})
	}
	
	stop() {
		this.setState({running: false});
		clearInterval(this.state.watch);
	}
	
	render() {
		return (
			<div>
				<nav className="controls">
					<a href="#" className="button" id="start" onClick={this.start.bind(this)}>Start</a>
					<a href="#" className="button" id="stop" onClick={this.stop.bind(this)}>Stop</a>
				</nav>
				<div className="stopwatch">{this.state.formatted}</div>
				<ul className="results"></ul>
			</div>
		)
	}	
}

var element = (<StopWatch/>);
ReactDOM.render(element, document.getElementById('app'));