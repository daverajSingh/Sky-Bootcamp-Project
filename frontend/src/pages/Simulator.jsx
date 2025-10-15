import { useNavigate, generatePath } from 'react-router-dom';
import Header from "../components/Header"
import Card from "../components/Card"
import { ChatContainer, MainContainer, MessageInput, Message, MessageList, MessageSeparator } from "@chatscope/chat-ui-kit-react"

const Simulator = () => {

        const navigate = useNavigate();

    return (
        <>
            <Header />
            <div className="p-6 grid grid-cols-2 gap-6" onClick ={()=> navigate(generatePath("/simulator/1"))}>
                <Card title="Agile" />
            </div> 
        </>
    );
}
export default Simulator;