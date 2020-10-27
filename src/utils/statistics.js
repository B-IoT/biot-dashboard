import _ from 'lodash';

/**
 *
 * @param {object[]} items
 * @param {object} theme
 */
export function getStatusSummaries(items, theme) {
  const dict = _.groupBy(items, (item) => item.status);
  const summary = _.map(dict, (value, key, collection) => {
    let color;
    switch (key) {
      case 'available':
        color = theme.items.available;
        break;
      case 'unavailable':
        color = theme.items.unavailable;
        break;
      default:
        color = theme.palette.secondary.main;
        break;
    }

    return { status: key, count: value.length, color };
  });

  return summary;
}

/**
 *
 * @param {object[]} items
 */
export function getServicesStatus(items) {
  const dict = _.groupBy(items, (item) => item.service);
  const summary = _.map(dict, (value, key) => {
    const statuses = _.map(value, (item) => item.status);
    const statusesStats = _.countBy(statuses, (status) => status);
    const sum = _.sum(_.map(statusesStats, (stat) => stat));
    const percentages = _.mapValues(
      statusesStats,
      (stat) => (stat / sum) * 100
    );

    return { name: key, ...percentages };
  });

  return summary;
}
