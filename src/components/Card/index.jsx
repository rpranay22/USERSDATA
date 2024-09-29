const Card = (props) => {
    const { id, username, address, date } = props.ele

    return <div className="card" style={{ width: "25rem" }}>

        <div className="card-body">
            <h1>USERID: {id}</h1>
            <h2>ISERNAME: {username}</h2>
            <h3>ADDRESS:{address}</h3>
            <h4>DATE:{date}</h4>
        </div>

    </div>
}
export default Card