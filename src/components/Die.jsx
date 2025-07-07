function Die({value, isHeld, hold, id}) {

    const handleClick = () => {
        hold(id)
    }

    return (
        <>
            <button 
                className={isHeld ? "press" : ""} 
                onClick={handleClick}
                aria-pressed={isHeld}
                aria-label={`Die with value ${value}, ${isHeld ? "held" : "not held"}`}
            >{value}</button>
        </>
    )
}

export default Die