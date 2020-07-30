// Mock data object used for LineChart and BarChart

const data = {
    labels: ['07/12', '07/13', '07/14', '07/15', '07/16', '07/17'],
    datasets: [{
      data: [
        101,
        102,
        112,
        101,
        112,
        100
      ],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})` // optional
    },{
      data: [
        65,
        68,
        63,
        62,
        71,
        72
      ]
    }]
  }

  // Mock data object used for Contribution Graph

  const contributionData = [
    { date: '2016-01-02', count: 1 },
    { date: '2016-01-03', count: 2 },
    { date: '2016-01-04', count: 3 },
    { date: '2016-01-05', count: 4 },
    { date: '2016-01-06', count: 5 },
    { date: '2016-01-30', count: 2 },
    { date: '2016-01-31', count: 3 },
    { date: '2016-03-01', count: 2 },
    { date: '2016-04-02', count: 4 },
    { date: '2016-03-05', count: 2 },
    { date: '2016-02-30', count: 4 }
  ]

  // Mock data object for Pie Chart

  const pieChartData = [
    { name: 'Awake', population: 1.01, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Remember', population: 1.59, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Light', population: 4.12, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Deep', population: 1.0, color: '#ffffff', legendFontColor: '#7F7F7F', legendFontSize: 15 }
  ]

  // Mock data object for Progress

  const progressChartData = [0.4, 0.6, 0.8]

  export { data, contributionData, pieChartData, progressChartData }
