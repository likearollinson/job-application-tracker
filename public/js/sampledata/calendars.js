export function findCalendar(id) {
  return sampleCalendars.find((cal) => cal.id === id);
}

export function hexToRGBA(hex) {
  var radix = 16;
  var r = parseInt(hex.slice(1, 3), radix),
    g = parseInt(hex.slice(3, 5), radix),
    b = parseInt(hex.slice(5, 7), radix),
    a = parseInt(hex.slice(7, 9), radix) / 255 || 1;
  var rgba = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';

  return rgba;
}

const _generateCalendarId = (function () {
  let _calId = 0;

  return function () {
    _calId = _calId + 1;

    return _calId;
  };
})();

export class CalendarInfo {
  constructor(name, color, bgColor, borderColor, dragBgColor) {
    this.id = '' + _generateCalendarId();
    this.name = name || 'My Calendar' + this.id;
    this.color = color;
    this.bgColor = bgColor;
    this.borderColor = borderColor;
    this.dragBgColor = dragBgColor;
    this.checked = true;
  }
}

// for Sample Data
const calendarNames = [
  'My Calendar',
  'Company',
  'Family',
  'Friend',
  'Travel',
  'etc',
  'Birthdays',
  'National Holidays',
];

const calendarColors = [
  '#9e5fff',
  '#00a9ff',
  '#ff5583',
  '#03bd9e',
  '#bbdc00',
  '#9d9d9d',
  '#ffbb3b',
  '#ff4040',
];

export const sampleCalendars = calendarNames.map(function (calName, idx) {
  const calColor = calendarColors[idx];

  return new CalendarInfo(calName, '#000', calColor, calColor, calColor);
});
