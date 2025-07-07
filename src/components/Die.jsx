function Die({value, isHeld, hold, id}) {

    const handleClick = () => {
        hold(id)
    }

    return (
        <>
            <button className={isHeld ? "press" : ""} onClick={handleClick}>{value}</button>
        </>
    )
}

export default Die