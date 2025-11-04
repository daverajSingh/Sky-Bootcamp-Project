// import { Card } from "../components";
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'


const Simulator = () => {
  return (
    // <>
    //   <h1 className="text-xl md:text-3xl text-center py-10">Explore a day at Sky</h1>
    //   <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-5">
    //     <Card title="Agile" link="/simulator/2" description="Chat with our Agile Scrum Master to explore agile principles, practices, and how they drive team success" />
    //     <Card title="Compilance" link="/simulator/3" description={"Speak with our Compliance Officer to understand how to stay aligned with policies and regulations in your work"} />
    //     <Card title="Emotional Intelligence" link="/simulator/1" description={"Connect with our Empathetic Coach to learn how emotional intelligence can improve your workplace interactions"} />
    //     <Card title="Communication" link="/simulator/4" description={"Talk to our Communication Specialist to enhance your ability to speak clearly, confidently, and effectively"} />
    //     <Card title="Sky Products & Services" link="/simulator/5" description={"Discover the full range of Sky products and services with our expert, and learn how they elevate customer experience"} />
    //   </div>
    // </>
    <>
      <h1 className="text-xl md:text-3xl text-center py-6">Explore a day at Sky</h1>
      <div className='px-5'>
        <FullCalendar
          plugins={[timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "title",
            center: "",
            right: ""
          }}
          initialView='timeGridDay'
          allDaySlot={false}
          slotMinTime={"08:00:00"}
          slotMaxTime={"20:00:00"}
          height={"auto"}
        />
      </div>
    </>
   
  );
};

export default Simulator;
