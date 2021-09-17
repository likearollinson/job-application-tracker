import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

import tuiCalendar from 'tui-calendar';
import moment from 'moment';
import chance from './sampledata/chanceInstance';

import { sampleCalendars, findCalendar } from './sampledata/calendars';
import { generateSchedule } from './sampledata/schedules';

const el = document.getElementById('app');
const newBtn = document.getElementById('newScheduleBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const useWorkweek = document.getElementById('useWorkweek');

const cal = new tuiCalendar(el, {
  defaultView: 'month',
  calendars: sampleCalendars,
  month: {
    workweek: true,
  },
  week: {},
  useCreationPopup: true,
  useDetailPopup: true,
  usageStatistics: true,
  template: {
    milestone: function (model) {
      return (
        '<span class="calendar-font-icon ic-milestone-b"></span> <span style="background-color: ' +
        model.bgColor +
        '">' +
        model.title +
        '</span>'
      );
    },
    allday: function (schedule) {
      return getTimeTemplate(schedule, true);
    },
    time: function (schedule) {
      return getTimeTemplate(schedule, false);
    },
  },
});

cal.on({
  clickMore: function (e) {
    console.log('clickMore', e);
  },
  clickSchedule: function (e) {
    console.log('clickSchedule', e);
  },
  clickDayname: function (date) {
    console.log('clickDayname', date);
  },
  beforeCreateSchedule: function (e) {
    console.log('beforeCreateSchedule', e);
    saveNewSchedule(e);
  },
  beforeUpdateSchedule: function (e) {
    const { schedule, changes } = e;

    console.log('beforeUpdateSchedule', e);

    cal.updateSchedule(schedule.id, schedule.calendarId, changes);
    refreshScheduleVisibility();
  },
  beforeDeleteSchedule: function (e) {
    console.log('beforeDeleteSchedule', e);
    cal.deleteSchedule(e.schedule.id, e.schedule.calendarId);
  },
  afterRenderSchedule: function (e) {
    const schedule = e.schedule;
    // var element = cal.getElement(schedule.id, schedule.calendarId);
    // console.log('afterRenderSchedule', element);
  },
  clickTimezonesCollapseBtn: function (timezonesCollapsed) {
    console.log('timezonesCollapsed', timezonesCollapsed);

    if (timezonesCollapsed) {
      cal.setTheme({
        'week.daygridLeft.width': '77px',
        'week.timegridLeft.width': '77px',
      });
    } else {
      cal.setTheme({
        'week.daygridLeft.width': '60px',
        'week.timegridLeft.width': '60px',
      });
    }

    return true;
  },
});

newBtn.addEventListener('click', (e) => {
  cal.openCreationPopup({
    start: new moment('2015-12-24').format('YYYY-MM-DD'),
    end: new moment('2015-12-24').format('YYYY-MM-DD'),
  });
});

prevBtn.addEventListener('click', (e) => {
  cal.prev();
});

nextBtn.addEventListener('click', (e) => {
  cal.next();
});

useWorkweek.addEventListener('change', (e) => {
  cal.setOptions({
    month: {
      workweek: e.currentTarget.checked,
    },
  });
});

cal.setDate(new moment('2015-12-24').format('YYYY-MM-DD'));
setSchedules();

function getTimeTemplate(schedule, isAllDay) {
  const html = [];
  const start = moment(schedule.start.toUTCString());
  const { title, isPrivate, isReadOnly, recurrenceRule, attendees, location } =
    schedule;

  if (!isAllDay) {
    html.push(`<strong>${start.format('HH:mm')}</strong>`);
  }
  if (isPrivate) {
    html.push('<span class="calendar-font-icon ic-lock-b"></span>');
    html.push(' Private');
  } else {
    if (isReadOnly) {
      html.push('<span class="calendar-font-icon ic-readonly-b"></span>');
    } else if (recurrenceRule) {
      html.push('<span class="calendar-font-icon ic-repeat-b"></span>');
    } else if (attendees.length) {
      html.push('<span class="calendar-font-icon ic-user-b"></span>');
    } else if (location) {
      html.push('<span class="calendar-font-icon ic-location-b"></span>');
    }
    html.push(` ${title}`);
  }

  return html.join('');
}

function saveNewSchedule(scheduleData) {
  const calendar = findCalendar(scheduleData.calendarId);
  const schedule = {
    id: String(chance.guid()),
    title: scheduleData.title,
    isAllDay: scheduleData.isAllDay,
    start: scheduleData.start,
    end: scheduleData.end,
    category: scheduleData.isAllDay ? 'allday' : 'time',
    dueDateClass: '',
    color: calendar.color,
    bgColor: calendar.bgColor,
    dragBgColor: calendar.bgColor,
    borderColor: calendar.borderColor,
    location: scheduleData.location,
    raw: {
      class: scheduleData.raw['class'],
    },
    state: scheduleData.state,
  };
  if (calendar) {
    schedule.calendarId = calendar.id;
    schedule.color = calendar.color;
    schedule.bgColor = calendar.bgColor;
    schedule.borderColor = calendar.borderColor;
  }

  cal.createSchedules([schedule]);

  refreshScheduleVisibility();
}

function refreshScheduleVisibility() {
  var calendarElements = Array.prototype.slice.call(
    document.querySelectorAll('#calendarList input')
  );

  sampleCalendars.forEach(function (calendar) {
    cal.toggleSchedules(calendar.id, !calendar.checked, false);
  });

  cal.render(true);

  calendarElements.forEach(function (input) {
    var span = input.nextElementSibling;
    span.style.backgroundColor = input.checked
      ? span.style.borderColor
      : 'transparent';
  });
}

function setSchedules() {
  cal.clear();

  const sampleSchedules = generateSchedule(
    cal.getViewName(),
    cal.getDateRangeStart(),
    cal.getDateRangeEnd()
  );

  cal.createSchedules(sampleSchedules);
  refreshScheduleVisibility();
}
