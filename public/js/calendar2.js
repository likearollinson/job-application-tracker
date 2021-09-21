import { eventsAsJSON } from "./eventsToJSON";
document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        timeZone: 'UTC',
        themeSystem: 'bootstrap',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
        },
        weekNumbers: true,
        dayMaxEvents: true, // allow "more" link when too many events
        events: eventsAsJSON,
        headerToolbar: {
            center: 'addEventButton'
        },
        customButtons: {
            addEventButton: {
                text: 'add event...',
                click: function () {
                    const monthStart = prompt('Enter month in MM format - start');
                    const dayStart = prompt('Enter day om DD format - start');
                    const yearStart = prompt('Enter year in YYYY format - start');
                    const dateStartStr = yearStart + '-' + monthStart + '-' + dayStart
                    const timeStart = prompt('Enter time in military format - start');
                    const timeStartStr = 'T' + timeStart + ':00'
                    const monthEnd = prompt('Enter month in MM format - end');
                    const dayEnd = prompt('Enter day om DD format - end');
                    const yearEnd = prompt('Enter year in YYYY format - end');
                    const dateEndStr = yearEnd + '-' + monthEnd + '-' + dayEnd
                    const timeEnd = prompt('Enter time in military format - end');
                    const timeEndStr = 'T' + timeEnd + ':00'
                    var dateStart = new Date(dateStartStr + timeStartStr); // will be in local time
                    var dateEnd = new Date(dateEndStr + timeEndStr); // will be in local time
                    const title = prompt('Title of event')
                    if (!isNaN(date.valueOf())) { // valid?
                        calendar.addEvent({
                            title: title,
                            start: dateStart,
                            end: dateEnd,
                        });
                        alert('Great. Now, update your database...');
                    } else {
                        alert('Invalid date.');
                    }
                }
            }
        }
    });
    calendar.render();
});
