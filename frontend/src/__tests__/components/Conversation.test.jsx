import React from 'react';
import Conversation from '../../pages/Conversation';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';


jest.mock('../../components/AuthContext', () => ({
  useAuth: jest.fn(),
}));


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

const aiMessagesMock = [
    { "id": 1, "topicID": 1, "text": 'Welcome to the topic!' },
    { "id": 1, "topicID": 1, "text": 'This is AI response 1' },
    { "id": 1, "topicID": 1, "text": 'This is AI response 2' }
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
        global.fetch = jest.fn()
        .mockResolvedValueOnce({
            ok: true,
            json: async () => aiMessagesMock,
        });

        setup();

        await waitFor(() => {
            expect(screen.getByText('Welcome to the topic!')).toBeInTheDocument();
        });
    });

    test('renders initial AI message and sends user message', async () => {
        // Mock the fetch calls
        global.fetch = jest.fn()
            .mockResolvedValueOnce({
                json: () => Promise.resolve(aiMessagesMock),
            })
            .mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve({}),
            })
            .mockResolvedValueOnce({
                json: () => Promise.resolve(aiMessagesMock),
            });

        setup();


        await waitFor(() => {
            expect(screen.getByTestId('mock-message')).toHaveTextContent('Welcome to the topic!');
        });

        const input = screen.getByTestId('mock-input');
        fireEvent.change(input, { target: { value: 'Hello AI!' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        await waitFor(() => {
            const messages = screen.getAllByTestId('mock-message');
            expect(messages[messages.length - 2]).toHaveTextContent('Hello AI!');
            expect(messages[messages.length - 1]).toHaveTextContent('AI response 1');
        });
    });


});