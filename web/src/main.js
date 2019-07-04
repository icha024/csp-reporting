Vue.use(VueTables.ClientTable);
new Vue({
  el: '#app',
  data: {
    reportDate: '2019-07-04',
    apiKey: '',
    // cspReports: [],
    columns: ['dateId','timeId','blockedUri','documentUri','disposition','effectiveDirective',
      'originalPolicy','referrer','scriptSample','statusCode','violatedDirective'],
    tableData: [],
    options: {
      filterable: false,
      headings: {
        blockedUri: 'blockedUri'
      }
    }
  },
  methods: {
    fetchData: function () { 
      var vm = this
      // axios.get('http://localhost:3000/reports?date=' + vm.reportDate).then(response => {
      axios.get('https://hixk92a1ab.execute-api.eu-west-1.amazonaws.com/dev/reports?date=' + vm.reportDate,
                { headers: { 'x-api-key': vm.apiKey } })
        .then(response => {
        // vm.cspReports = response.data
        vm.tableData = response.data
      })
    }
  }
})
