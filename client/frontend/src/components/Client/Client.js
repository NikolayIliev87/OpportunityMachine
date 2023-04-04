export const Client = (props) => {

    return (
        <>
            <h2>{props.name}</h2>
            <h2>{props.id}</h2>
            <h2>{props.city}</h2>
            <h2>{props.managing_city.name}</h2>
            <button onClick={() => props.onDetailsClick(props.id)}>Details</button>
        </>
    );
}