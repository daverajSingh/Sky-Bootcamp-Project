// YYYY-MM-DD of today
let todayStr = new Date().toISOString().slice(0, 10);

export const EVENTS = [
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
      description: "Presented by the Sky Product Expert. Discover Sky's latest offerings and how they enhance customer experience",
      link: "/simulator/5"
    },
  }
]
