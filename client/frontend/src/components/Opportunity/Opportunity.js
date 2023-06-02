export const Opportunity = (props) => {

    return (
        <>
            <h2>{props.name}</h2>
            <h2>{props.id}</h2>
            <button onClick={() => props.onDetailsClick(props.id)}>Details</button>
        </>
    );
}