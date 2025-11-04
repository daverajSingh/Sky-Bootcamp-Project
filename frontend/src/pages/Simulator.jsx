import { useNavigate, generatePath } from "react-router";
import React from "react";
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

// YYYY-MM-DD of today
let todayStr = new Date().toISOString().slice(0, 10);

const EVENTS = [
  {
    title: 'Emotional Intelligence Workshop',
    start: todayStr + 'T10:45:00',
    end: todayStr + 'T11:45:00',
    extendedProps: {
      description: 'Led by the Empathetic Coach. Learn how emotional intelligence improves workplace relationships and performance',
      link: "/simulator/1"
    },
  },
  {
    title: 'Agile Methodology Deep Dive',
    start: todayStr + 'T13:30:00',
    end: todayStr + 'T14:30:00',
    extendedProps: {
      description: 'Hosted by the Agile Scrum Master. Explore sprints, adaptive planning, and continuous improvement',
      link: "/simulator/2",
    },
  },
  {
    title: 'Compliance & Ethics Briefing',
    start: todayStr + 'T09:30:00',
    end: todayStr + 'T10:30:00',
    extendedProps: {
      description: 'Presented by the Compliance Officer. Understand regulatory compliance and ethical standards in business',
      link: "/simulator/3",
    },
  },
  {
    title: 'Communication Skills for Leaders',
    start: todayStr + 'T15:00:00',
    end: todayStr + 'T16:00:00',
    extendedProps: {
      description: 'Facilitated by the Communication Specialist. Learn strategies for collaboration, conflict resolution, and leadership',
      link: "/simulator/4"
    },
  },
  {
    title: 'Sky Product Showcase',
    start: todayStr + 'T16:15:00',
    end: todayStr + 'T17:15:00',
    extendedProps: {
      description: 'Presented by the Sky Product Expert. Discover Sky’s latest offerings and how they enhance customer experience',
      link: "/simulator/5"
    },
  }
]


const Simulator = () => {
  const navigate = useNavigate();

  function handleEventClick(clickInfo) {
    const link = clickInfo.event.extendedProps.link;
    navigate(generatePath(link))
  }

  return (
    <>
      <h1 className="text-xl md:text-3xl text-center py-6">Explore a day at Sky</h1>
      <div className='px-5'>
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
              text: 'Go to Home',
              click: () => {navigate("/")},
            }
          }}
        />
      </div>
    </>

  );
};


function renderEventContent(eventInfo) {
  const { timeText, event } = eventInfo;
  const { description } = event.extendedProps;
  return (
    <div className="cursor-pointer">
      <b>{timeText} </b>
      <i>{event.title}</i>
      {description && (
        <div className="py-1 text-xs text-gray-800">
          {description}
        </div>
      )}
    </div>
  )
}

export default Simulator;

