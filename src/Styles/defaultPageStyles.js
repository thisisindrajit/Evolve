//cubic bezier website - https://cubic-bezier.com/#.17,.67,.83,.67
const style = {
    //this is for the top bar animation and for components for which font size changes
    XanimationStyle: {
        opacity:"0",
        transform:"translateX(-15px)",
        animation:"fade-in 0.75s 0.1s cubic-bezier(.18,.87,.92,1) forwards"
    },

    sidebaranimationStyle: {
        transform:"translateY(-15px)",
        animation:"fade-in 0.75s 0.1s cubic-bezier(.18,.87,.92,1) forwards"
    },

    pageStyle: {
        padding:"25px",
        fontSize:"1.2rem",
        opacity:"0",
        transform:"translateY(-15px)",
        animation:"fade-in 0.75s 0.1s cubic-bezier(.18,.87,.92,1) forwards"
    }
}

export default style;