const moment = require('moment');

// bring in date formatting
const helpers = {
  formatDate: function (date) {
    return moment(date).format('MM/DD/YY @ h:mm a');
  }
};

module.exports = helpers;