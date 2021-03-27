export const Editable = () => {
    const words = 'Edit text here. Try some slike bold and asdred'
    const warn = ['text', 'and']

    const renderText = (text) => {
        const words = text.split(/(\s+)/);
        const output = words.map((word) => {
            for (let i = 0; i < warn.length; i++) {
                if (word === warn[i]) {
                    return `<strong>${word}</strong>`;
                } else {
                    return word;
                }
            }
            return output.join('');
        })
    }

    console.log(renderText(words))

    return (
        <div>
            <div contentEditable='true' id='editor'>
                Edit text here. Try some words like bold and red
            </div>
        </div>
    )
}
