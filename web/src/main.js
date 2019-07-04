
new Vue({
  el: '#app',
  data: {
    reportDate: '2019-07-04',
    cspReports: ''
  },
  methods: {
    fetchData: function () { 
      var vm = this
      // axios.get('http://localhost:3000/reports?date=' + vm.reportDate).then(response => {
      axios.get('https://4nneqiwsi2.execute-api.eu-west-1.amazonaws.com/dev/reports?date=' + vm.reportDate).then(response => {
        vm.cspReports = response.data
      })
    }
  }
})