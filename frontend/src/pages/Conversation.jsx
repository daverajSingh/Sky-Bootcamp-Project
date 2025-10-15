import Header from "../components/Header"
import { ChatContainer, MainContainer, MessageInput, Message, MessageList, MessageSeparator } from "@chatscope/chat-ui-kit-react"

const Conversation = () => {

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();

    return (
        <>
            <Header />
            <MainContainer>
                <ChatContainer>
                    <MessageList>
                        <MessageSeparator content={today.toLocaleString("en-UK", options)} />
                        <Message
                            model={{
                                direction: 'incoming',
                                message: 'Are you ready to discuss about Agile',
                                sender: 'AI',
                            }}
                        />
                        <Message
                            model={{
                                direction: 'outgoing',
                                message: 'Yes, but I am new to Agile, what is Agile?',
                                sender: 'John',
                            }}
                        />
                        <Message
                            model={{
                                direction: 'incoming',
                                message: 'Second message',
                                sender: 'AI',
                            }}
                        />
                        <Message
                            model={{
                                direction: 'outgoing',
                                message: 'Second message from user',
                                sender: 'John',
                            }}
                        />
                    </MessageList>
                    <MessageInput placeholder="Type message here" attachButton="false" />
                </ChatContainer>
            </MainContainer>
        </>

    );
}
export default Conversation;