import Card from "../../../components/card.jsx"
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from "react";

describe('Card', () => {
    afterEach(cleanup);
    it('Check if the Card is rendered with the title, link, show description button', () => {
        render(<Card title="Title" link="/" description={"Hi"}/>);

        expect(screen.getByText('Title')).toBeInTheDocument()

        const button = screen.getByTestId("showDescription")
        expect(button).toBeInTheDocument()
        expect(button).toBeVisible()

        expect(screen.getByTestId("linkButton")).toHaveAttribute('href', '/')
    });

    it('Check if the description and hide button is revealed on clicking plus button (show button)', () => {
        render(<Card title="Title" link="/" description={"Hi"}/>);

        fireEvent.click(screen.getByTestId("showDescription"));
        
        expect(screen.getByText('Hi')).toBeInTheDocument()

        const button = screen.getByTestId("hideDescription")
        expect(button).toBeInTheDocument()
        expect(button).toBeVisible()
    });

    it('Check if the description is hidden on clicking hide description button', () => {
        render(<Card title="Title" link="/" description={"Hi"}/>);

        fireEvent.click(screen.getByTestId("showDescription"));

        expect(screen.getByText('Hi')).toBeInTheDocument()
        fireEvent.click(screen.getByTestId("hideDescription"));
        
        expect(screen.getByText('Title')).toBeInTheDocument()
    });

    it('Check if the link button is working', () => {
        render(<Card title="Title" link="/" description={"Hi"}/>);

        const linkButton = screen.getByTestId("linkButton")
        expect(linkButton).toBeInTheDocument()
        expect(linkButton).toBeVisible()
        expect(linkButton).toHaveAttribute('href', '/')
    });

    it('Check if the link button is not rendered when no link is provided', () => {
        render(<Card title="Title" description={"Hi"}/>);

        expect(screen.queryByTestId("linkButton")).toBeNull();
    });

    it('Check if the description button is not rendered when no description is provided', () => {
        render(<Card title="Title" link="/"/>);

        expect(screen.queryByTestId("showDescription")).toBeNull();
    });

});


