import React from 'react';
import Conversation from '../../pages/Conversation';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';


jest.mock('../../components/AuthContext', () => ({
    useAuth: jest.fn(),
}));


jest.mock('axios')
jest.mock('../../env', () => ({ API_BASE: 'https://mocked-api.com' }))

import axios from 'axios';


// Mock chat UI components
jest.mock('@chatscope/chat-ui-kit-react', () => {
    const originalModule = jest.requireActual('@chatscope/chat-ui-kit-react');
    return {
        ...originalModule,
        ChatContainer: ({ children }) => <div>{children}</div>,
        MainContainer: ({ children }) => <div>{children}</div>,
        MessageList: ({ children }) => <div data-testid="mock-message-list">{children}</div>,
        Message: ({ model }) => <div data-testid="mock-message">{model.message}</div>,
        MessageSeparator: ({ content }) => <div >{content}</div>,
        MessageInput: ({ onSend }) => (
            <input
                data-testid="mock-input"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        onSend(e.target.value);
                        e.target.value = '';
                    }
                }}
            />
        ),
    };
});

const mockSimulatorDetails = [
    {
        title: "AI Mentor",
        intro_text: "Hello! Are you ready to discuss the topic?",
        context: "topic context"
    }
];

describe('Conversation component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    function setup(topicid = '1') {
        return render(
            <MemoryRouter initialEntries={[`/simulator/${topicid}`]}>
                <Routes>
                    <Route path="/simulator/:topicid" element={<Conversation />} />
                </Routes>
            </MemoryRouter>
        );
    }

    test('renders initial AI message on mount', async () => {
        axios.get.mockResolvedValueOnce({ data: mockSimulatorDetails });

        setup();

        await waitFor(() => {
            expect(screen.getByText('Hello! Are you ready to discuss the topic?')).toBeInTheDocument();
        });
    });

    test('renders initial AI message and sends user message', async () => {
        axios.get.mockResolvedValueOnce({ data: mockSimulatorDetails });

        axios.post.mockResolvedValueOnce({
            data: { text: "Hello AI!" },
        });

        setup();


        await waitFor(() => {
            expect(screen.getByTestId('mock-message')).toHaveTextContent('Hello! Are you ready to discuss the topic?');
        });

        const input = screen.getByTestId('mock-input');
        fireEvent.change(input, { target: { value: 'Hello AI!' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        await waitFor(() => {
            const messages = screen.getAllByTestId('mock-message');
            expect(messages.at(-2)).toHaveTextContent('Hello AI!');
        });
    });


});