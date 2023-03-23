const moment = require('moment');

module.exports = {
  formatDate: (date) => {
    return moment(date).format('MM/DD/YY @ h:mm a');
  }
}