import { useNavigate, generatePath } from "react-router";
import React from "react";
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { EVENTS } from "../../src/data/simulatorEvents"
import { Container } from "../components/index.jsx";

const dayHeaderFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric"
});

const Simulator = () => {
  const navigate = useNavigate();

  function handleEventClick(clickInfo) {
    const link = clickInfo.event.extendedProps.link;
    navigate(generatePath(link))
  }

  return (
    <Container className="p-6 m-6 text-center">
      <span className="text-xl md:text-3xl text-center px-5 pt-5 self-center font-semibold ">Explore a day at Sky</span>
      <p className="text-sm md:text-base text-slate-600 px-5 pt-2 pb-3">
        Click on the calendar events to join meetings and chat with team members throughout the day
      </p>
      <div className='p-5'>
        <FullCalendar
          plugins={[timeGridPlugin, interactionPlugin]}
          headerToolbar={false}
          initialView='timeGridDay'
          allDaySlot={false}
          slotMinTime={"08:00:00"}
          slotMaxTime={"20:00:00"}
          height={"auto"}
          initialEvents={EVENTS}
          eventContent={renderEventContent}
          dayHeaderContent={renderDayHeader}
          eventClick={handleEventClick}
        />
      </div>
    </Container>

  );
};


function renderEventContent(eventInfo) {
  const { event } = eventInfo;
  const { description } = event.extendedProps;
  return (
    <div className="flex h-full flex-col justify-center gap-0 text-left cursor-pointer">
      <div className="text-sm md:text-base font-semibold leading-tight tracking-tight whitespace-normal">
        {event.title}
      </div>
      {description && (
        <p className="hidden md:text-xs md:block text-slate-700 leading-tight whitespace-normal mt-0 ">
          {description}
        </p>
      )}
    </div>
  )
}

function renderDayHeader(headerInfo) {
  const formattedDate = dayHeaderFormatter.format(headerInfo.date);
  return `Today, ${formattedDate}`;
}

export default Simulator;

