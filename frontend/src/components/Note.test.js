import React from "react";
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Note from "./Note";

// Testataan Note-komponenttia
test('Note renders correctly', () => {

    const note = {
        title: "Test title",
        content: "Test content",
        date: "2021-10-10",
        id: 1
    }

    const mockHandler = jest.fn();

    render(<Note note={note} handleDelete={mockHandler} />);

    const element = screen.getByText("Test title");
    expect(element).toBeDefined();

});