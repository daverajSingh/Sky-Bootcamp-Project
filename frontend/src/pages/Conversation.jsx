import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  ChatContainer,
  MainContainer,
  MessageInput,
  Message,
  MessageList,
  MessageSeparator,
  TypingIndicator
} from "@chatscope/chat-ui-kit-react";
import { API_BASE } from '../env.js';
import axios from "axios";

const Conversation = () => {
  const { topicid } = useParams();
  // Order of the messages should be maintained in this list as they are added
  const [messageList, setMessageList] = useState([]);
  // IDs to keep track of which message to send next, may not be needed once backend is connected
  const [aiMessageId, setAIMessageId] = useState(0);
  const [simulatorDetails, setSimulatorDetails] = useState(null)
  const [loading, setLoading] = useState(false)

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const today = new Date();

  const wrapUpMessage =
    "Explore another topic in the simulator to learn more about corporate life or return to the main simulator page.";

  function sendUserResponse(message) {

    const userResponse = {
      agent: "user",
      message: message,
      direction: "outgoing",
    };

    setMessageList(prev => [...prev, userResponse]);

    const sendMessageToSimulator = async () => {
      setLoading(true)
      try {
        const response = await axios.post(`${API_BASE}/api/simulator/${topicid}`, {
          text: message,
          context: simulatorDetails[0]["context"]
        }, {
          headers: {
            "Content-Type": "application/json"
          }
        });

        const data = response.data;

        if(data) {
          setLoading(false);
        }
        let aiResponse = {};
        if (aiMessageId > data.length - 1) {
          // No more AI messages left for this topic - <TO DO - NEED TO UPDATE THIS LOGIC>
          aiResponse = {
            agent: simulatorDetails[0]["title"],
            message: wrapUpMessage,
            direction: "incoming",
          };
        } else {
          aiResponse = {
            agent: simulatorDetails[0]["title"],
            message: data["text"],
            direction: "incoming",
          };
        }

        setMessageList(prev => [...prev, aiResponse]);
        setAIMessageId(prev => prev + 1);
      } catch (error) {
        console.error('Error sending message to simulator:', error);
      }
    }
    sendMessageToSimulator();
  }

  useEffect(() => {
    // The first message should be from the AI, asking the user if they are ready to discuss the topic.
    const getSimulatorDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/topic/${topicid}/simulator-details`);
        const data = response.data;
        setSimulatorDetails(data);

        const message = {
          agent: data[0]["title"],
          message: data[0]["intro_text"],
          direction: "incoming",
        };

        setMessageList([...messageList, message]);
        setAIMessageId(prev => prev + 1);
      } catch (error) {
        console.error('Error fetching simulator details:', error);
      }
    };

    getSimulatorDetails();
  }, []);

  return (
    <MainContainer>
      <ChatContainer>
        <MessageList>
          <MessageSeparator content={today.toLocaleString("en-UK", options)} />
          {messageList.map((message, index) => (
            <Message
              key={index}
              model={{
                direction: message.direction,
                message: message.message,
                sender: message.agent,
              }}
            />
          ))}
        </MessageList>
        {loading &&(<TypingIndicator content=`${simulatorDetails[0]["title"]} is typing` />)}
        <MessageInput
          placeholder="Type message here"
          attachButton="false"
          onSend={sendUserResponse}
        />
      </ChatContainer>
    </MainContainer>
  );
};
export default Conversation;
