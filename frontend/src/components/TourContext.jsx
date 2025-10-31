import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver({
  onDestroyed: () => {
    localStorage.setItem("tourCompleted", "true");
  },
  showProgress: true,
  steps: [
    {
      element: "#immersion",
      popover: {
        title: "Welcome to our app",
        description: "Welcome to Sky Immersion - Let's walk you through it.",
        side: "bottom",
        align: "start",
      },
    },
    {
      element: "#simulator",
      popover: {
        title: "Simulator",
        description:
          "Explore a day at Sky with our interactive simulator, exploring key day-to-day skills and challenges.",
        side: "top",
        align: "start",
      },
    },
    {
      element: "#quiz",
      popover: {
        title: "Quiz",
        description:
          "Take the quiz on various subjects covered in the simulator to find out if you're ready for corporate life at Sky!",
        side: "top",
        align: "start",
      },
    },
    {
      element: "#faq",
      popover: {
        title: "FAQ Section",
        description:
          "Have any more questions? Check out our Frequently Asked Questions section for more information.",
        side: "top",
        align: "start",
      },
    },
    {
      element: "#login",
      popover: {
        title: "Login Button",
        description:
          "Admins can log in here to access the admin dashboard, manage content, and view user analytics.",
        side: "left",
        align: "start",
      },
    },
    {
      element: "#tutorialButton",
      popover: {
        title: "You're all set!",
        description:
          "You can always restart this tour by pressing the Tutorial button.",
      },
    },
  ],
});

export default driverObj;
