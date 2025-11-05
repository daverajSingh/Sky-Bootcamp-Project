import { useNavigate, generatePath } from "react-router";
import React from "react";
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { EVENTS } from "../../src/data/simulatorEvents"


const Simulator = () => {
  const navigate = useNavigate();

  function handleEventClick(clickInfo) {
    const link = clickInfo.event.extendedProps.link;
    navigate(generatePath(link))
  }

  return (
    <>
      <span className="text-xl md:text-3xl text-center px-5 pt-5">Explore a day at Sky</span>
      <div className='p-5'>
        <FullCalendar
          plugins={[timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "title",
            center: "",
            right: "homeButton"
          }}
          initialView='timeGridDay'
          allDaySlot={false}
          slotMinTime={"08:00:00"}
          slotMaxTime={"20:00:00"}
          height={"auto"}
          initialEvents={EVENTS}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          customButtons={{
            homeButton: {
              text: 'Home',
              click: () => { navigate("/") },
            }
          }}
        />
      </div>
    </>

  );
};


function renderEventContent(eventInfo) {
  const { event } = eventInfo;
  const { description } = event.extendedProps;
  return (
    <div className="cursor-pointer truncate">
      <i className="font-semi-bold">{event.title}</i>
      {description && (
        <div className="py-1 text-xs text-black">
          {description}
        </div>
      )}
    </div>
  )
}

export default Simulator;

