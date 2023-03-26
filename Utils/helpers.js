const moment = require('moment');

module.exports = {
  formatDate: (date) => {
    return moment(date).format('MM/DD/YY @ h:mm a');
  }
}

const handlebars = require('handlebars');

handlebars.registerHelper('eq', function(value1, value2) {
  return value1 === value2;
});