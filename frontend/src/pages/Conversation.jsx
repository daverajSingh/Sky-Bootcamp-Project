import Header from "../components/Header"
import { ChatContainer, MainContainer, MessageInput, Message, MessageList, MessageSeparator } from "@chatscope/chat-ui-kit-react"

const Conversation = () => {

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();

    let messageList = [{ 'agent': 'AI', 'message': 'Are you ready to discuss about Agile', 'direction': 'incoming' },
    { 'agent': 'user', 'message': 'Yes, but I am new to Agile, what is Agile?', 'direction': 'outgoing' },
    { 'agent': 'AI', 'message': 'Second message', 'direction': 'incoming' },
    { 'agent': 'user', 'message': 'Second message from user john', 'direction': 'outgoing' }
    ]

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
                    <MessageInput placeholder="Type message here" attachButton="false" />
                </ChatContainer>
            </MainContainer>
        </>

    );
}
export default Conversation;