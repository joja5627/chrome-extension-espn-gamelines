import React, { Component } from 'react';
import axios from 'axios';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import {
	Container,
	Divider,
	Segment,
	Menu,
	Header,
	Statistic
} from 'semantic-ui-react';
import { datafyLine } from '../utils/chartJsHelper';

const dataRadar = {
	labels: [
		'Anger',
		'Contempt',
		'Disgust',
		'Fear',
		'Happiness',
		'Neutral',
		'Sadness',
		'Surprise'
	],
	datasets: [
		{
			label: 'Snapshot:',
			backgroundColor: [
				'#F14D45',
				'#F0C445',
				'#D7D9DD',
				'#F9A755',
				'#FF6384',
				'#4BC0C0',
				'#61A2DA',
				'#916ED6'
			],
			borderColor: 'rgba(	127,255,212,0)',
			pointBackgroundColor: 'rgba(255,99,132,1)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(255,99,132,1)',
			data: [65, 59, 90, 81, 56, 55, 40, 34]
		}
	]
};

const dataLine = {
	labels: [
		'01/24/19',
		'01/25/19',
		'01/26/19',
		'01/27/19',
		'01/28/19',
		'01/29/19',
		'01/30/19'
	],
	datasets: [
		{
			label: 'happiness',
			fill: false,
			lineTension: 0.1,
			backgroundColor: 'rgba(75,192,192,0.4)',
			borderColor: 'rgba(75,192,192,1)',
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			pointBorderColor: 'rgba(75,192,192,1)',
			pointBackgroundColor: '#fff',
			pointBorderWidth: 1,
			pointHoverRadius: 5,
			pointHoverBackgroundColor: 'rgba(75,192,192,1)',
			pointHoverBorderColor: 'rgba(220,220,220,1)',
			pointHoverBorderWidth: 2,
			pointRadius: 1,
			pointHitRadius: 10,
			data: [65, 59, 80, 81, 56, 55, 40]
		}
	]
};

export default class Graph extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeItem: 'happiness'
		};
	}
	handleItemClick = (evt, { name }) => this.setState({ activeItem: name });

	render() {
		const { activeItem } = this.state;
		let toShow = dataLine;
		if (this.props.forCurr === true) {
			toShow = this.props.currentDomainEmotions;
		}
		return (
			<Container>
				<Container>
					<div
						style={{
							alignItems: 'flex-end',
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							marginTop: '1vh'
						}}>
						<div style={{ fontSize: '28px' }}>Your Example Snapshot</div>
						<Header as="h4">
							<Statistic>
								<Statistic.Label>Total Snapshots</Statistic.Label>
								<Statistic.Value>328</Statistic.Value>
							</Statistic>
						</Header>
					</div>
				</Container>
				<Divider hidden />
				<Segment raised>
					<Container>
						<Divider horizontal section>
							Emotional Sentiment Averages
						</Divider>
						<Doughnut
							responsive
							responsiveAnimationDuration={5}
							maintainAspectRatio
							duration={9000}
							easing="easeInOutBounce"
							data={dataRadar}
						/>
					</Container>
				</Segment>
				<Segment raised>
					<Container>
						<Divider horizontal section>
							EMOTIONAL PEAKS
						</Divider>
						<Bar
							responsive
							responsiveAnimationDuration={5}
							maintainAspectRatio
							duration={9000}
							easing="easeInOutBounce"
							data={dataRadar}
						/>
					</Container>
				</Segment>
			</Container>
		);
	}
}
