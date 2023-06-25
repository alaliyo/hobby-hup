import React from "react";

function uselinesToBreaks(text: string): React.ReactNode {
    const lines = text.split("\\n");
    return lines.map((line, index) => (
        <React.Fragment key={index}>
            <div>{line}</div>
        </React.Fragment>
    ));
}

export default uselinesToBreaks;