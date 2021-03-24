import React from 'react';
import './HighlightTextarea.scss'

class InputHighlighter {
    constructor(element, tokens = []) {
        this.element = element;
        this.tokens = tokens;
        this.validateDOM();
        this.setupListeners();
        this.renderEcho();
    }

    syncEcho = () => {
        const { paddingLeft } = window.getComputedStyle(this.input);
        const distance = -1 * ((this.input.scrollLeft || 0) - parseFloat(paddingLeft));
        this.echo.style.left = `${distance}px`;
    };

    renderEcho = () => {
        let newEchoHTML = this.input.value;
        this.tokens.forEach(
            token =>
                (newEchoHTML = newEchoHTML.replace(
                    new RegExp(`(${token})`, 'g'),
                    '<span class="with-highlight__highlight">$1</span>'
                ))
        );
        this.echo.innerHTML = newEchoHTML;
        this.syncEcho();
    };

    setupListeners() {
        this.input.addEventListener('input', this.renderEcho);
        document.addEventListener('selectionchange', this.syncEcho);
    }

    destroy() {
        this.element.removeChild(this.echo);
        this.input.removeEventListener('input', this.renderEcho);
        document.removeEventListener('selectionchange', this.syncEcho);
    }

    validateDOM() {
        if (!this.element) {
            throw new Error('Cannot create an InputHighlighter without an element.');
        }
        if (this.element.querySelector('input.with-highlight__input')) {
            this.input = this.element.querySelector('input.with-highlight__input');
        } else {
            throw new Error('Cannot create an InputHighlighter without an <input class="with-highlight__input">');
        }
        if (this.element.querySelector('div.with-highlight__echo')) {
            this.echo = this.element.querySelector('div.with-highlight__echo');
        } else {
            const echo = document.createElement('div');
            echo.classList.add('with-highlight__echo');
            this.element.appendChild(echo);
            this.echo = echo;
            this.renderEcho();
        }
    }
}

function highlightTokens(selector = 'input', tokens) {
    document.querySelectorAll(selector).forEach(element => new InputHighlighter(element, tokens));
}

highlightTokens('.with-highlight', ['token', 'hello', 'world']);

export const Highlight = () => {
    highlightTokens('.with-highlight', ['token', 'hello', 'world']);
    return (
        <div className="with-highlight">
            <input className="with-highlight__input" value="My content has token values"/>
        </div>
    )
}
