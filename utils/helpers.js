module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
  getApplicationStatusColor: (application_status) => {
    switch (application_status) {
      case 'Accepted':
        {
          return 'success';
        }
        break;
      case 'Denied':
        {
          return 'danger';
        }
        break;
      default: {
        return 'warning';
      }
    }
  },
};
