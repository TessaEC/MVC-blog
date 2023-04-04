const moment = require('moment');

module.exports = {
  formatDate: (date) => {
    return moment(date).format('MM/DD/YY @ h:mm a');
  }
}

const Handlebars = require('handlebars');

Handlebars.registerHelper('eq', function(value1, value2, options) {
  return value1 === value2 ? options.fn(this) : options.inverse(this);
});