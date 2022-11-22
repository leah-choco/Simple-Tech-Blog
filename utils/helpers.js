module.exports = {
  format_date: (date) => {
    let today = new Date();
    date = today.toLocaleDateString();
    return date;
  },
};
