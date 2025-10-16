import React, { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import Header from "../components/Header"
import { ChatContainer, MainContainer, MessageInput, Message, MessageList, MessageSeparator } from "@chatscope/chat-ui-kit-react"

const Conversation = () => {

    const { topicid } = useParams();
    // Order of the messages should be maintained in a list
    const [messageList, setMessageList] = useState([])
    const [userMessageId, setUserMessageId] = useState(1)
    const [aiMessageId, setAIMessageId] = useState(0)

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();

    function sendUserResponse(message) {
        // Need to send this to the backend and get a response from the AI
        fetch('http://localhost:3000/user-messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'id': userMessageId, 'topicID': topicid, 'text': message }),
        })
            .then(() => {
                // For now, just fetch again the response from the AI - 
                // when we connect with backend, this should be part of the response from the backend
                fetch(`http://localhost:3000/ai-messages?topicID=${topicid}`)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        // console.log(messageList);
                        const userResponse = { 'agent': 'user', 'message': message, 'direction': 'outgoing' };
                        const aiResponse = { 'agent': 'AI', 'message': data[aiMessageId]['text'], 'direction': 'incoming' };
                        setMessageList([...messageList, userResponse, aiResponse]);
                        setAIMessageId(aiMessageId + 1);
                    })
                    .catch(error => console.error(error));
            })
            .catch(error => console.error(error));

        setUserMessageId(userMessageId + 1);

    }

    useEffect(() => {
        // The first message should be from the AI, asking the user if they are ready to discuss the topic.
        fetch(`http://localhost:3000/ai-messages?topicID=${topicid}`)
            .then(response => response.json())
            .then(data => {
                const message = { 'agent': 'AI', 'message': data[aiMessageId]['text'], 'direction': 'incoming' };
                setMessageList([...messageList, message]);
                setAIMessageId(aiMessageId + 1);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <>
            <Header />
            <MainContainer>
                <ChatContainer>
                    <MessageList>
                        <MessageSeparator content={today.toLocaleString("en-UK", options)} />
                        {
                            messageList.map((message, index) => (
                                <Message
                                    key={index}
                                    model={{
                                        direction: message.agent === 'AI' ? 'incoming' : 'outgoing',
                                        message: message.message,
                                        sender: message.agent === 'AI' ? 'AI' : 'John',
                                    }}
                                />
                            ))
                        }
                    </MessageList>
                    <MessageInput placeholder="Type message here" attachButton="false" onSend={sendUserResponse} />
                </ChatContainer>
            </MainContainer>
        </>

    );
}
export default Conversation;