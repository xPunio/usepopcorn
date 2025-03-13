import { useState } from "react";

export function TextExpander() {
    const text = [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
    ];

    return (
        <>
            <TextArea text={text[0]} words={10} isOpen={false} />
            <TextArea text={text[1]} words={20} isOpen={false} />
            <TextArea text={text[2]} words={30} isOpen={true} />
        </>
    );
}

const containerStyle = {
    fontSize: "22px",
};

function TextArea({ text, words, isOpen }) {
    const [isExpanded, setIsExpanded] = useState(isOpen);

    function handleExpand() {
        console.log("expand", isExpanded);
        setIsExpanded(!isExpanded);
    }

    function setTextLength(text) {
        return text.split(" ").slice(0, words).join(" ");
    }

    return (
        <div style={containerStyle}>
            {isExpanded ? text : setTextLength(text)}
            <a href="#" onClick={() => handleExpand()}>
                {isExpanded ? "Show less" : "Show more"}
            </a>
        </div>
    );
}
